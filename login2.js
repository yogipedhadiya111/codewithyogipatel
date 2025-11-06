// -----------------------------
// 🧠 Yogi Patel - login2.js
// Google OAuth + UI Enhancements
// -----------------------------

// ===== DOM Elements =====
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
const emailInput = document.getElementById('email');

// ===== OAuth Config =====
const YOGI_OAUTH_CONFIG = {
  clientId: '730566684699-nneg42ufg98jji5som164sj0qdkjlb9n.apps.googleusercontent.com',
  redirectUri: window.location.origin + '/auth/callback',
  scope: 'openid email profile',
  authDomain: window.location.hostname
};

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  const scrollPercent = (document.documentElement.scrollTop /
    (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// ===== Toggle Password =====
togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.querySelector('i').classList.toggle('fa-eye');
  togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
});

// ===== Validation Helpers =====
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

// ===== Login Form Submit =====
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset Errors
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';

  let valid = true;
  if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = 'Invalid email address';
    valid = false;
  }
  if (!validatePassword(password)) {
    document.getElementById('passwordError').textContent = 'Password must be 8+ characters';
    valid = false;
  }

  if (valid) {
    const loginBtn = document.querySelector('.login-btn');
    const original = loginBtn.innerHTML;
    loginBtn.innerHTML = '<span class="loading"></span> Logging in...';
    loginBtn.disabled = true;

    setTimeout(() => {
      loginBtn.innerHTML = original;
      loginBtn.disabled = false;
      showToast('Login successful! Redirecting...', 'success');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
    }, 1200);
  }
});

// ===== Google OAuth Handler =====
googleLogin.addEventListener('click', () => {
  const state = crypto.randomUUID();
  localStorage.setItem('oauth_state', state);

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${YOGI_OAUTH_CONFIG.clientId}&` +
    `redirect_uri=${encodeURIComponent(YOGI_OAUTH_CONFIG.redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(YOGI_OAUTH_CONFIG.scope)}&` +
    `state=${state}&` +
    `prompt=consent`;

  showToast('Redirecting to Google for authentication...', 'info');
  setTimeout(() => (window.location.href = authUrl), 800);
});

// ===== OAuth Callback =====
function handleOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');
  const storedState = localStorage.getItem('oauth_state');

  if (error) return showToast(`Auth failed: ${error}`, 'error');
  if (!code || state !== storedState) return;

  showToast('Verifying Google account...', 'info');
  localStorage.removeItem('oauth_state');

  fetch('/auth/google/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(data.user));
        showToast(`Welcome ${data.user.name}!`, 'success');
      } else {
        showToast('Login failed. Try again.', 'error');
      }
    })
    .catch(() => showToast('Server error during login', 'error'))
    .finally(() => cleanUrl());
}

// ===== Utility: Remove query params =====
function cleanUrl() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

// ===== Toast Helper =====
function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Optional: GitHub & Microsoft Placeholder =====
githubLogin.addEventListener('click', () => showToast('GitHub login coming soon', 'info'));
microsoftLogin.addEventListener('click', () => showToast('Microsoft login coming soon', 'info'));

// ===== Animate UI Elements =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.login-form-container > *').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 100);
  });

  handleOAuthCallback();
  checkLoginStatus();
});

// ===== Check Login Status =====
function checkLoginStatus() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    showToast(`Welcome back, ${user.name || 'User'}!`, 'info');
  }
}

// ===== Nice UX: Ripple Effect =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    const size = Math.max(btn.clientWidth, btn.clientHeight);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.offsetX - size / 2}px`;
    ripple.style.top = `${e.offsetY - size / 2}px`;
    ripple.classList.add('ripple');
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== CSS for Ripple =====
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    transform: scale(0);
    animation: ripple 0.6s linear;
  }
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);
