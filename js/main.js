// ====================================
// MOBILE MENU TOGGLE
// ====================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ====================================
// SMOOTH SCROLLING & ACTIVE NAV HIGHLIGHTING
// ====================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// removed direct scroll listener to avoid frequent synchronous calls

// ====================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // start reveal without forcing layout/reflow via getComputedStyle
            entry.target.classList.add('in-view');
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.about-text, .about-image, .skills-category, .project-card, .timeline-item, .contact-form, .contact-info').forEach(element => {
    observer.observe(element);
});

// ====================================
// BACK TO TOP BUTTON
// ====================================

const backToTopBtn = document.getElementById('backToTop');

// Back to top toggle and click handler (guard nulls)
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ====================================
// CONTACT FORM HANDLING
// ====================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Since this is a static site, we just show a success message
    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');

    // Reset form
    contactForm.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// ====================================
// NAVBAR BACKGROUND ON SCROLL
// ====================================

const navbar = document.querySelector('.navbar');

// guard navbar
function updateNavbarBorder() {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(51, 65, 85, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'var(--border-color)';
    }
}

// ====================================
// PAGE LOAD ANIMATION
// ====================================

window.addEventListener('load', () => {
    // Trigger initial state
    highlightActiveSection();
});

// ====================================
// SMOOTH SCROLL BEHAVIOR FOR ANCHOR LINKS
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// PROGRESSIVE SKILL BAR ANIMATION
// ====================================

const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            document.querySelectorAll('.skill-progress').forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'fillBar 1s ease-out forwards';
                }, index * 50);
            });
            skillsObserver.unobserve(skillsSection);
        }
    });
}, { threshold: 0.3 });

skillsObserver.observe(skillsSection);

// ====================================
// PARALLAX EFFECT (SUBTLE)
// ====================================

const heroSection = document.querySelector('.hero');

function parallaxEffect() {
    if (!heroSection) return;
    if (window.innerWidth > 768) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
}

// ====================================
// KEYBOARD NAVIGATION SUPPORT
// ====================================

// Enhance keyboard navigation
document.addEventListener('keydown', (e) => {
    // Skip to main content with keyboard
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ====================================
// LAZY LOADING SUPPORT FOR FUTURE IMAGES
// ====================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ====================================
// RESPONSIVE FONT SIZE ADJUSTMENT
// ====================================

function adjustResponsiveFonts() {
    const isMobile = window.innerWidth <= 768;
    const isSmall = window.innerWidth <= 480;

    // You can add dynamic font size adjustments here if needed
}

window.addEventListener('resize', adjustResponsiveFonts);
adjustResponsiveFonts();

// ====================================
// ACCESSIBILITY: FOCUS VISIBLE
// ====================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ====================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ====================================

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedHighlight = debounce(highlightActiveSection, 100);
// Combine scroll-related updates into a single debounced handler to reduce work
function onScroll() {
    highlightActiveSection();
    updateNavbarBorder();
    parallaxEffect();
    if (backToTopBtn) {
        if (window.scrollY > 300) backToTopBtn.classList.add('show');
        else backToTopBtn.classList.remove('show');
    }
}

const debouncedOnScroll = debounce(onScroll, 80);
window.addEventListener('scroll', debouncedOnScroll);
