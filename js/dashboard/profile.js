import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export function renderProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const app = document.querySelector('#app');
  console.log(localStorage.getItem('user'));
  
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
                    <img id="profileImage" src="${user.image || 'https://via.placeholder.com/150'}" alt="Profile" class="w-full h-full object-cover rounded-full">
                  </div>
                </div>
                <div>
                  <p class="text-lg"><span class="font-semibold">Name:</span> ${user.name}</p>
                  <p class="text-lg"><span class="font-semibold">Email:</span> ${user.email}</p>
                  <button class="btn btn-primary mt-4" id="editProfileBtn">Edit Profile</button>
                   <button class="btn btn-outline mt-4" id="previewImageBtn">Preview</button> 
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
                <span class="text-4xl font-bold">150</span>
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
                    <th>Loan ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Months</th>
                  </tr>
                <tbody id="loanHistoryTableBody">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter('profile')}

    <!-- Edit Profile Modal -->
    <div id="editProfileModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Edit Profile</h3>
          <button id="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form id="editProfileForm" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Profile Image</span>
            </label>
            <div class="flex items-center space-x-4">
              <div class="w-24 h-24 rounded-full overflow-hidden">
                <img id="previewImage" src="${user.image || 'https://via.placeholder.com/150'}" alt="Preview" class="w-full h-full object-cover">
              </div>
              <input type="file" id="profileImageInput" accept="image/*" class="hidden">
              <button type="button" id="uploadImageBtn" class="btn btn-outline">Choose Image</button>
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input type="text" id="nameInput" class="input input-bordered" value="${user.name}" required>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" id="emailInput" class="input input-bordered" value="${user.email}" required>
          </div>
          <button type="submit" class="btn btn-primary w-full">Save Changes</button>
        </form>
      </div>
    </div>
  `;

 // Modal functionality
 const modal = document.getElementById('editProfileModal');
 const editProfileBtn = document.getElementById('editProfileBtn');
 const closeModal = document.getElementById('closeModal');
 const editProfileForm = document.getElementById('editProfileForm');
 const uploadImageBtn = document.getElementById('uploadImageBtn');
 const profileImageInput = document.getElementById('profileImageInput');
 const previewImage = document.getElementById('previewImage');
 const previewImageBtn = document.getElementById('previewImageBtn');

 

 // Open modal
 editProfileBtn.addEventListener('click', () => {
   modal.classList.remove('hidden');
   modal.classList.add('flex');
 });

 // Close modal
 closeModal.addEventListener('click', () => {
   modal.classList.add('hidden');
   modal.classList.remove('flex');
 });

 // Close modal when clicking outside
 modal.addEventListener('click', (e) => {
   if (e.target === modal) {
     modal.classList.add('hidden');
     modal.classList.remove('flex');
   }
 });

  // Handle image upload
  uploadImageBtn.addEventListener('click', () => {
    profileImageInput.click();
  });

  profileImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Add event listener for the preview button
// const previewImageBtn = document.getElementById('previewImageBtn');
previewImageBtn.addEventListener('click', () => {
  const imageUrl = user.image || 'https://via.placeholder.com/150'; // Get the image URL
  // Create a modal or a simple alert to show the image
  const imageModal = document.createElement('div');
  imageModal.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50';
  imageModal.innerHTML = `
    <div class="bg-white p-4 rounded">
      <img src="${imageUrl}" alt="Profile Preview" class="w-48 h-48 object-cover rounded-full">
      <button class="btn btn-outline mt-2" id="closePreviewBtn">Close</button>
    </div>
  `;
  document.body.appendChild(imageModal);

  // Event listener to close the preview modal
  const closePreviewBtn = document.getElementById('closePreviewBtn');
  closePreviewBtn.addEventListener('click', () => {
    document.body.removeChild(imageModal);
  });
});

// Handle form submission
editProfileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('name', document.getElementById('nameInput').value);
  formData.append('email', document.getElementById('emailInput').value);
  if (profileImageInput.files[0]) {
    formData.append('image', profileImageInput.files[0]);
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/update-profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // Don't set Content-Type header when sending FormData
      },
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    if (result.status) {
      // Update local storage with new user data
      const updatedUser = {
        ...user,
        name: document.getElementById('nameInput').value,
        email: document.getElementById('emailInput').value,
        image: result.image || user.image, // Update image if provided in response
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update UI
      document.querySelector('#profileImage').src = updatedUser.image || 'https://via.placeholder.com/150';
      document.querySelector('.text-lg:first-of-type').innerHTML = `<span class="font-semibold">Name:</span> ${updatedUser.name}`;
      document.querySelector('.text-lg:last-of-type').innerHTML = `<span class="font-semibold">Email:</span> ${updatedUser.email}`;

      // Refresh profile information
      renderProfile(); // Refresh the profile information

      // Close modal
      modal.classList.add('hidden');
      modal.classList.remove('flex');

      showAlert('Profile updated successfully!', 'success');
    } else {
      showAlert(result.message || 'Failed to update profile.', 'error');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    showAlert('An error occurred. Please try again later.', 'error');
  }
});


  // Bank form submission code remains the same...


  function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type === 'success' ? 'success' : 'error'} fixed top-4 right-4 w-auto shadow-lg`;
  alert.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
  }
  
 // Add event listener for the form submission
    document.querySelector('#bankForm')?.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission

      console.log('Form submitted');
      // Collect form data
      const bankDetails = {
        accountName: document.querySelector('#accountName').value,
        accountNumber: document.querySelector('#accountNumber').value,
        ifscCode: document.querySelector('#ifscCode').value,
        bankName: document.querySelector('#bankName').value,
      };
      const token = localStorage.getItem('accessToken');
      console.log(token); 


      try {
        // Send data to the backend using fetch
        const response = await fetch('http://127.0.0.1:8000/api/bank-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(bankDetails),
        });
        const result = await response.json();
        console.log(result); 

        // Check if the response was successful
        if (result.status) {
          // Show success message
          showAlert('Bank details saved successfully!', 'success');
        } else {
          // Show error message
          showAlert(result.message || 'Failed to save bank details.', 'error');
        }
      } catch (error) {
        console.error('Error saving bank details:', error);
        showAlert('An error occurred. Please try again later.', 'error');
      }
    });
  }

// Function to show alert messages
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success' : 'error'} fixed top-4 right-4 w-auto shadow-lg`;
    alert.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

async function fetchAndRenderLoanHistory() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/loanHistory', {
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
    // console.log(result.data);
    if (result.data.loans) {
      renderLoanHistoryTable(result.data.loans); // Pass the loans array
    } else {
      throw new Error('No loan data found');
    }
  } catch (error) {
    console.error('Error fetching loan history:', error);
    document.querySelector('#loanHistoryTableBody').innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-red-500">
          Failed to load loan history. Please try again later.
        </td>
      </tr>
    `;
  }
}

function renderLoanHistoryTable(loanHistory) {
  console.log(loanHistory);
  const tableBody = document.querySelector('#loanHistoryTableBody');
  
  if (!loanHistory || loanHistory.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">No loan history found</td>
      </tr>
    `;
    return;
  }
  tableBody.innerHTML = loanHistory
    .map(loans => `
      <tr>
        <td>${loans.loan_id || '-'}</td>
        <td>${loans.type || '-'}</td>
        <td>${formatAmount(loans.amount) || '-'}</td>
        <td><div class="badge badge-${loans.status === 1 ? 'success' : 'error'}">${loans.status === 1 ? 'Active' : 'Inactive'}</div></td>
        <td>${loans.term ? `${loans.term} Months` : '-'}</td>
      </tr>
    `)
    .join('');
}
fetchAndRenderLoanHistory();

function formatAmount(amount) {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}
