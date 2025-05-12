import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export async function renderTransactions() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="mb-6">
        <div class="form-control">
          <div class="input-group">
            <input type="text" placeholder="Search transactions..." class="input input-bordered w-full" id="searchInput" />
            <button class="btn btn-square" id="searchButton">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <div class="overflow-x-auto" style="max-height: 70vh;">
            <table class="table table-zebra">
              <thead class="sticky top-0 bg-base-100">
                <tr>
                  <th>Loan ID</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody id="transactionTableBody">
                <!-- Transactions will be rendered here -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter('transactions')}
  `;

  await fetchAndRenderTransactions();

  document.getElementById('searchInput').addEventListener('input', (e) => {
    filterTransactions(e.target.value.toLowerCase());
  });

  document.getElementById('searchButton').addEventListener('click', () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    filterTransactions(searchValue);
  });
}

async function fetchAndRenderTransactions() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/txnDetails', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result);

    if (result.success) {  // Fixed the success check
      renderTransactionTable(result.data);
    } else {
      throw new Error(result.message || 'Failed to fetch transactions');
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    document.getElementById('transactionTableBody').innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-red-500">
          Failed to load transactions. Please try again later.
        </td>
      </tr>
    `;
  }
}


function renderTransactionTable(transactions) {
  const tableBody = document.getElementById('transactionTableBody');
  
  if (!transactions || transactions.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">No transactions found</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = transactions
    .map(transaction => `
      <tr>
        <td>${transaction.loan_id || '-'}</td>
        <td>${transaction.transaction_type || '-'}</td>
        <td>${transaction.description || '-'}</td>
        <td>${formatDate(transaction.txnDate)}</td>
        <td class="text-right">${formatAmount(transaction.transaction_amount)}</td>
      </tr>
    `)
    .join('');
}

function filterTransactions(searchValue) {
  const rows = document.querySelectorAll('#transactionTableBody tr');
  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchValue) ? '' : 'none';
  });
}

function formatDate(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatAmount(amount) {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}