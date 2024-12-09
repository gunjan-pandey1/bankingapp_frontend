import { renderLogin } from './js/auth/login.js';
import { renderRegister } from './js/auth/register.js';
import { renderForgotPassword } from './js/auth/forgot-password.js';
import { renderResetPassword } from './js/auth/reset-password.js';
import { renderDashboard } from './js/dashboard/dashboard.js';
import { renderTransactions } from './js/dashboard/transactions.js';
import { renderLoans } from './js/dashboard/loans.js';
import { renderProfile } from './js/dashboard/profile.js';
import { initializeTheme } from './js/utils/theme.js';
import { renderHeader } from './js/components/header.js';
import { renderFooter } from './js/components/footer.js';

// Initialize theme
initializeTheme();

// Handle routing
function handleRoute() {
  const hash = window.location.hash || '#home';
  const isLoggedIn = localStorage.getItem('user');

  console.log('Is Logged In:', isLoggedIn);
  if (!isLoggedIn && !['#register', '#forgot-password'].includes(hash)) {
    renderLogin();
    return; 
  }
  console.log('Current Hash:', hash);
  switch (hash) {
    case '#register':
      renderRegister();
      break;
    case '#forgot-password':
      renderForgotPassword();
      break;
    case '#reset-password':
      renderResetPassword();
      break;
    case '#transactions':
      renderTransactions();
      break;
    case '#loans':
      renderLoans();
      break;
    case '#profile':
      renderProfile();
      break;
    default:
      renderDashboard();
  }
}

// Listen for route changes
window.addEventListener('hashchange', handleRoute);

// Initial render
handleRoute();