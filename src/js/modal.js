// Используем делегирование событий
document.addEventListener('click', (e) => {
    console.log('Click detected:', e.target); // Для отладки
    
    // Открытие модалки
    if (e.target.closest('.burger-btn')) {
        console.log('Burger clicked'); // Для отладки
        const modalOverlay = document.querySelector('.modal-overlay');
        console.log('Modal overlay:', modalOverlay); // Для отладки
        if (modalOverlay) {
            // Задержка 1.1 секунды для завершения анимации бургера (0.6s + 0.5s)
            setTimeout(() => {
                modalOverlay.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            }, 1100);
        }
    }
    
    // Закрытие модалки
    if (e.target.closest('.open-close-btn')) {
        console.log('Close button clicked'); // Для отладки
        // Задержка 200ms для завершения анимации кнопки закрытия
        setTimeout(() => {
            closeModal();
        }, 200);
    }
    
    // Закрытие по клику на оверлей
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }

    // Закрытие при клике на ссылки в модалке
    if (e.target.closest('.nav-link')) {
        console.log('Nav link clicked'); // Для отладки
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-open')) {
        closeModal();
    }
});

// Закрытие при изменении размера экрана на >= 768px
window.addEventListener('resize', () => {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (window.innerWidth >= 768 && modalOverlay && modalOverlay.classList.contains('is-open')) {
        closeModal();
    }
});

// Функция закрытия
function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const burgerBtn = document.querySelector('.burger-btn');
    
    if (modalOverlay) {
        modalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }
    
    // Сброс анимации бургера
    if (burgerBtn) {
        burgerBtn.classList.add('reset');
        setTimeout(() => {
            burgerBtn.classList.remove('reset');
        }, 300);
    }
}
