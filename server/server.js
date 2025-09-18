const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mydb';

let collection;

async function main() {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    collection = db.collection('products');

    // Routes
    app.get('/products', async (req, res) => {
        const products = await collection.find({}).toArray();
        res.json(products);
    });

    app.post('/products', async (req, res) => {
        const product = req.body;
        const exists = await collection.findOne({ id: product.id });
        if (exists) return res.status(400).json({ error: 'Duplicate id' });

        const result = await collection.insertOne(product);
        res.json(result);
    });

    app.delete('/products/:id', async (req, res) => {
        const id = req.params.id;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.json(result);
    });

    app.put('/products/:id', async (req, res) => {
        const id = req.params.id;
        const updatedProduct = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedProduct }
        );
        res.json(result);
    });

    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}

main().catch(console.error);
