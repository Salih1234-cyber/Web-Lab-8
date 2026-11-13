const statusEl = document.getElementById('status-code');
const bodyEl = document.getElementById('response-body');
const buttons = document.querySelectorAll('button[data-url]');

async function callEndpoint(url, method) {
  statusEl.textContent = 'Loading...';
  bodyEl.textContent = '';

  try {
    const response = await fetch(url, { method });
    statusEl.textContent = `${response.status} ${response.statusText}`;

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      bodyEl.textContent = JSON.stringify(data, null, 2);
    } else {
      const text = await response.text();
      bodyEl.textContent = text;
    }
  } catch (error) {
    statusEl.textContent = 'Network Error';
    bodyEl.textContent = `Request failed: ${error.message}`;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const url = button.dataset.url;
    const method = button.dataset.method;
    callEndpoint(url, method);
  });
});