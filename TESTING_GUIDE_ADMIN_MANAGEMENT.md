# 🧪 TESTING GUIDE - Admin Management System

## ✅ Pre-Testing Checklist

Before testing, ensure:
- [ ] All files created: admin-management.html, updates to dashboard.html
- [ ] Browser DevTools available (F12)
- [ ] localStorage cleared (or test with fresh data)
- [ ] Admin account credentials ready

---

## 🔍 UNIT TEST 1: Admin Access Control

### Test Case 1.1: Admin Can Access Management Page

**Steps:**
1. Login as admin user
2. On dashboard, verify "Kelola Organisasi" menu visible
3. Click "Kelola Organisasi"
4. Verify page loads without error

**Expected Result:**
- ✅ Menu visible for admin
- ✅ Page loads (admin-management.html)
- ✅ Header shows "Manajemen Organisasi"
- ✅ Tabs visible (Anggota Bidang, Program Kerja)

**Console Check:**
```javascript
// In browser console:
JSON.parse(localStorage.getItem('currentUser')).role
// Should output: "admin"
```

---

### Test Case 1.2: Non-Admin Cannot Access Management Page

**Steps:**
1. Logout (if logged in)
2. Login as regular user
3. Go to dashboard
4. Verify "Kelola Organisasi" menu NOT visible
5. Manually try to access: admin-management.html
6. Observe behavior

**Expected Result:**
- ❌ Menu hidden for regular user
- ⚠️ Alert: "Akses ditolak! Hanya admin yang dapat mengakses halaman ini."
- ↩️ Redirect to dashboard.html
- ✅ User cannot access management page

**Console Check:**
```javascript
// In browser console:
JSON.parse(localStorage.getItem('currentUser')).role
// Should output: "user" or something other than "admin"
```

---

## 🧪 UNIT TEST 2: Add Member to Bidang

### Test Case 2.1: Valid Member Addition

**Setup:**
- Admin logged in
- On admin-management.html
- Tab 1 "Anggota Bidang" is active

**Steps:**
1. Select Bidang: "Kaderisasi" (dropdown)
2. Enter Nama Anggota: "Rina Wijaya"
3. Enter Posisi: "Ketua Kaderisasi"
4. Click "Tambah Anggota" button

**Expected Result:**
- ✅ Success alert: "Anggota berhasil ditambahkan!"
- ✅ Form fields cleared
- ✅ Table under "Kaderisasi" updated
- ✅ New row shows: "Rina Wijaya | Ketua Kaderisasi | [delete]"

**Data Verification:**
```javascript
// Console check:
JSON.parse(localStorage.getItem('bidangMembers'))
// Should show new entry with bidangId: 1, name: "Rina Wijaya", position: "Ketua Kaderisasi"
```

---

### Test Case 2.2: Missing Bidang Field (Validation)

**Setup:**
- Admin on admin-management.html Tab 1

**Steps:**
1. Leave Bidang dropdown empty
2. Enter Nama: "Test User"
3. Enter Posisi: "Test Position"
4. Click "Tambah Anggota"

**Expected Result:**
- ❌ Error alert: "Bidang dan Nama Anggota harus diisi!"
- ✅ Form NOT submitted
- ✅ Data NOT saved to localStorage

---

### Test Case 2.3: Missing Name Field (Validation)

**Setup:**
- Admin on admin-management.html Tab 1

**Steps:**
1. Select Bidang: "Pendidikan"
2. Leave Nama empty
3. Enter Posisi: "Some Position"
4. Click "Tambah Anggota"

**Expected Result:**
- ❌ Error alert: "Bidang dan Nama Anggota harus diisi!"
- ✅ Form NOT submitted
- ✅ Data NOT saved

---

### Test Case 2.4: Optional Position Field

**Setup:**
- Admin on admin-management.html Tab 1

**Steps:**
1. Select Bidang: "Sosial & Kemasyarakatan"
2. Enter Nama: "Ahmad Hadid"
3. Leave Posisi empty
4. Click "Tambah Anggota"

**Expected Result:**
- ✅ Success alert
- ✅ Data saved (posisi can be empty)
- ✅ Table shows: "Ahmad Hadid | - | [delete]"

---

### Test Case 2.5: View All 7 Bidang Members

**Setup:**
- Added members to multiple bidang
- Admin on Tab 1

**Steps:**
1. Scroll down to view all bidang sections
2. Verify each bidang displays its members
3. Check bidang with no members shows "Belum ada anggota"

**Expected Result:**
- ✅ All 7 bidang sections visible
- ✅ Members organized by bidang
- ✅ Empty states for bidang with no members
- ✅ Tables show correctly

---

## 🧪 UNIT TEST 3: Add Program Kerja

### Test Case 3.1: Valid Program Addition

**Setup:**
- Admin logged in
- On admin-management.html
- Tab 2 "Program Kerja" is active

**Steps:**
1. Enter Nama Program: "Workshop Leadership"
2. Enter Deskripsi: "Program pengembangan kepemimpinan untuk anggota IPM"
3. Select Bidang: "Kaderisasi"
4. Select Tanggal: 2024-01-25
5. Click "Tambah Program"

**Expected Result:**
- ✅ Success alert: "Program berhasil ditambahkan!"
- ✅ Form fields cleared
- ✅ Table below updated with new row
- ✅ Row shows: "Workshop Leadership | Kaderisasi | 25 Januari 2024 | [delete]"

**Data Verification:**
```javascript
// Console check:
JSON.parse(localStorage.getItem('programs'))
// Should show new entry with all fields
```

---

### Test Case 3.2: Missing Name Field (Validation)

**Setup:**
- Admin on Tab 2

**Steps:**
1. Leave Nama Program empty
2. Enter Deskripsi: "Some description"
3. Select Bidang: "Pendidikan"
4. Select Tanggal: 2024-01-26
5. Click "Tambah Program"

**Expected Result:**
- ❌ Error alert: "Semua field harus diisi!"
- ✅ Form NOT submitted
- ✅ Data NOT saved

---

### Test Case 3.3: Missing Description (Validation)

**Setup:**
- Admin on Tab 2

**Steps:**
1. Enter Nama: "Test Program"
2. Leave Deskripsi empty
3. Select other fields correctly
4. Click "Tambah Program"

**Expected Result:**
- ❌ Error alert: "Semua field harus diisi!"
- ✅ No submission

---

### Test Case 3.4: Missing Bidang (Validation)

**Setup:**
- Admin on Tab 2

**Steps:**
1. Fill Nama, Deskripsi, Tanggal correctly
2. Leave Bidang as "-- Pilih Bidang --"
3. Click "Tambah Program"

**Expected Result:**
- ❌ Error alert: "Semua field harus diisi!"
- ✅ No submission

---

### Test Case 3.5: Missing Date (Validation)

**Setup:**
- Admin on Tab 2

**Steps:**
1. Fill Nama, Deskripsi, Bidang correctly
2. Leave Tanggal empty
3. Click "Tambah Program"

**Expected Result:**
- ❌ Error alert: "Semua field harus diisi!"
- ✅ No submission

---

## 🧪 UNIT TEST 4: Delete Operations

### Test Case 4.1: Delete Member

**Setup:**
- Member exists in table
- Admin on Tab 1

**Steps:**
1. Locate member row in table
2. Click trash icon [🗑️] button
3. Confirm dialog appears
4. Click "OK" to confirm

**Expected Result:**
- ✅ Row disappears from table
- ✅ Data removed from localStorage
- ✅ Table count changes

**Verification:**
```javascript
JSON.parse(localStorage.getItem('bidangMembers')).length
// Should decrease by 1
```

---

### Test Case 4.2: Delete Program

**Setup:**
- Program exists in table
- Admin on Tab 2

**Steps:**
1. Locate program row in table
2. Click trash icon button
3. Confirm dialog appears
4. Click "OK" to confirm

**Expected Result:**
- ✅ Row disappears
- ✅ Data removed from localStorage
- ✅ Table auto-updates

---

### Test Case 4.3: Cancel Delete Operation

**Setup:**
- Member or program exists

**Steps:**
1. Click trash icon
2. Confirm dialog appears
3. Click "Cancel" instead of "OK"

**Expected Result:**
- ✅ Dialog closes
- ✅ No data deleted
- ✅ Row remains in table

---

## 🧪 UNIT TEST 5: Tab Navigation

### Test Case 5.1: Switch Tabs

**Setup:**
- Admin on admin-management.html

**Steps:**
1. Currently on Tab 1 (Anggota Bidang)
2. Click Tab 2 button "Program Kerja"
3. Verify Tab 1 content disappears
4. Verify Tab 2 content appears
5. Click Tab 1 button again
6. Verify Tab 1 content reappears

**Expected Result:**
- ✅ Tabs switch correctly
- ✅ Only active tab content visible
- ✅ Tab button gets active styling
- ✅ No console errors

---

## 🧪 INTEGRATION TEST 1: Data Persistence

### Test Case 1: Data Survives Page Refresh

**Setup:**
- Added members and programs
- admin-management.html is open

**Steps:**
1. Add member: "Test Member"
2. Verify appears in table
3. Refresh page (F5 or Ctrl+R)
4. Verify member still appears
5. Repeat for programs

**Expected Result:**
- ✅ Data persists after refresh
- ✅ Tables reload correctly
- ✅ No data loss

---

### Test Case 2: Data Syncs Between Pages

**Setup:**
- In admin-management.html, add member to "Kaderisasi"
- Open about-ipm.html in new tab

**Steps:**
1. In admin-management.html: Add member
2. Switch to about-ipm.html tab
3. Refresh about-ipm.html
4. Click "Kaderisasi" card
5. Verify modal shows new member

**Expected Result:**
- ✅ Modal displays new member
- ✅ Member count updated on card
- ✅ Data synchronized via localStorage

**Program Data Sync:**
1. In admin-management.html Tab 2: Add program for "Kaderisasi"
2. Switch to about-ipm.html
3. Scroll to "Program Kerja" section
4. Verify program appears in grid

**Expected Result:**
- ✅ Program visible in about-ipm.html
- ✅ Program shows correct bidang
- ✅ Program shows correct date

---

## 🧪 INTEGRATION TEST 2: about-ipm.html Display

### Test Case 1: Modal Member Display

**Setup:**
- Members added for multiple bidang
- about-ipm.html is open

**Steps:**
1. On about-ipm.html, find bidang with members
2. Click bidang card
3. Modal appears
4. Verify table shows all members for that bidang
5. Close modal
6. Click different bidang

**Expected Result:**
- ✅ Modal opens on click
- ✅ Correct members displayed
- ✅ Modal shows bidang name in header
- ✅ Modal closes properly

---

### Test Case 2: Program Tab Display

**Setup:**
- Programs added
- about-ipm.html is open

**Steps:**
1. Scroll to "Program Kerja" section
2. Click "Program Kerja" tab
3. Verify program grid loads
4. Verify programs display correctly

**Expected Result:**
- ✅ Programs grid visible
- ✅ Each program shows name, bidang, date
- ✅ Programs formatted correctly

---

## 🧪 RESPONSIVE TEST 1: Desktop (> 768px)

### Test Case 1: Full Layout

**Setup:**
- Browser at full width (1200px+)
- admin-management.html open

**Steps:**
1. Verify header spans full width
2. Verify tabs display horizontally
3. Verify form inputs in 2-3 column grid
4. Verify tables display with horizontal scroll if needed
5. Verify buttons fully clickable

**Expected Result:**
- ✅ Layout optimized for desktop
- ✅ All elements accessible
- ✅ No text overflow
- ✅ Good use of space

---

## 🧪 RESPONSIVE TEST 2: Tablet (< 768px)

### Test Case 1: Tablet Layout

**Setup:**
- Browser at tablet width (768px or DevTools tablet mode)
- admin-management.html open

**Steps:**
1. Verify responsive layout activates
2. Verify form grid reduces to 1-2 columns
3. Verify buttons stack if needed
4. Verify tables still readable (font size adjusted)
5. Verify no horizontal scroll needed

**Expected Result:**
- ✅ Layout adapts to tablet size
- ✅ All content readable
- ✅ Buttons clickable (not too small)
- ✅ Tables have adjusted font

---

## 🧪 RESPONSIVE TEST 3: Mobile (≤ 480px)

### Test Case 1: Mobile Layout

**Setup:**
- Browser at mobile width (480px or DevTools mobile mode)
- admin-management.html open

**Steps:**
1. Verify header stacks correctly
2. Verify form inputs single column
3. Verify tabs stack vertically or become selectable
4. Verify buttons remain clickable
5. Verify tables don't overflow (use horizontal scroll if needed)
6. Verify font sizes readable

**Expected Result:**
- ✅ Layout optimized for mobile
- ✅ No pinch-zoom needed
- ✅ All buttons easily touchable
- ✅ Content well-organized

---

## 🧪 BROWSER COMPATIBILITY TEST

| Browser | Admin-Mgmt | about-ipm | Dashboard | Status |
|---------|-----------|-----------|-----------|--------|
| Chrome | ✅ Test | ✅ Test | ✅ Test | - |
| Firefox | ✅ Test | ✅ Test | ✅ Test | - |
| Safari | ✅ Test | ✅ Test | ✅ Test | - |
| Edge | ✅ Test | ✅ Test | ✅ Test | - |

---

## 🧪 PERFORMANCE TEST

### Test Case 1: Page Load Time

**Setup:**
- Open admin-management.html

**Steps:**
1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Refresh page
5. Wait for page to load
6. Stop recording

**Target:**
- ⏱️ Page load < 2 seconds
- ⏱️ DOM Interactive < 1 second
- ⏱️ First Contentful Paint < 1.5 seconds

**Measurement:**
```javascript
// Console:
performance.timing.loadEventEnd - performance.timing.navigationStart
// Should be < 2000ms
```

---

### Test Case 2: Form Submit Performance

**Setup:**
- admin-management.html open
- Ready to submit form

**Steps:**
1. Open DevTools Console
2. Enter: `console.time('submit'); /* then submit form **/`
3. Form submits
4. Enter: `console.timeEnd('submit');`

**Target:**
- ⏱️ Submit < 100ms (client-side)

---

### Test Case 3: localStorage Access Speed

**Setup:**
- Multiple members and programs stored

**Steps:**
1. Console: `console.time('read'); let data = JSON.parse(localStorage.getItem('bidangMembers')); console.timeEnd('read');`
2. Check time

**Target:**
- ⏱️ Read < 10ms
- ✅ Should be instant for < 10MB data

---

## 🧪 SECURITY TEST

### Test Case 1: LocalStorage Data Visibility

**Setup:**
- Admin logged in with members added

**Steps:**
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Verify data is stored as JSON strings
4. Check for sensitive data exposure

**Expected:**
- ⚠️ Data is plain text (localStorage limitation)
- ✅ IDs use timestamps (not sequential)
- ⚠️ Note: For production, use encrypted localStorage or backend

---

### Test Case 2: Session Verification

**Setup:**
- Admin logged in

**Steps:**
1. In DevTools Console: `localStorage.removeItem('currentUser')`
2. Refresh admin-management.html
3. Observe redirect

**Expected:**
- ✅ Redirects to dashboard
- ✅ Alert shows access denied

---

## 📊 FINAL SIGN-OFF CHECKLIST

- [ ] All 7 bidang accessible
- [ ] Can add members to all bidang
- [ ] Can add programs
- [ ] Can delete members
- [ ] Can delete programs
- [ ] Tab switching works
- [ ] Form validation works
- [ ] About-IPM shows members
- [ ] About-IPM shows programs
- [ ] Mobile responsive works
- [ ] Tablet responsive works
- [ ] Desktop displays correctly
- [ ] Non-admin cannot access
- [ ] Data persists on refresh
- [ ] localStorage data correct
- [ ] No console errors
- [ ] All buttons clickable
- [ ] Forms submit successfully
- [ ] Alerts show correctly
- [ ] Performance acceptable

---

## 🚀 SIGN-OFF

When all tests pass:

**Date**: ________________
**Tester**: ________________
**Status**: ✅ APPROVED / ❌ NEEDS FIXES

**Notes**:
_____________________________________________________
_____________________________________________________

---

**Test Plan Version**: 1.0
**Last Updated**: 2024
