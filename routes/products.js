const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().select("-__v").sort("name");
  res.send(products);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const product = new Product({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    onSale:req.body.onSale,
    price: req.body.price,
    numberInStock: req.body.numberInStock,
    sales: req.body.sales,
    src:req.body.src,
    // path: req.body.path,
    publishDate: moment().toJSON(),
  });
  await product.save();

  res.send(product);
});

// 參2[auth] 先省略
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      onSale:req.body.onSale,
      price:req.body.price,
      numberInStock: req.body.numberInStock,
      sales: req.body.sales,
      path: req.body.path,
      src: req.body.src
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

// 必須要同時具備auth和admin兩條件，才能夠被允許刪除
// 參2[auth, admin]代表auth,admin是middleware function
router.delete("/:id",  async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id).select("-__v");

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
