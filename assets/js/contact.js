/**
 * Vintage Moments Photography - Contact JavaScript
 * Contact form handling and WhatsApp integration
 */

// ===== CONTACT FORM CLASS =====
class ContactForm {
    constructor(formId, whatsappNumber) {
        this.form = document.getElementById(formId);
        this.whatsappNumber = whatsappNumber; // +91 8888234987
        this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
        this.isSubmitting = false;

        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        this.initValidation();

        // Form field enhancements
        this.initFieldEnhancements();
    }

    initValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                // Clear validation errors on input
                this.clearFieldError(input);
            });
        });
    }

    initFieldEnhancements() {
        // Auto-format phone number
        const phoneInput = this.form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 10) value = value.slice(0, 10);

                // Format as XXX-XXX-XXXX
                if (value.length >= 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
                }

                e.target.value = value;
            });
        }

        // Character counter for message
        const messageInput = this.form.querySelector('#message');
        if (messageInput) {
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            messageInput.parentNode.appendChild(counter);

            messageInput.addEventListener('input', () => {
                const remaining = 500 - messageInput.value.length;
                counter.textContent = `${remaining} characters remaining`;
                counter.style.color = remaining < 50 ? '#ff6b6b' : 'var(--light-gray)';
            });

            // Initialize counter
            messageInput.dispatchEvent(new Event('input'));
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.id) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'phone':
                const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
                if (!value) {
                    errorMessage = 'Phone number is required';
                    isValid = false;
                } else if (!phoneRegex.test(value)) {
                    errorMessage = 'Please enter a valid phone number (XXX-XXX-XXXX)';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.length > 500) {
                    errorMessage = 'Message must be less than 500 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        // Remove existing error
        this.clearFieldError(field);

        // Add error class to field
        field.classList.add('is-invalid');

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;

        // Insert after field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid');

        const errorMessage = field.parentNode.querySelector('.invalid-feedback');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        if (!this.validateForm()) {
            // Scroll to first error
            const firstError = this.form.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        this.isSubmitting = true;
        loadingAnimation.show();

        try {
            // Simulate form processing delay
            await this.delay(1500);

            // Prepare WhatsApp message
            const formData = this.getFormData();
            const whatsappMessage = this.formatWhatsAppMessage(formData);
            const whatsappUrl = this.generateWhatsAppUrl(whatsappMessage);

            // Show success modal with WhatsApp link
            this.showSuccessModal(whatsappUrl);

            // Reset form
            this.form.reset();

            // Clear any character counters
            const counter = this.form.querySelector('.character-counter');
            if (counter) {
                counter.dispatchEvent(new Event('input'));
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('Something went wrong. Please try again.');
        } finally {
            this.isSubmitting = false;
            loadingAnimation.hide();
        }
    }

    getFormData() {
        return {
            name: this.form.querySelector('#name').value.trim(),
            email: this.form.querySelector('#email').value.trim(),
            phone: this.form.querySelector('#phone').value.trim(),
            message: this.form.querySelector('#message').value.trim()
        };
    }

    formatWhatsAppMessage(data) {
        return `Hello, I'm interested in photography services. My details are:
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone}
• Message: ${data.message}`;
    }

    generateWhatsAppUrl(message) {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${this.whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    }

    showSuccessModal(whatsappUrl) {
        const whatsappLink = document.getElementById('whatsappLink');
        if (whatsappLink) {
            whatsappLink.href = whatsappUrl;
        }

        this.successModal.show();
    }

    showErrorMessage(message) {
        // Create error alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert at top of form
        this.form.insertBefore(alertDiv, this.form.firstChild);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ===== FORM ENHANCEMENTS =====

// Auto-resize textarea
function initTextareaAutoResize() {
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
}

// Form persistence (save to localStorage)
class FormPersistence {
    constructor(form) {
        this.form = form;
        this.storageKey = 'vintage_contact_form';
    }

    init() {
        this.loadFormData();
        this.initAutoSave();
    }

    loadFormData() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = this.form.querySelector(`#${key}`);
                if (input) {
                    input.value = data[key];
                }
            });
        }
    }

    saveFormData() {
        const formData = {};
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            formData[input.id] = input.value;
        });

        localStorage.setItem(this.storageKey, JSON.stringify(formData));
    }

    clearFormData() {
        localStorage.removeItem(this.storageKey);
    }

    initAutoSave() {
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                // Debounced save
                clearTimeout(this.saveTimeout);
                this.saveTimeout = setTimeout(() => {
                    this.saveFormData();
                }, 1000);
            });
        });
    }
}

// ===== ANALYTICS TRACKING =====
class ContactAnalytics {
    constructor() {
        this.events = [];
    }

    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            timestamp: new Date().toISOString(),
            data: data,
            url: window.location.href
        };

        this.events.push(event);
        console.log('Contact event tracked:', event);

        // In production, send to analytics service
        // this.sendToAnalytics(event);
    }

    trackFormStart() {
        this.trackEvent('contact_form_start');
    }

    trackFormSubmit(success = true) {
        this.trackEvent('contact_form_submit', { success });
    }

    trackWhatsAppClick() {
        this.trackEvent('whatsapp_link_click');
    }

    getEvents() {
        return this.events;
    }
}

// ===== WHATSAPP INTEGRATION ENHANCEMENTS =====
class WhatsAppIntegration {
    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
        this.isWhatsAppWeb = false;
        this.checkWhatsAppSupport();
    }

    checkWhatsAppSupport() {
        // Check if WhatsApp Web is available
        const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${this.phoneNumber}`;
        this.isWhatsAppWeb = true; // Assume available, fallback to regular WhatsApp
    }

    generateUrl(message) {
        const encodedMessage = encodeURIComponent(message);

        // Try WhatsApp app first, fallback to WhatsApp Web
        if (this.isMobile()) {
            return `whatsapp://send?phone=${this.phoneNumber}&text=${encodedMessage}`;
        } else {
            return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        }
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    validatePhoneNumber() {
        // Basic validation for Indian phone numbers
        const cleanNumber = this.phoneNumber.replace(/\D/g, '');
        return cleanNumber.length === 12 && cleanNumber.startsWith('91');
    }
}

// ===== INITIALIZE CONTACT FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Initialize contact form with WhatsApp number
        const formHandler = new ContactForm('contactForm', '+91 8888234987');

        // Initialize form enhancements
        initTextareaAutoResize();

        // Initialize form persistence
        const formPersistence = new FormPersistence(contactForm);
        formPersistence.init();

        // Initialize analytics
        const analytics = new ContactAnalytics();

        // Track form interactions
        contactForm.addEventListener('focusin', () => {
            analytics.trackFormStart();
        }, { once: true });

        contactForm.addEventListener('submit', () => {
            analytics.trackFormSubmit();
        });

        // Track WhatsApp link clicks
        const whatsappLink = document.getElementById('whatsappLink');
        if (whatsappLink) {
            whatsappLink.addEventListener('click', () => {
                analytics.trackWhatsAppClick();
            });
        }

        // Clear form data on successful submission
        document.getElementById('successModal').addEventListener('hidden.bs.modal', () => {
            formPersistence.clearFormData();
        });
    }
});

// ===== CONTACT PAGE SPECIFIC ANIMATIONS =====
function initContactAnimations() {
    // Animate form sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    // Observe form sections
    const formSections = document.querySelectorAll('.contact-form-container, .contact-info');
    formSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
}

// Initialize contact animations
initContactAnimations();

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initContactAccessibility() {
    // Add ARIA labels and descriptions
    const form = document.getElementById('contactForm');
    if (form) {
        form.setAttribute('aria-labelledby', 'contact-heading');
        form.setAttribute('role', 'form');

        // Add aria-describedby to inputs
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('aria-labelledby', label.id || `${input.id}-label`);
            }
        });
    }

    // Keyboard navigation improvements
    document.addEventListener('keydown', (e) => {
        // Submit form on Ctrl/Cmd + Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const form = document.getElementById('contactForm');
            if (form && document.activeElement.closest('#contactForm')) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}

// Initialize accessibility features
initContactAccessibility();

// ===== EXPORT FOR GLOBAL USE =====
window.VintageContact = {
    ContactForm,
    FormPersistence,
    ContactAnalytics,
    WhatsAppIntegration
};

