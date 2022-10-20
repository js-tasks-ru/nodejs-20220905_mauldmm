const Category = require('../models/Category');
const mapper = require('../mappers/category');

module.exports.categoryList = async function categoryList(ctx, next) {
  let categories = await Category.find({});

  categories = categories.map(mapper);

  ctx.body = {categories: categories};
};
