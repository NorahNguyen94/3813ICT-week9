const collection = require('./app');

async function removeProduct() {
    const filter = { id: 2 };
    const result = await collection.deleteOne(filter);
    console.log(`${result.deletedCount} product deleted`);
}

removeProduct().catch(console.error);
