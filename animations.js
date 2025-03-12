// Create a single observer instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Only add show class when element comes into view
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Once element is shown, stop observing it
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
});

// Function to initialize animations
function initAnimations() {
    // Select all elements to animate
    const elements = document.querySelectorAll(`
        .Container,
        .service-card,
        .project-card,
        .about-me,
        .contact-form,
        .card,
        .services h2,
        .portfolio h2,
        .about-me h2,
        .contact-us h2
    `);

    // Observe each element
    elements.forEach(element => observer.observe(element));
}

// Function to handle navigation
function handleNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure proper initialization
    setTimeout(() => {
        initAnimations();
        handleNavigation();
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