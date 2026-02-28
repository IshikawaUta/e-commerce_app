// Inisialisasi State Keranjang
let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];

// Update badge angka di navbar saat pertama kali load
document.addEventListener('DOMContentLoaded', updateCartCount);

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ id, name, price, image, qty: 1 });
    }
    
    saveAndRefresh();
    showToast(`✅ ${name} ditambahkan!`);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveAndRefresh();
    }
}

function saveAndRefresh() {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
    updateCartCount();
    if (typeof renderCartUI === 'function') renderCartUI();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function sendToWhatsApp() {
    if (cart.length === 0) return alert("Keranjang Anda kosong!");

    const phone = "62895701060973"; // GANTI DENGAN NOMOR ANDA
    let total = 0;
    let text = "*PESANAN BARU*%0A%0A";

    cart.forEach((item, i) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        text += `${i+1}. *${item.name}* (x${item.qty})%0ARp ${subtotal.toLocaleString('id-ID')}%0A%0A`;
    });

    text += `*TOTAL PEMBAYARAN: Rp ${total.toLocaleString('id-ID')}*%0A%0A`;
    text += `Nama: %0AAlamat: %0A`;

    // Membuka jendela WhatsApp
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');

    // MENGOSONGKAN KERANJANG SETELAH CHECKOUT
    cart = []; // Reset array cart menjadi kosong
    saveAndRefresh(); // Simpan perubahan ke localStorage dan perbarui tampilan UI
    
    // Menutup modal secara otomatis jika fungsi toggleCartModal tersedia
    if (typeof toggleCartModal === 'function') {
        toggleCartModal();
    }

    showToast("✅ Pesanan dikirim! Keranjang telah dikosongkan.");
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = "fixed bottom-20 right-5 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[999] animate-bounce";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}