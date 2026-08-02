---
name: ui-ux-flower-ecommerce
description: Specialized UI/UX design guidelines and component patterns tailored for premium, elegant, feminine flower shop e-commerce applications ("Lá & Hoa").
---
# Flower E-Commerce UI/UX Design Skill

Use this skill when designing, building, or refining customer-facing and admin interfaces for the Flower Shop web application ("Lá & Hoa").

---

## 1. Design Aesthetics & Core Principles

- **Boutique Elegance & Emotional Warmth**: Soft organic tones, rounded cards (`rounded-2xl`, `rounded-3xl`), glassmorphic overlays, and subtle micro-animations.
- **Brand Messaging Spine**: "Trao hoa – Gửi trọn yêu thương" (Deliver Flowers – Send Complete Love).
- **Flower Customization Focus**: Support bouquet size variants (Small, Medium, Large, Premium), custom delivery dates & time slots (08:00-12:00, 13:00-17:00, 18:00-21:00), and card messages (with anonymous sender toggle).

---

## 2. Color Palette & Typography Tokens

### Color Palette
- **Background (Cream Warmth)**: `#FAF7F1`
- **Primary (Hunter Green)**: `#24483B` (Hover: `#1b372d`, Light: `#e8efe9`)
- **Secondary (Rose Gold Accent)**: `#D8AAA5` (Light: `#f7ebe9`)
- **Dark Text**: `#3B322E`
- **Muted Text**: `#857A73`
- **Danger Red**: `#B42318`

### Typography Pairing
- **Headings & Display (`font-serif`)**: `Playfair Display`, `Cormorant Garamond`, serif.
- **Body & Controls (`font-sans`)**: `Be Vietnam Pro`, `Inter`, sans-serif.

---

## 3. Standard Component Patterns

### A. Delivery Slot & Date Picker
- Interactive date selector + time slot selector (Morning, Afternoon, Evening).
- Ensures delivery commitment within 2 hours in major cities.

### B. Card Message Form
- Free greeting card text area + sender name + anonymous sender checkbox toggle ("Giấu tên người gửi").

### C. Slide-Over Cart Drawer
- Smooth slide-in cart overlay with quantity steppers and quick checkout CTA.

---

## 4. UI Pre-Flight Checklist

- [ ] All prices formatted via `formatCurrency`.
- [ ] Buttons have visible hover, active, and focus-visible states.
- [ ] Mobile responsive layout tested.
