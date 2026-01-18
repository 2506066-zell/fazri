# Frontend - Backend API Integration Guide

## Configuration

Tambahkan URL API base di script.js:

```javascript
// API Configuration
const API_URL = process.env.API_URL || 'http://localhost:5000/api';
let authToken = localStorage.getItem('authToken');
```

## Authentication Flow

### Register
```javascript
async function registerUser(fullname, pimpinan, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullname, pimpinan, password })
  });
  const data = await response.json();
  if (response.ok) {
    // Registration successful
    window.location.href = 'index.html';
  }
  return data;
}
```

### Login
```javascript
async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    authToken = data.token;
  }
  return data;
}
```

## Books API

### Get All Books
```javascript
async function fetchBooks() {
  const response = await fetch(`${API_URL}/books`);
  return await response.json();
}
```

### Add Book (Admin)
```javascript
async function addBook(title, author, category, isbn, year) {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ title, author, category, isbn, year })
  });
  return await response.json();
}
```

## Borrowing API

### Get User Borrowings
```javascript
async function fetchUserBorrowings() {
  const response = await fetch(`${API_URL}/borrowings`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  return await response.json();
}
```

### Borrow Book
```javascript
async function borrowBook(bookId, duration) {
  const response = await fetch(`${API_URL}/borrowings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ bookId, duration })
  });
  return await response.json();
}
```

### Return Book
```javascript
async function returnBook(borrowingId) {
  const response = await fetch(`${API_URL}/borrowings/${borrowingId}/return`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  return await response.json();
}
```

## Articles API

### Get All Articles
```javascript
async function fetchArticles() {
  const response = await fetch(`${API_URL}/articles`);
  return await response.json();
}
```

### Create Article (Admin)
```javascript
async function createArticle(title, content, category, image) {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ title, content, category, image })
  });
  return await response.json();
}
```

### Update Article
```javascript
async function updateArticle(articleId, title, content, category, image) {
  const response = await fetch(`${API_URL}/articles/${articleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ title, content, category, image })
  });
  return await response.json();
}
```

### Delete Article
```javascript
async function deleteArticle(articleId) {
  const response = await fetch(`${API_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  return await response.json();
}
```

## Migration Strategy

### Phase 1: Hybrid Mode (Current)
- Frontend masih menggunakan localStorage
- Backend ready untuk integrasi
- API endpoints tersedia untuk testing

### Phase 2: Full API Integration
1. Update index.html (login) untuk call API login
2. Update register.html untuk call API register
3. Update script.js untuk fetch dari API
4. Migrate data dari localStorage ke database

### Phase 3: Production
1. Deploy backend ke Vercel
2. Update API_URL ke production URL
3. Setup environment variables
4. Enable HTTPS

## Error Handling

```javascript
async function handleApiCall(apiFunction) {
  try {
    const result = await apiFunction();
    if (!result.ok && result.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('authToken');
      window.location.href = 'index.html';
    }
    return result;
  } catch (error) {
    console.error('API Error:', error);
    alert('Terjadi kesalahan. Silakan coba lagi.');
  }
}
```

## Testing Endpoints

Gunakan tools seperti Postman atau curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Ahmad","pimpinan":"Rizki","password":"12345678"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ahmad","password":"12345678"}'

# Get Books
curl http://localhost:5000/api/books

# Create Article (with token)
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"title":"Test","content":"Content","category":"Berita","image":""}'
```

## Next Steps

1. Install backend dependencies: `npm install`
2. Start backend: `npm run dev`
3. Test API endpoints dengan Postman
4. Update frontend script.js dengan API calls
5. Deploy backend ke Vercel
6. Update frontend API_URL untuk production
