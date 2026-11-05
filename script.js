   // 1. УПРАВЛЕНИЕ МУЗЫКОЙ И ИКОНКАМИ PLAY / PAUSE
const audio = document.getElementById('myAudio');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');

musicBtn.addEventListener('click', function () {
    if (audio.paused) {
        audio.play().then(() => {
            musicIcon.textContent = '⏸'; // Красивая иконка паузы
            musicText.textContent = 'PAUSE'; // Или 'Тоқтату'
        }).catch(error => {
            console.log("Автовоспроизведение заблокировано браузером", error);
            alert("Музыканы қосу үшін тағы бір рет басыңыз.");
        });
    } else {
        audio.pause();
        musicIcon.textContent = '▶'; // Иконка play
        musicText.textContent = 'PLAY'; // Или 'Әуен'
    }
});

// 2. ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ДО 6 ДЕКАБРЯ 2026, 18:00
const weddingDate = new Date('December 6, 2026 18:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);









    // 3. НАДЕЖНОЕ УПРАВЛЕНИЕ КНОПКОЙ ПРИ СКРОЛЛЕ
    function updateMusicButtonPosition() {
        const musicBtn = document.getElementById('musicBtn');
        if (!musicBtn) return;

        if (window.scrollY > 300) {
            musicBtn.classList.add('fixed-top-right');
        } else {
            musicBtn.classList.remove('fixed-top-right');
        }
    }

    window.addEventListener('scroll', updateMusicButtonPosition, { passive: true });
    updateMusicButtonPosition();

    // 4. ЛЕГКАЯ И НАДЕЖНАЯ СМЕНА КАРТИНЕК (Rest1 - Rest5)
    const photoList = ['rest1.jpg', 'rest2.jpg', 'rest3.jpg'];
    let centerIdx = 0;

    function rotatePhotos() {
        const imgLeft = document.getElementById('imgLeft');
        const imgCenter = document.getElementById('imgCenter');
        const imgRight = document.getElementById('imgRight');

        if (!imgLeft || !imgCenter || !imgRight) return;

        const leftIdx = (centerIdx - 1 + photoList.length) % photoList.length;
        const rightIdx = (centerIdx + 1) % photoList.length;

        imgLeft.style.opacity = 0;
        imgCenter.style.opacity = 0;
        imgRight.style.opacity = 0;

        setTimeout(() => {
            imgLeft.src = photoList[leftIdx];
            imgCenter.src = photoList[centerIdx];
            imgRight.src = photoList[rightIdx];

            imgLeft.style.opacity = 0.55;
            imgCenter.style.opacity = 1;
            imgRight.style.opacity = 0.55;

            centerIdx = (centerIdx + 1) % photoList.length;
        }, 300);
    }

    setInterval(rotatePhotos, 2000);



 // Твоя актуальная ссылка на веб-приложение Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx96L0l-oXIrp5ZI8GrZU8-SDRKuNxdaOCjzCSfDHQ2HOZzO7crszrqPD91t_f0YrgL6w/exec";

const rsvpForm = document.getElementById('weddingForm');
const nameInput = document.getElementById('nameInput');

// 1. Отслеживаем ввод "120726" в поле имени для открытия админки прямо на сайте
nameInput.addEventListener('input', function () {
    if (this.value.trim() === '120726') {
        this.value = '';
        loadAdminPanel();
    }
});

// 2. Функция загрузки списка гостей в админ-панель
function loadAdminPanel() {
    const panel = document.getElementById('adminPanel');
    const tbody = document.querySelector('#adminTable tbody');
    const stats = document.getElementById('adminStats');

    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth' });
    stats.innerText = "Загрузка списка гостей...";

    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

    window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);

        tbody.innerHTML = '';
        let totalWillCome = 0;

        if (!Array.isArray(data) || data.length === 0) {
            stats.innerText = "Список пока пуст.";
            return;
        }

        data.forEach(guest => {
            const attendanceText = (guest.attendance || '').toLowerCase();

            // Проверяем, что это НЕ отказ
            const isNotDeclined = !attendanceText.includes('алмаймын') && !attendanceText.includes('не');

            // Проверяем, придет ли человек с парой
            const isWithPartner = attendanceText.includes('жұбайыммен') || attendanceText.includes('парой') || attendanceText.includes('супруг');

            // Проверяем, придет ли вообще
            const isComing = attendanceText.includes('прид') || attendanceText.includes('да') || attendanceText.includes('келе');

            if (isNotDeclined && isComing) {
                if (isWithPartner) {
                    totalWillCome += 2; // Гость + пара = 2 человека
                } else {
                    totalWillCome += 1; // Только 1 человек
                }
            }

            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid rgba(107, 15, 23, 0.1)';
            tr.innerHTML = `
                <td style="padding: 10px; font-weight: 600; color: #4A3B3C;">${guest.name || ''}</td>
                <td style="padding: 10px; color: #6B0F17;">${guest.attendance || ''} ${isWithPartner ? '👥 (2 чел.)' : ''}</td>
            `;
            tbody.appendChild(tr);
        });

        stats.innerText = `Барлығы жауап бергендер: ${data.length} | Точно придут: ${totalWillCome}`;
    };

    const script = document.createElement('script');
    script.src = `${SCRIPT_URL}?callback=${callbackName}`;
    script.onerror = function () {
        stats.innerText = "Ошибка загрузки списка.";
    };
    document.body.appendChild(script);
}

// 3. Обработка отправки формы гостем
rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: nameInput.value,
        attendance: document.querySelector('input[name="attendance"]:checked')?.value || 'Не указано',
        drinks: '',
        message: document.getElementById('guestMessage')?.value || ''
    };

    // Показываем наше красивое модальное окно вместо alert
    document.getElementById('customModal').style.display = 'flex';
    rsvpForm.reset();

    // Запрос отправляется в фоновом режиме в Google Таблицу
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).catch(error => {
        console.error('Ошибка отправки:', error);
    });
});

// Обработчик закрытия модального окна по кнопке "OK"
document.getElementById('closeModalBtn').addEventListener('click', function () {
    document.getElementById('customModal').style.display = 'none';
});