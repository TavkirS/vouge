/**
 * Vintage Moments Photography - Animations JavaScript
 * Custom animations and effects
 */

// ===== TYPEWRITER EFFECT =====
class TypewriterEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isTyping = false;
    }

    start() {
        if (this.isTyping) return;

        this.isTyping = true;
        this.element.textContent = '';
        this.element.style.borderRight = '2px solid var(--off-white)';

        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isTyping = false;
            // Remove cursor after typing is complete
            setTimeout(() => {
                this.element.style.borderRight = 'none';
            }, 1000);
        }
    }
}

// Initialize typewriter effects on page load
function initTypewriterEffects() {
    const typewriterElements = document.querySelectorAll('.typewriter-effect');

    typewriterElements.forEach(element => {
        const text = element.textContent;
        const typewriter = new TypewriterEffect(element, text, 100);

        // Use Intersection Observer to start typing when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typewriter.start();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
}

// ===== FADE IN ANIMATIONS =====
class FadeInAnimation {
    constructor(element, delay = 0) {
        this.element = element;
        this.delay = delay;
        this.animated = false;
    }

    animate() {
        if (this.animated) return;

        setTimeout(() => {
            this.element.style.opacity = '0';
            this.element.style.transform = 'translateY(30px)';
            this.element.style.transition = 'all 0.8s ease-out';

            // Force reflow
            this.element.offsetHeight;

            this.element.style.opacity = '1';
            this.element.style.transform = 'translateY(0)';
            this.animated = true;
        }, this.delay);
    }
}

// Initialize fade-in animations
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    const fadeDelayElements = document.querySelectorAll('.animate-fade-in-delay');

    fadeElements.forEach((element, index) => {
        const animation = new FadeInAnimation(element, index * 200);
        animation.animate();
    });

    fadeDelayElements.forEach((element, index) => {
        const animation = new FadeInAnimation(element, 1000 + index * 200);
        animation.animate();
    });
}

// ===== POLAROID DRIFT ANIMATION =====
class PolaroidDrift {
    constructor(container) {
        this.container = container;
        this.polaroids = container.querySelectorAll('.polaroid-frame');
        this.animationId = null;
        this.isAnimating = false;
    }

    start() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.animate();
    }

    stop() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    animate = () => {
        if (!this.isAnimating) return;

        this.polaroids.forEach((polaroid, index) => {
            const time = Date.now() * 0.001;
            const offset = index * 0.5;

            // Create subtle floating motion
            const x = Math.sin(time + offset) * 5;
            const y = Math.cos(time + offset) * 3;
            const rotation = Math.sin(time + offset) * 2;

            polaroid.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        });

        this.animationId = requestAnimationFrame(this.animate);
    }
}

// Initialize polaroid drift on hero section
function initPolaroidDrift() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const drift = new PolaroidDrift(heroSection);

        // Start animation when hero is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    drift.start();
                } else {
                    drift.stop();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroSection);
    }
}

// ===== STAGGERED GRID ANIMATIONS =====
class StaggeredGrid {
    constructor(container, itemSelector) {
        this.container = container;
        this.items = container.querySelectorAll(itemSelector);
        this.observer = null;
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-in');
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease-out';
            this.observer.observe(item);
        });
    }
}

// Initialize staggered animations for grids
function initStaggeredGrids() {
    // Portfolio grid
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer) {
        const portfolioGrid = new StaggeredGrid(portfolioContainer, '.polaroid-card');
        portfolioGrid.init();
    }

    // Stories grid
    const storiesContainer = document.getElementById('stories-container');
    if (storiesContainer) {
        const storiesGrid = new StaggeredGrid(storiesContainer, '.story-card');
        storiesGrid.init();
    }
}

// ===== LOADING ANIMATION =====
class LoadingAnimation {
    constructor() {
        this.spinner = document.getElementById('loading-spinner');
        this.isVisible = false;
    }

    show() {
        if (this.spinner && !this.isVisible) {
            this.spinner.style.display = 'block';
            this.isVisible = true;
        }
    }

    hide() {
        if (this.spinner && this.isVisible) {
            this.spinner.style.display = 'none';
            this.isVisible = false;
        }
    }
}

// Global loading animation instance
const loadingAnimation = new LoadingAnimation();

// ===== PARTICLE EFFECT (Optional enhancement) =====
class ParticleSystem {
    constructor(container, count = 50) {
        this.container = container;
        this.count = count;
        this.particles = [];
        this.animationId = null;
        this.isAnimating = false;
    }

    createParticles() {
        for (let i = 0; i < this.count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${2 + Math.random() * 4}s linear infinite;
            `;

            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    start() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.createParticles();
    }

    stop() {
        this.isAnimating = false;
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ===== INITIALIZE ALL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter effects
    initTypewriterEffects();

    // Initialize fade-in animations
    initFadeInAnimations();

    // Initialize polaroid drift
    initPolaroidDrift();

    // Initialize staggered grids
    initStaggeredGrids();
});

// ===== CSS ANIMATIONS =====
// Add these CSS animations to the stylesheet
const particleCSS = `
@keyframes particle-float {
    0% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

.particle {
    animation: particle-float 3s linear infinite;
}

.shimmer-effect {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
}
`;

// Add CSS animations to document head
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    startTracking(name) {
        this.metrics[name] = {
            startTime: performance.now(),
            endTime: null,
            duration: null
        };
    }

    endTracking(name) {
        if (this.metrics[name]) {
            this.metrics[name].endTime = performance.now();
            this.metrics[name].duration = this.metrics[name].endTime - this.metrics[name].startTime;
            console.log(`${name} took ${this.metrics[name].duration.toFixed(2)}ms`);
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Global performance monitor
const performanceMonitor = new PerformanceMonitor();

// ===== REDUCE MOTION SUPPORT =====
function initReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.body.classList.add('reduce-motion');

        // Stop polaroid drift
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const drift = new PolaroidDrift(heroSection);
            drift.stop();
        }
    }
}

// Initialize reduced motion support
initReducedMotion();

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.VintageAnimations = {
    TypewriterEffect,
    FadeInAnimation,
    PolaroidDrift,
    StaggeredGrid,
    LoadingAnimation,
    ParticleSystem,
    PerformanceMonitor,
    loadingAnimation,
    performanceMonitor
};

