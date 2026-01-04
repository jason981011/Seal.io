// calendar.js - 行事曆頁面邏輯
document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const birthdayModal = document.getElementById('birthday-modal');
    const modalClose = document.querySelector('.modal-close');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const ctx = confettiCanvas.getContext('2d');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // 生日日期設定
    const birthdayDay = 15; // 可以修改為實際生日日期

    // GSAP 動畫時間軸
    const tl = gsap.timeline();

    // 頁面載入動畫
    tl.from('.page-title', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)'
    })
    .from('.page-subtitle', {
        duration: 0.8,
        y: -30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.calendar-container', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.magic-hint', {
        duration: 0.6,
        x: -50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.2');

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        monthYear.textContent = `${currentYear}年 ${currentMonth + 1}月`;

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        for (let i = 0; i < 42; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');

            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);

            const dayNumber = day.getDate();
            const dayMonth = day.getMonth();
            const dayYear = day.getFullYear();

            dayElement.innerHTML = `
                <div class="day-number">${dayNumber}</div>
                <div class="day-content"></div>
            `;

            if (dayMonth !== currentMonth) {
                dayElement.classList.add('other-month');
            }

            if (day.toDateString() === new Date().toDateString()) {
                dayElement.classList.add('today');
                dayElement.querySelector('.day-content').innerHTML = '<span class="today-marker">📅</span>';
            }

            if (dayNumber === birthdayDay && dayMonth === currentMonth && dayYear === currentDate.getFullYear()) {
                dayElement.classList.add('birthday-day');
                dayElement.querySelector('.day-content').innerHTML = '<span class="birthday-marker">🎂</span>';

                // 添加閃爍動畫
                gsap.to(dayElement.querySelector('.birthday-marker'), {
                    duration: 1.5,
                    scale: 1.2,
                    rotation: 360,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true
                });

                dayElement.addEventListener('click', openBirthdayModal);
            }

            calendarGrid.appendChild(dayElement);
        }

        // 為新渲染的日期添加動畫
        gsap.from('.calendar-day', {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            stagger: 0.02,
            ease: 'back.out(1.7)'
        });
    }

    function openBirthdayModal() {
        birthdayModal.classList.remove('hidden');

        // 播放發現音效
        playSound('birthday-discover-sound');

        // 模態框動畫
        gsap.from('.modal-container', {
            duration: 0.6,
            scale: 0.5,
            opacity: 0,
            ease: 'back.out(1.7)'
        });

        gsap.from('.magic-reveal', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.3
        });

        gsap.from('.birthday-options', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.6
        });

        // 啟動彩紙
        launchConfetti();
    }

    function closeModal() {
        gsap.to('.modal-container', {
            duration: 0.4,
            scale: 0.8,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                birthdayModal.classList.add('hidden');
            }
        });
    }

    function goToBirthday() {
        // 創建轉場效果
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        transition.innerHTML = `
            <div class="transition-circle"></div>
            <div class="transition-sparks"></div>
        `;
        document.body.appendChild(transition);

        gsap.to(transition, {
            duration: 0.5,
            scale: 2,
            opacity: 1,
            ease: 'power2.in',
            onComplete: () => {
                window.location.href = 'birthday.html';
            }
        });
    }

    function launchConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];

        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - 100,
                vx: (Math.random() - 0.5) * 12,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }

        function animate() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // 重力
                particle.rotation += particle.rotationSpeed;

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation * Math.PI / 180);
                ctx.fillStyle = particle.color;
                ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                ctx.restore();
            });

            particles = particles.filter(particle => particle.y < confettiCanvas.height + 50);

            if (particles.length > 0) {
                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    function playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('音效播放失敗:', e));
        }
    }

    // 事件監聽器
    prevMonthBtn.addEventListener('click', () => {
        playSound('calendar-sound');
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        playSound('calendar-sound');
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    modalClose.addEventListener('click', closeModal);

    birthdayModal.addEventListener('click', (e) => {
        if (e.target === birthdayModal) {
            closeModal();
        }
    });

    // 鍵盤控制
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !birthdayModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // 導航切換
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 初始化
    renderCalendar();

    // 添加一些互動效果
    document.addEventListener('mousemove', function(e) {
        const hint = document.querySelector('.magic-hint');
        const rect = hint.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / 20;
        const deltaY = (e.clientY - centerY) / 20;

        gsap.to(hint, {
            duration: 0.5,
            x: deltaX,
            y: deltaY,
            ease: 'power2.out'
        });
    });
});