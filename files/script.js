// Small JS to enable typing effect, reveal on scroll, mobile nav, and simple interactions

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect
  const typedEl = document.getElementById('typed');
  const texts = [
    "Mahasiswa UNIKMA — Belajar, Membuat, dan Berinovasi.",
    "Frontend Developer • UI/UX Enthusiast.",
    "Membangun antarmuka yang simpel, cepat, dan intuitif."
  ];
  let txtIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typeSpeed = 40;
  const pauseBetween = 1800;

  function typeLoop(){
    const current = texts[txtIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, pauseBetween);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        txtIdx = (txtIdx + 1) % texts.length;
      }
    }
    setTimeout(typeLoop, deleting ? typeSpeed*0.6 : typeSpeed);
  }
  typeLoop();

  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const obsOptions = {threshold: 0.12};
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, obsOptions);
  reveals.forEach(el => observer.observe(el));

  // Smooth active nav link on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  window.addEventListener('scroll', throttle(() => {
    const scrollPos = window.scrollY + (window.innerHeight / 3);
    sections.forEach((sec, i) => {
      if (!sec) return;
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(n => n.classList.remove('active'));
        navLinks[i].classList.add('active');
      }
    });
  }, 150));

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    if (mainNav.style.display === 'block') {
      mainNav.style.display = '';
    } else {
      mainNav.style.display = 'block';
      mainNav.style.position = 'absolute';
      mainNav.style.right = '20px';
      mainNav.style.top = '64px';
      mainNav.style.background = 'rgba(7,16,19,0.95)';
      mainNav.style.padding = '12px';
      mainNav.style.borderRadius = '12px';
    }
  });

  // Close mobile menu on nav link click
  document.querySelectorAll('#mainNav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 760) mainNav.style.display = '';
    });
  });

  // Optional: simple client-side form handler (fallback)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    // Let mailto form do its default in legacy; we can show a small toast or fallback
    // To keep it simple, allow default behavior. You can implement AJAX sending to a server here.
    // e.preventDefault();
    // alert('Form submitted (demo) — replace action with server endpoint.');
  });
});

// Utility: throttle
function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}