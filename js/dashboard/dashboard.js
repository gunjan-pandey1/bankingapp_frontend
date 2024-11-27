import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export function renderDashboard() {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="widget">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Active Loans</h3>
            <i class="fas fa-money-bill-wave text-primary text-xl"></i>
          </div>
          <p class="text-2xl font-bold mb-2">2 loans</p>
          <p class="text-gray-600 dark:text-gray-400">Total: $25,000</p>
        </div>

        <div class="widget">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Next Payment</h3>
            <i class="fas fa-calendar text-primary text-xl"></i>
          </div>
          <p class="text-2xl font-bold mb-2">$450</p>
          <p class="text-gray-600 dark:text-gray-400">Due: March 15, 2024</p>
        </div>

        <div class="widget">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Credit Score</h3>
            <i class="fas fa-chart-line text-primary text-xl"></i>
          </div>
          <p class="text-2xl font-bold mb-2">750</p>
          <p class="text-gray-600 dark:text-gray-400">Excellent</p>
        </div>

        <div class="widget">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Repayment</h3>
            <i class="fas fa-credit-card text-primary text-xl"></i>
          </div>
          <p class="text-2xl font-bold mb-2">$450</p>
          <button onclick="showRepaymentPage()" class="btn mt-2">Make Payment</button>
        </div>
      </div>
    </main>
    ${renderFooter('home')}
  `;

  window.showRepaymentPage = () => {
    app.innerHTML = `
      ${renderHeader()}
      <main class="flex-1 container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6">Loan Repayment</h2>
          <form id="repaymentForm">
            <div class="form-group">
              <label for="emiAmount">EMI Amount</label>
              <input type="number" id="emiAmount" value="450" readonly class="bg-gray-100 dark:bg-gray-700">
            </div>
            <div class="form-group">
              <label for="customAmount">Custom Amount</label>
              <input type="number" id="customAmount" placeholder="Enter custom amount">
            </div>
            <button type="submit" class="btn">Make Payment</button>
          </form>
        </div>
      </main>
      ${renderFooter('home')}
    `;

    document.querySelector('#repaymentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      app.innerHTML = `
        ${renderHeader()}
        <main class="flex-1 container mx-auto px-4 py-8">
          <div class="success-container">
            <i class="fas fa-check-circle text-6xl text-success mb-4"></i>
            <h2 class="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Your payment has been processed successfully.</p>
            <button class="btn" onclick="location.hash = '#home'">Back to Home</button>
          </div>
        </main>
        ${renderFooter('home')}
      `;
    });
  };
}