const collection = require('./app');

async function readProducts() {
    const products = await collection.find({}).toArray();
    console.log(products);
}

readProducts().catch(console.error);
