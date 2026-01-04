// world.js - 魔法世界探索頁面邏輯
document.addEventListener('DOMContentLoaded', function() {
    // GSAP 動畫時間軸
    const tl = gsap.timeline();

    // 頁面載入動畫
    tl.from('.world-title', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)'
    })
    .from('.location', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=1')
    .from('.section-title', {
        duration: 1,
        x: -50,
        opacity: 0,
        stagger: 0.3,
        ease: 'power2.out'
    }, '-=0.5');

    // 地點數據
    const locations = {
        hogwarts: {
            icon: '🏰',
            title: '霍格華茲魔法與巫術學院',
            description: `
                <p>霍格華茲是英國最負盛名的魔法學校，成立於中世紀。</p>
                <p>學校分為四個學院：葛萊芬多、赫夫帕夫、雷文克勞和史萊哲林。</p>
                <p>這裡不僅是學習魔法的場所，更是巫師們建立終身友誼的地方。</p>
            `,
            gallery: ['🏰', '📚', '🪄', '🦉']
        },
        'diagon-alley': {
            icon: '🏪',
            title: '對角巷',
            description: `
                <p>隱藏在倫敦的魔法街道，是巫師購物的首選之地。</p>
                <p>這裡有古靈閣巫師銀行、奧利凡德魔杖店、品質飛天掃帚店等。</p>
                <p>麻瓜無法看到這條街道，除非有巫師帶領。</p>
            `,
            gallery: ['🏪', '🏦', '🪄', '🧹']
        },
        'forbidden-forest': {
            icon: '🌲',
            title: '禁忌森林',
            description: `
                <p>霍格華茲城堡旁邊的危險森林，充滿了魔法生物。</p>
                <p>這裡生活著獨角獸、馬人、巨人蜘蛛等各種神奇生物。</p>
                <p>學生們被嚴格禁止進入，但總有一些冒險者偷偷溜進去。</p>
            `,
            gallery: ['🌲', '🦌', '🕷️', '🌙']
        },
        gringotts: {
            icon: '🏦',
            title: '古靈閣巫師銀行',
            description: `
                <p>由妖精管理的巫師銀行，是世界上最安全的地方。</p>
                <p>銀行位於對角巷，入口處有白大理石建築。</p>
                <p>地下金庫由龍守護，魔法防護措施無懈可擊。</p>
            `,
            gallery: ['🏦', '💰', '🐉', '🔑']
        },
        'godrics-hollow': {
            icon: '🏘️',
            title: '活米村',
            description: `
                <p>哈利·波特的出生地，一個寧靜的魔法村莊。</p>
                <p>這裡曾是波特夫婦的家，現在是魔法界的聖地。</p>
                <p>村莊隱藏在麻瓜世界中，只有巫師能找到。</p>
            `,
            gallery: ['🏘️', '🏠', '💔', '🌹']
        }
    };

    // 地點點擊事件
    const locationElements = document.querySelectorAll('.location');
    const modal = document.getElementById('location-modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalGallery = document.getElementById('modal-gallery');

    locationElements.forEach(location => {
        location.addEventListener('click', function() {
            const locationKey = this.dataset.location;
            const locationData = locations[locationKey];

            modalIcon.textContent = locationData.icon;
            modalTitle.textContent = locationData.title;
            modalDescription.innerHTML = locationData.description;

            // 創建畫廊
            modalGallery.innerHTML = '';
            locationData.gallery.forEach(icon => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.textContent = icon;
                modalGallery.appendChild(galleryItem);
            });

            modal.classList.remove('hidden');

            // 模態框動畫
            gsap.from('.modal-content', {
                duration: 0.6,
                scale: 0.5,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        });
    });

    // 關閉模態框
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        gsap.to('.modal-content', {
            duration: 0.4,
            scale: 0.8,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.add('hidden');
            }
        });
    }

    // 咒語學習
    const spellCards = document.querySelectorAll('.spell-card');
    const spellCanvas = document.getElementById('spell-canvas');
    const ctx = spellCanvas.getContext('2d');

    spellCanvas.width = window.innerWidth;
    spellCanvas.height = window.innerHeight;

    spellCards.forEach(card => {
        card.addEventListener('click', function() {
            const spell = this.dataset.spell;
            castSpell(spell, this);
        });
    });

    function castSpell(spell, card) {
        // 卡片動畫
        gsap.to(card, {
            duration: 0.2,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // 根據咒語類型顯示不同效果
        switch(spell) {
            case 'lumos':
                createLightEffect(card);
                break;
            case 'wingardium-leviosa':
                createLevitationEffect(card);
                break;
            case 'expecto-patronum':
                createPatronusEffect(card);
                break;
            case 'accio':
                createAccioEffect(card);
                break;
        }
    }

    function createLightEffect(card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 創建光暈效果
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = {
                    x: centerX,
                    y: centerY,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 60,
                    color: `hsl(${Math.random() * 60 + 40}, 100%, 70%)`
                };

                animateParticle(particle);
            }, i * 50);
        }
    }

    function createLevitationEffect(card) {
        gsap.to(card, {
            duration: 2,
            y: -50,
            rotation: 5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
    }

    function createPatronusEffect(card) {
        const rect = card.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;

        // 創建守護神效果（銀色粒子）
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = {
                    x: startX,
                    y: startY,
                    vx: Math.cos(i * 12 * Math.PI / 180) * 5,
                    vy: Math.sin(i * 12 * Math.PI / 180) * 5,
                    life: 120,
                    color: '#C0C0C0'
                };

                animateParticle(particle);
            }, i * 20);
        }
    }

    function createAccioEffect(card) {
        const targetRect = card.getBoundingClientRect();
        const centerX = targetRect.left + targetRect.width / 2;
        const centerY = targetRect.top + targetRect.height / 2;

        // 從隨機位置拉向目標
        for (let i = 0; i < 15; i++) {
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;

            const particle = {
                x: startX,
                y: startY,
                targetX: centerX,
                targetY: centerY,
                life: 60,
                color: '#FFD700'
            };

            animateAccioParticle(particle);
        }
    }

    function animateParticle(particle) {
        let life = particle.life;

        function update() {
            if (life <= 0) return;

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            ctx.fillStyle = particle.color;
            ctx.globalAlpha = life / particle.life;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fill();

            life--;
            requestAnimationFrame(update);
        }

        update();
    }

    function animateAccioParticle(particle) {
        let life = particle.life;

        function update() {
            if (life <= 0) return;

            // 向目標移動
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            particle.x += dx * 0.05;
            particle.y += dy * 0.05;

            ctx.fillStyle = particle.color;
            ctx.globalAlpha = life / particle.life;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fill();

            life--;
            requestAnimationFrame(update);
        }

        update();
    }

    // 魔法對決遊戲
    let playerHealth = 100;
    let enemyHealth = 100;
    let isGameActive = false;

    const playerHealthBar = document.getElementById('player-health');
    const enemyHealthBar = document.getElementById('enemy-health');
    const duelEffects = document.getElementById('duel-effects');

    document.getElementById('start-duel').addEventListener('click', startDuel);
    document.querySelectorAll('.spell-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!isGameActive) return;
            castDuelSpell(e.target.dataset.spell);
        });
    });

    function startDuel() {
        playerHealth = 100;
        enemyHealth = 100;
        isGameActive = true;

        updateHealthBars();

        gsap.from('.duel-arena', {
            duration: 0.5,
            scale: 0.9,
            ease: 'back.out(1.7)'
        });

        // 敵人自動攻擊
        startEnemyAttacks();
    }

    function castDuelSpell(spell) {
        if (!isGameActive) return;

        let damage = 0;
        let effect = '';

        switch(spell) {
            case 'stupefy':
                damage = 20;
                effect = '💥';
                break;
            case 'protego':
                damage = -10; // 治療
                effect = '🛡️';
                break;
            case 'expelliarmus':
                damage = 30;
                effect = '⚡';
                break;
        }

        enemyHealth = Math.max(0, enemyHealth - damage);
        updateHealthBars();

        // 顯示效果
        showDuelEffect(effect, 'player');

        // 檢查勝利
        if (enemyHealth <= 0) {
            endDuel('player');
        }
    }

    function startEnemyAttacks() {
        const attackInterval = setInterval(() => {
            if (!isGameActive) {
                clearInterval(attackInterval);
                return;
            }

            const spells = ['stupefy', 'expelliarmus'];
            const randomSpell = spells[Math.floor(Math.random() * spells.length)];
            let damage = randomSpell === 'stupefy' ? 15 : 25;

            playerHealth = Math.max(0, playerHealth - damage);
            updateHealthBars();

            showDuelEffect('💥', 'enemy');

            if (playerHealth <= 0) {
                endDuel('enemy');
            }
        }, 2000);
    }

    function updateHealthBars() {
        playerHealthBar.style.width = playerHealth + '%';
        enemyHealthBar.style.width = enemyHealth + '%';

        // 顏色變化
        if (playerHealth > 60) {
            playerHealthBar.style.background = '#4CAF50';
        } else if (playerHealth > 30) {
            playerHealthBar.style.background = '#FF9800';
        } else {
            playerHealthBar.style.background = '#F44336';
        }

        if (enemyHealth > 60) {
            enemyHealthBar.style.background = '#4CAF50';
        } else if (enemyHealth > 30) {
            enemyHealthBar.style.background = '#FF9800';
        } else {
            enemyHealthBar.style.background = '#F44336';
        }
    }

    function showDuelEffect(effect, side) {
        const effectElement = document.createElement('div');
        effectElement.className = 'duel-effect';
        effectElement.textContent = effect;
        effectElement.style.left = side === 'player' ? '30%' : '70%';

        duelEffects.appendChild(effectElement);

        gsap.from(effectElement, {
            duration: 0.5,
            y: -50,
            opacity: 0,
            scale: 2,
            ease: 'power2.out'
        });

        gsap.to(effectElement, {
            duration: 0.5,
            y: -100,
            opacity: 0,
            delay: 0.5,
            onComplete: () => effectElement.remove()
        });
    }

    function endDuel(winner) {
        isGameActive = false;

        const result = winner === 'player' ? '🎉 勝利！' : '💀 失敗！';
        const resultElement = document.createElement('div');
        resultElement.className = 'duel-result';
        resultElement.textContent = result;

        document.querySelector('.duel-arena').appendChild(resultElement);

        gsap.from(resultElement, {
            duration: 0.8,
            scale: 0,
            rotation: 360,
            ease: 'back.out(1.7)'
        });
    }

    // 滾動觸發動畫
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.spell-card', {
        scrollTrigger: {
            trigger: '.spells-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    gsap.from('.creature-card', {
        scrollTrigger: {
            trigger: '.creatures-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    gsap.from('.duel-arena', {
        scrollTrigger: {
            trigger: '.magic-game-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power2.out'
    });

    // 導航切換
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});