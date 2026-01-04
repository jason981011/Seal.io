// celebration.js - 熊彥亭的生日慶祝儀式邏輯
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
        tl.from('.celebration-title', {
            duration: 1.5,
            y: -50,
            opacity: 0,
            ease: 'back.out(1.7)'
        })
        .from('.celebration-subtitle', {
            duration: 1,
            y: -30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=1')
        .from('.birthday-cake', {
            duration: 0.8,
            scale: 0.5,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.cake-candles', {
            duration: 0.5,
            scale: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.3');
    }

    // 生日資訊
    const birthdayInfo = {
        name: "熊彥亭",
        birthDate: "2004-01-16",
        currentAge: new Date().getFullYear() - 2004
    };

    // 初始化慶祝儀式
    function initCelebration() {
        initBirthdayCake();
        initAgeCalculator();
        initBlessingCards();
        initConfettiSystem();
        initFloatingParticles();
        updateBirthdayInfo();
    }

    // 初始化生日蛋糕
    function initBirthdayCake() {
        const candles = document.querySelectorAll('.candle');
        const blowButton = document.getElementById('blow-candles-btn');
        const cake = document.querySelector('.birthday-cake');

        let candlesLit = true;

        // 點蠟燭動畫
        candles.forEach((candle, index) => {
            gsap.from(candle, {
                duration: 0.5,
                scale: 0,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });
        });

        // 吹蠟燭
        blowButton.addEventListener('click', () => {
            if (candlesLit) {
                // 吹滅蠟燭動畫
                candles.forEach((candle, index) => {
                    gsap.to(candle, {
                        duration: 0.3,
                        scale: 0,
                        delay: index * 0.05,
                        ease: 'power2.in',
                        onComplete: () => {
                            candle.style.opacity = '0.3';
                        }
                    });
                });

                // 蛋糕跳動動畫
                gsap.to(cake, {
                    duration: 0.5,
                    scale: 1.1,
                    ease: 'back.out(1.7)',
                    yoyo: true,
                    repeat: 1
                });

                // 觸發慶祝效果
                setTimeout(() => {
                    triggerCelebration();
                }, 500);

                candlesLit = false;
                blowButton.textContent = '再次慶祝！';
                blowButton.style.background = 'linear-gradient(135deg, #FF6B6B, #FF4757)';
            } else {
                // 重新點燃蠟燭
                candles.forEach((candle, index) => {
                    gsap.to(candle, {
                        duration: 0.3,
                        scale: 1,
                        opacity: 1,
                        delay: index * 0.05,
                        ease: 'back.out(1.7)'
                    });
                });

                candlesLit = true;
                blowButton.textContent = '吹滅蠟燭！';
                blowButton.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
            }
        });
    }

    // 觸發慶祝效果
    function triggerCelebration() {
        // 創建五彩紙屑
        createConfetti();

        // 顯示慶祝訊息
        showCelebrationMessage();

        // 播放音效（如果有的話）
        // playCelebrationSound();

        // 震動效果
        gsap.to('body', {
            duration: 0.1,
            x: 'random(-5, 5)',
            y: 'random(-5, 5)',
            repeat: 5,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    // 創建五彩紙屑
    function createConfetti() {
        const colors = ['#FFD700', '#FF6B6B', '#8E44AD', '#3498DB', '#2ECC71', '#E74C3C', '#F39C12'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';

            document.body.appendChild(confetti);

            // 移除紙屑
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // 顯示慶祝訊息
    function showCelebrationMessage() {
        const message = document.createElement('div');
        message.className = 'celebration-message';
        message.innerHTML = `
            <div class="message-content">
                <div class="message-icon">🎉</div>
                <h2>生日快樂！</h2>
                <p>願熊彥亭的每一天都充滿快樂和驚喜！</p>
                <div class="message-sparkles">
                    <span>✨</span><span>🎂</span><span>✨</span>
                </div>
            </div>
        `;

        document.body.appendChild(message);

        gsap.from(message, {
            duration: 0.8,
            scale: 0,
            rotation: -180,
            ease: 'back.out(1.7)'
        });

        setTimeout(() => {
            gsap.to(message, {
                duration: 0.5,
                scale: 0,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => message.remove()
            });
        }, 4000);
    }

    // 初始化年齡計算器
    function initAgeCalculator() {
        const birthDate = new Date(birthdayInfo.birthDate);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // 計算下一個生日
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        // 更新顯示
        gsap.to('#current-age', {
            duration: 1,
            textContent: age,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });

        gsap.to('#days-until-birthday', {
            duration: 1,
            textContent: daysUntilBirthday,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });
    }

    // 初始化祝福卡片
    function initBlessingCards() {
        const blessingCards = document.querySelectorAll('.blessing-card');
        const blessingWall = document.getElementById('blessing-wall');

        blessingCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                // 卡片翻轉動畫
                gsap.to(card, {
                    duration: 0.6,
                    rotationY: 180,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        // 添加到祝福牆
                        const blessingItem = document.createElement('div');
                        blessingItem.className = 'blessing-item';
                        blessingItem.innerHTML = `
                            <div class="blessing-text">${card.querySelector('.card-back p').textContent}</div>
                            <div class="blessing-decoration">💝</div>
                        `;

                        blessingWall.appendChild(blessingItem);

                        gsap.from(blessingItem, {
                            duration: 0.5,
                            scale: 0,
                            rotation: -180,
                            ease: 'back.out(1.7)'
                        });

                        // 隱藏原卡片
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 初始化五彩紙屑系統
    function initConfettiSystem() {
        const confettiBtn = document.getElementById('confetti-btn');

        confettiBtn.addEventListener('click', () => {
            createConfetti();

            // 按鈕動畫
            gsap.to(confettiBtn, {
                duration: 0.2,
                scale: 1.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
    }

    // 初始化浮動粒子
    function initFloatingParticles() {
        const particles = document.querySelectorAll('.celebration-particle');

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

    // 更新生日資訊
    function updateBirthdayInfo() {
        const ageElements = document.querySelectorAll('.age-display');
        ageElements.forEach(el => {
            el.textContent = birthdayInfo.currentAge;
        });

        const nameElements = document.querySelectorAll('.name-display');
        nameElements.forEach(el => {
            el.textContent = birthdayInfo.name;
        });
    }

    // 添加個人祝福
    const addBlessingBtn = document.getElementById('add-blessing-btn');
    const blessingModal = document.getElementById('blessing-modal');
    const blessingForm = document.getElementById('blessing-form');
    const blessingText = document.getElementById('blessing-text');

    if (addBlessingBtn) {
        addBlessingBtn.addEventListener('click', () => {
            blessingModal.classList.remove('hidden');
            gsap.from('.modal-content', {
                duration: 0.5,
                scale: 0.8,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        });
    }

    if (blessingForm) {
        blessingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const blessing = blessingText.value.trim();

            if (blessing) {
                const blessingItem = document.createElement('div');
                blessingItem.className = 'blessing-item';
                blessingItem.innerHTML = `
                    <div class="blessing-text">${blessing}</div>
                    <div class="blessing-decoration">💝</div>
                `;

                document.getElementById('blessing-wall').appendChild(blessingItem);

                gsap.from(blessingItem, {
                    duration: 0.5,
                    scale: 0,
                    rotation: -180,
                    ease: 'back.out(1.7)'
                });

                blessingText.value = '';
                blessingModal.classList.add('hidden');
            }
        });
    }

    // 模態框關閉
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.add('hidden');
        }
    });

    // 滾動觸發動畫
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.age-calculator', {
        scrollTrigger: {
            trigger: '.age-calculator',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.blessing-cards-section', {
        scrollTrigger: {
            trigger: '.blessing-cards-section',
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

    // 初始化慶祝儀式
    setTimeout(() => {
        initCelebration();
    }, 2500);
});