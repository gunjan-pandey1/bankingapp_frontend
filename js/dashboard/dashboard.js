import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export async function renderDashboard() {
  const app = document.querySelector('#app');
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  let creditScoreData = { score: 'Fetching...', details: '' };
  try {
    const response = await fetch('http://127.0.0.1:8000/api/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Refresh-Token': refreshToken,
      },
    });

    if (response.status === 401) {
      const refreshResponse = await response.json();
      if (refreshResponse.new_token) {
        localStorage.setItem('accessToken', refreshResponse.new_token);
        return renderDashboard();
      }
    }

    const data = await response.json();
    if (data.success) {
      creditScoreData = {
        score: data.data[0]?.credit_score || 'N/A',
        details: JSON.stringify(data.data),
      };
    } else {
      console.error('Failed to fetch credit score:', data.message);
    }
  } catch (error) {
    console.error('Error fetching credit score:', error);
  }

  app.innerHTML = `
    ${renderHeader()}
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="widget">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Credit Score</h3>
            <i class="fas fa-chart-line text-primary text-xl"></i>
          </div>
          <p class="text-2xl font-bold mb-2">${creditScoreData.score}</p>
          <p class="text-gray-600 dark:text-gray-400">${creditScoreData.details}</p>
        </div>
      </div>
    </main>
    ${renderFooter('dashboard')}
  `;
}