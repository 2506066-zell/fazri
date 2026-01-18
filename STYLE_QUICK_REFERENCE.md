# Quick Reference - Frontend Style Guide

## Color Variables (Copy & Paste Ready)

```css
/* Primary Colors */
--primary-green: #2D7A4A;
--secondary-green: #3A9E5B;
--accent-yellow: #F4D03F;
--primary-white: #FFFFFF;

/* Text Colors */
--text-dark: #1A3B2A;
--text-light: #5A7A6E;

/* Background */
--bg-light: #F8FAF5;
--border-light: #D4E5DC;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 3rem;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 999px;

/* Shadows */
--shadow-sm: 0 2px 4px rgba(45, 122, 74, 0.08);
--shadow-md: 0 4px 12px rgba(45, 122, 74, 0.12);
--shadow-lg: 0 8px 20px rgba(45, 122, 74, 0.15);
```

## Common Component Templates

### Primary Button
```html
<button class="btn-action btn-borrow">
  <i class="fas fa-check"></i> Action
</button>
```

### Form Group
```html
<div class="form-group">
  <label for="input">
    <i class="fas fa-icon"></i> Label
  </label>
  <input type="text" id="input" placeholder="Placeholder">
</div>
```

### Card
```html
<div class="article-card">
  <div class="article-image"></div>
  <div class="article-content">
    <span class="article-category">Tag</span>
    <h3 class="article-title">Title</h3>
    <p class="article-excerpt">Description...</p>
  </div>
</div>
```

### Badge
```html
<span class="badge badge-available">Active</span>
<span class="badge badge-borrowed">Borrowed</span>
```

### Modal
```html
<div class="modal active">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Title</h2>
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body">Content</div>
  </div>
</div>
```

## Spacing Cheatsheet

| Use Case | Variable | Value |
|----------|----------|-------|
| Tiny gap | `--spacing-xs` | 4px |
| Small gap | `--spacing-sm` | 8px |
| Standard gap | `--spacing-md` | 16px |
| Large gap | `--spacing-lg` | 24px |
| Extra large | `--spacing-xl` | 32px |
| Section gap | `--spacing-2xl` | 48px |

## Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 480px) { }        /* < 480px */
@media (max-width: 768px) { }        /* < 768px */
@media (min-width: 768px) { }        /* ≥ 768px */
@media (min-width: 1024px) { }       /* ≥ 1024px */
@media (min-width: 1440px) { }       /* ≥ 1440px */
```

## Color Usage

| Usage | Color | CSS Variable |
|-------|-------|--------------|
| Primary action | Green gradient | `--primary-green` + `--secondary-green` |
| Highlights | Yellow | `--accent-yellow` |
| Text | Dark green | `--text-dark` |
| Secondary text | Light green | `--text-light` |
| Background | Light | `--bg-light` |
| Borders | Light gray-green | `--border-light` |
| Success | Green | `#E8F5E9` / `#1B5E20` |
| Warning | Orange | `#FFF3E0` / `#E65100` |
| Error | Red | `#FF6B6B` |

## DO's and DON'Ts

### ✅ DO
- Use CSS variables: `color: var(--text-dark);`
- Use spacing variables: `padding: var(--spacing-lg);`
- Use shadow variables: `box-shadow: var(--shadow-md);`
- Use responsive units: `font-size: clamp(20px, 5vw, 28px);`
- Apply min-height to buttons: `min-height: 44px;`
- Use `transform: translateY(-2px)` for active states

### ❌ DON'T
- Hardcode colors: `color: #2D7A4A;` ❌
- Use fixed spacing: `padding: 24px;` ❌
- Mix shadow definitions: `box-shadow: 0 2px...` ❌
- Set buttons < 44px height
- Use inline `style=""` attributes
- Create new color values
- Ignore mobile responsiveness
- Use fixed widths instead of flex/grid

## State Styles

### Button States
```css
/* Default */
background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));

/* Hover - not on mobile */
@media (hover: hover) {
  &:hover { transform: translateY(-2px); }
}

/* Active */
&:active { 
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Focus */
&:focus-visible {
  outline: 2px solid var(--accent-yellow);
}
```

### Form Input States
```css
/* Default */
border: 2px solid var(--border-light);

/* Focused */
&:focus {
  outline: none;
  border-color: var(--accent-yellow);
  box-shadow: 0 0 0 3px rgba(244, 208, 63, 0.1);
}

/* Error */
&.error {
  border-color: #FF6B6B;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

/* Disabled */
&:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Typography Sizes

```css
/* Headings */
h1 { font-size: clamp(28px, 6vw, 36px); }
h2 { font-size: clamp(24px, 5vw, 28px); }
h3 { font-size: clamp(20px, 4vw, 24px); }

/* Body */
p { font-size: 16px; line-height: 1.6; }
small { font-size: 14px; }
.tiny { font-size: 12px; }
```

## Common Class Names

### Layout
- `.dashboard-container` - Main layout wrapper
- `.dashboard-header` - Sticky header
- `.dashboard-sidebar` - Navigation sidebar
- `.dashboard-main` - Main content area
- `.home-section` - Full-width sections

### Cards
- `.article-card` - Article/content card
- `.book-card` - Book display card
- `.stat-card` - Statistics card
- `.borrow-card` - Borrow history card

### Components
- `.btn-action` - Primary button
- `.btn-borrow` - Borrow button
- `.btn-delete` - Delete button
- `.btn-edit` - Edit button

### UI Elements
- `.badge` - Status badge
- `.modal` - Modal container
- `.nav-item` - Navigation item
- `.form-group` - Form element

## Icon Library
Font Awesome 6.4.0 CDN:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

Common icons:
```html
<i class="fas fa-home"></i>              <!-- Dashboard -->
<i class="fas fa-book"></i>              <!-- Books -->
<i class="fas fa-newspaper"></i>         <!-- Articles -->
<i class="fas fa-user"></i>              <!-- User -->
<i class="fas fa-sign-out-alt"></i>      <!-- Logout -->
<i class="fas fa-hand-holding-heart"></i> <!-- Borrow -->
<i class="fas fa-undo"></i>              <!-- Return -->
```

---

**Version**: 1.0  
**Last Updated**: January 18, 2026  
**Status**: Ready to Use
