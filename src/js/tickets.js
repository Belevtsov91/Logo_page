document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('ticketPopup');
    const closeBtn = document.getElementById('closeTicketPopup');
    const ticketForm = document.getElementById('ticketForm');
    const orderButtons = document.querySelectorAll('.order-tickets');

    // Відкриття popup при кліку на кнопку
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Отримуємо дані з рядка таблиці
            const row = btn.closest('.dates-item');
            const place = row.querySelector('.places')?.textContent || '';
            const date = row.querySelector('.concerts-dates')?.textContent || '';
            
            // Заповнюємо popup
            document.getElementById('eventName').textContent = 'Грим та Грім';
            document.getElementById('eventPlace').textContent = place;
            document.getElementById('eventDate').textContent = date;
            
            // Показуємо popup
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закриття popup
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Закриття по кліку поза popup
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Закриття через клавішу Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Відправка форми
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(ticketForm);
        const params = new URLSearchParams({
            name: formData.get('name'),
            email: formData.get('email'),
            tickets: formData.get('tickets'),
            event: document.getElementById('eventPlace').textContent,
            date: document.getElementById('eventDate').textContent
        });

        // GET запит
        fetch(`https://your-backend.com/order?${params}`, {
            method: 'GET'
        })
        .then(response => {
            if (response.ok) {
                alert('Квиток успішно замовлено!');
                popup.classList.remove('active');
                document.body.style.overflow = '';
                ticketForm.reset();
            }
        })
        .catch(error => {
            alert('Помилка замовлення. Спробуйте пізніше.');
        });
    });
});