const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose"); //Mongodb conector
const methodOverride = require("method-override");
const port = 3999;
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res) => {
  const { cat } = req.query;
  if (cat) {
    const products = await Product.find({ category:cat });
    res.render("index", { products });
  } else {
  }
  const products = await Product.find();
  res.render("index", { products });
});

app.get ('/products/:id', async (req,res) =>{
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render("show", {product});
});
app.get ('/products/:id/edit', async (req,res) =>{
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render("edit", { product, categories });
});

app.put ('/products/:id', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body);
  res.redirect('/products');
});

app.get("/products/new", (req, res) => {
  res.render("new", { categories });
});
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect("/products");
});

app.delete('/products/:id', async(req,res) =>{
  const {id} = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.listen(port, () => {
  console.log("API MONGODB IS LISTENNING IN PORT " + port);
});