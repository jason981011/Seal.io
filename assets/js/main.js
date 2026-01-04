// main.js - 主要動畫和互動邏輯
document.addEventListener('DOMContentLoaded', function() {
    // GSAP 動畫時間軸
    const tl = gsap.timeline();

    // 載入動畫完成後顯示主要內容
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');

        // 進入動畫
        tl.from('.main-title', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'back.out(1.7)'
        })
        .from('.subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=1')
        .from('.portal-card', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.magic-instructions', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.audio-controls', {
            duration: 0.5,
            x: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.2');
    }, 3000);

    // 門戶卡片點擊事件
    const portalCards = document.querySelectorAll('.portal-card');
    portalCards.forEach(card => {
        card.addEventListener('click', function() {
            const page = this.dataset.page;
            playSound('portal-sound');
            navigateToPage(page);
        });

        // 懸停效果
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                y: -10,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                y: 0,
                ease: 'power2.out'
            });
        });
    });

    // 音效控制
    const bgMusic = document.getElementById('bg-music');
    const portalSound = document.getElementById('portal-sound');
    const clickSound = document.getElementById('click-sound');

    const bgMusicToggle = document.getElementById('bg-music-toggle');
    const soundEffectsToggle = document.getElementById('sound-effects-toggle');

    let bgMusicEnabled = false;
    let soundEffectsEnabled = true;

    bgMusicToggle.addEventListener('click', function() {
        bgMusicEnabled = !bgMusicEnabled;
        if (bgMusicEnabled) {
            bgMusic.play();
            this.classList.add('active');
        } else {
            bgMusic.pause();
            this.classList.remove('active');
        }
        playSound('click-sound');
    });

    soundEffectsToggle.addEventListener('click', function() {
        soundEffectsEnabled = !soundEffectsEnabled;
        if (soundEffectsEnabled) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
        playSound('click-sound');
    });

    function playSound(soundId) {
        if (soundEffectsEnabled) {
            const sound = document.getElementById(soundId);
            sound.currentTime = 0;
            sound.play();
        }
    }

    // 頁面導航
    function navigateToPage(page) {
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
                window.location.href = `${page}.html`;
            }
        });
    }

    // 鍵盤控制
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                playSound('click-sound');
                break;
            case ' ':
                e.preventDefault();
                bgMusicToggle.click();
                break;
            case 'm':
            case 'M':
                soundEffectsToggle.click();
                break;
        }
    });

    // 滑鼠移動效果
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // 讓浮動元素跟隨滑鼠輕微移動
        gsap.to('.floating-elements', {
            duration: 0.5,
            x: (mouseX - 0.5) * 20,
            y: (mouseY - 0.5) * 20,
            ease: 'power2.out'
        });
    });

    // 視窗大小改變時重新計算
    window.addEventListener('resize', function() {
        // 重新初始化粒子和3D背景
        if (window.particlesJS) {
            particlesJS('particles-js', particlesConfig);
        }
        if (window.initThreeBG) {
            initThreeBG();
        }
    });

    // 添加一些隨機的魔法效果
    setInterval(() => {
        const stars = document.querySelectorAll('.magic-star');
        stars.forEach(star => {
            if (Math.random() > 0.95) {
                gsap.to(star, {
                    duration: 0.5,
                    scale: 1.5,
                    rotation: 180,
                    ease: 'power2.out',
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    }, 2000);
});