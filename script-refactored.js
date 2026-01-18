/**
 * ============================================================
 * Digital Library System - Main JavaScript File
 * ============================================================
 * 
 * Organisasi:
 * 1. Konstanta & Konfigurasi
 * 2. Utility Functions (DOM, Storage, Validation)
 * 3. Modal Management
 * 4. Authentication & User Management
 * 5. Book Management
 * 6. Borrowing Management
 * 7. Article Management
 * 8. Admin Functions
 * 9. Initialization
 */

// ============================================================
// 1. KONSTANTA & KONFIGURASI
// ============================================================

const CONFIG = {
    STORAGE_KEYS: {
        CURRENT_USER: 'currentUser',
        USERS: 'users',
        BOOKS: 'books',
        USER_BORROWS: 'userBorrows',
        ARTICLES: 'articles'
    },
    PHOTO_CONFIG: {
        MAX_SIZE: 2 * 1024 * 1024, // 2MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp']
    },
    DEFAULT_BOOKS: [
        { id: 1, title: 'Pemrograman JavaScript', author: 'Kyle Simpson', category: 'Teknologi', status: 'tersedia' },
        { id: 2, title: 'Data Science Handbook', author: 'Jake VanderPlas', category: 'Data Science', status: 'tersedia' },
        { id: 3, title: 'Machine Learning Basics', author: 'Andrew Ng', category: 'AI', status: 'tersedia' },
        { id: 4, title: 'Web Development', author: 'Jon Duckett', category: 'Web', status: 'tersedia' },
        { id: 5, title: 'Database Design', author: 'C.J. Date', category: 'Database', status: 'tersedia' },
        { id: 6, title: 'Cloud Computing', author: 'Mark Shuttleworth', category: 'Cloud', status: 'tersedia' }
    ]
};

// ============================================================
// 2. UTILITY FUNCTIONS
// ============================================================

/**
 * Storage Utilities - Mengelola localStorage dengan aman
 */
const StorageUtil = {
    /**
     * Ambil data dari localStorage
     * @param {string} key - Kunci penyimpanan
     * @param {*} defaultValue - Nilai default jika tidak ada
     * @returns {*} Data yang disimpan atau nilai default
     */
    get: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`Error reading ${key} from storage:`, e);
            return defaultValue;
        }
    },

    /**
     * Simpan data ke localStorage
     * @param {string} key - Kunci penyimpanan
     * @param {*} value - Data yang akan disimpan
     * @returns {boolean} Berhasil atau tidak
     */
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Error writing ${key} to storage:`, e);
            return false;
        }
    },

    /**
     * Hapus data dari localStorage
     * @param {string} key - Kunci penyimpanan
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`Error removing ${key} from storage:`, e);
        }
    }
};

/**
 * DOM Utilities - Memudahkan manipulasi DOM
 */
const DOMUtil = {
    /**
     * Cari elemen dengan aman
     * @param {string} selector - CSS selector
     * @returns {Element|null} Elemen atau null
     */
    querySelector: (selector) => {
        try {
            return document.querySelector(selector);
        } catch (e) {
            console.error(`Invalid selector: ${selector}`, e);
            return null;
        }
    },

    /**
     * Tampilkan alert dengan styling konsisten
     * @param {string} message - Pesan alert
     * @param {string} type - 'success', 'error', 'warning', 'info'
     */
    showAlert: (message, type = 'info') => {
        alert(message); // TODO: Ganti dengan custom notification UI
    },

    /**
     * Tambah class ke elemen
     * @param {Element} element - Elemen target
     * @param {string} className - Nama class
     */
    addClass: (element, className) => {
        if (element) element.classList.add(className);
    },

    /**
     * Hapus class dari elemen
     * @param {Element} element - Elemen target
     * @param {string} className - Nama class
     */
    removeClass: (element, className) => {
        if (element) element.classList.remove(className);
    }
};

/**
 * Validation Utilities - Validasi input
 */
const ValidationUtil = {
    /**
     * Validasi foto
     * @param {File} file - File yang akan divalidasi
     * @returns {Object} { valid: boolean, message: string }
     */
    validatePhoto: (file) => {
        if (!file) {
            return { valid: false, message: 'Pilih foto terlebih dahulu' };
        }

        if (!CONFIG.PHOTO_CONFIG.ALLOWED_TYPES.includes(file.type)) {
            return { valid: false, message: 'Tipe file harus JPG, PNG, atau WebP' };
        }

        if (file.size > CONFIG.PHOTO_CONFIG.MAX_SIZE) {
            return { valid: false, message: 'Ukuran foto maksimal 2MB' };
        }

        return { valid: true, message: 'OK' };
    },

    /**
     * Validasi email
     * @param {string} email - Email untuk divalidasi
     * @returns {boolean} Valid atau tidak
     */
    isValidEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Validasi password strength
     * @param {string} password - Password untuk divalidasi
     * @returns {Object} { strength: 'weak'|'medium'|'strong', score: number }
     */
    validatePassword: (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const strengths = ['weak', 'weak', 'medium', 'strong', 'strong'];
        return { strength: strengths[score], score };
    }
};

/**
 * Date Utilities - Manipulasi tanggal
 */
const DateUtil = {
    /**
     * Format tanggal ke string lokal
     * @param {Date|string} date - Tanggal untuk diformat
     * @returns {string} Format: DD/MM/YYYY
     */
    format: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },

    /**
     * Hitung selisih hari antara dua tanggal
     * @param {Date|string} date1 - Tanggal pertama
     * @param {Date|string} date2 - Tanggal kedua
     * @returns {number} Selisih dalam hari (positif = date2 lebih besar)
     */
    daysDifference: (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    /**
     * Tambah hari ke tanggal
     * @param {Date|string} date - Tanggal awal
     * @param {number} days - Jumlah hari yang ditambahkan
     * @returns {Date} Tanggal baru
     */
    addDays: (date, days) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }
};

// ============================================================
// 3. MODAL MANAGEMENT
// ============================================================

/**
 * Buka modal dengan ID tertentu
 * @param {string} modalId - ID elemen modal
 */
function openModal(modalId) {
    try {
        const modal = DOMUtil.querySelector(`#${modalId}`);
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

/**
 * Tutup modal dengan ID tertentu
 * @param {string} modalId - ID elemen modal
 */
function closeModal(modalId) {
    try {
        const modal = DOMUtil.querySelector(`#${modalId}`);
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

/**
 * Global click handler untuk menutup modal saat klik di luar
 */
window.onclick = function(event) {
    if (event.target.classList && event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        event.target.style.display = 'none';
    }
};

// ============================================================
// 4. AUTHENTICATION & USER MANAGEMENT
// ============================================================

/**
 * Logout user dan kembali ke halaman login
 */
function logout() {
    if (confirm('Yakin ingin logout?')) {
        StorageUtil.remove(CONFIG.STORAGE_KEYS.CURRENT_USER);
        window.location.href = 'index.html';
    }
}

/**
 * Dapatkan data user saat ini
 * @returns {Object|null} Data user atau null jika tidak ada
 */
function getCurrentUser() {
    return StorageUtil.get(CONFIG.STORAGE_KEYS.CURRENT_USER);
}

/**
 * Set data user saat ini
 * @param {Object} userData - Data user yang akan disimpan
 * @returns {boolean} Berhasil atau tidak
 */
function setCurrentUser(userData) {
    return StorageUtil.set(CONFIG.STORAGE_KEYS.CURRENT_USER, userData);
}

/**
 * Ambil semua user dari storage
 * @returns {Array} Array user
 */
function getUsers() {
    return StorageUtil.get(CONFIG.STORAGE_KEYS.USERS, []);
}

/**
 * Simpan semua user ke storage
 * @param {Array} users - Array user
 */
function saveUsers(users) {
    StorageUtil.set(CONFIG.STORAGE_KEYS.USERS, users);
}

// ============================================================
// 5. BOOK MANAGEMENT
// ============================================================

/**
 * Ambil semua buku dari storage
 * @returns {Array} Array buku dengan default data jika kosong
 */
function getBooks() {
    const stored = StorageUtil.get(CONFIG.STORAGE_KEYS.BOOKS);
    return stored || CONFIG.DEFAULT_BOOKS;
}

/**
 * Simpan buku ke storage
 * @param {Array} books - Array buku yang akan disimpan
 */
function saveBooks(books) {
    StorageUtil.set(CONFIG.STORAGE_KEYS.BOOKS, books);
}

/**
 * Cari buku berdasarkan kriteria
 * @param {string} query - Query pencarian
 * @returns {Array} Array buku yang cocok
 */
function searchBooks(query) {
    const books = getBooks();
    const lowerQuery = query.toLowerCase();
    return books.filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.category.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Dapatkan buku berdasarkan ID
 * @param {number} bookId - ID buku
 * @returns {Object|null} Data buku atau null
 */
function getBookById(bookId) {
    const books = getBooks();
    return books.find(book => book.id === bookId) || null;
}

/**
 * Tambah buku baru
 * @param {Object} bookData - Data buku baru
 * @returns {boolean} Berhasil atau tidak
 */
function addNewBook(bookData) {
    try {
        const books = getBooks();
        
        // Generate ID baru
        const newId = Math.max(...books.map(b => b.id || 0), 0) + 1;
        
        const newBook = {
            id: newId,
            title: bookData.title,
            author: bookData.author,
            category: bookData.category,
            year: bookData.year || new Date().getFullYear(),
            isbn: bookData.isbn || '-',
            status: 'tersedia',
            createdAt: new Date().toISOString()
        };
        
        books.push(newBook);
        saveBooks(books);
        return true;
    } catch (error) {
        console.error('Error adding book:', error);
        return false;
    }
}

// ============================================================
// 6. BORROWING MANAGEMENT
// ============================================================

/**
 * Ambil semua data peminjaman
 * @returns {Array} Array peminjaman
 */
function getBorrows() {
    return StorageUtil.get(CONFIG.STORAGE_KEYS.USER_BORROWS, []);
}

/**
 * Simpan data peminjaman
 * @param {Array} borrows - Array peminjaman
 */
function saveBorrows(borrows) {
    StorageUtil.set(CONFIG.STORAGE_KEYS.USER_BORROWS, borrows);
}

/**
 * Dapatkan peminjaman user saat ini
 * @returns {Array} Array peminjaman user
 */
function getUserBorrows() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const borrows = getBorrows();
    return borrows.filter(b => b.username === currentUser.username);
}

/**
 * Hitung pengembalian yang terlambat
 * @returns {Array} Array peminjaman yang terlambat
 */
function getLateBorrows() {
    const borrows = getBorrows();
    const today = new Date();
    
    return borrows.filter(b => {
        const dueDate = new Date(b.dueDate);
        return b.status === 'Aktif' && today > dueDate;
    });
}

// ============================================================
// 7. ARTICLE MANAGEMENT
// ============================================================

/**
 * Ambil semua artikel
 * @returns {Array} Array artikel
 */
function getArticles() {
    return StorageUtil.get(CONFIG.STORAGE_KEYS.ARTICLES, []);
}

/**
 * Simpan artikel
 * @param {Array} articles - Array artikel
 */
function saveArticles(articles) {
    StorageUtil.set(CONFIG.STORAGE_KEYS.ARTICLES, articles);
}

/**
 * Dapatkan artikel terbaru
 * @param {number} limit - Jumlah artikel yang diambil
 * @returns {Array} Array artikel terbaru
 */
function getLatestArticles(limit = 6) {
    const articles = getArticles();
    return articles
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
}

// ============================================================
// 8. ADMIN FUNCTIONS
// ============================================================

/**
 * Periksa apakah user adalah admin
 * @returns {boolean} True jika admin
 */
function isAdmin() {
    const currentUser = getCurrentUser();
    return currentUser && currentUser.role === 'admin';
}

/**
 * Hitung statistik peminjaman
 * @returns {Object} Statistik peminjaman
 */
function calculateBorrowStats() {
    const borrows = getBorrows();
    const today = new Date();
    
    const stats = {
        total: borrows.length,
        active: 0,
        returned: 0,
        late: 0
    };
    
    borrows.forEach(b => {
        if (b.status === 'Aktif') {
            stats.active++;
            const dueDate = new Date(b.dueDate);
            if (today > dueDate) {
                stats.late++;
            }
        } else if (b.status === 'Dikembalikan') {
            stats.returned++;
        }
    });
    
    return stats;
}

// ============================================================
// 9. MOBILE & RESPONSIVE UTILITIES
// ============================================================

/**
 * Periksa apakah device adalah touch device
 * @returns {boolean} True jika touch device
 */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const sidebar = DOMUtil.querySelector('.dashboard-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

/**
 * Setup mobile navigation event listeners
 */
function setupMobileNavigation() {
    const hamburgerBtn = DOMUtil.querySelector('.btn-menu');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Tutup menu saat item diklik
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sidebar = DOMUtil.querySelector('.dashboard-sidebar');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (event) => {
        const sidebar = DOMUtil.querySelector('.dashboard-sidebar');
        const hamburger = DOMUtil.querySelector('.btn-menu');
        if (sidebar && hamburger && 
            !sidebar.contains(event.target) && 
            !hamburger.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// ============================================================
// 10. INITIALIZATION
// ============================================================

/**
 * Initialize seluruh aplikasi saat halaman selesai dimuat
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Setup mobile navigation
        setupMobileNavigation();

        // Setup modal close handlers
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Load dashboard data jika ada
        const loadDashboardData = () => {
            const currentUser = getCurrentUser();
            if (currentUser) {
                const userNameEl = document.getElementById('userName');
                if (userNameEl) {
                    userNameEl.textContent = currentUser.fullname || currentUser.username;
                }
            }
        };
        
        if (document.getElementById('userName')) {
            loadDashboardData();
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// ============================================================
// EXPORT untuk modul-modul lain (jika menggunakan modules)
// ============================================================

// Jika menggunakan ES6 modules, uncomment:
// export { StorageUtil, DOMUtil, ValidationUtil, DateUtil };
// export { getBooks, getUsers, getArticles, getBorrows };
// export { isAdmin, calculateBorrowStats, getCurrentUser };
