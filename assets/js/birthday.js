// birthday.js - 生日慶祝頁面邏輯
document.addEventListener('DOMContentLoaded', function() {
    // GSAP 動畫時間軸
    const tl = gsap.timeline();

    // 頁面載入動畫
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
    .from('.birthday-name', {
        duration: 0.8,
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=0.5')
    .from('.floating-cake', {
        duration: 1,
        scale: 0,
        rotation: 360,
        ease: 'back.out(1.7)'
    }, '-=0.8')
    .from('.balloon', {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.6')
    .from('.feature-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.4');

    // 啟動彩紙
    launchConfetti();

    // 時間轉換器
    function updateTimes() {
        const now = new Date();
        document.getElementById('muggle-time').textContent = now.toLocaleTimeString('zh-TW');

        // 巫師時間轉換
        const hour = now.getHours();
        const wizardTimes = [
            '午夜', '凌晨', '黎明', '早晨', '上午', '中午',
            '下午', '傍晚', '黃昏', '夜晚', '深夜', '午夜'
        ];
        const wizardTime = wizardTimes[Math.floor(hour / 2)];
        document.getElementById('wizard-time').textContent = wizardTime;
    }

    // 每秒更新時間
    updateTimes();
    setInterval(updateTimes, 1000);

    // 時間轉換按鈕
    document.getElementById('convert-time-btn').addEventListener('click', function() {
        gsap.to(this, {
            duration: 0.2,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
        updateTimes();
        playSound('wish-sound');
    });

    // 許願功能
    document.getElementById('make-wish-btn').addEventListener('click', function() {
        const wishes = document.querySelectorAll('.wish-item');
        wishes.forEach((wish, index) => {
            gsap.to(wish, {
                duration: 0.5,
                scale: 1.1,
                delay: index * 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });

        // 顯示許願動畫
        showWishAnimation();
        playSound('wish-sound');
    });

    function showWishAnimation() {
        const wishAnimation = document.createElement('div');
        wishAnimation.className = 'wish-animation';
        wishAnimation.innerHTML = `
            <div class="wish-stars">
                <span>⭐</span><span>✨</span><span>⭐</span><span>✨</span><span>⭐</span>
            </div>
            <div class="wish-text">願望已傳送到魔法世界！</div>
        `;
        document.body.appendChild(wishAnimation);

        gsap.from(wishAnimation, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        });

        gsap.to(wishAnimation.querySelectorAll('.wish-stars span'), {
            duration: 1,
            y: -20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        });

        setTimeout(() => {
            gsap.to(wishAnimation, {
                duration: 0.5,
                scale: 0,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => wishAnimation.remove()
            });
        }, 2000);
    }

    // 火車動畫
    function animateTrain() {
        const locomotive = document.querySelector('.steam-locomotive');
        const steam = document.querySelectorAll('.steam');

        gsap.to(locomotive, {
            duration: 3,
            x: 10,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut'
        });

        steam.forEach((s, index) => {
            gsap.to(s, {
                duration: 1.5,
                y: -15,
                opacity: 0,
                delay: index * 0.3,
                repeat: -1,
                ease: 'power2.out'
            });
        });
    }

    animateTrain();

    // 遊戲功能
    let gameScore = 0;
    let gameTime = 30;
    let gameInterval;
    let targetInterval;

    document.getElementById('start-game-btn').addEventListener('click', startGame);

    function startGame() {
        gameScore = 0;
        gameTime = 30;
        document.getElementById('game-score').textContent = gameScore;
        document.getElementById('game-time').textContent = gameTime;

        const target = document.getElementById('magic-target');
        target.style.pointerEvents = 'auto';

        // 開始倒計時
        gameInterval = setInterval(() => {
            gameTime--;
            document.getElementById('game-time').textContent = gameTime;

            if (gameTime <= 0) {
                endGame();
            }
        }, 1000);

        // 移動目標
        targetInterval = setInterval(moveTarget, 800);

        playSound('game-sound');
    }

    function moveTarget() {
        const target = document.getElementById('magic-target');
        const gameArea = document.querySelector('.game-area');
        const areaRect = gameArea.getBoundingClientRect();

        const newX = Math.random() * (areaRect.width - 60);
        const newY = Math.random() * (areaRect.height - 60);

        gsap.to(target, {
            duration: 0.5,
            x: newX,
            y: newY,
            ease: 'power2.out'
        });
    }

    document.getElementById('magic-target').addEventListener('click', function() {
        gameScore += 10;
        document.getElementById('game-score').textContent = gameScore;

        // 點擊動畫
        gsap.to(this, {
            duration: 0.2,
            scale: 1.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // 分數動畫
        showScoreAnimation('+10');
        playSound('wish-sound');
    });

    function showScoreAnimation(score) {
        const scoreAnim = document.createElement('div');
        scoreAnim.className = 'score-animation';
        scoreAnim.textContent = score;
        document.querySelector('.game-area').appendChild(scoreAnim);

        gsap.from(scoreAnim, {
            duration: 0.5,
            y: 0,
            opacity: 1,
            scale: 2,
            ease: 'power2.out'
        });

        gsap.to(scoreAnim, {
            duration: 0.5,
            y: -30,
            opacity: 0,
            delay: 0.3,
            ease: 'power2.in',
            onComplete: () => scoreAnim.remove()
        });
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(targetInterval);

        const target = document.getElementById('magic-target');
        target.style.pointerEvents = 'none';

        // 顯示最終分數
        const finalScore = document.createElement('div');
        finalScore.className = 'final-score';
        finalScore.innerHTML = `
            <h3>遊戲結束！</h3>
            <p>最終分數: ${gameScore}</p>
            <p>${gameScore >= 200 ? '魔法大師！' : gameScore >= 100 ? '優秀巫師！' : '不錯的表現！'}</p>
        `;
        document.querySelector('.game-area').appendChild(finalScore);

        gsap.from(finalScore, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    }

    // 彩紙動畫
    function launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - 100,
                vx: (Math.random() - 0.5) * 8,
                vy: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 6 + 3,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 5,
                shape: Math.random() > 0.5 ? 'circle' : 'square'
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.05; // 重力
                particle.rotation += particle.rotationSpeed;

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation * Math.PI / 180);
                ctx.fillStyle = particle.color;

                if (particle.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                }

                ctx.restore();
            });

            particles = particles.filter(particle => particle.y < canvas.height + 50);

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

    // 滾動觸發動畫
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.personal-message', {
        scrollTrigger: {
            trigger: '.personal-message',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.photo-preview', {
        scrollTrigger: {
            trigger: '.photo-preview',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    // 互動效果
    document.addEventListener('mousemove', function(e) {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach((balloon, index) => {
            const speed = (index + 1) * 0.5;
            gsap.to(balloon, {
                duration: 0.5,
                x: (e.clientX / window.innerWidth - 0.5) * speed,
                y: (e.clientY / window.innerHeight - 0.5) * speed,
                ease: 'power2.out'
            });
        });
    });

    // 導航切換
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});