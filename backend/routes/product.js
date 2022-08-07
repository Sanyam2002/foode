const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/ProductModel");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jfif" || ext !== ".webp") {
      return cb(res.status(400).end("only jpg, png,jfif are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadProduct", (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 2000;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;
  console.log(req.body.deli);
  for (let key in req.body.deli) {
    if (req.body.deli[key].length > 0) {
      if (key === "price") {
      } else {
        findArgs[key] = req.body.deli[key];
      }
    }
  }
  if (term) {
    Product.find(findArgs)
      .find({$text:{$search:term}})
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else{
    Product.find(findArgs)
    .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,products , postSize:products.length })
    })
  }
});
// id=${productId}&type=single
router.get("/products_by_id", (req, res) => {
  let type = req.query.type
  let productIds = req.query.id

  if(type ==="array"){
    let ids = req.query.id.split(',');
    productIds=[];
    productIds=ids.map(item=>{
      return item 
    });
  }
  //product info acc to product id

  Product.find({'title':{$in:productIds}})
  .exec((err,product)=>{
    if(err) return res.status(400).send(err)
      return res.status(200).send(product)
  })
});


module.exports = router;
