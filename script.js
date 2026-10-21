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
    const photoList = ['Rest1.png', 'Rest2.png', 'Rest3.png', 'Rest4.png', 'Rest5.png'];
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


///////////////////////////////




 