import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export function renderProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Profile Information</h3>
            <div class="flex items-center gap-6 my-4">
              <div class="avatar placeholder">
                <div class="w-24 rounded-full bg-neutral-focus text-neutral-content">
                  <span class="text-3xl"><i class="fas fa-user"></i></span>
                </div>
              </div>
              <div>
                <p class="text-lg"><span class="font-semibold">Name:</span> ${user.name}</p>
                <p class="text-lg"><span class="font-semibold">Email:</span> ${user.email}</p>
                <button class="btn btn-primary mt-4">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Bank Details</h3>
            <form id="bankForm" class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Account Holder Name</span>
                </label>
                <input type="text" id="accountName" class="input input-bordered" required />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Account Number</span>
                </label>
                <input type="text" id="accountNumber" class="input input-bordered" required />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">IFSC Code</span>
                </label>
                <input type="text" id="ifscCode" class="input input-bordered" required />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Bank Name</span>
                </label>
                <input type="text" id="bankName" class="input input-bordered" required />
              </div>
              <button type="submit" class="btn btn-primary w-full">Save Bank Details</button>
            </form>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Credit Score</h3>
            <div class="text-center py-6">
              <div class="radial-progress text-primary" style="--value:85; --size:12rem; --thickness: 2px;">
                <span class="text-4xl font-bold">750</span>
              </div>
              <p class="mt-4 text-lg font-semibold text-success">Excellent</p>
              <button class="btn btn-outline btn-primary mt-4">View Details</button>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Refer & Earn</h3>
            <p class="text-base-content/70 my-4">Share your referral code and earn rewards!</p>
            <div class="join w-full">
              <input type="text" value="LOAN123" readonly class="input input-bordered join-item flex-1" />
              <button class="btn btn-primary join-item">Copy</button>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl lg:col-span-2">
          <div class="card-body">
            <h3 class="card-title">Loan History</h3>
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>Loan Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Personal Loan</td>
                    <td>$15,000</td>
                    <td><div class="badge badge-success">Active</div></td>
                    <td><button class="btn btn-sm">View</button></td>
                  </tr>
                  <tr>
                    <td>Home Loan</td>
                    <td>$10,000</td>
                    <td><div class="badge badge-success">Active</div></td>
                    <td><button class="btn btn-sm">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter('profile')}
  `;

  document.querySelector('#bankForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const alert = document.createElement('div');
    alert.className = 'alert alert-success fixed top-4 right-4 w-auto';
    alert.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Bank details saved successfully!</span>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
  });
}