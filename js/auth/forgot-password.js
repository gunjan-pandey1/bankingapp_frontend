export function renderForgotPassword() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <div class="card bg-base-100 shadow-xl w-full max-w-md">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold text-center justify-center mb-2">Forgot Password</h2>
          <p class="text-center text-base-content/70 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
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
  
  // Show success message
  const alert = document.createElement('div');
  alert.className = 'alert alert-success fixed top-4 right-4 w-auto';
  alert.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>Password reset link sent to ${email}</span>
  `;
  document.body.appendChild(alert);
  setTimeout(() => {
    alert.remove();
    window.location.hash = '#login';
  }, 3000);
}