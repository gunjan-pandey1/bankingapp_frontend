export function renderForgotPassword() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <div class="card bg-base-100 shadow-xl w-full max-w-md">
        <div class="card-body">
          <div class="flex flex-col items-center space-y-2 mb-6">
            <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <i class="fas fa-key text-primary text-xl"></i>
            </div>
            <h2 class="card-title text-2xl font-bold text-center">Forgot Password</h2>
            <p class="text-center text-base-content/70">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div id="errorMessage" class="hidden alert alert-error mb-4"></div>
          <div id="successMessage" class="hidden alert alert-success mb-4"></div>
          
          <form id="forgotForm" class="space-y-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="email" id="email" class="input input-bordered focus:input-primary" required />
            </div>
            
            <button type="submit" class="btn btn-primary w-full">Send Reset Link</button>
            
            <p class="text-center text-sm">
              Remember your password? 
              <a href="#login" class="link link-primary">Back to Login</a>
            </p>
          </form>
          
          <div class="absolute top-4 right-4">
            <button onclick="toggleTheme()" class="btn btn-ghost btn-circle">
              <i class="fas fa-moon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('#forgotForm').addEventListener('submit', handleForgotPassword);
}

function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  
  // Get message elements
  const errorMessage = document.querySelector('#errorMessage');
  const successMessage = document.querySelector('#successMessage');

  // Clear previous messages
  errorMessage.classList.add('hidden');
  successMessage.classList.add('hidden');

  // Make API call to send reset link
  fetch('http://127.0.0.1:8000/api/forgetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Email not found');
      }
      throw new Error('Something went wrong');
    }
    return response.json();
  })
  .then(data => {
    // Show success message
    successMessage.textContent = data.message || 'Password reset link sent to your email';
    successMessage.classList.remove('hidden');

    // Clear the form
    document.querySelector('#email').value = '';

    // Redirect to login page after a delay
    setTimeout(() => {
      window.location.hash = '#login';
    }, 3000);
  })
  .catch(error => {
    // Show error message
    errorMessage.textContent = error.message || 'An error occurred. Please try again.';
    errorMessage.classList.remove('hidden');
  });
}