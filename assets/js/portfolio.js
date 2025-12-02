/**
 * Vintage Moments Photography - Portfolio JavaScript
 * Gallery filtering and lightbox functionality
 */

// ===== PORTFOLIO DATA =====
// Direct portfolio data (no JSON loading to avoid path issues)
const portfolioData = [
    {
        id: 1,
        title: "Wedding Celebration",
        category: "weddings",
        image: "../assets/images/Wedding1.jpeg",
        thumbnail: "../assets/images/Wedding1.jpeg",
        description: "Beautiful wedding ceremony captured with traditional elegance and joy, showcasing the timeless beauty of Indian weddings.",
        date: "2024-12-01",
        location: "Mumbai, India",
        featured: true,
        tags: ["wedding", "traditional", "celebration", "indian"]
    },
    {
        id: 2,
        title: "Bridal Portrait",
        category: "portraits",
        image: "../assets/images/wedding2.webp",
        thumbnail: "../assets/images/wedding2.webp",
        description: "Stunning bridal portrait capturing the grace and beauty of the bride in traditional attire.",
        date: "2024-11-15",
        location: "Wedding Venue",
        featured: true,
        tags: ["bridal", "portrait", "traditional", "elegant"]
    },
    {
        id: 3,
        title: "Ceremony Moments",
        category: "weddings",
        image: "../assets/images/Wedding3.avif",
        thumbnail: "../assets/images/Wedding3.avif",
        description: "Intimate moments from the wedding ceremony, capturing emotions and traditions.",
        date: "2024-11-08",
        location: "Temple",
        featured: true,
        tags: ["ceremony", "tradition", "emotion", "culture"]
    },
    {
        id: 4,
        title: "Reception Celebration",
        category: "weddings",
        image: "../assets/images/Wedding4.avif",
        thumbnail: "../assets/images/Wedding4.avif",
        description: "Joyful reception moments capturing the celebration and happiness of the newlyweds.",
        date: "2024-10-20",
        location: "Banquet Hall",
        featured: true,
        tags: ["reception", "celebration", "joy", "family"]
    },
    {
        id: 5,
        title: "Wedding Memories",
        category: "portraits",
        image: "../assets/images/Wedding5.jpg",
        thumbnail: "../assets/images/Wedding5.jpg",
        description: "Cherished wedding memories captured with artistic photography and emotional storytelling.",
        date: "2024-10-05",
        location: "Garden Venue",
        featured: false,
        tags: ["memories", "artistic", "emotional", "storytelling"]
    },
    {
        id: 6,
        title: "Corporate Headshot",
        category: "corporate",
        image: "../assets/images/Wedding1.jpeg",
        thumbnail: "../assets/images/Wedding1.jpeg",
        description: "Professional corporate headshots for LinkedIn profiles and business branding.",
        date: "2024-09-28",
        location: "Corporate Office",
        featured: false,
        tags: ["corporate", "headshot", "professional", "business"]
    },
    {
        id: 7,
        title: "Maternity Session",
        category: "portraits",
        image: "../assets/images/wedding2.webp",
        thumbnail: "../assets/images/wedding2.webp",
        description: "Beautiful maternity portraits celebrating the miracle of new life.",
        date: "2024-09-15",
        location: "Studio",
        featured: false,
        tags: ["maternity", "pregnancy", "family", "celebration"]
    },
    {
        id: 8,
        title: "Product Photography",
        category: "commercial",
        image: "../assets/images/Wedding3.avif",
        thumbnail: "../assets/images/Wedding3.avif",
        description: "High-quality product photography for e-commerce and marketing campaigns.",
        date: "2024-09-01",
        location: "Studio",
        featured: false,
        tags: ["product", "commercial", "ecommerce", "marketing"]
    },
    {
        id: 9,
        title: "Event Coverage",
        category: "events",
        image: "../assets/images/Wedding4.avif",
        thumbnail: "../assets/images/Wedding4.avif",
        description: "Complete event photography covering corporate events, parties, and celebrations.",
        date: "2024-08-20",
        location: "Event Venue",
        featured: false,
        tags: ["event", "corporate", "party", "celebration"]
    },
    {
        id: 10,
        title: "Fashion Editorial",
        category: "fashion",
        image: "../assets/images/Wedding5.jpg",
        thumbnail: "../assets/images/Wedding5.jpg",
        description: "Creative fashion editorial photography with artistic styling and dramatic lighting.",
        date: "2024-08-10",
        location: "Studio",
        featured: false,
        tags: ["fashion", "editorial", "artistic", "styling"]
    },
    {
        id: 11,
        title: "Graduation Ceremony",
        category: "events",
        image: "../assets/images/Wedding1.jpeg",
        thumbnail: "../assets/images/Wedding1.jpeg",
        description: "Capturing the milestone moments of graduation ceremonies and celebrations.",
        date: "2024-07-25",
        location: "University",
        featured: false,
        tags: ["graduation", "milestone", "achievement", "ceremony"]
    },
    {
        id: 12,
        title: "Food Photography",
        category: "commercial",
        image: "../assets/images/wedding2.webp",
        thumbnail: "../assets/images/wedding2.webp",
        description: "Appetizing food photography for restaurants, menus, and culinary brands.",
        date: "2024-07-15",
        location: "Restaurant",
        featured: false,
        tags: ["food", "culinary", "restaurant", "appetizing"]
    }
];

// ===== PORTFOLIO GRID GENERATION =====
class PortfolioGrid {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.filteredData = [...data];
        this.currentFilter = 'all';
        this.lightbox = new Lightbox();
    }

    init() {
        this.render();
        this.initFilters();
        this.initLightbox();
    }

    render() {
        loadingAnimation.show();

        setTimeout(() => {
            this.container.innerHTML = '';

            this.filteredData.forEach((item, index) => {
                const polaroidCard = this.createPolaroidCard(item, index);
                this.container.appendChild(polaroidCard);
            });

            loadingAnimation.hide();
            this.initStaggeredAnimation();
        }, 500);
    }

    createPolaroidCard(item, index) {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
        card.innerHTML = `
            <div class="polaroid-card" data-category="${item.category}" data-id="${item.id}" style="--rotation: ${this.getRandomRotation()}deg">
                <img src="${item.image}" alt="${item.title}" loading="lazy" class="img-fluid">
                <div class="caption">${item.title}</div>
            </div>
        `;

        // Add click event for lightbox
        const polaroidElement = card.querySelector('.polaroid-card');
        polaroidElement.addEventListener('click', () => {
            this.lightbox.open(item);
        });

        return card;
    }

    getRandomRotation() {
        return Math.random() * 6 - 3; // Random rotation between -3deg and 3deg
    }

    initStaggeredAnimation() {
        const cards = this.container.querySelectorAll('.polaroid-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = `rotate(${card.style.getPropertyValue('--rotation')}) translateY(30px)`;

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = `rotate(${card.style.getPropertyValue('--rotation')}) translateY(0)`;
            }, index * 100);
        });
    }

    initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter portfolio items
                this.currentFilter = button.dataset.filter;
                this.filterItems();
            });
        });
    }

    filterItems() {
        if (this.currentFilter === 'all') {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(item => item.category === this.currentFilter);
        }

        this.render();
    }

    initLightbox() {
        // Lightbox is initialized in the constructor
    }
}

// ===== LIGHTBOX CLASS =====
class Lightbox {
    constructor() {
        this.modal = document.getElementById('lightboxModal');
        this.image = document.getElementById('lightbox-image');
        this.title = document.getElementById('lightbox-title');
        this.description = document.getElementById('lightbox-description');
        this.currentItem = null;

        this.init();
    }

    init() {
        if (!this.modal) return;

        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.close();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('show')) return;

            if (e.key === 'ArrowLeft') {
                this.showPrevious();
            } else if (e.key === 'ArrowRight') {
                this.showNext();
            }
        });
    }

    open(item) {
        this.currentItem = item;

        this.image.src = item.image;
        this.image.alt = item.title;
        this.title.textContent = item.title;
        this.description.textContent = `${item.description} | ${item.location}, ${item.date}`;

        // Show modal
        const bsModal = new bootstrap.Modal(this.modal);
        bsModal.show();
    }

    close() {
        const bsModal = bootstrap.Modal.getInstance(this.modal);
        if (bsModal) {
            bsModal.hide();
        }
    }

    showNext() {
        // Implementation for next image navigation
        console.log('Next image');
    }

    showPrevious() {
        // Implementation for previous image navigation
        console.log('Previous image');
    }
}

// ===== MASONRY LAYOUT (Optional Enhancement) =====
class MasonryLayout {
    constructor(container, itemSelector) {
        this.container = container;
        this.itemSelector = itemSelector;
        this.items = [];
    }

    init() {
        this.items = Array.from(this.container.querySelectorAll(this.itemSelector));
        this.layout();
    }

    layout() {
        const columns = this.getColumnCount();
        const columnHeights = new Array(columns).fill(0);
        const containerWidth = this.container.offsetWidth;
        const columnWidth = containerWidth / columns;

        this.items.forEach((item, index) => {
            const column = index % columns;
            const x = column * columnWidth;
            const y = columnHeights[column];

            item.style.position = 'absolute';
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            item.style.width = `${columnWidth}px`;

            columnHeights[column] += item.offsetHeight;
        });

        this.container.style.height = `${Math.max(...columnHeights)}px`;
    }

    getColumnCount() {
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 768) return 3;
        if (width >= 576) return 2;
        return 1;
    }

    relayout() {
        this.layout();
    }
}

// ===== INFINITE SCROLL (Optional Enhancement) =====
class InfiniteScroll {
    constructor(container, loadMoreCallback) {
        this.container = container;
        this.loadMoreCallback = loadMoreCallback;
        this.isLoading = false;
        this.hasMore = true;
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoading && this.hasMore) {
                    this.loadMore();
                }
            });
        }, { threshold: 0.1 });

        // Create and observe a sentinel element
        const sentinel = document.createElement('div');
        sentinel.className = 'scroll-sentinel';
        sentinel.style.height = '10px';
        this.container.appendChild(sentinel);

        observer.observe(sentinel);
    }

    loadMore() {
        this.isLoading = true;
        loadingAnimation.show();

        // Simulate loading delay
        setTimeout(() => {
            this.loadMoreCallback().then(() => {
                this.isLoading = false;
                loadingAnimation.hide();
            });
        }, 1000);
    }

    stop() {
        this.hasMore = false;
    }
}

// ===== INITIALIZE PORTFOLIO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio JavaScript loaded successfully');

    const portfolioContainer = document.getElementById('portfolio-container');
    console.log('Portfolio container found:', !!portfolioContainer);

    if (portfolioContainer) {
        console.log('Initializing portfolio with', portfolioData.length, 'items');

        // Initialize portfolio grid with direct data
        const portfolio = new PortfolioGrid(portfolioContainer, portfolioData);
        portfolio.init();

        // Optional: Initialize masonry layout
        // const masonry = new MasonryLayout(portfolioContainer, '.polaroid-card');
        // masonry.init();

        // window.addEventListener('resize', () => {
        //     masonry.relayout();
        // });

        // Optional: Initialize infinite scroll
        // const infiniteScroll = new InfiniteScroll(portfolioContainer, () => {
        //     return new Promise(resolve => {
        //         // Load more items logic here
        //         setTimeout(resolve, 1000);
        //     });
        // });
        // infiniteScroll.init();
    }
});

// ===== PORTFOLIO SEARCH (Optional Enhancement) =====
class PortfolioSearch {
    constructor(portfolioGrid) {
        this.portfolioGrid = portfolioGrid;
        this.searchInput = document.getElementById('portfolio-search');
    }

    init() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.search(query);
        });
    }

    search(query) {
        if (!query) {
            this.portfolioGrid.filteredData = [...this.portfolioGrid.data];
        } else {
            this.portfolioGrid.filteredData = this.portfolioGrid.data.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query)
            );
        }

        this.portfolioGrid.render();
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizePortfolioPerformance() {
    // Preload visible images
    const preloadImages = (images) => {
        images.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    };

    // Debounced resize handler for masonry
    const debouncedResize = debounce(() => {
        // Handle resize logic here
        console.log('Portfolio resized');
    }, 250);

    window.addEventListener('resize', debouncedResize);
}

// Initialize performance optimizations
optimizePortfolioPerformance();

// ===== EXPORT FOR GLOBAL USE =====
window.VintagePortfolio = {
    PortfolioGrid,
    Lightbox,
    MasonryLayout,
    InfiniteScroll,
    PortfolioSearch
};
