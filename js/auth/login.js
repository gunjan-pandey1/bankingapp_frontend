export function renderLogin() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <div class="card bg-base-100 shadow-xl w-full max-w-md">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold text-center justify-center mb-6">Login</h2>
          <form id="loginForm" class="space-y-4">
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
                <a href="#forgot-password" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <button type="submit" class="btn btn-primary w-full">Login</button>
            
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
              Don't have an account? 
              <a href="#register" class="link link-primary">Register</a>
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

  document.querySelector('#loginForm').addEventListener('submit', handleLogin);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Handle successful login
      console.log('Login successful:', data);
      alert('Login successful!');
      window.location.hash = '#dashboard';
    } else {
      // Handle login error
      console.error('Login failed:', data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}