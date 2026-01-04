document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const birthdayModal = document.getElementById('birthday-modal');
    const closeBtn = document.querySelector('.close');
    const convertTimeBtn = document.getElementById('convert-time');
    const muggleTimeSpan = document.getElementById('muggle-time');
    const wizardTimeSpan = document.getElementById('wizard-time');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // 假設生日是當月的15日
    const birthdayDay = 15;

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        monthYear.textContent = `${currentYear}年 ${currentMonth + 1}月`;

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        for (let i = 0; i < 42; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');

            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);

            const dayNumber = day.getDate();
            const dayMonth = day.getMonth();
            const dayYear = day.getFullYear();

            dayElement.textContent = dayNumber;

            if (dayMonth !== currentMonth) {
                dayElement.classList.add('other-month');
            }

            if (day.toDateString() === new Date().toDateString()) {
                dayElement.classList.add('today');
            }

            if (dayNumber === birthdayDay && dayMonth === currentMonth && dayYear === currentYear) {
                dayElement.classList.add('birthday');
                dayElement.addEventListener('click', openBirthdayModal);
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    function openBirthdayModal() {
        birthdayModal.classList.remove('hidden');
        launchConfetti();
        updateTimes();
    }

    function closeBirthdayModal() {
        birthdayModal.classList.add('hidden');
    }

    function updateTimes() {
        const now = new Date();
        muggleTimeSpan.textContent = now.toLocaleTimeString('zh-TW');
        // 簡單的巫師時間轉換：每小時對應不同的巫師時間單位
        const wizardHours = ['午夜', '凌晨', '黎明', '早晨', '上午', '中午', '下午', '傍晚', '黃昏', '夜晚'];
        const hour = now.getHours();
        wizardTimeSpan.textContent = wizardHours[Math.floor(hour / 2.4)];
    }

    function launchConfetti() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - 100,
                vx: (Math.random() - 0.5) * 10,
                vy: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 6 + 2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // gravity

                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            particles = particles.filter(particle => particle.y < canvas.height);

            if (particles.length > 0) {
                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    closeBtn.addEventListener('click', closeBirthdayModal);

    window.addEventListener('click', (event) => {
        if (event.target === birthdayModal) {
            closeBirthdayModal();
        }
    });

    convertTimeBtn.addEventListener('click', updateTimes);

    renderCalendar();
});