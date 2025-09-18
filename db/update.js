const collection = require('./app');

async function updateProduct() {
    const filter = { id: 1 };
    const update = { $set: { price: 1400.00, units: 8 } };
    const result = await collection.updateOne(filter, update);
    console.log(`${result.modifiedCount} product updated`);
}

updateProduct().catch(console.error);
