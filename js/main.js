/* ════════════════════════════════════════════════
   VARSAVIKASHNI — PORTFOLIO JS
════════════════════════════════════════════════ */

/* ── NAV SCROLL STATE ──────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── MOBILE MENU ───────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileLinks.forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── REVEAL ON SCROLL ──────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

/* Also animate section children automatically */
const autoRevealSections = document.querySelectorAll(
  '.about__copy, .about__photo-wrap, .pillar, .project__info, .project__media, .contact__left, .contact__form'
);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

autoRevealSections.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.07}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.07}s`;
  sectionObserver.observe(el);
});

/* ── LIGHTBOX ──────────────────────────────── */
/* 
  Image paths per project — update these arrays 
  with your actual filenames after dropping photos in.
  The paths must match your folder structure:
  images/agam-puram/, images/software-skills/, images/artworks/
*/
const projectGalleries = {
  'agam-puram': {
    title: 'Agam Puram — Residential Interior Design',
    images: [
      { src: 'images/agam-puram/img-1.jpg', caption: 'Main Living Area' },
      { src: 'images/agam-puram/img-2.jpg', caption: 'Exposed Brick Detail' },
      { src: 'images/agam-puram/img-3.jpg', caption: 'Courtyard View' },
      { src: 'images/agam-puram/img-4.jpg', caption: 'South Indian Details' },
      { src: 'images/agam-puram/img-5.jpg', caption: 'Interior — Greenery Integration' },
      { src: 'images/agam-puram/img-6.jpg', caption: 'Spatial Overview' },
    ]
  },
  'software-skills': {
    title: 'Visualization Studies',
    images: [
      { src: 'images/software-skills/img-1.jpg', caption: 'Lighting Study — Warm Tones' },
      { src: 'images/software-skills/img-2.jpg', caption: 'Material & Texture Exploration' },
      { src: 'images/software-skills/img-3.jpg', caption: 'Spatial Composition' },
      { src: 'images/software-skills/img-4.jpg', caption: 'V-Ray Render — Interior' },
      { src: 'images/software-skills/img-5.jpg', caption: 'SketchUp Model View' },
      { src: 'images/software-skills/img-6.jpg', caption: 'Photoshop Post-Processing' },
    ]
  },
  'artworks': {
    title: 'Artworks — Handmade Visual Studies',
    images: [
      { src: 'images/artworks/img-1.jpg', caption: 'Silhouette Study' },
      { src: 'images/artworks/img-2.jpg', caption: 'Stippling — Microtip Pen' },
      { src: 'images/artworks/img-3.jpg', caption: 'Acrylic on Canvas' },
      { src: 'images/artworks/img-4.jpg', caption: 'Live Sketch' },
      { src: 'images/artworks/img-5.jpg', caption: 'Watercolour Study' },
      { src: 'images/artworks/img-6.jpg', caption: 'Layered Composition' },
    ]
  }
};

let currentGallery = [];
let currentIndex = 0;

function openLightbox(projectKey) {
  const gallery = projectGalleries[projectKey];
  if (!gallery) return;
  currentGallery = gallery.images;
  currentIndex = 0;
  buildThumbs();
  showImage(0);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function showImage(index) {
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  const img = currentGallery[currentIndex];
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  lbImg.src = img.src;
  lbImg.alt = img.caption;
  lbCaption.textContent = `${img.caption} — ${currentIndex + 1} / ${currentGallery.length}`;

  // Update thumb active state
  document.querySelectorAll('.lightbox__thumbs img').forEach((t, i) => {
    t.classList.toggle('active', i === currentIndex);
  });
}

function buildThumbs() {
  const container = document.getElementById('lbThumbs');
  container.innerHTML = '';
  currentGallery.forEach((img, i) => {
    const el = document.createElement('img');
    el.src = img.src;
    el.alt = img.caption;
    el.addEventListener('click', () => showImage(i));
    container.appendChild(el);
  });
}

document.getElementById('lbPrev').addEventListener('click', () => showImage(currentIndex - 1));
document.getElementById('lbNext').addEventListener('click', () => showImage(currentIndex + 1));

// Close on backdrop
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLightbox();
});

// Arrow keys
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'ArrowLeft')  showImage(currentIndex - 1);
  if (e.key === 'Escape')     closeLightbox();
});

/* ── CONTACT FORM ──────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  // Simulate send (replace with EmailJS / Formspree / your backend)
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1200);
}

/* ── SMOOTH ACTIVE NAV ─────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--olive)' : '';
  });
}, { passive: true });
