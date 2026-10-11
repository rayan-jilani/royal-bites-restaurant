# ROYAL BITES — The Royal Taste of Pakistan

> **Part 1 Practical Examination Project**  
> A complete, multi-page ultra-realistic premium Pakistani desi restaurant website featuring React Router, authentic food photography, centralized menu data, synchronized cart state, and a Daraz-style customer order tracking system.

---

## 🍽️ Multi-Page Architecture (`react-router-dom`)

The website has been organized into dedicated, individual pages with seamless routing and auto scroll-to-top:

1. **Home Page (`/`):**
   - Cinematic hero banquet section with dual action buttons.
   - Chef’s selections featured dishes teaser.
   - Generational culinary heritage story preview.
   - Why Choose Royal Bites (4 feature pillars).
   - Editorial signature karahi experience.
   - Daraz-style live order tracking callout banner.

2. **Menu Page (`/menu`):**
   - Full royal Pakistani desi menu.
   - Dynamic category filtering tabs (*All Dishes, Signature Karahi, Royal Biryani, Clay Handi, Charcoal BBQ*).
   - High-definition photographs, PKR pricing, portions, spice levels, and instant "Add to Order" buttons.

3. **About Page (`/about`):**
   - Dedicated "A Tradition of Authentic Taste" heritage page.
   - Traditional Pakistani cooking techniques (cast iron karahi, clay tandoor, stone-ground spices).
   - Cultural philosophy of *Mehmaan-Nawazi* (Pakistani royal hospitality).

4. **Order Online Page (`/order`):**
   - Dedicated checkout and customer order form.
   - Customer details validation (Full Name, Phone, Delivery Address, Special Instructions).
   - Real-time order summary with quantity controls (+/-), line totals, and PKR subtotal/grand total.
   - Live order confirmation modal with direct 1-click **"Track This Order Now"** button.

5. **Live Order Tracker Page (`/track` or `/track-order`):**
   - Daraz-style 5-stage visual progress stepper:
     1. *Order Confirmed (آرڈر تصدیق ہو گیا)*
     2. *Cooking in Karahi & Tandoor (کھانا پک رہا ہے)*
     3. *Quality Checked & Packed (پیکنگ مکمل ہو گئی)*
     4. *Out for Delivery (رائیڈر راستے میں ہے)*
     5. *Delivered — Enjoy Your Feast! (کھانا پہنچ گیا — نوش فرمائیں)*
   - Order ID search bar with instant sample order buttons (`RB-8520`, `RB-4190`).
   - Assigned rider info card and live countdown arrival timer.
   - Interactive **"Simulate Next Stage"** button for real-time exam demonstration.

6. **Contact & Reservations Page (`/contact`):**
   - Branch location and contact information placeholders.
   - Daily royal dining and delivery opening hours.
   - Interactive table reservation inquiry form with confirmation feedback.

---

## 🚀 Running the Project

```powershell
cd "c:\Users\DELL\OneDrive\Documents\my projects\website"
npm run dev
```
Open **`http://localhost:5174/`** in your browser.

### Production Build:
```powershell
npm run build
```
Production build compiles with **zero errors**.
