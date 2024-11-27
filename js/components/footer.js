export function renderFooter(active = 'home') {
  return `
    <div class="footer-custom">
      <button class="${active === 'home' ? 'active' : ''}" onclick="location.hash = '#home'">
        <i class="fas fa-home"></i>
        <span class="btm-nav-label">Home</span>
      </button>
      <button class="${active === 'loans' ? 'active' : ''}" onclick="location.hash = '#loans'">
        <i class="fas fa-money-bill-wave"></i>
        <span class="btm-nav-label">Loans</span>
      </button>
      <button class="${active === 'transactions' ? 'active' : ''}" onclick="location.hash = '#transactions'">
        <i class="fas fa-exchange-alt"></i>
        <span class="btm-nav-label">Transactions</span>
      </button>
      <button class="${active === 'profile' ? 'active' : ''}" onclick="location.hash = '#profile'">
        <i class="fas fa-user"></i>
        <span class="btm-nav-label">Profile</span>
      </button>
    </div>
  `;
}