/**
 * SubStop — State of the Art Website Interactions
 * Inspired by: Bruno Simon, Messenger, Active Theory, Immersive Garden, Obys
 */

// ============================================================
// AMBIENT CANVAS — Flowing Mesh Gradient (Immersive Garden inspired)
// ============================================================
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let time = 0;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('mousemove', (e) => {
  targetMouseX = e.clientX;
  targetMouseY = e.clientY;
});

// Touch support
let touchActive = false;
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    targetMouseX = e.touches[0].clientX;
    targetMouseY = e.touches[0].clientY;
    touchActive = true;
  }
});

function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 71, b: 87 };
}

function drawAmbient() {
  time += 0.003;

  // Smooth mouse following
  mouseX += (targetMouseX - mouseX) * 0.03;
  mouseY += (targetMouseY - mouseY) * 0.03;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  // Get theme colors
  const c1 = hexToRgb(getCSSVar('--gradient-mesh-1') || '#FF4757');
  const c2 = hexToRgb(getCSSVar('--gradient-mesh-2') || '#2ED573');
  const c3 = hexToRgb(getCSSVar('--gradient-mesh-3') || '#70A1FF');

  ctx.clearRect(0, 0, width, height);

  // Create flowing blobs
  const blobs = [
    {
      x: width * 0.3 + Math.sin(time * 0.7) * width * 0.15 + (mouseX - width/2) * 0.05,
      y: height * 0.3 + Math.cos(time * 0.5) * height * 0.15 + (mouseY - height/2) * 0.05,
      r: Math.min(width, height) * 0.4,
      color: c1
    },
    {
      x: width * 0.7 + Math.cos(time * 0.6) * width * 0.12 + (mouseX - width/2) * 0.03,
      y: height * 0.6 + Math.sin(time * 0.8) * height * 0.12 + (mouseY - height/2) * 0.03,
      r: Math.min(width, height) * 0.35,
      color: c2
    },
    {
      x: width * 0.5 + Math.sin(time * 0.9 + 1) * width * 0.1,
      y: height * 0.5 + Math.cos(time * 0.4 + 2) * height * 0.1,
      r: Math.min(width, height) * 0.45,
      color: c3
    }
  ];

  // Draw with additive blending for glow effect
  ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';

  blobs.forEach(blob => {
    const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
    const alpha = isDark ? 0.15 : 0.08;
    gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha})`);
    gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha * 0.5})`);
    gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });

  ctx.globalCompositeOperation = 'source-over';

  // Add subtle noise/grain overlay
  if (isDark) {
    ctx.fillStyle = 'rgba(255,255,255,0.015)';
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  requestAnimationFrame(drawAmbient);
}

drawAmbient();

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScrollY = scrollY;
}, { passive: true });

// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = mobileMenuBtn.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// ============================================================
// THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('substop-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

// Update CSS RGB vars for canvas
function updateBgRgb() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const rgb = isDark ? '10,10,10' : '250,250,250';
  document.documentElement.style.setProperty('--bg-rgb', rgb);
}
updateBgRgb();

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('substop-theme', next);
  updateBgRgb();
});

// ============================================================
// TYPEWRITER EFFECT (ChatGPT inspired)
// ============================================================
const typewriterEl = document.querySelector('.typewriter');
if (typewriterEl) {
  const text = typewriterEl.getAttribute('data-text') || 'subscriptions';
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 100;

  function typeWriter() {
    const current = isDeleting
      ? text.substring(0, charIndex - 1)
      : text.substring(0, charIndex + 1);

    typewriterEl.textContent = current;

    if (isDeleting) {
      charIndex--;
      typeDelay = 50;
    } else {
      charIndex++;
      typeDelay = 120;
    }

    if (!isDeleting && charIndex === text.length) {
      typeDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      typeDelay = 500;
      isDeleting = false;
    }

    setTimeout(typeWriter, typeDelay);
  }

  setTimeout(typeWriter, 1200);
}

// ============================================================
// ANIMATED STAT COUNTERS
// ============================================================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
    const current = Math.floor(eased * target);

    el.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(animateCounter);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ============================================================
// PHONE CLOCK
// ============================================================
const phoneTime = document.getElementById('phone-time');
if (phoneTime) {
  function updatePhoneTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    phoneTime.textContent = `${hours}:${minutes}`;
  }
  updatePhoneTime();
  setInterval(updatePhoneTime, 1000);
}

// ============================================================
// TICKER — Duplicate for seamless infinite scroll
// ============================================================
const ticker = document.getElementById('ticker');
if (ticker) {
  const items = ticker.innerHTML;
  ticker.innerHTML = items + items;
}

// ============================================================
// BENTO CARD MOUSE TRACKING (Spotlight effect)
// ============================================================
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ============================================================
// INTERACTIVE DEMO
// ============================================================
const demoList = document.getElementById('demo-list');
const demoName = document.getElementById('demo-name');
const demoPrice = document.getElementById('demo-price');
const demoAdd = document.getElementById('demo-add');
const resultMonthly = document.getElementById('result-monthly');
const resultYearly = document.getElementById('result-yearly');
const resultFiveYear = document.getElementById('result-fiveyear');
const savingsInsight = document.getElementById('savings-insight');

let subscriptions = [];

function formatMoney(amount) {
  return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateResults() {
  const monthly = subscriptions.reduce((sum, s) => sum + s.price, 0);
  const yearly = monthly * 12;
  const fiveYear = yearly * 5;

  resultMonthly.textContent = formatMoney(monthly);
  resultYearly.textContent = formatMoney(yearly);
  resultFiveYear.textContent = formatMoney(fiveYear);

  if (subscriptions.length === 0) {
    savingsInsight.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
      <span>Add subscriptions to see savings potential</span>
    `;
    demoList.innerHTML = '<div class="demo-empty">Add subscriptions above to see your total</div>';
  } else {
    const avgSaved = monthly * 0.35; // Assume 35% can be saved
    savingsInsight.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      <span>Users typically save <strong>${formatMoney(avgSaved)}</strong>/mo by cancelling unused subs</span>
    `;
  }
}

function addSubscription(name, price) {
  const sub = {
    id: Date.now() + Math.random(),
    name: name.trim() || 'Unknown',
    price: parseFloat(price) || 0
  };
  subscriptions.push(sub);
  renderSubscriptions();
  updateResults();
}

function removeSubscription(id) {
  subscriptions = subscriptions.filter(s => s.id !== id);
  renderSubscriptions();
  updateResults();
}

function renderSubscriptions() {
  if (subscriptions.length === 0) {
    demoList.innerHTML = '<div class="demo-empty">Add subscriptions above to see your total</div>';
    return;
  }

  demoList.innerHTML = subscriptions.map(sub => `
    <div class="demo-sub-item">
      <div class="demo-sub-info">
        <span class="demo-sub-name">${sub.name}</span>
        <span class="demo-sub-price">${formatMoney(sub.price)}/mo</span>
      </div>
      <button class="demo-sub-delete" onclick="window._removeSub(${sub.id})" aria-label="Remove ${sub.name}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  `).join('');
}

// Expose to window for inline onclick
window._removeSub = removeSubscription;

demoAdd?.addEventListener('click', () => {
  addSubscription(demoName.value, demoPrice.value);
  demoName.value = '';
  demoPrice.value = '';
  demoName.focus();
});

// Enter key support
demoPrice?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addSubscription(demoName.value, demoPrice.value);
    demoName.value = '';
    demoPrice.value = '';
    demoName.focus();
  }
});

demoName?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    demoPrice.focus();
  }
});

// Preset chips
document.querySelectorAll('.preset-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    addSubscription(chip.dataset.name, chip.dataset.price);
  });
});

// ============================================================
// SCROLL REVEAL ANIMATIONS (Intersection Observer)
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Add reveal class to elements
document.querySelectorAll('.section-header, .bento-card, .testimonial-card, .faq-item, .comparison-table-wrapper, .download-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Stagger bento cards
const bentoCards = document.querySelectorAll('.bento-card');
bentoCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// Stagger testimonials
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger FAQ
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.08}s`;
});

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================================
// PARALLAX FLOATING CARDS
// ============================================================
const floatingCards = document.querySelectorAll('.floating-card');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  floatingCards.forEach((card, i) => {
    const speed = 0.05 + i * 0.02;
    card.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ============================================================
// 3D PHONE TILT ON MOUSE MOVE (Bruno Simon inspired)
// ============================================================
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
  document.addEventListener('mousemove', (e) => {
    const rect = phoneMockup.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / window.innerWidth) * 15;
    const rotateX = ((centerY - e.clientY) / window.innerHeight) * 15;

    phoneMockup.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    phoneMockup.style.transform = '';
  });
}

// ============================================================
// COMPARISON TABLE ROW REVEAL
// ============================================================
const tableRows = document.querySelectorAll('.comparison-table tbody tr');
const tableObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const rows = entry.target.querySelectorAll('tbody tr');
      rows.forEach((row, i) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = `all 0.4s ${i * 0.05}s cubic-bezier(0.16, 1, 0.3, 1)`;
        requestAnimationFrame(() => {
          row.style.opacity = '1';
          row.style.transform = 'translateX(0)';
        });
      });
      tableObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const comparisonTable = document.querySelector('.comparison-table-wrapper');
if (comparisonTable) tableObserver.observe(comparisonTable);

// ============================================================
// PREFERS REDUCED MOTION CHECK
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  // Disable canvas animation
  cancelAnimationFrame(drawAmbient);
}

// ============================================================
// CONSOLE EASTER EGG
// ============================================================
console.log('%c SubStop ', 'background: #FF4757; color: white; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
console.log('%c Stop overpaying. Start saving. ', 'color: #FF4757; font-size: 14px; font-weight: 600;');
console.log('%c Built with ❤️ for people tired of subscription bloat. ', 'color: #737373; font-size: 12px;');
