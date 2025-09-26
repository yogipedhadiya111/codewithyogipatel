document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Toggle hamburger to close icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('.terms-section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
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
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.className = 'btn print-btn';
    printButton.textContent = 'Print Terms';
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    const termsHeader = document.querySelector('.terms-header');
    if (termsHeader) {
        termsHeader.appendChild(printButton);
    }
    
    // Add copy to clipboard functionality for contact info
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        const emailLink = contactInfo.querySelector('a[href^="mailto:"]');
        const phoneLink = contactInfo.querySelector('a[href^="tel:"]');
        
        if (emailLink) {
            emailLink.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailLink.getAttribute('href').substring(7);
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                });
            });
        }
        
        if (phoneLink) {
            phoneLink.addEventListener('click', (e) => {
                e.preventDefault();
                const phone = phoneLink.getAttribute('href').substring(4);
                navigator.clipboard.writeText(phone).then(() => {
                    showNotification('Phone number copied to clipboard!');
                });
            });
        }
    }
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
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
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Add table of contents for long terms page
    const tocContainer = document.createElement('div');
    tocContainer.className = 'table-of-contents';
    tocContainer.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
    
    const termsContent = document.querySelector('.terms-content');
    if (termsContent) {
        termsContent.insertBefore(tocContainer, termsContent.firstChild);
        
        const tocList = tocContainer.querySelector('ul');
        sections.forEach((section, index) => {
            const heading = section.querySelector('h2');
            if (heading) {
                const sectionId = `section-${index + 1}`;
                section.setAttribute('id', sectionId);
                
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${sectionId}`;
                link.textContent = heading.textContent;
                listItem.appendChild(link);
                tocList.appendChild(listItem);
            }
        });
    }
    
    // Update document title with brand name
    document.title = document.title.replace('CodeWithHarry', 'CodeWithYogi Patel');
    
    // Update all text content with brand name
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes('CodeWithHarry')) {
            node.nodeValue = node.nodeValue.replace(/CodeWithHarry/g, 'CodeWithYogi Patel');
        }
        if (node.nodeValue.includes('CWH Solutions')) {
            node.nodeValue = node.nodeValue.replace(/CWH Solutions/g, 'Yogi Patel Solutions');
        }
    }
    
    // Update social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        if (link.href.includes('CodeWithHarry')) {
            link.href = link.href.replace('CodeWithHarry', 'CodeWithYogi');
        }
    });
    
    // Add brand animation to logo
    const brandLogo = document.querySelector('.logo img');
    if (brandLogo) {
        brandLogo.classList.add('brand-logo');
        
        // Add pulse animation on hover
        brandLogo.addEventListener('mouseenter', function() {
            this.classList.add('brand-pulse');
        });
        
        brandLogo.addEventListener('mouseleave', function() {
            this.classList.remove('brand-pulse');
        });
    }
    
    // Add CSS for brand logo animation
    const brandStyles = document.createElement('style');
    brandStyles.textContent = `
        .brand-logo {
            transition: transform 0.3s ease;
        }
        
        .brand-pulse {
            animation: brandPulse 2s infinite;
        }
        
        @keyframes brandPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(brandStyles);
});