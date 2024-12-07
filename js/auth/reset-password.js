document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.querySelector('#password');
  const passwordConfirmationInput = document.querySelector('#passwordConfirmation');
  const messageElement = document.querySelector('#message');
  const errorElement = document.querySelector('#error');
  const resetForm = document.querySelector('#resetForm');

  resetForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const password = passwordInput.value;
    const passwordConfirmation = passwordConfirmationInput.value;
    const token = new URLSearchParams(window.location.search).get('token');

    if (password !== passwordConfirmation) {
      errorElement.textContent = 'Passwords do not match.';
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
      });

      const data = await response.json();
      if (response.ok) {
        messageElement.textContent = data.message;
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      errorElement.textContent = err.message || 'Something went wrong.';
    }
  });
});