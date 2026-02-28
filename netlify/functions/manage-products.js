const { MongoClient, ObjectId } = require('mongodb');

exports.handler = async (event) => {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const id = event.queryStringParameters.id;

    try {
        await client.connect();
        const db = client.db('my_ecommerce');
        const collection = db.collection('products');

        // HAPUS PRODUK (DELETE)
        if (event.httpMethod === "DELETE") {
            await collection.deleteOne({ _id: new ObjectId(id) });
            return { 
                statusCode: 200, 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ msg: "Produk berhasil dihapus" }) 
            };
        }

        // EDIT PRODUK (PUT)
        if (event.httpMethod === "PUT") {
            const data = JSON.parse(event.body);
            
            // Update dokumen termasuk field category
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { 
                    name: data.name, 
                    price: parseInt(data.price), 
                    category: data.category, // Tambahkan baris ini agar kategori bisa diedit
                    description: data.description,
                    image_url: data.image_url 
                }}
            );
            
            return { 
                statusCode: 200, 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ msg: "Perubahan berhasil disimpan" }) 
            };
        }

        return { statusCode: 405, body: "Method Not Allowed" };
    } catch (err) {
        return { 
            statusCode: 500, 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: err.message }) 
        };
    } finally {
        await client.close();
    }
};