# 🎨 CSS MOBILE OPTIMIZATION - QUICK REFERENCE

## 📌 COPY-PASTE SNIPPETS

### 1. Touch-Friendly Button
```css
.btn {
    min-width: var(--touch-target);  /* 44px */
    min-height: var(--touch-target); /* 44px */
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: 1rem;
    transition: all 0.2s ease;
}

.btn:active {
    transform: translateY(-1px);
    opacity: 0.8;
}
```

### 2. Responsive Typography
```css
h1 {
    font-size: 1rem;        /* Mobile */
}

@media (min-width: 768px) {
    h1 { font-size: 1.25rem; }  /* Tablet */
}

@media (min-width: 1024px) {
    h1 { font-size: 1.5rem; }   /* Desktop */
}
```

### 3. Mobile-First Grid
```css
/* Default: 1 kolom */
.grid { grid-template-columns: 1fr; }

/* Tablet: 2 kolom */
@media (min-width: 600px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 4 kolom */
@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(4, 1fr); }
}
```

### 4. Touch Device Optimization
```css
/* Remove hover on touch */
@media (hover: none) and (pointer: coarse) {
    button:hover { transform: none; }
    button:active { transform: scale(0.98); }
}

/* iOS smooth scrolling */
.scrollable {
    -webkit-overflow-scrolling: touch;
}
```

### 5. Responsive Padding
```css
.container {
    padding: var(--spacing-md);     /* Mobile: 16px */
}

@media (min-width: 768px) {
    .container { padding: var(--spacing-lg); } /* 24px */
}

@media (min-width: 1024px) {
    .container { padding: var(--spacing-xl); } /* 32px */
}
```

### 6. Hide/Show Elements
```css
/* Hide on mobile */
.desktop-only { display: none; }

@media (min-width: 1024px) {
    .desktop-only { display: block; }
}

/* Show only on mobile */
.mobile-only { display: block; }

@media (min-width: 768px) {
    .mobile-only { display: none; }
}
```

### 7. Mobile Menu Toggle
```css
.sidebar {
    position: fixed;
    left: 0;
    top: 60px;
    right: 0;
    max-height: calc(100vh - 60px);
    display: none;
    flex-direction: column;
    z-index: 99;
    box-shadow: var(--shadow-md);
}

.sidebar.active {
    display: flex;
}

@media (min-width: 768px) {
    .sidebar {
        display: flex !important;
        position: relative;
        top: 0;
        max-height: none;
    }
}
```

### 8. Responsive Form Input
```css
input, select, textarea {
    width: 100%;
    padding: var(--spacing-md);
    min-height: var(--touch-target);
    border: 2px solid var(--ipm-border);
    border-radius: var(--radius-md);
    font-size: 1rem;
    transition: all 0.2s ease;
    -webkit-appearance: none;
    appearance: none;
}

input:focus {
    outline: none;
    border-color: var(--ipm-yellow);
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);
}
```

### 9. Responsive Image
```css
img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Full-width container, 16:9 aspect ratio */
.image-container {
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 */
    position: relative;
    background: var(--ipm-gray);
}

.image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### 10. Sticky Header
```css
header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: linear-gradient(135deg, var(--ipm-green) 0%, var(--ipm-dark-green) 100%);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-md);
}
```

---

## 🎯 DESIGN TOKENS REFERENCE

### Colors
```css
--ipm-green: #006400;           /* Primary - Hijau */
--ipm-light-green: #228B22;     /* Hijau hutan */
--ipm-dark-green: #004d00;      /* Hijau sangat tua */
--ipm-yellow: #FFD700;          /* Accent - Kuning emas */
--ipm-gold: #FFC107;            /* Kuning cerah */
--ipm-light-yellow: #FFFACD;    /* Kuning lemon */
--ipm-white: #FFFFFF;
--ipm-gray: #f5f5f5;
--ipm-gray-dark: #333;
--ipm-gray-light: #999;
--ipm-border: #e0e0e0;
```

### Spacing Scale
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 999px;
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0,0,0,0.08);
--shadow-md: 0 4px 12px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 24px rgba(0,0,0,0.12);
```

### Touch Target
```css
--touch-target: 44px;   /* iOS/Android minimum */
```

### Breakpoints
```css
--bp-mobile: 375px;     /* Small phones */
--bp-tablet: 768px;     /* Tablets */
--bp-desktop: 1024px;   /* Desktops */
--bp-wide: 1440px;      /* Ultra-wide */
```

---

## 📱 BREAKPOINT MEDIA QUERIES

### Mobile
```css
/* Default mobile styles */
```

### Small Mobile (max-width: 374px)
```css
@media (max-width: 374px) {
    /* Very small phone optimization */
}
```

### Mobile (375px - 599px)
```css
@media (min-width: 375px) and (max-width: 599px) {
    /* Standard mobile */
}
```

### Large Mobile (600px - 767px)
```css
@media (min-width: 600px) and (max-width: 767px) {
    /* Large phone/small tablet */
}
```

### Tablet (768px - 1023px)
```css
@media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet portrait & landscape */
}
```

### Desktop (1024px+)
```css
@media (min-width: 1024px) {
    /* Desktop */
}
```

### Wide Desktop (1440px+)
```css
@media (min-width: 1440px) {
    /* Ultra-wide displays */
}
```

### Landscape
```css
@media (orientation: landscape) and (max-height: 500px) {
    /* Landscape phones */
}
```

### Dark Mode
```css
@media (prefers-color-scheme: dark) {
    /* Dark mode styles */
}
```

### Touch Devices
```css
@media (hover: none) and (pointer: coarse) {
    /* Touch devices - no hover */
}
```

---

## 🔄 COMMON PATTERNS

### Pattern 1: Mobile-First Responsive
```css
.element {
    /* Mobile: default */
    font-size: 0.9rem;
    padding: var(--spacing-md);
}

@media (min-width: 768px) {
    .element {
        /* Tablet & above */
        font-size: 1rem;
        padding: var(--spacing-lg);
    }
}
```

### Pattern 2: Show/Hide Responsive
```css
.mobile-only { display: block; }
.desktop-only { display: none; }

@media (min-width: 768px) {
    .mobile-only { display: none; }
    .desktop-only { display: block; }
}
```

### Pattern 3: Grid Responsive
```css
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
}

@media (min-width: 600px) {
    .grid { 
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-lg);
    }
}
```

### Pattern 4: Flexbox Responsive
```css
.flex {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

@media (min-width: 768px) {
    .flex {
        flex-direction: row;
        gap: var(--spacing-lg);
    }
}
```

### Pattern 5: Touch-Friendly Button
```css
.btn {
    min-width: var(--touch-target);
    min-height: var(--touch-target);
    padding: var(--spacing-md);
    border: none;
    border-radius: var(--radius-md);
    background: var(--ipm-yellow);
    color: var(--ipm-green);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:active {
    transform: translateY(-1px);
}
```

---

## ⚡ PERFORMANCE TIPS

### Optimize CSS
```css
/* ✅ DO: Use variables */
color: var(--ipm-green);

/* ❌ DON'T: Hard-code values */
color: #006400;
```

### Minimize Reflows
```css
/* ✅ DO: Set width/height */
width: 100%;
height: 40px;

/* ❌ DON'T: Let browser calculate */
width: auto;
```

### Use CSS Grid/Flex
```css
/* ✅ DO: Use modern layout */
display: grid;
display: flex;

/* ❌ DON'T: Use floats */
float: left;
```

### Minimize Animations
```css
/* ✅ DO: Short, smooth animations */
transition: all 0.2s ease;

/* ❌ DON'T: Long, complex animations */
transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

---

## 🧪 TESTING SNIPPETS

### Check Button Size
```javascript
// Open DevTools Console
document.querySelectorAll('button').forEach(btn => {
    const rect = btn.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
        console.warn('Small button:', btn, 
                    `${rect.width}x${rect.height}`);
    }
});
```

### Check Viewport
```javascript
console.log('Viewport:', window.innerWidth, 'x', window.innerHeight);
```

### Measure Performance
```javascript
console.time('operation');
// ... code to measure ...
console.timeEnd('operation');
```

---

## 📚 LEARNING RESOURCES

### MDN Documentation
- https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid

### Google Web Fundamentals
- https://web.dev/responsive-web-design-basics/
- https://web.dev/mobile-optimization/

### CSS-Tricks
- https://css-tricks.com/snippets/css/complete-guide-grid/
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/

---

## 🎯 CHECKLIST FOR NEW COMPONENTS

- [ ] Mobile-first default styling
- [ ] Media queries for scale-up
- [ ] Touch targets ≥ 44x44px
- [ ] Use CSS variables
- [ ] Test on 375px, 768px, 1024px
- [ ] ARIA labels added
- [ ] Color contrast ≥ 4.5:1
- [ ] Dark mode support considered

---

## 💡 QUICK WINS

### Easy Improvements
1. Add `font-smoothing` di body
2. Use `var(--spacing-*)` instead of hard-coded
3. Add `-webkit-overflow-scrolling: touch` untuk smooth scroll
4. Use `min-height` instead of `height` untuk flexibility
5. Add transition untuk smooth interactions

### Common Mistakes to Avoid
1. ❌ Hard-code colors - use variables
2. ❌ Forget media queries - go mobile-first
3. ❌ Make buttons too small - 44x44px minimum
4. ❌ Skip accessibility - add ARIA labels
5. ❌ Heavy animations - keep it smooth

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready

Happy coding! 🚀
