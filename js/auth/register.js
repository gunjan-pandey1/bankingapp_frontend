export function renderRegister() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <div class="card bg-base-100 shadow-xl w-full max-w-md">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold text-center justify-center mb-6">Create Account</h2>
          <div id="successMessage" class="hidden text-center text-green-500 mb-4"></div>
          <form id="registerForm" class="space-y-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Full Name</span>
              </label>
              <input type="text" id="name" class="input input-bordered focus:input-primary" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="email" id="email" class="input input-bordered focus:input-primary" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" id="password" class="input input-bordered focus:input-primary" required />
              <label class="label">
                <span class="label-text-alt">Must be at least 8 characters</span>
              </label>
            </div>
            <button type="submit" class="btn btn-primary w-full">Register</button>
            
            <div class="divider">OR</div>
            
            <div class="space-y-3">
              <button type="button" onclick="handleGoogleLogin()" class="btn btn-outline w-full gap-2">
                <i class="fab fa-google"></i> Continue with Google
              </button>
              <button type="button" onclick="handleGithubLogin()" class="btn btn-outline w-full gap-2">
                <i class="fab fa-github"></i> Continue with GitHub
              </button>
            </div>
            
            <p class="text-center text-sm">
              Already have an account? 
              <a href="#login" class="link link-primary">Login</a>
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

  document.querySelector('#registerForm').addEventListener('submit', handleRegister);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch('http://127.0.0.1:8000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.success) {
      // Handle successful registration
      console.log('Registration successful:', data);
      const successMessage = document.querySelector('#successMessage');
      successMessage.textContent = 'Registration successful! Redirecting to login...';
      successMessage.classList.remove('hidden');
      setTimeout(() => {
        window.location.hash = '#login';
      }, 2000);
    } else {
      // Handle registration errorit 
      console.error('Registration failed:', data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}