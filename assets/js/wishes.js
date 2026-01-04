// wishes.js - 熊彥亭的許願魔法井邏輯
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
        tl.from('.wishes-title', {
            duration: 1.5,
            y: -50,
            opacity: 0,
            ease: 'back.out(1.7)'
        })
        .from('.wishes-subtitle', {
            duration: 1,
            y: -30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=1')
        .from('.wishing-well', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.wish-form-section', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3');
    }

    // 許願數據
    let wishesData = [
        {
            id: 1,
            text: "希望每一天都能充滿快樂和正能量",
            fulfilled: true,
            date: "2024-01-16",
            coinValue: 10
        },
        {
            id: 2,
            text: "希望學業進步，取得更好的成績",
            fulfilled: true,
            date: "2024-01-16",
            coinValue: 15
        },
        {
            id: 3,
            text: "希望身體健康，充滿活力",
            fulfilled: false,
            date: "2024-01-16",
            coinValue: 8
        },
        {
            id: 4,
            text: "希望找到真正熱愛的事物",
            fulfilled: false,
            date: "2024-01-16",
            coinValue: 12
        }
    ];

    let totalCoins = 0;
    let fulfilledWishes = 0;

    // 初始化許願井
    function initWishingWell() {
        renderWishes();
        updateWishStats();
        initCoinSystem();
        initFloatingParticles();
    }

    // 渲染許願牆
    function renderWishes() {
        const fulfilledWall = document.getElementById('fulfilled-wishes');
        const pendingWall = document.getElementById('pending-wishes');

        fulfilledWall.innerHTML = '';
        pendingWall.innerHTML = '';

        wishesData.forEach(wish => {
            const wishItem = document.createElement('div');
            wishItem.className = `wish-item ${wish.fulfilled ? 'fulfilled' : 'pending'}`;
            wishItem.innerHTML = `
                <div class="wish-content">
                    <div class="wish-text">${wish.text}</div>
                    <div class="wish-meta">
                        <span class="wish-date">${wish.date}</span>
                        <span class="wish-coins">${wish.coinValue} 金幣</span>
                    </div>
                </div>
                <div class="wish-decoration">✨</div>
            `;

            if (wish.fulfilled) {
                fulfilledWall.appendChild(wishItem);
            } else {
                pendingWall.appendChild(wishItem);
            }
        });

        // 動畫效果
        gsap.from('.wish-item', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    }

    // 更新許願統計
    function updateWishStats() {
        fulfilledWishes = wishesData.filter(wish => wish.fulfilled).length;
        const totalWishes = wishesData.length;
        const pendingWishes = totalWishes - fulfilledWishes;

        gsap.to('#total-wishes', {
            duration: 1,
            textContent: totalWishes,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });

        gsap.to('#fulfilled-wishes-count', {
            duration: 1,
            textContent: fulfilledWishes,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });

        gsap.to('#pending-wishes-count', {
            duration: 1,
            textContent: pendingWishes,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });

        gsap.to('#total-coins', {
            duration: 1,
            textContent: totalCoins,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });
    }

    // 初始化金幣系統
    function initCoinSystem() {
        const coinButton = document.getElementById('coin-button');
        const wishForm = document.getElementById('wish-form');
        const wishInput = document.getElementById('wish-input');
        const submitWish = document.getElementById('submit-wish');

        let coinsInWell = 0;

        coinButton.addEventListener('click', () => {
            if (totalCoins > 0) {
                // 投擲金幣動畫
                throwCoin();
                coinsInWell++;
                totalCoins--;

                // 更新顯示
                updateWishStats();

                // 檢查是否可以許願
                if (coinsInWell >= 5) {
                    document.getElementById('wish-form-section').classList.remove('hidden');
                    gsap.from('#wish-form-section', {
                        duration: 0.5,
                        scale: 0.9,
                        opacity: 0,
                        ease: 'back.out(1.7)'
                    });
                }
            } else {
                showMessage('沒有足夠的金幣了！');
            }
        });

        submitWish.addEventListener('click', () => {
            const wishText = wishInput.value.trim();
            if (wishText && coinsInWell >= 5) {
                // 添加新願望
                const newWish = {
                    id: Date.now(),
                    text: wishText,
                    fulfilled: false,
                    date: new Date().toISOString().split('T')[0],
                    coinValue: coinsInWell
                };

                wishesData.push(newWish);
                renderWishes();
                updateWishStats();

                // 重置
                wishInput.value = '';
                coinsInWell = 0;
                document.getElementById('wish-form-section').classList.add('hidden');

                // 成功動畫
                gsap.from('.wish-item:last-child', {
                    duration: 0.8,
                    scale: 0,
                    rotation: 360,
                    ease: 'back.out(1.7)'
                });

                showMessage('願望已投入魔法井中！');
            }
        });

        // 獲取金幣按鈕
        document.getElementById('get-coins-btn').addEventListener('click', () => {
            const coinsEarned = Math.floor(Math.random() * 10) + 5;
            totalCoins += coinsEarned;
            updateWishStats();

            showMessage(`獲得了 ${coinsEarned} 個金幣！`);
        });
    }

    // 投擲金幣動畫
    function throwCoin() {
        const coin = document.createElement('div');
        coin.className = 'thrown-coin';
        coin.textContent = '🪙';

        document.body.appendChild(coin);

        // 隨機起始位置
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;

        gsap.set(coin, {
            x: startX,
            y: startY,
            scale: 0.5
        });

        // 投擲動畫
        gsap.to(coin, {
            duration: 1.5,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2 - 100,
            scale: 1,
            rotation: 720,
            ease: 'power2.in',
            onComplete: () => {
                // 掉入井中
                gsap.to(coin, {
                    duration: 0.5,
                    y: window.innerHeight / 2,
                    scale: 0.2,
                    opacity: 0,
                    ease: 'power2.in',
                    onComplete: () => coin.remove()
                });

                // 水花效果
                createSplashEffect();
            }
        });
    }

    // 創建水花效果
    function createSplashEffect() {
        for (let i = 0; i < 8; i++) {
            const splash = document.createElement('div');
            splash.className = 'splash-particle';
            splash.textContent = '💧';

            document.body.appendChild(splash);

            const angle = (i / 8) * Math.PI * 2;
            const distance = 50;

            gsap.set(splash, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            });

            gsap.to(splash, {
                duration: 1,
                x: window.innerWidth / 2 + Math.cos(angle) * distance,
                y: window.innerHeight / 2 + Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
                ease: 'power2.out',
                onComplete: () => splash.remove()
            });
        }
    }

    // 顯示訊息
    function showMessage(message) {
        const msg = document.createElement('div');
        msg.className = 'wish-message';
        msg.innerHTML = `
            <div class="message-content">
                <span class="message-icon">✨</span>
                ${message}
            </div>
        `;

        document.body.appendChild(msg);

        gsap.from(msg, {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: 'back.out(1.7)'
        });

        setTimeout(() => {
            gsap.to(msg, {
                duration: 0.5,
                y: -50,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => msg.remove()
            });
        }, 3000);
    }

    // 初始化浮動粒子
    function initFloatingParticles() {
        const particles = document.querySelectorAll('.wish-particle');

        particles.forEach((particle, index) => {
            gsap.to(particle, {
                duration: 3 + index,
                x: 'random(-100, 100)',
                y: 'random(-100, 100)',
                rotation: 'random(-180, 180)',
                ease: 'none',
                repeat: -1,
                yoyo: true
            });
        });
    }

    // 實現願望功能
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wish-item') && !e.target.classList.contains('fulfilled')) {
            const wishId = parseInt(e.target.dataset.id);
            const wish = wishesData.find(w => w.id === wishId);

            if (wish && !wish.fulfilled) {
                wish.fulfilled = true;
                renderWishes();
                updateWishStats();

                // 實現動畫
                gsap.to(e.target, {
                    duration: 0.5,
                    scale: 1.1,
                    ease: 'back.out(1.7)',
                    yoyo: true,
                    repeat: 1
                });

                showMessage('願望實現了！✨');
            }
        }
    });

    // 滑鼠互動效果
    document.addEventListener('mousemove', function(e) {
        const well = document.querySelector('.wishing-well');
        if (well) {
            const rect = well.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / 50;
            const deltaY = (e.clientY - centerY) / 50;

            gsap.to(well, {
                duration: 0.5,
                x: deltaX,
                y: deltaY,
                ease: 'power2.out'
            });
        }
    });

    // 滾動觸發動畫
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.wishes-stats', {
        scrollTrigger: {
            trigger: '.wishes-stats',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.fulfilled-wishes-section', {
        scrollTrigger: {
            trigger: '.fulfilled-wishes-section',
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

    // 初始化許願井
    setTimeout(() => {
        initWishingWell();
    }, 2500);
});