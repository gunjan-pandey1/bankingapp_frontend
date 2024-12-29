import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export function renderTransactions() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="mb-6">
        <div class="form-control">
          <div class="input-group">
            <input type="text" placeholder="Search transactions..." class="input input-bordered w-full" />
            <button class="btn btn-square">
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
                  <th>Loan ID</th> <!-- New column -->
                  <th>Type</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${generateTransactions().map(t => `
                  <tr>
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="badge ${t.type === 'credit' ? 'badge-success' : 'badge-error'} badge-sm">
                          <i class="fas fa-${t.type === 'credit' ? 'arrow-down' : 'arrow-up'} mr-1"></i>
                          ${t.type}
                        </div>
                      </div>
                    </td>
                    <td>${t.description}</td>
                    <td>${t.date}</td>
                    <td class="font-semibold ${t.type === 'credit' ? 'text-success' : 'text-error'}">
                      ${t.type === 'credit' ? '+' : '-'}$${t.amount}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter('transactions')}
  `;
}

function generateTransactions() {
  return [
    { type: 'debit', description: 'Loan Payment', amount: '450', date: 'Mar 15, 2024' },
    { type: 'credit', description: 'Loan Disbursement', amount: '10000', date: 'Jan 10, 2024' },
    { type: 'debit', description: 'Processing Fee', amount: '100', date: 'Jan 10, 2024' },
    { type: 'debit', description: 'Loan Payment', amount: '450', date: 'Feb 15, 2024' },
    { type: 'debit', description: 'Loan Payment', amount: '450', date: 'Jan 15, 2024' },
    { type: 'credit', description: 'Cashback', amount: '50', date: 'Jan 5, 2024' },
    { type: 'debit', description: 'Late Fee', amount: '25', date: 'Dec 16, 2023' },
    { type: 'debit', description: 'Loan Payment', amount: '450', date: 'Dec 15, 2023' },
  ];
}