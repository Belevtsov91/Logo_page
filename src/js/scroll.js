// Функция для кнопки прокрутки вверх
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTopBtn');
    
    if (!scrollButton) {
        console.error('Scroll button not found');
        return;
    }
    
    console.log('Scroll button initialized');
    
    // Показать/скрыть кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.remove('hidden');
        } else {
            scrollButton.classList.add('hidden');
        }
    });
    
    // Обработчик клика по кнопке
    scrollButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Scroll button clicked');
        
        // Прокрутка к верху страницы
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});