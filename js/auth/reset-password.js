export function renderResetPassword() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="auth-container">
      <h2>Reset Password</h2>
      <form id="resetPasswordForm">
        <div class="form-group">
          <input
            type="password"
            id="password"
            placeholder="New Password"
            class="input input-bordered focus:input-primary w-full"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm New Password"
            class="input input-bordered focus:input-primary w-full"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-full">Reset Password</button>
      </form>
      <div id="successMessage" class="success-message" style="display: none;"></div>
      <div id="errorMessage" class="error-message" style="display: none;"></div>
      <p>
        Remembered your password? <a href="#login">Login</a>
      </p>
    </div>
  `;

  // Add form submit event listener
  const form = document.getElementById('resetPasswordForm');
  form.addEventListener('submit', handleResetPassword);
}

async function handleResetPassword(e) {
  e.preventDefault();
  
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const token = new URLSearchParams(window.location.search).get('token');
  
  const errorMessageDiv = document.getElementById('errorMessage');
  const successMessageDiv = document.getElementById('successMessage');
  
  // Reset messages
  errorMessageDiv.style.display = 'none';
  successMessageDiv.style.display = 'none';
  
  // Validate passwords match
  if (password !== confirmPassword) {
    errorMessageDiv.textContent = 'Passwords do not match.';
    errorMessageDiv.style.display = 'block';
    return;
  }
  
  try {
    const response = await fetch('http://127.0.0.1:8000/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    // Show success message
    successMessageDiv.textContent = data.message || 'Password reset successful!';
    successMessageDiv.style.display = 'block';

    // Redirect to login after delay
    setTimeout(() => {
      window.location.hash = '#login';
    }, 3000);

  } catch (err) {
    errorMessageDiv.textContent = err.message || 'Something went wrong.';
    errorMessageDiv.style.display = 'block';
  }
}