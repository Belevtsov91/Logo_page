// History toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('history-toggle');
  const historyText = document.querySelector('.history-text');
  
  // Функция проверки ширины экрана и автоматического раскрытия
  function checkScreenWidth() {
    if (window.innerWidth >= 768) {
      // На широких экранах автоматически раскрываем текст
      if (historyText) {
        historyText.classList.add('expanded');
      }
    } else {
      // На узких экранах убираем класс expanded (если не было клика)
      if (historyText && toggle) {
        const wasManuallyExpanded = toggle.getAttribute('aria-expanded') === 'true';
        if (!wasManuallyExpanded) {
          historyText.classList.remove('expanded');
        }
      }
    }
  }
  
  // Проверяем при загрузке
  checkScreenWidth();
  
  // Проверяем при изменении размера окна
  window.addEventListener('resize', checkScreenWidth);
  
  if (toggle && historyText) {
    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      
      if (!expanded) {
        historyText.classList.add('expanded');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.textContent = 'Приховати';
      } else {
        historyText.classList.remove('expanded');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Читати більше';
      }
    });
  }
});
