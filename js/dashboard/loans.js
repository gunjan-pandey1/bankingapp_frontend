import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export function renderLoans() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="mb-6">
        <div class="form-control">
          <div class="input-group">
            <input type="text" placeholder="Search loans..." class="input input-bordered w-full" />
            <button class="btn btn-square">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${generateLoans().map(loan => `
          <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div class="card-body">
              <div class="flex justify-between items-center">
                <h3 class="card-title">${loan.type}</h3>
                <div class="badge ${loan.status.toLowerCase() === 'active' ? 'badge-success' : 'badge-warning'} gap-2">
                  ${loan.status}
                </div>
              </div>
              <div class="space-y-2 my-4">
                <p class="flex justify-between">
                  <span class="text-base-content/70">Amount:</span>
                  <span class="font-semibold">$${loan.amount}</span>
                </p>
                <p class="flex justify-between">
                  <span class="text-base-content/70">Interest:</span>
                  <span class="font-semibold">${loan.interest}%</span>
                </p>
                <p class="flex justify-between">
                  <span class="text-base-content/70">Term:</span>
                  <span class="font-semibold">${loan.term} months</span>
                </p>
                <p class="flex justify-between">
                  <span class="text-base-content/70">Next Payment:</span>
                  <span class="font-semibold">${loan.nextPayment}</span>
                </p>
              </div>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" onclick="showLoanDetails('${loan.type}', ${loan.amount})">
                  View Details
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
    ${renderFooter('loans')}
  `;
}

function generateLoans() {
  return [
    { type: 'Personal Loan', amount: '15000', interest: '8.5', term: 36, status: 'Active', nextPayment: 'Mar 15, 2024' },
    { type: 'Home Loan', amount: '10000', interest: '7.5', term: 24, status: 'Active', nextPayment: 'Mar 20, 2024' },
  ];
}

window.showLoanDetails = (type, amount) => {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">${type} Details</h2>
            <div class="space-y-6">
              <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <span>Loan Amount: $${amount}</span>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Select Bank</span>
                </label>
                <select id="bank" class="select select-bordered w-full">
                  <option value="">Select a bank</option>
                  <option value="bank1">Bank of America</option>
                  <option value="bank2">Chase Bank</option>
                  <option value="bank3">Wells Fargo</option>
                  <option value="bank4">Citibank</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Loan Tenure</span>
                  <span class="label-text-alt" id="tenureValue">6 months</span>
                </label>
                <input type="range" id="tenure" min="2" max="18" value="6" class="range range-primary" step="1" />
                <div class="w-full flex justify-between text-xs px-2 mt-2">
                  <span>2m</span>
                  <span>6m</span>
                  <span>12m</span>
                  <span>18m</span>
                </div>
              </div>

              <div class="card-actions justify-end mt-6">
                <button class="btn btn-primary" onclick="handleLoanApplication()">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter('loans')}
  `;

  document.querySelector('#tenure').addEventListener('input', (e) => {
    document.querySelector('#tenureValue').textContent = `${e.target.value} months`;
  });
};

window.handleLoanApplication = () => {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto text-center">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body items-center">
            <div class="text-success text-6xl mb-4">
              <i class="fas fa-check-circle"></i>
            </div>
            <h2 class="card-title text-2xl mb-4">Application Successful!</h2>
            <p class="text-base-content/70 mb-6">
              Your loan application has been submitted successfully.
            </p>
            <div class="card-actions">
              <button class="btn btn-primary" onclick="location.hash = '#home'">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter('loans')}
  `;
};