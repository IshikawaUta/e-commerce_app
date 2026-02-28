// Simpan data produk secara global agar bisa difilter secara instan
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    
    // Inisialisasi fitur berdasarkan halaman tempat user berada
    // Menangani input pencarian baik di halaman search maupun di navbar
    if (document.getElementById('search-page-input')) {
        initSearchPage();
    }
});

// 1. Ambil Data dari API (Netlify Functions)
async function fetchProducts() {
    const container = document.getElementById('product-container');
    const loading = document.getElementById('loading-state');

    try {
        const res = await fetch('/.netlify/functions/get-products');
        allProducts = await res.json();

        if (loading) loading.style.display = 'none';

        // Jika ada container produk (halaman utama), tampilkan semua
        if (container) {
            renderProducts(allProducts);
        }
        
    } catch (err) {
        console.error("Gagal mengambil produk:", err);
        if (container) {
            container.innerHTML = '<p class="text-red-500 text-center col-span-full">Gagal memuat produk. Silakan coba lagi nanti.</p>';
        }
    }
}

// 2. Fungsi Render Umum (Digunakan di Halaman Utama)
function renderProducts(products) {
    const container = document.getElementById('product-container');
    const emptyState = document.getElementById('empty-state');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    
    container.innerHTML = products.map(p => createProductHTML(p)).join('');
}

// 3. LOGIKA HALAMAN PENCARIAN
async function initSearchPage() {
    const input = document.getElementById('search-page-input');
    const container = document.getElementById('search-results-container');
    const statusText = document.getElementById('search-status');
    const emptyState = document.getElementById('search-empty');
    const navSearch = document.getElementById('nav-search-input');

    // Tunggu sampai data produk tersedia jika belum ada
    if (allProducts.length === 0) {
        try {
            const res = await fetch('/.netlify/functions/get-products');
            allProducts = await res.json();
        } catch (e) {
            console.error("Gagal memuat data di halaman pencarian");
        }
    }

    // TANGKAP QUERY DARI URL (Misal: /search?q=sepatu)
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');

    if (queryParam) {
        if (input) input.value = queryParam;
        performSearch(queryParam);
    }

    // Listener untuk input di halaman search
    if (input) {
        input.addEventListener('input', (e) => performSearch(e.target.value));
    }

    // Listener tambahan jika user mengetik di navbar saat di halaman search
    if (navSearch) {
        navSearch.addEventListener('input', (e) => {
            if (input) input.value = e.target.value;
            performSearch(e.target.value);
        });
    }

    function performSearch(val) {
        const keyword = val.toLowerCase().trim();
        
        if (keyword.length < 1) {
            container.innerHTML = `<div class="col-span-full py-20 text-center text-slate-400">Silakan masukkan kata kunci di kolom pencarian...</div>`;
            statusText.innerText = "";
            return;
        }

        const filtered = allProducts.filter(p => 
            p.name.toLowerCase().includes(keyword) || 
            (p.category && p.category.toLowerCase().includes(keyword)) ||
            (p.description && p.description.toLowerCase().includes(keyword))
        );

        statusText.innerText = `Ditemukan ${filtered.length} hasil untuk "${val}"`;

        if (filtered.length > 0) {
            emptyState.classList.add('hidden');
            container.innerHTML = filtered.map(p => createProductHTML(p)).join('');
        } else {
            container.innerHTML = "";
            emptyState.classList.remove('hidden');
        }
    }
}

// Helper: Membuat Template Kartu Produk (Reusable)
function createProductHTML(p) {
    return `
        <div class="product-card bg-white rounded-3xl p-3 border border-gray-100 shadow-sm group hover:shadow-xl transition-all" data-aos="fade-up">
            <div class="relative h-64 overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" 
                 onclick="openDetail('${p._id}', '${p.name}', ${p.price}, '${p.image_url}', '${p.description}', '${p.category || ''}')">
                <img src="${p.image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                ${p.category ? `<span class="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700">${p.category}</span>` : ''}
            </div>
            <div class="mt-4 px-2 pb-2">
                <h3 class="font-bold text-gray-800 text-lg truncate">${p.name}</h3>
                <p class="text-blue-600 font-black text-xl mt-1">Rp ${p.price.toLocaleString('id-ID')}</p>
                <div class="flex gap-2 mt-4">
                    <button onclick="openDetail('${p._id}', '${p.name}', ${p.price}, '${p.image_url}', '${p.description}', '${p.category || ''}')" 
                            class="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-bold transition-all text-sm">
                        Detail
                    </button>
                    <button onclick="addToCart('${p._id}', '${p.name}', ${p.price}, '${p.image_url}')" 
                            class="bg-blue-600 hover:bg-blue-700 text-white p-3 px-5 rounded-xl transition-all active:scale-90">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 4. FITUR KATEGORI (Halaman Utama)
function filterCategory(category) {
    const container = document.getElementById('product-container');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const filtered = category === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === category);
    
    renderProducts(filtered);
}

// 5. MODAL DETAIL PRODUK
function openDetail(id, name, price, img, desc, category) {
    // Suntik data ke elemen modal
    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-price').innerText = `Rp ${price.toLocaleString('id-ID')}`;
    document.getElementById('detail-img').src = img;
    document.getElementById('detail-desc').innerText = desc || "Tidak ada deskripsi untuk produk ini.";
    
    // Suntik kategori ke label modal (Jika elemen ada)
    const catEl = document.getElementById('detail-category');
    if (catEl) {
        catEl.innerText = category || 'Produk';
    }
    
    // Set fungsi tombol tambah ke keranjang di dalam modal
    const addBtn = document.getElementById('detail-add-btn');
    if (addBtn) {
        addBtn.onclick = () => {
            addToCart(id, name, price, img);
            closeDetail();
        };
    }

    // Tampilkan modal
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
}

function closeDetail() {
    const modal = document.getElementById('detail-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto'; // Aktifkan kembali scroll
}

// 6. FUNGSI KERANJANG (Asumsi addToCart didefinisikan di cart.js, 
// namun jika ingin aman, Anda bisa menambahkan proteksi atau memindahkannya ke sini)
if (typeof addToCart !== 'function') {
    window.addToCart = function(id, name, price, img) {
        console.log("Menambahkan ke keranjang:", name);
        // Logika keranjang biasanya ada di cart.js
    };
}