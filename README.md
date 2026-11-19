# Naveed AI Video Automation - Official Website

A responsive website built for **Hafiz Naveed Aziz**'s AI Video Automation business, featuring a WhatsApp-style bottom navigation bar, modern dark glassmorphism UI, direct WhatsApp ordering, and a portfolio system.

---

## 👤 Owner & Business Information
- **Owner Name:** Hafiz Naveed Aziz
- **WhatsApp Number:** `03013986828` / International: `+92 301 3986828`
- **Business Name:** Naveed AI Video Automation
- **Direct WhatsApp Link:** [https://wa.me/923013986828](https://wa.me/923013986828)
- **Profile Photo Target:** `naveed.jpg` (Place in project root)

---

## 🚀 Key Features

1. **WhatsApp-Style Fixed Bottom Navigation:**
   - Fixed at the bottom of the screen on all devices, with safe-area support for mobile notches.
   - 4 main navigation tabs:
     - 🏠 **Home:** Hero introduction, circular profile with glowing border, value proposition, and capabilities.
     - 🎬 **Projects:** Clean initial empty state (no fake projects or products), with ready-to-use template code for real videos.
     - 🛒 **Order:** Order inquiry form (Customer Name, WhatsApp Number, Service Category, Service Details, Timeline) that formats and sends the order directly to Hafiz Naveed Aziz on WhatsApp.
     - 📞 **Contact:** Owner info, WhatsApp number `03013986828`, large direct WhatsApp CTA button, and quick-start inquiry templates.
   - Active tab indicator with WhatsApp-green glowing accent and smooth tab switching.

2. **Floating WhatsApp Button:**
   - Present on every view with a pulsing ripple effect and tooltip.
   - Direct 1-click link to WhatsApp chat.

3. **Modern Dark Theme & Glassmorphism UI:**
   - Deep navy and black backgrounds with subtle mesh grid.
   - Purple, blue, and cyan gradient accents.
   - Soft glowing cards, animated badges, and clean typography (`Plus Jakarta Sans` & `Outfit`).

4. **Profile Photo Fallback System:**
   - Automatically loads `naveed.jpg` if present.
   - If `naveed.jpg` is not yet uploaded, a high-tech vector avatar placeholder (`assets/avatar-placeholder.svg`) is displayed automatically without breaking the layout.

---

## 📁 File Structure

```
naveed aziz/
│
├── index.html                  # Main website markup with all 4 tab panes
├── style.css                   # Complete dark theme, glassmorphism & navigation styling
├── script.js                   # Tab navigation, WhatsApp order serializer, fallback handler
├── README.md                   # Documentation and instructions
├── naveed.jpg                  # [Upload your photo here]
└── assets/
    └── avatar-placeholder.svg  # Sleek SVG avatar fallback
```

---

## 🛠️ How to Customize & Add Content

### 1. Adding Your Profile Photo
Simply place your photo named **`naveed.jpg`** in the root directory (the same folder where `index.html` is located). The website will automatically display it in both the Home hero card and the Contact card.

### 2. Adding Real Projects / Videos to the Portfolio
Open `index.html` and navigate to `<section id="tab-projects">`:
1. Find `<div class="portfolio-grid-template" id="ready-portfolio-container" style="display: none;">`.
2. Change `display: none;` to `display: grid;`.
3. Uncomment or duplicate the sample `.portfolio-card` markup, and replace the placeholder text with your real video titles, thumbnail images, or YouTube/Vimeo embed links.
4. Optionally hide or remove the `.portfolio-empty-state` container once you have real projects to show.

### 3. How the WhatsApp Order Works
When a client fills out the order form in the **Order** tab and clicks **"Submit Order via WhatsApp"**:
- The inputs are validated.
- A formatted message is automatically constructed with client details and project requirements.
- WhatsApp opens directly to chat with `03013986828` with the message already typed out and ready to send.
