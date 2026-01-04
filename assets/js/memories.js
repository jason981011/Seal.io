// memories.js - 熊彥亭的回憶時光長廊邏輯
document.addEventListener('DOMContentLoaded', function() {
    // GSAP 動畫時間軸
    const tl = gsap.timeline();

    // 載入動畫
    function initLoadingAnimation() {
        const loader = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');

        // 載入器動畫
        gsap.to('.loader-sparkles .sparkle', {
            duration: 1,
            rotation: 360,
            scale: 1.2,
            stagger: 0.1,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
        });

        gsap.to('.loader-ring', {
            duration: 2,
            rotation: 360,
            ease: 'none',
            repeat: -1
        });

        // 模擬載入完成
        setTimeout(() => {
            gsap.to(loader, {
                duration: 0.8,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                    loader.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    initPageAnimation();
                }
            });
        }, 2000);
    }

    // 頁面載入動畫
    function initPageAnimation() {
        tl.from('.memories-title', {
            duration: 1.5,
            y: -50,
            opacity: 0,
            ease: 'back.out(1.7)'
        })
        .from('.memories-subtitle', {
            duration: 1,
            y: -30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=1')
        .from('.timeline-section', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.memory-card', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.3');
    }

    // 回憶數據
    const memoriesData = [
        {
            id: 1,
            year: 2023,
            month: 6,
            title: "學業里程碑",
            description: "重要的學業成就，每一個進步都值得慶祝",
            icon: "🎓",
            color: "#FFD700",
            details: "在學業上取得了重要的突破，這是努力付出的結果。"
        },
        {
            id: 2,
            year: 2023,
            month: 9,
            title: "創意火花",
            description: "藝術創作的靈感，創意的火花閃耀",
            icon: "🎨",
            color: "#FF6B6B",
            details: "開始了新的創作項目，靈感如泉湧般湧現。"
        },
        {
            id: 3,
            year: 2023,
            month: 11,
            title: "秋天的溫暖",
            description: "楓葉紅了的季節，溫暖的秋日時光",
            icon: "🍂",
            color: "#8E44AD",
            details: "秋天的校園特別美麗，與朋友們一起享受這美好的季節。"
        },
        {
            id: 4,
            year: 2024,
            month: 1,
            title: "生日慶祝",
            description: "熊彥亭的生日派對，充滿歡樂和祝福",
            icon: "🎂",
            color: "#3498DB",
            details: "一年一度的重要日子，收到了許多溫暖的祝福。"
        },
        {
            id: 5,
            year: 2024,
            month: 3,
            title: "春天的約定",
            description: "櫻花盛開的季節，我們的美好約定",
            icon: "🌸",
            color: "#2ECC71",
            details: "春天的到來帶來了新的希望和期待。"
        },
        {
            id: 6,
            year: 2024,
            month: 7,
            title: "海邊的回憶",
            description: "夏日的美好時光，海風輕拂的日子",
            icon: "🏖️",
            color: "#E74C3C",
            details: "夏天的海邊總是充滿了快樂和放鬆的時光。"
        }
    ];

    // 初始化回憶長廊
    function initMemories() {
        renderTimeline();
        renderMemoryWall();
        initMessageWall();
        initFloatingParticles();
    }

    // 渲染時間軸
    function renderTimeline() {
        const timeline = document.getElementById('memories-timeline');
        timeline.innerHTML = '';

        memoriesData.forEach((memory, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-marker" style="background: ${memory.color}"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${memory.year}.${String(memory.month).padStart(2, '0')}</div>
                    <div class="timeline-card">
                        <div class="timeline-icon">${memory.icon}</div>
                        <h3>${memory.title}</h3>
                        <p>${memory.description}</p>
                        <div class="timeline-details">${memory.details}</div>
                    </div>
                </div>
            `;

            timelineItem.addEventListener('click', () => showMemoryDetails(memory));
            timeline.appendChild(timelineItem);
        });

        // 動畫效果
        gsap.from('.timeline-item', {
            duration: 0.8,
            x: -50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }

    // 顯示回憶詳情
    function showMemoryDetails(memory) {
        const modal = document.getElementById('memory-modal');
        const modalContent = modal.querySelector('.modal-content');

        modalContent.innerHTML = `
            <div class="memory-detail-header">
                <div class="memory-detail-icon">${memory.icon}</div>
                <h2>${memory.title}</h2>
                <div class="memory-detail-date">${memory.year}年${memory.month}月</div>
            </div>
            <div class="memory-detail-description">
                ${memory.description}
            </div>
            <div class="memory-detail-details">
                ${memory.details}
            </div>
        `;

        modal.classList.remove('hidden');

        gsap.from('.modal-content', {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    }

    // 渲染記憶牆
    function renderMemoryWall() {
        const memoryWall = document.getElementById('memory-wall');
        memoryWall.innerHTML = '';

        const memories = [
            "小時候最喜歡在雨後的彩虹下奔跑",
            "和家人一起烤餅乾的時光是最溫暖的回憶",
            "第一次學會騎腳踏車，那種自由的感覺永遠難忘",
            "和最好的朋友們一起看星星，分享彼此的夢想",
            "在圖書館度過的寧靜午後",
            "學習新知識時的興奮感",
            "幫助別人時獲得的快樂",
            "克服困難後的成就感"
        ];

        memories.forEach(memory => {
            const memoryNote = document.createElement('div');
            memoryNote.className = 'memory-note';
            memoryNote.innerHTML = `
                <p>${memory}</p>
                <div class="note-decoration">✨</div>
            `;

            // 隨機顏色
            const colors = ['#FFD700', '#FF6B6B', '#8E44AD', '#3498DB', '#2ECC71', '#E74C3C'];
            memoryNote.style.background = colors[Math.floor(Math.random() * colors.length)];

            memoryWall.appendChild(memoryNote);
        });

        // 隨機位置和旋轉
        document.querySelectorAll('.memory-note').forEach(note => {
            const randomRotation = (Math.random() - 0.5) * 20;
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 200;

            gsap.set(note, {
                rotation: randomRotation,
                x: randomX,
                y: randomY
            });
        });
    }

    // 初始化訊息牆
    function initMessageWall() {
        const messageForm = document.getElementById('message-form');
        const messageInput = document.getElementById('message-input');
        const messageWall = document.getElementById('message-wall');

        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = messageInput.value.trim();

            if (message) {
                addMessageToWall(message);
                messageInput.value = '';

                // 成功動畫
                gsap.from('.message-item:last-child', {
                    duration: 0.5,
                    scale: 0,
                    rotation: -180,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }

    // 添加訊息到牆上
    function addMessageToWall(message) {
        const messageWall = document.getElementById('message-wall');
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';

        const avatars = ['😊', '🌟', '💝', '🎭', '🎨', '📚', '🎵', '🌸'];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

        messageItem.innerHTML = `
            <div class="message-avatar">${randomAvatar}</div>
            <div class="message-content">
                <div class="message-text">${message}</div>
                <div class="message-time">${new Date().toLocaleString('zh-TW')}</div>
            </div>
        `;

        messageWall.appendChild(messageItem);
    }

    // 初始化浮動粒子
    function initFloatingParticles() {
        const particles = document.querySelectorAll('.memory-particle');

        particles.forEach((particle, index) => {
            gsap.to(particle, {
                duration: 4 + index,
                x: 'random(-100, 100)',
                y: 'random(-100, 100)',
                rotation: 'random(-180, 180)',
                ease: 'none',
                repeat: -1,
                yoyo: true
            });
        });
    }

    // 模態框關閉
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('memory-modal');
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // 滑鼠互動效果
    document.addEventListener('mousemove', function(e) {
        const notes = document.querySelectorAll('.memory-note');
        notes.forEach((note) => {
            const rect = note.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / 20;
            const deltaY = (e.clientY - centerY) / 20;

            gsap.to(note, {
                duration: 0.5,
                x: deltaX,
                y: deltaY,
                ease: 'power2.out'
            });
        });
    });

    // 滾動觸發動畫
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.message-wall-section', {
        scrollTrigger: {
            trigger: '.message-wall-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    // 初始化載入動畫
    initLoadingAnimation();

    // 初始化回憶長廊
    setTimeout(() => {
        initMemories();
    }, 2500);
});