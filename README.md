# Varsavikashni — Portfolio Website

> Refined editorial portfolio for an interior design master's student.

---

## 🚀 Running the Project

**Option 1 — VS Code Live Server (Recommended)**
1. Open the `varsavikashni/` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**
4. Your browser opens automatically at `http://127.0.0.1:5500`

**Option 2 — Any local HTTP server**
```bash
# Python (inside the varsavikashni/ folder)
python3 -m http.server 8080
# Then open: http://localhost:8080
```

---

## 📁 Folder Structure

```
varsavikashni/
├── index.html              ← Main page (all sections)
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← Interactions, lightbox, form
└── images/
    ├── hero/
    │   └── hero-bg.jpg     ← Hero background (full-bleed)
    ├── profile/
    │   └── varsa-portrait.jpg ← Your portrait photo
    ├── agam-puram/         ← ✅ DROP YOUR FOLDER IMAGES HERE
    │   ├── img-1.jpg       ← Main view (shown largest)
    │   ├── img-2.jpg
    │   ├── img-3.jpg
    │   ├── img-4.jpg
    │   ├── img-5.jpg
    │   └── img-6.jpg
    ├── software-skills/    ← ✅ DROP YOUR VIZ STUDY IMAGES HERE
    │   ├── img-1.jpg
    │   └── ... (up to img-6)
    └── artworks/           ← ✅ DROP YOUR ARTWORK IMAGES HERE
        ├── img-1.jpg
        └── ... (up to img-6)
```

---

## 🖼️ Adding Your Images

### Step 1 — Copy your folder contents
- Take photos from your 3 project folders
- Rename them `img-1.jpg`, `img-2.jpg`, … `img-6.jpg`
- Drop into the matching folder under `images/`

### Step 2 — Hero background
- Add a beautiful interior photo as `images/hero/hero-bg.jpg`
- Then in `index.html`, find the `hero__bg` section and add:
  ```html
  <img src="images/hero/hero-bg.jpg" alt="Interior" />
  ```
  (remove the `<div class="hero__bg-placeholder"></div>` line)

### Step 3 — Portrait photo
- Add your profile photo as `images/profile/varsa-portrait.jpg`
- Recommended: portrait orientation, minimum 800px wide

### More than 6 images per project?
In `js/main.js`, find the `projectGalleries` object and add more entries to each array:
```js
{ src: 'images/agam-puram/img-7.jpg', caption: 'Your caption' },
```

---

## 🎨 Customisation

| What | Where |
|------|-------|
| Colors | `css/style.css` — `:root` variables at the top |
| Fonts | `index.html` — Google Fonts `<link>` tag |
| Project descriptions | `index.html` — inside each `<article class="project">` |
| Contact info | `index.html` — `.contact__info` section |
| Form action | `js/main.js` — `handleSubmit()` — plug in Formspree or EmailJS |

---

## 📧 Making the Contact Form Actually Send Emails

The form currently simulates a send. To make it live:

**Formspree (easiest — free)**
1. Sign up at https://formspree.io
2. Create a form → copy your endpoint URL
3. In `index.html`, change:
   ```html
   <form class="contact__form" id="contactForm" onsubmit="handleSubmit(event)">
   ```
   to:
   ```html
   <form class="contact__form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove `onsubmit` and the JS handler

---

## ✅ Browser Support
Chrome, Firefox, Safari, Edge — all modern browsers. No build step needed.
