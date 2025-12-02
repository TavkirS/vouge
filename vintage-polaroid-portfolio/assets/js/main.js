/**
 * Vintage Moments Photography - Main JavaScript
 * Core functionality for all pages
 */

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all common functionality
    initLazyLoading();
    initIntersectionObserver();
    initSmoothScrolling();
    initNavbarScroll();
    initMobileMenu();
});

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.polaroid-card, .story-card, .award-item, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.vintage-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Add background blur on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'assets/images/polaroids/hero-1.jpg',
        'assets/images/polaroids/hero-2.jpg',
        'assets/images/textures/grain.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading on page load
window.addEventListener('load', () => {
    preloadCriticalImages();

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service here
});

// ===== POLAROID HOVER EFFECTS =====
function initPolaroidEffects() {
    const polaroids = document.querySelectorAll('.polaroid-frame, .polaroid-card');

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mouseenter', () => {
            // Add subtle rotation and lift effect
            const currentRotation = polaroid.style.transform.match(/rotate\(([^)]+)\)/);
            const rotation = currentRotation ? currentRotation[1] : '0deg';

            polaroid.style.transform = `rotate(${rotation}) translateY(-5px) scale(1.02)`;
            polaroid.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
        });

        polaroid.addEventListener('mouseleave', () => {
            // Reset to original state
            const currentRotation = polaroid.style.transform.match(/rotate\(([^)]+)\)/);
            const rotation = currentRotation ? currentRotation[1] : '0deg';

            polaroid.style.transform = `rotate(${rotation})`;
            polaroid.style.boxShadow = '';
        });
    });
}

// Initialize polaroid effects
initPolaroidEffects();

// ===== RESPONSIVE UTILITIES =====
function initResponsiveHelpers() {
    // Add CSS class for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', () => {
        // Force repaint to fix mobile rendering issues
        setTimeout(() => {
            document.body.style.display = 'none';
            document.body.offsetHeight; // Trigger reflow
            document.body.style.display = '';
        }, 100);
    });
}

initResponsiveHelpers();

