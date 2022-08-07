const express = require("express");
const User = require("../models/User");
const Product = require("../models/ProductModel");
const Razorpay = require("razorpay");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const key_id = "rzp_test_Ms7ssj3y2mS9KN";
const key_secret = "KEETEmYpp7GyD8vfLO64TSD4";

const instance = new Razorpay({
  key_id,
  key_secret,
});
const JWT_SECRET = "HeyFoodE$007";



//Route 1: create a new user using POST method: "/api/auth/signin"
router.post(
  "/signin",
  [
    body("username", "Enter a Valid Name").isLength({ min: 5 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password length must be Minimum 5 Character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
        username: req.body.username,
      });
      if (user) {
        const success = false;
        return res.status(400).json({
          success,
          error: "Sorry a User with this UserName already exist",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        username: req.body.username,
        password: pass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route 2: Autheticate user using POST method: '/api/auth/login'
router.post(
  "/login",
  [
    body("username", "Enter a Valid Name").exists(),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email, username });
      if (!user) {
        return res.status(400).json({
          error: "Please try to login with correct credentials ",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please try to login with correct credentials ",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      const success = true;
      console.log(user);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/addToCart", fetchUser, async (req, res) => {
  User.findOne({ _id: req.user.id }, (err, userInfo) => {
    let duplicate = false;
    userInfo.cart.forEach((cartInfo) => {
      if (cartInfo.id === req.query.productId) {
        duplicate = true;
      }
    });
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user.id, "cart.id": req.query.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ succ: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              id: req.query.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    }
  });
});

//todo
router.get("/fetchallhistory", fetchUser, async (req, res) => {
  try {
    const profiles = await User.find({ _id: req.user.id });
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

router.delete("/deletecart/:id", fetchUser, async (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user.id },
    {
      $pull: {
        cart: {
          id: req.params.id,
        },
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json(userInfo.cart);
    }
  );
});

router.get("/orders/razorpay/:Total", async (req, res) => {
  const id = "1";
  const amount = req.params.Total * 100 + 22 * 100;
  const currency = "INR";
  const receipt = "HEllo";
  const notes = "poojan";
  instance.orders.create(
    { amount, currency, receipt, notes },
    (error, order) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    }
  );
});

router.post(
  "/successbuy/:id/:quantity/:title/:price",
  fetchUser,
  async (req, res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $addToSet: {
          history: {
            id: req.params.id,
            quantity: req.params.quantity,
            title: req.params.title,
            price: req.params.price,
            image: req.query.image,
            date: today.toDateString(),
            time: Date.now(),
          },
        },
      },
      { new: true },
      (err, userInfo) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json(userInfo.history);
      }
    );
  }
);

router.post("/successbuy2/:id", fetchUser, async (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user.id },
    {
      $pull: {
        cart: {
          id: req.params.id,
        },
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json(userInfo.cart);
    }
  );
});

router.post("/countinstock/:id", async (req, res) => {
  countstock = await Product.findOneAndUpdate(
    {'_id':req.params.id},
    { $inc: { "countInStock": -1 } },
  );
  res.json({ countstock });
});

//ROUTE 3: get Loggedin user details using: POST "/api/auth/getuser". login required

router.post('/getuser', fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
