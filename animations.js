// Intersection Observer configuration
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

// Callback function when elements intersect
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Add delays to child elements if needed
            if (entry.target.classList.contains('service-list') || 
                entry.target.classList.contains('projects-grid') ||
                entry.target.classList.contains('info-cards')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.2}s`;
                });
            }
        }
    });
};

// Create the observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Function to start observing elements
function initAnimations() {
    // Elements to observe
    const elements = document.querySelectorAll(`
        .Container,
        .service-card,
        .project-card,
        .about-me,
        .info-cards .card,
        .contact-form,
        .services h2,
        .portfolio h2,
        .about-me h2,
        .contact-us h2,
        .breakline,
        .service-list,
        .projects-grid,
        .info-cards
    `);

    // Start observing each element
    elements.forEach(element => {
        // Reset classes before observing
        element.classList.remove('show');
        observer.observe(element);
    });
}

// Navigation handling
function handleNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initAnimations();
        handleNavigation();
        handleMobileHeight();
        setupMobileNav();
        setupTouchInteractions();
    }, 100);
});

// Handle dynamic content changes
document.addEventListener('contentChanged', initAnimations);

// Reinitialize on page resize (optional, for safety)
window.addEventListener('resize', () => {
    // Debounce the resize event
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(initAnimations, 250);
}); 