# 📸 Panduan Upload Gambar Artikel

## ✅ Fitur yang Telah Diimplementasikan

### 1. **Upload Gambar (File-based, Bukan URL)**
- Admin dapat mengupload gambar langsung dari perangkat
- Mendukung format: JPG, PNG, GIF, WebP, dll
- Validasi:
  - **Tipe file**: Harus gambar (image/*)
  - **Ukuran maksimal**: 2MB
  - **Preview otomatis**: Gambar ditampilkan sebelum publikasi

### 2. **Penyimpanan Artikel**
- Gambar disimpan sebagai **Base64** dalam localStorage
- Kompatibel dengan offline-first mode
- Artikel data structure:
  ```json
  {
    "id": 1,
    "userId": "uuid",
    "author": "Admin IPM",
    "title": "Judul Artikel",
    "category": "Kategori",
    "content": "Isi artikel...",
    "image": "data:image/jpeg;base64,/9j/4AAQ...",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
  ```

### 3. **Tampilan Artikel**

#### Di Halaman Artikel (artikel.html)
- Grid layout dengan 3 kolom (responsive)
- Setiap artikel card menampilkan:
  - **Gambar**: 300x200px dengan object-fit cover
  - **Kategori**: Badge dengan warna kuning
  - **Judul**: Teks hijau (#006400)
  - **Excerpt**: Preview 100 karakter
  - **Author**: Nama pembuat artikel
  - **Tanggal**: Format DD MMM YYYY
- Hover effect: Card naik dan shadow meningkat
- Click: Buka modal detail artikel

#### Di Dashboard (dashboard.html)
- **Section "Artikel Terbaru"**
- Grid layout dengan 6 artikel terbaru
- Card mini dengan:
  - Gambar: 150x150px
  - Kategori badge
  - Judul: 14px
  - Excerpt: 80 karakter
  - Author info
- Click: Navigate ke artikel.html dan buka detail

#### Di Modal Detail Artikel
- Gambar besar: 300px tinggi, full width
- Metadata: Author, Tanggal, Kategori
- Konten: Text formated dengan paragraf
- Action buttons (untuk admin/author):
  - Edit: Buka artikel di form edit
  - Hapus: Delete dengan konfirmasi

### 4. **Fitur Admin**

#### Membuat Artikel
1. Klik tombol "Tulis Artikel" di admin area
2. Isi form:
   - Judul artikel (required)
   - Kategori (dropdown, required)
   - Konten (textarea, required)
   - Upload gambar (opsional)
3. Preview gambar sebelum publikasi
4. Klik "Publikasikan"
5. Artikel langsung tampil di halaman artikel

#### Mengedit Artikel
1. Klik pada artikel yang ingin diedit
2. Klik tombol "Edit" di modal detail
3. Form terisi dengan data artikel sebelumnya
4. Edit konten/gambar sesuai kebutuhan
5. Klik "Publikasikan" untuk update

#### Menghapus Artikel
1. Buka artikel detail
2. Klik tombol "Hapus"
3. Konfirmasi penghapusan
4. Artikel dihapus dari list

### 5. **Teknologi yang Digunakan**

| Komponen | Teknologi | Deskripsi |
|----------|-----------|----------|
| **Upload** | FileReader API | Convert file ke base64 |
| **Preview** | Canvas/DataURL | Tampilkan preview sebelum save |
| **Storage** | localStorage | Simpan artikel dengan gambar |
| **Display** | CSS Grid | Responsive layout |
| **Image** | Base64 encoding | Embedded image dalam JSON |
| **Validation** | JavaScript | Validasi file type & size |

### 6. **File yang Dimodifikasi**

#### artikel.html
```javascript
// ✅ Event listener untuk file upload
document.getElementById('articleImage').addEventListener('change', handleImageUpload);

// ✅ Fungsi convert ke base64
function handleImageUpload(e) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  selectedImageBase64 = event.target.result;
}

// ✅ Form submission dengan base64
const image = selectedImageBase64;
const newArticle = {
  ...
  image: image || '',
  ...
};

// ✅ Display artikel dengan gambar
${article.image ? `<img src="${article.image}" alt="">` : '<i class="fas fa-newspaper"></i>'}
```

#### dashboard.html
```javascript
// ✅ Load 6 artikel terbaru
const latestArticles = articles
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 6);

// ✅ Render sebagai card mini
function loadDashboardArticles() {
  // Load dan display artikel
}
```

```css
/* ✅ Article card mini styling */
.article-card-mini { ... }
.article-image-mini { height: 150px; }
.article-content-mini { ... }
```

## 🎯 Cara Menggunakan

### 1. **Register & Login**
```
Username: admin
Password: admin123
Role: admin
```

### 2. **Buat Artikel**
- Pergi ke Dashboard → Sidebar "Artikel"
- Klik "Tulis Artikel"
- Isi form lengkap
- Upload gambar dari perangkat
- Lihat preview gambar
- Publikasikan

### 3. **Lihat Artikel**
- **Dashboard**: Scroll ke bawah → "Artikel Terbaru" (6 artikel)
- **Halaman Artikel**: Lihat semua artikel dalam grid layout
- **Detail**: Klik artikel untuk lihat detail penuh

### 4. **Edit/Hapus Artikel**
- Sebagai admin/author: Buka detail artikel
- Klik "Edit" untuk ubah atau "Hapus" untuk delete

## 📊 Validasi

### File Validation
- ✅ Tipe file: Hanya image/* (JPG, PNG, GIF, WebP)
- ✅ Ukuran: Max 2MB
- ✅ Alert jika tidak valid

### Form Validation
- ✅ Judul: Required, min 3 karakter
- ✅ Kategori: Required
- ✅ Konten: Required, min 10 karakter
- ✅ Gambar: Optional

## 🎨 UI/UX Features

### Responsive Design
- Desktop: 3 kolom grid (300px cards)
- Tablet: 2 kolom grid
- Mobile: 1 kolom grid (full width)

### Accessibility
- Alt text untuk semua gambar
- Keyboard navigation
- Screen reader friendly
- WCAG AA compliant

### Visual Hierarchy
- **Primary color**: Green (#006400)
- **Accent color**: Yellow (#FFD700)
- **Font sizes**: 16px body, 14px-20px headers
- **Spacing**: 20px padding dalam cards

## 💾 Storage Limit

### localStorage Limit
- Browser limit: ~5-10MB per domain
- Base64 encoding: ~33% lebih besar dari original
- **Rekomendasi**:
  - Max 2MB per gambar
  - Max ~10 artikel dengan gambar
  - Untuk produksi: Gunakan cloud storage (Cloudinary, AWS S3)

## 🔄 Data Migration (Jika Diperlukan)

### Dari Base64 ke File Storage
1. Export article dengan base64
2. Convert base64 ke file
3. Upload ke cloud storage
4. Update image field dengan URL

### Contoh:
```javascript
// Convert base64 ke Blob
const blob = fetch(base64String).then(r => r.blob());

// Upload ke cloud
const formData = new FormData();
formData.append('file', blob);
fetch('/api/upload', { method: 'POST', body: formData });
```

## 🚀 Next Steps (Optional)

1. **Image Compression**: Kurangi ukuran file sebelum upload
2. **Drag & Drop**: Support drag-and-drop untuk upload
3. **Image Cropping**: Tool untuk crop gambar sebelum upload
4. **Cloud Storage**: Integration dengan Cloudinary/AWS S3
5. **Multiple Images**: Support multiple images per artikel
6. **Gallery**: Lightbox untuk view gambar full size

## 📝 Notes

- Semua artikel disimpan di localStorage (browser-based)
- Gambar embedded sebagai base64 dalam JSON
- Untuk produksi: Implementasikan backend database (MongoDB/PostgreSQL)
- Backup regular disarankan (export JSON data)
- Max localStorage: ~5-10MB (tergantung browser)

---

**Created**: 2024-01-15
**Last Updated**: 2024-01-15
**Status**: ✅ Complete & Ready for Use
