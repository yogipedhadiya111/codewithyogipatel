// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTabs = document.querySelectorAll('.filter-tab');
const coursesGrid = document.getElementById('coursesGrid');
const sortSelect = document.getElementById('sortSelect');
const newsletterForm = document.getElementById('newsletterForm');
const toast = document.getElementById('toast');
const courseCards = document.querySelectorAll('.course-card');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Search Functionality
function searchCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    
    courseCards.forEach(card => {
        const title = card.querySelector('.course-title').textContent.toLowerCase();
        const description = card.querySelector('.course-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', searchCourses);

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchCourses();
    }
});

// Filter Functionality
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        
        courseCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Sort Functionality
sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const coursesArray = Array.from(courseCards);
    
    coursesArray.sort((a, b) => {
        switch (sortValue) {
            case 'featured':
                // Featured courses first
                const aFeatured = a.querySelector('.course-badge');
                const bFeatured = b.querySelector('.course-badge');
                if (aFeatured && !bFeatured) return -1;
                if (!aFeatured && bFeatured) return 1;
                return 0;
                
            case 'popular':
                // Sort by rating (highest first)
                const aRating = parseFloat(a.getAttribute('data-rating'));
                const bRating = parseFloat(b.getAttribute('data-rating'));
                return bRating - aRating;
                
            case 'newest':
                // For demo, we'll just reverse the order
                return -1;
                
            case 'price-low':
                // Sort by price (lowest first)
                const aPriceLow = parseInt(a.getAttribute('data-price'));
                const bPriceLow = parseInt(b.getAttribute('data-price'));
                return aPriceLow - bPriceLow;
                
            case 'price-high':
                // Sort by price (highest first)
                const aPriceHigh = parseInt(a.getAttribute('data-price'));
                const bPriceHigh = parseInt(b.getAttribute('data-price'));
                return bPriceHigh - aPriceHigh;
                
            default:
                return 0;
        }
    });
    
    // Clear the grid and append sorted courses
    coursesGrid.innerHTML = '';
    coursesArray.forEach(course => {
        coursesGrid.appendChild(course);
    });
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Show success message
    showToast('Thank you for subscribing!', 'success');
    
    // Reset form
    e.target.reset();
});

// Toast Notification
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Course Button Click
document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showToast('Redirecting to course details...', 'success');
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to course cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    courseCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
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

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);