const express = require("express");
var cors = require("cors");
const Razorpay = require("razorpay");
const user = require("./routes/auth");
const adminrouter = require("./routes/admin.router");
const Image = require("./routes/product");
const profile = require("./routes/profile");
const connectToMongo = require("./db");
connectToMongo()

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

//Routes
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", user);
app.use("/api/product", Image);
app.use("/api/profile", profile);
app.use("/admin", adminrouter);

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`);
});
