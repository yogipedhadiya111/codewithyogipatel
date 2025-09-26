// ====== Navigation Toggle ======
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ====== Sticky Header ======
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// ====== Back to Top Button ======
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====== Testimonials Slider ======
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    testimonialCards[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// ====== Newsletter Form ======
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would normally send the email to your server
        // For this example, we'll just show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'Thank you for subscribing! Please check your email for confirmation.';
        
        newsletterForm.parentNode.insertBefore(successMessage, newsletterForm);
        newsletterForm.reset();
        
        // Remove the success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// ====== Smooth Scrolling for Anchor Links ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ====== Active Navigation Link on Scroll ======
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ====== Loading Animation ======
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-circle"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// ====== Animation on Scroll ======
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .tutorial-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ====== Dark Mode Toggle ======
const createDarkModeToggle = () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '90px';
    darkModeToggle.style.right = '30px';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.backgroundColor = '#2c3e50';
    darkModeToggle.style.color = '#fff';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.zIndex = '998';
    darkModeToggle.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    darkModeToggle.style.transition = 'all 0.3s ease';
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.style.backgroundColor = '#f39c12';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.style.backgroundColor = '#2c3e50';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.style.backgroundColor = '#f39c12';
    }
};

createDarkModeToggle();

// ====== Search Functionality ======
const createSearchBar = () => {
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';
    searchBar.style.position = 'fixed';
    searchBar.style.top = '80px';
    searchBar.style.left = '0';
    searchBar.style.width = '100%';
    searchBar.style.backgroundColor = '#fff';
    searchBar.style.padding = '15px 0';
    searchBar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    searchBar.style.zIndex = '999';
    searchBar.style.transform = 'translateY(-100%)';
    searchBar.style.transition = 'transform 0.3s ease';
    
    const container = document.createElement('div');
    container.className = 'container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search tutorials, courses...';
    searchInput.style.flex = '1';
    searchInput.style.padding = '10px 15px';
    searchInput.style.border = '1px solid #ddd';
    searchInput.style.borderRadius = '5px';
    searchInput.style.fontSize = '1rem';
    
    const searchClose = document.createElement('button');
    searchClose.innerHTML = '<i class="fas fa-times"></i>';
    searchClose.style.marginLeft = '15px';
    searchClose.style.padding = '10px';
    searchClose.style.backgroundColor = 'transparent';
    searchClose.style.border = 'none';
    searchClose.style.fontSize = '1.2rem';
    searchClose.style.cursor = 'pointer';
    
    container.appendChild(searchInput);
    container.appendChild(searchClose);
    searchBar.appendChild(container);
    document.body.appendChild(searchBar);
    
    // Create search button in header
    const searchButton = document.createElement('button');
    searchButton.innerHTML = '<i class="fas fa-search"></i>';
    searchButton.style.marginLeft = '15px';
    searchButton.style.padding = '8px';
    searchButton.style.backgroundColor = 'transparent';
    searchButton.style.border = 'none';
    searchButton.style.fontSize = '1.2rem';
    searchButton.style.cursor = 'pointer';
    searchButton.style.color = '#2c3e50';
    
    const navbar = document.querySelector('.navbar');
    navbar.appendChild(searchButton);
    
    // Toggle search bar
    searchButton.addEventListener('click', () => {
        searchBar.style.transform = 'translateY(0)';
        searchInput.focus();
    });
    
    searchClose.addEventListener('click', () => {
        searchBar.style.transform = 'translateY(-100%)';
        searchInput.value = '';
    });
    
    // Search functionality
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                // Here you would normally perform a search
                // For this example, we'll just show an alert
                alert(`Searching for: ${searchTerm}`);
            }
        }
    });
};

createSearchBar();

// ====== Lazy Loading Images ======
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
};

// Add data-src attributes to images and call lazyLoadImages
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('data-src')) {
            img.setAttribute('data-src', img.src);
        }
    });
    lazyLoadImages();
});

// ====== Accordion Functionality ======
const createAccordion = () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const activeItem = document.querySelector('.accordion-item.active');
            
            if (activeItem && activeItem !== item) {
                activeItem.classList.remove('active');
            }
            
            item.classList.toggle('active');
        });
    });
};

// Call this function if you have accordions on the page
// createAccordion();

// ====== Tab Functionality ======
const createTabs = () => {
    const tabNavItems = document.querySelectorAll('.tab-nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            
            tabNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            item.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
};

// Call this function if you have tabs on the page
// createTabs();

// ====== Modal Functionality ======
const createModal = () => {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            document.getElementById(modalId).classList.add('show');
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('show');
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
};

// Call this function if you have modals on the page
// createModal();

// ====== Form Validation ======
const validateForm = (form) => {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
            
            // Create error message if it doesn't exist
            let errorMessage = field.parentNode.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.color = '#e74c3c';
                errorMessage.style.fontSize = '0.8rem';
                errorMessage.style.marginTop = '5px';
                errorMessage.textContent = 'This field is required';
                field.parentNode.appendChild(errorMessage);
            }
        } else {
            field.classList.remove('error');
            
            // Remove error message if it exists
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            
            // Email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                    
                    // Create error message if it doesn't exist
                    let errorMessage = field.parentNode.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.style.color = '#e74c3c';
                        errorMessage.style.fontSize = '0.8rem';
                        errorMessage.style.marginTop = '5px';
                        errorMessage.textContent = 'Please enter a valid email address';
                        field.parentNode.appendChild(errorMessage);
                    }
                }
            }
        }
    });
    
    return isValid;
};

// Add this to your forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });
});

// ====== Tooltips ======
const createTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltiptext';
        tooltip.textContent = tooltipText;
        
        element.classList.add('tooltip');
        element.appendChild(tooltip);
    });
};

// Call this function if you have tooltips on the page
// createTooltips();

// ====== Copy to Clipboard ======
const createCopyButtons = () => {
    const codeBlocks = document.querySelectorAll('pre, .code-block');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.className = 'copy-button';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '10px';
        copyButton.style.right = '10px';
        copyButton.style.padding = '5px 10px';
        copyButton.style.backgroundColor = '#3498db';
        copyButton.style.color = '#fff';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '4px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.fontSize = '0.8rem';
        copyButton.style.zIndex = '10';
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
            const text = block.textContent || block.innerText;
            
            navigator.clipboard.writeText(text).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
};

// Call this function if you have code blocks on the page
// createCopyButtons();

// ====== Progress Bars Animation ======
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || bar.style.width;
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(bar);
    });
};

// Call this function if you have progress bars on the page
// animateProgressBars();

// ====== Counter Animation ======
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;
        
        const updateCounter = () => {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
};

// Call this function if you have counters on the page
// animateCounters();

// ====== Print Functionality ======
const createPrintButton = () => {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print';
    printButton.className = 'print-button';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '150px';
    printButton.style.right = '30px';
    printButton.style.padding = '10px 15px';
    printButton.style.backgroundColor = '#2c3e50';
    printButton.style.color = '#fff';
    printButton.style.border = 'none';
    printButton.style.borderRadius = '5px';
    printButton.style.cursor = 'pointer';
    printButton.style.zIndex = '998';
    printButton.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    printButton.style.transition = 'all 0.3s ease';
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printButton);
};

// Uncomment to add print button
// createPrintButton();

// ====== Keyboard Navigation ======
document.addEventListener('keydown', (e) => {
    // Escape key to close modals and mobile menu
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.show');
        if (activeModal) {
            activeModal.classList.remove('show');
        }
        
        const activeNavMenu = document.querySelector('.nav-menu.active');
        if (activeNavMenu) {
            activeNavMenu.classList.remove('active');
            document.getElementById('navToggle').classList.remove('active');
        }
        
        const activeSearchBar = document.querySelector('.search-bar');
        if (activeSearchBar && activeSearchBar.style.transform === 'translateY(0px)') {
            activeSearchBar.style.transform = 'translateY(-100%)';
            activeSearchBar.querySelector('input').value = '';
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            const searchBar = document.querySelector('.search-bar');
            searchBar.style.transform = 'translateY(0)';
            searchInput.focus();
        }
    }
});

// ====== Performance Optimization ======
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Sticky header
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
    
    // Active navigation link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Animation on scroll
    animateOnScroll();
}, 10));

// ====== Accessibility Improvements ======
// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.style.position = 'absolute';
skipLink.style.top = '-40px';
skipLink.style.left = '0';
skipLink.style.background = '#3498db';
skipLink.style.color = '#fff';
skipLink.style.padding = '8px';
skipLink.style.zIndex = '100';
skipLink.style.transition = 'top 0.3s';

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Add main content id to the main section
const mainContent = document.querySelector('.hero');
if (mainContent) {
    mainContent.id = 'main-content';
}

// Add aria-labels to buttons without text
document.querySelectorAll('button').forEach(button => {
    if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
        const icon = button.querySelector('i');
        if (icon) {
            const iconClass = icon.className;
            if (iconClass.includes('fa-search')) {
                button.setAttribute('aria-label', 'Search');
            } else if (iconClass.includes('fa-bars')) {
                button.setAttribute('aria-label', 'Menu');
            } else if (iconClass.includes('fa-times')) {
                button.setAttribute('aria-label', 'Close');
            } else if (iconClass.includes('fa-arrow-up')) {
                button.setAttribute('aria-label', 'Back to top');
            }
        }
    }
});

// ====== Error Handling ======
window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
    // You could send this error to your error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled rejection:', e.reason);
    // You could send this error to your error tracking service
});