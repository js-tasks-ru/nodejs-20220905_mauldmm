const Category = require('./models/Category');
const Product = require('./models/Product');

async function seed() {
  try {
    const category1 = await Category.create({
      title: 'Ноутбуки',
      subcategories: [
        {
          title: 'Игровые',
        },
        {
          title: 'Офисные',
        },
      ],
    });

    await Product.create({
      title: 'Samsung',
      description: 'Ноутбук 1',
      price: '100000',
      category: category1._id,
      subcategory: category1.subcategories[0]._id,
      images: [
        '/images/1-1.jpg',
        '/images/1-2.jpg',
      ],
    });

    await Product.create({
      title: 'Dell',
      description: 'Ноутбук 2',
      price: '110000',
      category: category1._id,
      subcategory: category1.subcategories[1]._id,
      images: [
        '/images/2-1.jpg',
        '/images/2-2.jpg',
      ],
    });

    const category2 = await Category.create({
      title: 'Мобильные телефоны',
      subcategories: [
        {
          title: 'Android',
        },
        {
          title: 'iOS',
        },
      ],
    });

    await Product.create({
      title: 'Apple',
      description: 'Смартфон 1',
      price: '70000',
      category: category2._id,
      subcategory: category2.subcategories[0]._id,
      images: [
        '/images/3-1.jpg',
        '/images/3-2.jpg',
      ],
    });

    await Product.create({
      title: 'Xiaomi',
      description: 'Смартфон 2',
      price: '20000',
      category: category2._id,
      subcategory: category2.subcategories[1]._id,
      images: [
        '/images/4-1.jpg',
        '/images/4-2.jpg',
      ],
    });
  } catch (e) {
    console.log(e);
  }
}

seed().then(() => console.log('OK'));
