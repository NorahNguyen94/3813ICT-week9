const collection = require('../app');

async function addProducts() {
    await collection.deleteMany({}); // drop before adding

    const products = [
        { id: 1, name: 'Laptop', description: 'Gaming Laptop', price: 1500.50, units: 10 },
        { id: 2, name: 'Phone', description: 'Smartphone', price: 800.00, units: 25 },
        { id: 3, name: 'Headphones', description: 'Noise Cancelling', price: 200.00, units: 50 }
    ];

    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products added`);
}

addProducts().catch(console.error);
