import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

let banksData = [];
let loansData = [];
export async function renderLoans() {
  const app = document.querySelector('#app');

  try {
    const response = await fetch('http://127.0.0.1:8000/api/loans', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token for auth:api middleware
        'Accept': 'application/json',
      }
    });

    const result = await response.json();
    console.log(result);
    if (result.status) {
      console.log(result.data);
      loansData = result.data.loans;
      banksData = result.data.banks;
    } else {
      console.error('Failed to fetch loans:', result.message);
    }
  } catch (error) {
    console.error('Error fetching loans:', error);
  }

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
        ${loansData.length > 0 ? loansData.map(loan => `
          <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div class="card-body">
              <div class="flex justify-between items-center">
                <h3 class="card-title">${loan.type}</h3>
                <div class="badge ${String(loan.status).toLowerCase() === 'active' ? 'badge-success' : 'badge-warning'} gap-2">
                  ${loan.status}
                </div>
              </div>
              <div class="space-y-2 my-4">
                <p class="flex justify-between">
                  <span class="text-base-content/70">Amount:</span>
                  <span class="font-semibold">${loan.amount}</span>
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
                <button class="btn btn-primary" onclick="showLoanDetails('${loan.type}', ${loan.amount}, ${loan.loan_id})">
                  View Details
                </button>
              </div>
            </div>
          </div>
        `).join('') : `
          <div class="col-span-full text-center py-8">
            <p class="text-base-content/70">No loans found</p>
          </div>
        `}
      </div>
    </main>
    ${renderFooter('loans')}
  `;
}

// Keep existing showLoanDetails function unchanged
window.showLoanDetails = (type, amount, loanId) => {
  console.log('Banks Data:', banksData);
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
                <span>Loan Amount: ${amount}</span>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Select Bank</span>
                </label>
                  <select id="bank" class="select select-bordered w-full">
                    <option value="">Select a bank</option>
                    ${banksData.length > 0 ? banksData.map(bank => `
                      <option value="${bank.id}">${bank.bankName}</option>
                    `).join('') : '<option value="">No banks available</option>'}
                  </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Loan Tenure</span>
                  <span class="label-text-alt" id="tenureValue">6 months</span>
                </label>
                <input type='hidden' id='loanId' value='${loanId}' />
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

window.handleLoanApplication = async () => {
  const bank = document.querySelector('#bank').value;
  console.log(bank);
  if (!bank) {
    alert('Please select a bank before proceeding.');
    return;
  }
  const tenure = document.querySelector('#tenure').value;
  const loanType = document.querySelector('.card-title').textContent.replace(' Details', '');
  const loanAmount = document.querySelector('.alert-info span').textContent.replace('Loan Amount: ', '');
  const loanId = document.querySelector('#loanId').value;

  try {
    console.log('Loan ID:', loanId);
    const response = await fetch('http://127.0.0.1:8000/api/loanViewDetails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bank: bank,
        tenure: tenure,
        loan_type: loanType,
        loan_amount: loanAmount,
        loan_id: loanId,
 
      })
    });

    const result = await response.json();
    
    if (result.success) {
      location.hash = '#transactions';
    } else {
      alert(result.message || 'Failed to process loan application');
    }
  } catch (error) {
    console.error('Error submitting loan application:', error);
    alert('Failed to process loan application');
  }
};