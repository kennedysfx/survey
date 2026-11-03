# Nigerian Survey Platform Masterclass Landing Page

A conversion-focused, high-performance landing page designed to direct Nigerian visitors straight to your WhatsApp masterclass group.

Built with a dark luxury aesthetic (gold on near-black, high-contrast serif typography, square geometric cards, and mobile-first responsive layout).

---

## 📁 Project Structure

```
Videos/CODING/survey/
├── index.html           # Main landing page markup (semantic, accessible, SEO & OG ready)
├── css/
│   └── style.css        # Pure CSS design system with CSS variables & responsive layout
├── js/
│   └── main.js          # Central CONFIG controller, rolling countdown & dialog lightbox
├── images/              # Testimonial proofs and social sharing assets
│   ├── testimonial-1.jpg
│   ├── testimonial-2.jpg
│   ├── testimonial-3.jpg
│   ├── testimonial-4.jpg
│   ├── testimonial-5.jpg
│   ├── testimonial-6.jpg
│   ├── og-image.jpg     # 1200x630 Open Graph banner for WhatsApp link previews
│   └── favicon.svg      # Gold survey icon favicon
└── README.md            # Quick-start configuration guide
```

---

## ⚡ Where to Edit Placeholders (Quick Guide)

All key settings are centralized in one single configuration block at the very top of **`js/main.js`**:

Open `js/main.js` in your editor. You will see lines 8–13:

```javascript
const CONFIG = {
  WHATSAPP_LINK: "PLACEHOLDER_WHATSAPP_LINK",
  BRAND_NAME: "PLACEHOLDER_BRAND_NAME",
  HOST_NAME: "PLACEHOLDER_HOST_NAME",
  COUNTDOWN_SECONDS: 180
};
```

### 1. WhatsApp Group Link (`WHATSAPP_LINK`)
- Replace `"PLACEHOLDER_WHATSAPP_LINK"` with your actual WhatsApp group invitation link, e.g.:
  `"https://chat.whatsapp.com/AbCdEfGhIjK1234567"`
- **Every button** on the entire page ("Join Masterclass →") will automatically link to this URL and open in a new tab.

### 2. Brand Name (`BRAND_NAME`)
- Replace `"PLACEHOLDER_BRAND_NAME"` with your brand or academy name, e.g.:
  `"NaijaSurveys Hub"`
- This automatically updates in the footer copyright and throughout the page.

### 3. Host Name (`HOST_NAME`)
- Replace `"PLACEHOLDER_HOST_NAME"` with the host or coach's name, e.g.:
  `"Coach Kennedy"`
- This automatically updates in the footer.

### 4. Countdown Timer Duration (`COUNTDOWN_SECONDS`)
- By default, it is set to `180` (3 minutes).
- It is a rolling timer that resets on every page load (e.g. 180 seconds = 03:00).
- To change it to 5 minutes, set: `COUNTDOWN_SECONDS: 300`
- When the timer reaches 00:00, it cleanly displays *"Registration is closing. Join now."* while keeping all buttons active.

---

## 🖼️ How to Replace Testimonial Images

Pre-generated, high-resolution placeholder screenshot images are located in the `images/` folder:

- `images/testimonial-1.jpg`
- `images/testimonial-2.jpg`
- `images/testimonial-3.jpg`
- `images/testimonial-4.jpg`
- `images/testimonial-5.jpg`
- `images/testimonial-6.jpg`

To replace them with your actual WhatsApp screenshot proofs:
1. Save your screenshots as `.jpg` or `.png` files.
2. Overwrite the files in the `images/` folder using the exact same filenames (`testimonial-1.jpg`, etc.).
3. If you want to customize the name, student location, or amount displayed below each card, simply open `index.html` and edit lines in the `<section class="testimonials-section">` section (search for `data-student-name`).

---

## 🚀 How to Preview or Deploy

1. **Local Preview**:
   - Double-click `index.html` to open it in any web browser (Chrome, Edge, Safari, Firefox).
   - Or run a lightweight local server (e.g. `npx serve .` or VS Code Live Server).

2. **Deploy**:
   - The project has zero server dependencies. You can deploy it instantly to **Netlify**, **Vercel**, **GitHub Pages**, **Cloudflare Pages**, or any cPanel/Apache/Nginx web host by simply uploading the contents of this folder.
