# Clean Design - Quick Reference

## Color Palette (IPM Yellow)
```
Primary Yellow: #FFC107 (Kuning IPM - solid color only)
White: #FFFFFF
Text Dark: #333333
Text Light: #666666
Background: #FAFAFA
Border: #EEEEEE
```

## Key Design Changes
✅ **NO GRADIENTS** - All solid colors  
✅ **NO PATTERNS** - Decorative elements removed  
✅ **MINIMAL SHADOWS** - Simplified and consistent  
✅ **CLEAN BORDERS** - 4px or 0 border-radius  
✅ **MOBILE-FIRST** - Responsive and user-friendly  

## Shadow System (Updated)
```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1);     /* Subtle */
--shadow-md: 0 2px 6px rgba(0,0,0,0.1);     /* Medium */
--shadow-lg: 0 4px 12px rgba(0,0,0,0.1);    /* Large */
```

## Button Styling
- All buttons: **Solid yellow** (`#FFC107`)
- No shadow on default state
- Light shadow on active: `0 2px 4px rgba(0,0,0,0.1)`
- Transform on active: `translateY(-1px)`
- Min-height: **48px** (touch target)
- Border-radius: **4px**

## Layout Philosophy
- **Clean**: Minimal visual noise
- **Modern**: Professional appearance
- **Mobile-Friendly**: Easy to use on small screens
- **IPM Vibes**: Yellow (#FFC107) represents IPM brand

## Preserved Features
- ✅ All JavaScript functionality
- ✅ Mobile-first responsive design
- ✅ Responsive breakpoints
- ✅ Hamburger menu
- ✅ All user interactions

## What Was Removed
- ❌ Linear gradients (20 instances)
- ❌ Decorative SVG patterns (.features::before)
- ❌ Complex rounded corners
- ❌ Complex shadow variations
- ❌ Multiple color accents

## Testing Tips
1. Open on mobile browser
2. Test all buttons and links
3. Check color contrast
4. Verify responsive on breakpoints (480, 768, 1024, 1440px)
5. Check header, footer, and navigation

---
**Type**: Mobile-First Clean Design  
**Brand**: IPM Yellow (#FFC107)  
**Status**: Ready for use
