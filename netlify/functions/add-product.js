const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // Hanya izinkan metode POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const data = JSON.parse(event.body);
    
    // Validasi diperketat: Wajib menyertakan category
    if (!data.name || !data.price || !data.image_url || !data.category) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: "Data tidak lengkap. Nama, harga, gambar, dan kategori wajib diisi." }) 
      };
    }

    await client.connect();
    const database = client.db('my_ecommerce');
    
    // Menambahkan field category ke dalam dokumen yang disimpan
    const result = await database.collection('products').insertOne({
      name: data.name,
      price: parseInt(data.price),
      category: data.category, // Field baru untuk fitur filter
      image_url: data.image_url,
      description: data.description || "",
      createdAt: new Date()
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: "Produk berhasil ditambah", 
        id: result.insertedId 
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await client.close();
  }
};