const mongoose = require('mongoose');
const Product = require('../models/Product');
const mapper = require('../mappers/product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) return next();

  let products = await Product.find({
    subcategory: subcategory,
  });

  products = products.map(mapper);

  ctx.body = {products: products};
};

module.exports.productList = async function productList(ctx, next) {
  let products = await Product.find({});

  products = products.map(mapper);

  ctx.body = {products: products};
};

module.exports.productById = async function productById(ctx, next) {
  const id = ctx.params.id;

  if (!mongoose.isValidObjectId(id)) {
    ctx.status = 400;
    ctx.body = 'Bad Request';
    return;
  }

  let product = await Product.findById(id);

  if (!product) {
    ctx.status = 404;
    ctx.body = 'Not Found';
    return;
  }

  product = mapper(product);

  ctx.body = {product: product};
};

