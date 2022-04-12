const { Category } = require("./models/category");
const { Product } = require("./models/product");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "3C電子",
    products: [
      { title: "iPhone 13", price:30000,onSale:1 ,numberInStock: 0, sales: 55 ,src:'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pink-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1629842709000'},
      { title: "iPad 9", price:15000,onSale:1 ,numberInStock: 10, sales: 44,src:'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202009_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1599672435000' },
      { title: "Macbook Air", price:40000,onSale:1 ,numberInStock: 15, sales: 35,src:'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-gallery3-20201110?wid=4000&hei=3072&fmt=jpeg&qlt=80&.v=1632937845000' },
      { title: "Apple Watch", price:6000,onSale:0 ,numberInStock: 25, sales: 0,src:'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MKUW3_VW_34FR+watch-45-alum-blue-cell-7s_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171100000,1631661588000' }

    ]
  },
  {
    name: "服裝配件",
    products: [
      { title: "T-shirt", price:1000,onSale:1 ,numberInStock: 50, sales:833 ,src:'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1570731177-everlane-1570731152.jpg?crop=1xw:1xh;center,top&resize=480:*'},
      { title: "運動長褲", price:800,onSale:1 ,numberInStock: 60, sales: 772,src:'https://d.ecimg.tw/items/DXAQ0KA900B4QHI/000001_1612163179.jpg' },
      { title: "太空外套", price:2000,onSale:1 ,numberInStock: 55, sales: 874,src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEWmKb6rnY72aT4wLWMueZgQ8RHtfI-zvlmw&usqp=CAU' }
    ]
  },
  {
    name: "食物飲品",
    products: [
      { title: "義美堅果", price:480,onSale:1 ,numberInStock: 50, sales: 266 ,src:'https://a.ecimg.tw/items/DBACCRA9006Y2XR/000002_1478139269.jpg'},
      { title: "花生牛奶", price:600,onSale:1 ,numberInStock: 30, sales: 411,src:'https://b.ecimg.tw/items/DBAB06A9007B86Z/000001_1534743514.jpg' },
      { title: "排骨雞麵", price:150,onSale:1 ,numberInStock: 45, sales: 588,src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxgE79K95soL4nYvOI9aXOoQ_f7IPNvLg3g&usqp=CAU' }
    ]
  },
  {
    name: "生活用具",
    products: [
      { title: "工作桌", price:3000,onSale:1 ,numberInStock: 5, sales: 12 ,src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZZb6HpPSjNlurcTeQpaRUhi1MBArcd0DWQ&usqp=CAU'},
      { title: "檯燈", price:600,onSale:1 ,numberInStock: 10, sales: 30,src:'https://d.ecimg.tw/items/DEBD2SA900AIZ5Q/000001_1582786326.jpg' },
      { title: "雙門冰箱", price:45000,onSale:1 ,numberInStock: 5, sales: 5,src:'https://www.etungo.com.tw/files/TC_PData/PD_Pic/87314big.jpg' }
    ]
  }
];

async function seed() {
  await mongoose.connect('mongodb://sfad159357:753951sfad@cluster0-shard-00-00.rjrvl.gcp.mongodb.net:27017,cluster0-shard-00-01.rjrvl.gcp.mongodb.net:27017,cluster0-shard-00-02.rjrvl.gcp.mongodb.net:27017/eshop_db?ssl=true&replicaSet=atlas-brw5hw-shard-0&authSource=admin&retryWrites=true&w=majority'
    , { useNewUrlParser: true, useUnifiedTopology: true });

  await Product.deleteMany({});
  await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({ name: category.name }).save();
    const products = category.products.map(product => ({
      ...product,
      category: { _id: categoryId, name: category.name }
    }));
    await Product.insertMany(products);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
