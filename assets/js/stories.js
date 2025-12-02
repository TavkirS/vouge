/**
 * Vintage Moments Photography - Stories JavaScript
 * Blog-style storytelling with typewriter effects and modals
 */

// ===== STORIES DATA =====
// Stories data structure (will be loaded from JSON in production)
const storiesData = [
    {
        id: 1,
        title: "The Art of Golden Hour",
        excerpt: "Discovering the magic that happens when the sun kisses the horizon...",
        content: "There's something magical about golden hour. That perfect moment when the sun dips low enough to paint everything in warm, golden light. I've spent countless hours chasing this light, learning that it's not just about the technical aspects of photography, but about being present in the moment. Each golden hour session teaches me something new about light, shadow, and the stories they tell together.",
        image: "assets/images/polaroids/story-1.jpg",
        date: "December 15, 2024",
        category: "Photography Tips",
        readTime: "3 min read",
        tags: ["golden hour", "lighting", "technique"]
    },
    {
        id: 2,
        title: "Behind the Wedding Day Chaos",
        excerpt: "What really happens in the moments between the posed shots...",
        content: "Weddings are beautiful chaos. While guests see the perfectly composed shots, I witness the raw emotion, the stolen glances, the spontaneous laughter. There's the bride's nervous excitement before walking down the aisle, the father's proud tears during the first dance, the way light filters through stained glass windows. These are the moments that remind me why I love photography - capturing authentic human connection.",
        image: "assets/images/polaroids/story-2.jpg",
        date: "November 28, 2024",
        category: "Wedding Stories",
        readTime: "5 min read",
        tags: ["weddings", "emotion", "behind-the-scenes"]
    },
    {
        id: 3,
        title: "Street Photography: Finding Stories in the Ordinary",
        excerpt: "How to capture compelling narratives from everyday life...",
        content: "Street photography is about finding poetry in the mundane. It's about recognizing that every person walking down the street has a story worth telling. The way a businessman checks his watch with urgency, how a child stops to examine a flower, the silent conversation between two strangers on a park bench. These are the stories I look for, the human moments that connect us all.",
        image: "assets/images/polaroids/story-3.jpg",
        date: "November 10, 2024",
        category: "Street Photography",
        readTime: "4 min read",
        tags: ["street", "narrative", "human connection"]
    },
    {
        id: 4,
        title: "The Journey to Film Photography",
        excerpt: "Why I fell in love with the magic of analog photography...",
        content: "Switching to film was like rediscovering photography. There's something magical about not knowing exactly what you've captured until the film is developed. Each shot becomes more intentional, more precious. The limitations of film teach you to see differently, to compose more carefully, to appreciate the craft. In a world of instant gratification, film photography reminds us that some things are worth waiting for.",
        image: "assets/images/polaroids/story-4.jpg",
        date: "October 22, 2024",
        category: "Film Photography",
        readTime: "6 min read",
        tags: ["film", "analog", "craftsmanship"]
    },
    {
        id: 5,
        title: "Portrait Sessions: Building Trust Through the Lens",
        excerpt: "The psychology of creating authentic portrait photography...",
        content: "Portrait photography is as much about psychology as it is about technique. Building trust with your subject is crucial. I spend time getting to know each person before we start shooting - learning their story, understanding what makes them comfortable. The best portraits happen when someone forgets the camera is there, when they're just being themselves. That's when the real magic happens.",
        image: "assets/images/polaroids/story-5.jpg",
        date: "October 5, 2024",
        category: "Portrait Photography",
        readTime: "4 min read",
        tags: ["portraits", "connection", "authenticity"]
    },
    {
        id: 6,
        title: "Travel Photography: Documenting the Soul of Places",
        excerpt: "How travel photography captures more than just landscapes...",
        content: "Travel photography isn't just about beautiful landscapes. It's about capturing the soul of a place, the way light falls on ancient stone walls, how locals interact with their environment, the colors that define a culture. Each destination teaches me to see with new eyes, to appreciate different perspectives. Whether it's the golden sands of Rajasthan or the misty mountains of Kashmir, every place has stories waiting to be told.",
        image: "assets/images/polaroids/story-6.jpg",
        date: "September 18, 2024",
        category: "Travel Photography",
        readTime: "5 min read",
        tags: ["travel", "culture", "storytelling"]
    }
];

// ===== STORIES GRID GENERATION =====
class StoriesGrid {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.storyModal = new StoryModal();
    }

    init() {
        this.render();
        this.initModalTriggers();
    }

    render() {
        loadingAnimation.show();

        setTimeout(() => {
            this.container.innerHTML = '';

            this.data.forEach((story, index) => {
                const storyCard = this.createStoryCard(story, index);
                this.container.appendChild(storyCard);
            });

            loadingAnimation.hide();
            this.initStaggeredAnimation();
        }, 300);
    }

    createStoryCard(story, index) {
        const card = document.createElement('div');
        card.className = 'col-lg-6 col-md-6 col-sm-12 mb-4';
        card.innerHTML = `
            <div class="story-card" data-story-id="${story.id}">
                <div class="story-image">
                    <img src="${story.image}" alt="${story.title}" loading="lazy" class="img-fluid">
                    <div class="story-overlay">
                        <h3 class="story-title">${story.title}</h3>
                        <div class="story-meta">
                            <span>${story.date}</span>
                            <span>${story.readTime}</span>
                        </div>
                    </div>
                </div>
                <div class="story-content">
                    <p class="story-excerpt">${story.excerpt}</p>
                    <div class="story-footer">
                        <span class="story-category">${story.category}</span>
                        <button class="read-more-btn" data-story-id="${story.id}">Read More</button>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    initStaggeredAnimation() {
        const cards = this.container.querySelectorAll('.story-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    initModalTriggers() {
        this.container.addEventListener('click', (e) => {
            const storyCard = e.target.closest('.story-card');
            const readMoreBtn = e.target.closest('.read-more-btn');

            if (storyCard || readMoreBtn) {
                const storyId = parseInt(storyCard.dataset.storyId || readMoreBtn.dataset.storyId);
                const story = this.data.find(s => s.id === storyId);

                if (story) {
                    this.storyModal.open(story);
                }
            }
        });
    }
}

// ===== STORY MODAL CLASS =====
class StoryModal {
    constructor() {
        this.modal = document.getElementById('storyModal');
        this.image = document.getElementById('story-image');
        this.title = document.getElementById('story-title');
        this.date = document.getElementById('story-date');
        this.category = document.getElementById('story-category');
        this.text = document.getElementById('story-text');
        this.typewriter = null;

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
    }

    open(story) {
        this.image.src = story.image;
        this.image.alt = story.title;
        this.title.textContent = ''; // Clear for typewriter effect
        this.date.textContent = story.date;
        this.category.textContent = story.category;
        this.text.textContent = story.content;

        // Initialize typewriter effect for title
        this.typewriter = new TypewriterEffect(this.title, story.title, 80);

        // Show modal
        const bsModal = new bootstrap.Modal(this.modal);
        bsModal.show();

        // Start typewriter effect after modal is shown
        setTimeout(() => {
            this.typewriter.start();
        }, 300);
    }

    close() {
        const bsModal = bootstrap.Modal.getInstance(this.modal);
        if (bsModal) {
            bsModal.hide();
        }

        // Reset typewriter
        if (this.typewriter) {
            this.typewriter.isTyping = false;
        }
    }
}

// ===== TYPEWRITER EFFECT CLASS =====
class TypewriterEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isTyping = false;
        this.cursorInterval = null;
    }

    start() {
        if (this.isTyping) return;

        this.isTyping = true;
        this.element.textContent = '';
        this.addCursor();

        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isTyping = false;
            setTimeout(() => this.removeCursor(), 1000);
        }
    }

    addCursor() {
        this.element.style.borderRight = '2px solid var(--off-white)';
    }

    removeCursor() {
        this.element.style.borderRight = 'none';
    }

    stop() {
        this.isTyping = false;
        this.removeCursor();
    }
}

// ===== STORIES SEARCH AND FILTER =====
class StoriesFilter {
    constructor(storiesGrid) {
        this.storiesGrid = storiesGrid;
        this.searchInput = document.getElementById('stories-search');
        this.categoryFilter = document.getElementById('category-filter');
    }

    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.filter(query, this.categoryFilter ? this.categoryFilter.value : 'all');
            });
        }

        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', (e) => {
                const query = this.searchInput ? this.searchInput.value.toLowerCase() : '';
                this.filter(query, e.target.value);
            });
        }
    }

    filter(searchQuery, category) {
        let filteredData = [...this.storiesGrid.data];

        // Filter by search query
        if (searchQuery) {
            filteredData = filteredData.filter(story =>
                story.title.toLowerCase().includes(searchQuery) ||
                story.excerpt.toLowerCase().includes(searchQuery) ||
                story.content.toLowerCase().includes(searchQuery) ||
                story.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }

        // Filter by category
        if (category && category !== 'all') {
            filteredData = filteredData.filter(story => story.category.toLowerCase() === category.toLowerCase());
        }

        // Update grid with filtered data
        this.storiesGrid.filteredData = filteredData;
        this.storiesGrid.render();
    }
}

// ===== STORIES PAGINATION =====
class StoriesPagination {
    constructor(storiesGrid, itemsPerPage = 6) {
        this.storiesGrid = storiesGrid;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(storiesGrid.data.length / itemsPerPage);
    }

    init() {
        this.createPaginationControls();
        this.updateGrid();
    }

    createPaginationControls() {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'stories-pagination text-center mt-5';
        paginationContainer.innerHTML = `
            <button class="pagination-btn prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span class="pagination-info">Page ${this.currentPage} of ${this.totalPages}</span>
            <button class="pagination-btn next-btn" ${this.currentPage === this.totalPages ? 'disabled' : ''}>Next</button>
        `;

        // Add event listeners
        const prevBtn = paginationContainer.querySelector('.prev-btn');
        const nextBtn = paginationContainer.querySelector('.next-btn');

        prevBtn.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        nextBtn.addEventListener('click', () => this.goToPage(this.currentPage + 1));

        // Insert after stories container
        this.storiesGrid.container.parentNode.insertBefore(paginationContainer, this.storiesGrid.container.nextSibling);
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages) return;

        this.currentPage = page;
        this.updateGrid();
        this.updatePaginationControls();
    }

    updateGrid() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.storiesGrid.filteredData = this.storiesGrid.data.slice(startIndex, endIndex);
        this.storiesGrid.render();
    }

    updatePaginationControls() {
        const paginationContainer = document.querySelector('.stories-pagination');
        if (!paginationContainer) return;

        const prevBtn = paginationContainer.querySelector('.prev-btn');
        const nextBtn = paginationContainer.querySelector('.next-btn');
        const info = paginationContainer.querySelector('.pagination-info');

        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === this.totalPages;
        info.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
    }
}

// ===== STORIES SHARING =====
class StoriesSharing {
    constructor() {
        this.shareButtons = document.querySelectorAll('.share-btn');
    }

    init() {
        this.shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = button.dataset.platform;
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);

                let shareUrl = '';

                switch (platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'pinterest':
                        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
                        break;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
}

// ===== INITIALIZE STORIES =====
document.addEventListener('DOMContentLoaded', function() {
    const storiesContainer = document.getElementById('stories-container');

    if (storiesContainer) {
        // Initialize stories grid
        const storiesGrid = new StoriesGrid(storiesContainer, storiesData);

        // Override render method to work with pagination
        storiesGrid.filteredData = [...storiesData];
        storiesGrid.init();

        // Initialize filters
        const storiesFilter = new StoriesFilter(storiesGrid);
        storiesFilter.init();

        // Initialize pagination
        const storiesPagination = new StoriesPagination(storiesGrid, 6);
        storiesPagination.init();

        // Initialize sharing
        const storiesSharing = new StoriesSharing();
        storiesSharing.init();
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizeStoriesPerformance() {
    // Preload story images
    const preloadStoryImages = () => {
        const storyImages = document.querySelectorAll('.story-card img');
        storyImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    };

    // Lazy load story content
    const lazyLoadStoryContent = () => {
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const storyCard = entry.target;
                    const storyContent = storyCard.querySelector('.story-content');

                    if (storyContent) {
                        storyContent.style.opacity = '0';
                        storyContent.style.transform = 'translateY(20px)';
                        storyContent.style.transition = 'all 0.5s ease-out';

                        setTimeout(() => {
                            storyContent.style.opacity = '1';
                            storyContent.style.transform = 'translateY(0)';
                        }, 200);
                    }

                    storyObserver.unobserve(storyCard);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.story-card').forEach(card => {
            storyObserver.observe(card);
        });
    };

    // Initialize optimizations after DOM load
    setTimeout(() => {
        preloadStoryImages();
        lazyLoadStoryContent();
    }, 1000);
}

// Initialize performance optimizations
optimizeStoriesPerformance();

// ===== EXPORT FOR GLOBAL USE =====
window.VintageStories = {
    StoriesGrid,
    StoryModal,
    TypewriterEffect,
    StoriesFilter,
    StoriesPagination,
    StoriesSharing
};

