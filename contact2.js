document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        menuToggle.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const newsletter = document.getElementById('newsletter').checked;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate phone (if provided)
        if (phone) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showFormMessage('Please enter a valid phone number.', 'error');
                return;
            }
        }
        
        // Simulate form submission
        showFormMessage('Sending your message...', 'info');
        
        // Simulate API call
        setTimeout(() => {
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            
            // If newsletter is checked, show additional message
            if (newsletter) {
                setTimeout(() => {
                    showFormMessage('You have been successfully subscribed to our newsletter!', 'success');
                }, 2000);
            }
        }, 1500);
    });
    
    // Form reset button
    const resetButton = document.querySelector('.btn-reset');
    resetButton.addEventListener('click', function() {
        contactForm.reset();
        formMessage.style.display = 'none';
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message';
        
        if (type === 'success') {
            formMessage.classList.add('success');
        } else if (type === 'error') {
            formMessage.classList.add('error');
        } else if (type === 'info') {
            formMessage.classList.add('info');
        }
        
        // Hide message after 5 seconds if it's success or error
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-card, .contact-form-container, .social-links, .faq-item, .map-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.info-card, .contact-form-container, .social-links, .faq-item, .map-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load
    animateOnScroll();
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Newsletter form in footer
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate subscription
            showFormMessage('Subscribing to newsletter...', 'info');
            
            setTimeout(() => {
                showFormMessage('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }, 1500);
        });
    }
    
    // Add hover effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon, .footer-social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .btn-submit, .btn-reset, .btn-directions');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect when page loads
        setTimeout(typeWriter, 500);
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.contact-hero');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    
    // Add form field animations
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${currentYear} CodeWith Yogi Patel. All rights reserved.`;
    }
    
    // Add loading animation to form submission
    const submitButton = document.querySelector('.btn-submit');
    const originalButtonText = submitButton.innerHTML;
    
    contactForm.addEventListener('submit', function() {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Re-enable button after form submission
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }, 1500);
    });
    
    // Add input validation feedback
    const requiredInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // Add character counter to message field
    const messageField = document.getElementById('message');
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.textContent = '0 / 500';
    messageField.parentElement.appendChild(charCounter);
    
    messageField.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = `${length} / 500`;
        
        if (length > 500) {
            charCounter.style.color = 'var(--error-color)';
            this.value = this.value.substring(0, 500);
            charCounter.textContent = '500 / 500';
        } else if (length > 400) {
            charCounter.style.color = 'var(--warning-color)';
        } else {
            charCounter.style.color = 'var(--text-light)';
        }
    });
    
    // Add map directions button functionality
    const directionsBtn = document.querySelector('.btn-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would open Google Maps or similar
            showFormMessage('Opening map directions...', 'info');
            
            setTimeout(() => {
                showFormMessage('Map directions would open in a new window.', 'success');
            }, 1000);
        });
    }
    
    // Add dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.backgroundColor = 'var(--primary-color)';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.zIndex = '9999';
    darkModeToggle.style.boxShadow = 'var(--shadow-lg)';
    darkModeToggle.style.transition = 'var(--transition)';
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '80px';
    printButton.style.right = '20px';
    printButton.style.padding = '10px 15px';
    printButton.style.borderRadius = 'var(--border-radius)';
    printButton.style.backgroundColor = 'var(--secondary-color)';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.cursor = 'pointer';
    printButton.style.zIndex = '9999';
    printButton.style.boxShadow = 'var(--shadow-lg)';
    printButton.style.transition = 'var(--transition)';
    
    document.body.appendChild(printButton);
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '140px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.backgroundColor = 'var(--accent-color)';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.zIndex = '9999';
    backToTopButton.style.boxShadow = 'var(--shadow-lg)';
    backToTopButton.style.transition = 'var(--transition)';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.visibility = 'hidden';
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.info-card, .contact-form-container, .social-links, .faq-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add copy to clipboard functionality for contact info
    const contactInfoItems = document.querySelectorAll('.card-content p');
    contactInfoItems.forEach(item => {
        if (item.textContent.includes('@') || item.textContent.match(/[\d\s\-\+\(\)]{10,}/)) {
            item.style.cursor = 'pointer';
            item.style.position = 'relative';
            
            item.addEventListener('click', function() {
                const textToCopy = this.textContent.trim();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const tooltip = document.createElement('span');
                    tooltip.textContent = 'Copied!';
                    tooltip.style.position = 'absolute';
                    tooltip.style.top = '-30px';
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                    tooltip.style.backgroundColor = 'var(--dark-color)';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '5px 10px';
                    tooltip.style.borderRadius = 'var(--border-radius-sm)';
                    tooltip.style.fontSize = 'var(--font-size-sm)';
                    tooltip.style.zIndex = '1000';
                    
                    this.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            });
        }
    });
    
    // Add form field icons animation
    const inputIcons = document.querySelectorAll('.input-icon i');
    inputIcons.forEach(icon => {
        const input = icon.parentElement.parentElement.querySelector('input, textarea, select');
        
        input.addEventListener('focus', function() {
            icon.style.color = 'var(--primary-color)';
            icon.style.transform = 'scale(1.2)';
        });
        
        input.addEventListener('blur', function() {
            icon.style.color = 'var(--text-lighter)';
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Add page load animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add hover effect to logo
    const logo = document.querySelector('.logo a');
    logo.addEventListener('mouseenter', function() {
        this.querySelector('span').style.transform = 'scale(1.1)';
        this.querySelector('span').style.transition = 'transform 0.3s ease';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.querySelector('span').style.transform = 'scale(1)';
    });
    
    // Add active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
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
    
    // Add search functionality (placeholder)
    const searchButton = document.createElement('button');
    searchButton.className = 'search-button';
    searchButton.innerHTML = '<i class="fas fa-search"></i>';
    searchButton.style.position = 'fixed';
    searchButton.style.bottom = '200px';
    searchButton.style.right = '20px';
    searchButton.style.width = '50px';
    searchButton.style.height = '50px';
    searchButton.style.borderRadius = '50%';
    searchButton.style.backgroundColor = 'var(--info-color)';
    searchButton.style.color = 'white';
    searchButton.style.border = 'none';
    searchButton.style.cursor = 'pointer';
    searchButton.style.zIndex = '9999';
    searchButton.style.boxShadow = 'var(--shadow-lg)';
    searchButton.style.transition = 'var(--transition)';
    
    document.body.appendChild(searchButton);
    
    searchButton.addEventListener('click', function() {
        showFormMessage('Search functionality would open here.', 'info');
    });
    
    // Add accessibility features
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.backgroundColor = 'var(--primary-color)';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '100';
    skipLink.style.transition = 'top 0.3s ease';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
        
        // Tab key navigation for focus management
        if (e.key === 'Tab') {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const focusable = Array.from(document.querySelectorAll(focusableElements));
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
                
                if (pageLoadTime > 3000) {
                    console.warn('Page load time is slow. Consider optimizing resources.');
                }
            }, 0);
        });
    }
    
    // Add error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23f0f0f0" width="100" height="100"/><text fill="%23999" font-size="14" x="50%" y="50%" text-anchor="middle" dy=".3em">Image not available</text></svg>';
            this.alt = 'Image not available';
        });
    });
    
    // Add console welcome message
    console.log('%cWelcome to CodeWith Yogi Patel!', 'color: #4a6bdf; font-size: 20px; font-weight: bold;');
    console.log('%cIf you find any issues or have suggestions, please contact us.', 'color: #6c63ff; font-size: 14px;');
    console.log('%cThank you for visiting our contact page!', 'color: #ff6b6b; font-size: 14px;');
});