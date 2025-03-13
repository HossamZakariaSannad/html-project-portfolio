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

    // Handle click events
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

function handleProjectSlider() {
    const projectsGrid = document.querySelector('.projects-grid');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const paginationContainer = document.querySelector('.slider-pagination');
    
    const projects = document.querySelectorAll('.project-card');
    const projectsPerPage = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    let currentPage = 0;

    // Clear existing pagination dots
    paginationContainer.innerHTML = '';

    // Create pagination dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        paginationContainer.appendChild(dot);
    }

    const paginationDots = document.querySelectorAll('.pagination-dot');

    function updateButtons() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }

    function updatePagination() {
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }

    function goToPage(page) {
        currentPage = page;
        const slideWidth = 100 / projectsPerPage;
        const offset = -currentPage * slideWidth;
        projectsGrid.style.transform = `translateX(${offset}%)`;
        updateButtons();
        updatePagination();
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newProjectsPerPage = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            if (newProjectsPerPage !== projectsPerPage) {
                currentPage = 0;
                goToPage(0);
            }
        }, 250);
    });

    // Initialize
    updateButtons();
    goToPage(0);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure proper initialization
    setTimeout(() => {
        initAnimations();
        handleNavigation();
        handleProjectSlider();
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