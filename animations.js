document.documentElement.classList.add('js');
const root = document.documentElement;
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = [...document.querySelectorAll('.nav-link')];
const backToTop = document.getElementById('back-to-top');
const progressBar = document.querySelector('.scroll-progress');
const revealItems = document.querySelectorAll('.reveal');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const themeStorageKey = 'hz-theme';

initTheme();
initNavigation();
initScrollState();
initSectionObserver();
initRevealObserver();
initProjectFilters();
initBackToTop();
initContactFormState();

function initTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = savedTheme || (systemLight ? 'light' : 'dark');

  applyTheme(theme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
  });
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'light' ? '#f4f7fb' : '#0b1220'
  );
}

function initNavigation() {
  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu?.classList.toggle('is-open', !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      navMenu?.classList.remove('is-open');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navMenu || !navToggle) return;
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (!navMenu.contains(target) && !navToggle.contains(target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    }
  });
}

function initScrollState() {
  const onScroll = () => {
    const scrollTop = window.scrollY;
    navbar?.classList.toggle('is-scrolled', scrollTop > 16);
    backToTop?.classList.toggle('is-visible', scrollTop > 520);

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initSectionObserver() {
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${sectionId}`;
          link.classList.toggle('active', isActive);
        });
      });
    },
    {
      threshold: 0.45,
      rootMargin: '-20% 0px -35% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initRevealObserver() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initProjectFilters() {
  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      projectCards.forEach((card) => {
        const categories = card.dataset.category || '';
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
}

function initBackToTop() {
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactFormState() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', () => {
    const button = contactForm.querySelector('button[type="submit"]');
    if (!(button instanceof HTMLButtonElement)) return;

    button.disabled = true;
    button.innerHTML = '<i class="ri-loader-4-line"></i><span>Sending...</span>';
  });
}

