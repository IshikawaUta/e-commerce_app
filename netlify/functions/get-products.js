const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('my_ecommerce');
    
    // Mengambil semua produk, diurutkan dari yang terbaru
    // Properti 'category' akan otomatis ikut terambil jika sudah ada di dokumen
    const products = await database.collection('products')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        // Cache-Control agar browser tidak terus-menerus request ke database (opsional)
        "Cache-Control": "public, max-age=60" 
      },
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    // Memastikan koneksi ditutup dengan benar
    await client.close();
  }
};