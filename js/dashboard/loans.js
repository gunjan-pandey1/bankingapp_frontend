import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export async function renderLoans() {
  const app = document.querySelector('#app');
  
  // Show loading state
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="flex justify-center items-center h-64">
        <div class="loading loading-spinner loading-lg"></div>
      </div>
    </main>
    ${renderFooter('loans')}
  `;

  try {
    // Fetch loans data
    const response = await fetch('http://127.0.0.1:8000/api/loans', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Refresh-Token': localStorage.getItem('refreshToken'),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch loans');
    const loans = await response.json();

    // Render loans
    app.innerHTML = `
      ${renderHeader()}
      <main class="flex-1 container mx-auto px-4 py-8">
        <div class="mb-6">
          <div class="form-control">
            <div class="input-group">
              <input type="text" id="searchInput" placeholder="Search loans..." class="input input-bordered w-full" />
              <button class="btn btn-square">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${loans.map(loan => `
            <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div class="card-body">
                <div class="flex justify-between items-center">
                  <h3 class="card-title">${loan.type}</h3>
                  <div class="badge badge-success gap-2">
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

    // Add search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
          const loanType = card.querySelector('.card-title').textContent.toLowerCase();
          card.style.display = loanType.includes(searchTerm) ? 'block' : 'none';
        });
      });
    }

  } catch (error) {
    console.error('Error fetching loans:', error);
    app.innerHTML = `
      ${renderHeader()}
      <main class="flex-1 container mx-auto px-4 py-8">
        <div class="alert alert-error">
          <i class="fas fa-exclamation-circle"></i>
          <span>Failed to load loans. Please try again later.</span>
        </div>
      </main>
      ${renderFooter('loans')}
    `;
  }
}

// Rest of your code (showLoanDetails and handleLoanApplication functions) remains the same