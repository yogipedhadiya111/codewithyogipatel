// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const progressBar = document.getElementById('progressBar');
const loginForm = document.getElementById('loginForm');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const googleLogin = document.getElementById('googleLogin');
const githubLogin = document.getElementById('githubLogin');
const microsoftLogin = document.getElementById('microsoftLogin');
const toast = document.getElementById('toast');

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

// Toggle Password Visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    const icon = togglePassword.querySelector('i');
    if (type === 'password') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
});

// Form Validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    // Password should be at least 8 characters
    return password.length >= 8;
}

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Reset error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    
    let isValid = true;
    
    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<span class="loading"></span> Logging in...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button state
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            // Show success message
            showToast('Login successful! Redirecting to dashboard...', 'success');
            
            // Redirect to dashboard (in a real app)
            setTimeout(() => {
                // window.location.href = 'dashboard.html';
            }, 1500);
        }, 1500);
    }
});

// Social Login Handlers
googleLogin.addEventListener('click', () => {
    showToast('Redirecting to Google login...', 'info');
    // In a real app, this would redirect to Google OAuth
});

githubLogin.addEventListener('click', () => {
    showToast('Redirecting to GitHub login...', 'info');
    // In a real app, this would redirect to GitHub OAuth
});

microsoftLogin.addEventListener('click', () => {
    showToast('Redirecting to Microsoft login...', 'info');
    // In a real app, this would redirect to Microsoft OAuth
});

// Toast Notification
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

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

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to form elements
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

    // Observe form elements
    const formElements = document.querySelectorAll('.login-form-container > *');
    formElements.forEach((element, index) => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
});

// Add input focus effects
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Check if user is already logged in (for demo purposes)
function checkLoginStatus() {
    // In a real app, this would check for a valid session or token
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        showToast('You are already logged in. Redirecting to dashboard...', 'info');
        setTimeout(() => {
            // window.location.href = 'dashboard.html';
        }, 1500);
    }
}

// Check login status on page load
checkLoginStatus();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Tab navigation
    if (e.key === 'Tab') {
        // Let the browser handle tab navigation
        return;
    }
    
    // Enter key on focused button
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'BUTTON') {
            activeElement.click();
        }
    }
    
    // Escape key to close any open modals or dropdowns
    if (e.key === 'Escape') {
        // In a real app, this would close any open modals or dropdowns
    }
});

// Add form field animations
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach((group, index) => {
    group.style.opacity = 0;
    group.style.transform = 'translateY(20px)';
    group.style.transition = `opacity 0.5s ease ${index * 0.1 + 0.3}s, transform 0.5s ease ${index * 0.1 + 0.3}s`;
    
    setTimeout(() => {
        group.style.opacity = 1;
        group.style.transform = 'translateY(0)';
    }, 100);
});

// Add hover effect to social buttons
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Add focus styles for better accessibility
const focusableElements = document.querySelectorAll('button, input, a');
focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid var(--primary)';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add loading spinner to buttons when clicked
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Only add loading state if it's not a social login button
        if (!this.classList.contains('social-btn')) {
            const originalContent = this.innerHTML;
            
            // Add loading spinner
            this.innerHTML = '<span class="loading"></span> Loading...';
            this.disabled = true;
            
            // Reset button state after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add input validation on blur
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailError = document.getElementById('emailError');
    if (emailInput.value && !validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
    } else {
        emailError.textContent = '';
    }
});

passwordInput.addEventListener('blur', () => {
    const passwordError = document.getElementById('passwordError');
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
        passwordError.textContent = 'Password must be at least 8 characters long';
    } else {
        passwordError.textContent = '';
    }
});

// Add remember me functionality
const rememberMeCheckbox = document.getElementById('rememberMe');
rememberMeCheckbox.addEventListener('change', () => {
    if (rememberMeCheckbox.checked) {
        showToast('Remember me enabled. You will stay logged in on this device.', 'info');
    } else {
        showToast('Remember me disabled.', 'info');
    }
});

// Add forgot password link functionality
const forgotPasswordLink = document.querySelector('.forgot-password');
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Password reset link has been sent to your email.', 'success');
});

// Add signup link functionality
const signupLink = document.querySelector('.signup-link a');
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Redirecting to signup page...', 'info');
    // In a real app, this would redirect to the signup page
    // window.location.href = 'signup.html';
});

// Add terms and privacy policy link functionality
const termsLinks = document.querySelectorAll('.login-footer a');
termsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = link.textContent;
        showToast(`Opening ${linkText} in a new tab...`, 'info');
        // In a real app, this would open the terms or privacy policy in a new tab
        // window.open('terms.html', '_blank');
    });
});

// Add animation to the login image
const loginImage = document.querySelector('.login-image img');
loginImage.addEventListener('load', () => {
    loginImage.style.opacity = 0;
    loginImage.style.transform = 'scale(0.9)';
    loginImage.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        loginImage.style.opacity = 1;
        loginImage.style.transform = 'scale(1)';
    }, 100);
});

// Add animation to features
const features = document.querySelectorAll('.feature');
features.forEach((feature, index) => {
    feature.style.opacity = 0;
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = `opacity 0.5s ease ${index * 0.1 + 0.5}s, transform 0.5s ease ${index * 0.1 + 0.5}s`;
    
    setTimeout(() => {
        feature.style.opacity = 1;
        feature.style.transform = 'translateY(0)';
    }, 100);
});

// Add hover effect to feature cards
features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-5px)';
        feature.style.transition = 'transform 0.3s ease';
    });
    
    feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'translateY(0)';
    });
});

// Add click effect to feature icons
const featureIcons = document.querySelectorAll('.feature i');
featureIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 300);
    });
});

// Add parallax effect to the login image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.login-image');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add resize handler for responsive design
window.addEventListener('resize', () => {
    // Adjust layout based on screen size
    if (window.innerWidth < 768) {
        // Mobile layout adjustments
        document.querySelector('.login-container').style.gridTemplateColumns = '1fr';
        document.querySelector('.login-image-container').style.display = 'none';
    } else {
        // Desktop layout
        document.querySelector('.login-container').style.gridTemplateColumns = '1fr 1fr';
        document.querySelector('.login-image-container').style.display = 'flex';
    }
});

// Initialize resize handler on page load
window.dispatchEvent(new Event('resize'));

// Add dark mode toggle (for demo purposes)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    showToast(`Dark mode ${isDarkMode ? 'enabled' : 'disabled'}`, 'info');
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('email').focus();
    }
    
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (document.activeElement.tagName === 'INPUT') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next action
            showToast('Swipe left detected', 'info');
        } else {
            // Swipe right - previous action
            showToast('Swipe right detected', 'info');
        }
    }
}

// Add