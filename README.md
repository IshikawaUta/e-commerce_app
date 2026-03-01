# 🛒 TokoModern - E-Commerce Curated Premium

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)
![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=flat&logo=jekyll&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-orange?style=flat&logo=google-search-console&logoColor=white)

**TokoModern** adalah platform *e-commerce* statis modern yang dirancang untuk kurasi produk premium dengan sistem transaksi instan via WhatsApp. Proyek ini menggabungkan kecepatan **Jekyll** dengan fleksibilitas **Netlify Functions** serta optimasi gambar berbasis **Cloudinary**.

![Gambar Demo Project Desktop](https://res.cloudinary.com/dzsqaauqn/image/upload/v1772344753/02c2c051-317c-4f95-8981-369fe38a994d_fgsbva.jpg)
![Gambar Demo Project Mobile](https://res.cloudinary.com/dzsqaauqn/image/upload/v1772344926/b26c7d52-cd0d-4504-be1b-401efa48dd8f_d2laxr.jpg)

## 🚀 Fitur Utama

* **Pemesanan WhatsApp**: Detail pesanan dikirimkan otomatis dalam format pesan rapi ke nomor admin.
* **Pencarian Real-time**: Fitur pencarian cerdas berdasarkan nama, kategori, dan deskripsi produk.
* **Optimasi Gambar Cloudinary**: Pengiriman gambar yang cepat dan teroptimasi secara otomatis untuk berbagai perangkat.
* **SEO & OpenGraph Dinamis**: Meta tag otomatis untuk optimasi mesin pencari dan media sosial.
* **Manajemen Konten (CMS)**: Terintegrasi dengan Netlify CMS untuk pengelolaan katalog tanpa koding.

## 🛠️ Alat & Teknologi yang Digunakan

### Frontend (Tampilan)

* **Jekyll**: *Static Site Generator* (SSG) berbasis Ruby.
* **Tailwind CSS**: *Framework* CSS untuk desain UI modern dan responsif.
* **Liquid**: *Templating engine* untuk logika dinamis pada HTML statis.
* **AOS (Animate On Scroll)**: Library untuk efek animasi *scroll*.

### Backend & Media (Data)

* **Node.js**: Runtime JavaScript untuk logika *server-side*.
* **Netlify Functions**: Arsitektur *serverless* untuk menangani API produk.
* **MongoDB**: Database NoSQL untuk penyimpanan data katalog.
* **Cloudinary**: *Cloud-based image management* untuk optimasi dan pengiriman gambar produk.

### Tools & Deployment

* **Netlify**: Platform *hosting* dan otomatisasi CI/CD.
* **Netlify CMS**: Panel admin untuk manajemen konten.
* **Git & GitHub**: Sistem kontrol versi kode sumber.

---

## 📂 Struktur Folder

```bash
├── _includes/          # Komponen UI (navbar, footer, detail-modal.html)
├── _layouts/           # Template utama dengan SEO dynamic
├── assets/
│   ├── css/            # Style kustom
│   └── js/             # Logika frontend (app.js, cart.js)
├── netlify/
│   └── functions/      # API Backend (Node.js)
├── admin/              # Konfigurasi Netlify CMS
├── index.html          # Halaman katalog utama
├── search.html         # Halaman pencarian
├── contact.html        # Halaman kontak WhatsApp
├── _config.yml         # Konfigurasi Jekyll
├── package.json        # Dependensi Node.js
└── robots.txt          # Instruksi mesin pencari
```

---


## 🛠️ Panduan Instalasi

### 1. Prasyarat

* **Ruby (v3.x)** dan **Bundler**.
* **Node.js (v18+)** dan **NPM**.
* **Netlify CLI** (`npm install -g netlify-cli`).

### 2. Instalasi Dependensi

```bash
# Instal dependensi Node.js
npm install

# Instal dependensi Jekyll
bundle install
```

---

## ⚙️ Konfigurasi (.env)

Buat file `.env` di folder root. **Jangan unggah file ini ke repositori publik!**

```env
# --- DATABASE CONFIGURATION ---
MONGODB_URI=xxxxxxxxx

# --- CLOUDINARY CONFIGURATION ---
CLOUDINARY_CLOUD_NAME=xxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxx

# --- SITE CONFIGURATION ---
URL=http://localhost:8888
```

---

## 🚀 Menjalankan Proyek

Jalankan frontend dan backend secara bersamaan:

```bash
netlify dev
```

Akses situs di `http://localhost:8888`.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.