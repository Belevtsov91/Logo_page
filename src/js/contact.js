document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('formStatus');

  if (!form || !submitBtn || !statusEl) return;

  function setError(input, message) {
    const err = input.parentElement.querySelector('.error-message');
    if (err) err.textContent = message || '';
    input.classList.add('has-error');
  }

  function clearError(input) {
    const err = input.parentElement.querySelector('.error-message');
    if (err) err.textContent = '';
    input.classList.remove('has-error');
  }

  function validate() {
    let ok = true;
    const name = form.name;
    const email = form.email;
    const message = form.message;

    if (!name.value.trim()) {
      setError(name, 'Вкажіть імʼя');
      ok = false;
    } else {
      clearError(name);
    }

    const emailVal = email.value.trim();
    if (!emailVal) {
      setError(email, 'Вкажіть email');
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailVal)) {
      setError(email, 'Невірний формат email');
      ok = false;
    } else {
      clearError(email);
    }

    if (!message.value.trim() || message.value.trim().length < 6) {
      setError(message, 'Додайте коротке повідомлення (мінімум 6 символів)');
      ok = false;
    } else {
      clearError(message);
    }

    return ok;
  }

  Array.from(form.elements).forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.addEventListener('input', () => clearError(el));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validate()) {
      statusEl.textContent = 'Будь ласка, виправте помилки в формі.';
      statusEl.style.color = 'rgba(255,120,140,1)';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Відправка...';
    statusEl.textContent = 'Завантаження...';
    statusEl.style.color = 'rgba(255,255,255,0.6)';

    // GET запит з параметрами
    const params = new URLSearchParams({
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    });

    fetch(`https://jsonplaceholder.typicode.com/posts?${params}`, {
      method: 'GET',
    })
    .then(response => {
      if (response.ok) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Відправити';
        statusEl.textContent = 'Дякуємо! Повідомлення надіслано.';
        statusEl.style.color = '#6fe3a6';
        form.reset();

        setTimeout(() => {
          statusEl.textContent = '';
        }, 5000);
      } else {
        throw new Error('Помилка відправки');
      }
    })
    .catch(error => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Відправити';
      statusEl.textContent = 'Помилка. Спробуйте пізніше.';
      statusEl.style.color = 'rgba(255,120,140,1)';
    });
  });
});
