// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu after tapping a link (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Dynamic footer year
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Smooth anchor scrolling with offset for sticky header
const headerHeight = nav ? nav.offsetHeight : 80;
const scrollOffset = headerHeight + 12;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    event.preventDefault();

    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', href);
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const top = Math.max(target.getBoundingClientRect().top + window.scrollY - scrollOffset, 0);
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', href);
  });
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const top = Math.max(target.getBoundingClientRect().top + window.scrollY - scrollOffset, 0);
      window.scrollTo({ top, behavior: 'auto' });
    }
  }
});

// Project screenshot carousels
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const dotsWrap = carousel.querySelector('[data-carousel-dots]');
  let current = slides.findIndex(s => s.classList.contains('is-active'));
  if (current < 0) current = 0;

  // Build dot navigation
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
    if (i === current) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
});
