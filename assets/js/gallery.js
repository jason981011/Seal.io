// gallery.js - 熊彥亭的魔法相簿頁面邏輯
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
        tl.from('.gallery-title', {
            duration: 1.5,
            y: -50,
            opacity: 0,
            ease: 'back.out(1.7)'
        })
        .from('.gallery-subtitle', {
            duration: 1,
            y: -30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=1')
        .from('.category-tabs', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.gallery-item', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .from('.gallery-stats', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5');
    }

    // 相簿數據
    const galleryPhotos = [
        {
            id: 1,
            icon: '🎂',
            title: '生日慶祝',
            description: '熊彥亭的生日派對，充滿歡樂和祝福',
            category: 'celebration',
            date: '2024.01.16'
        },
        {
            id: 2,
            icon: '🎈',
            title: '慶祝儀式',
            description: '溫馨的慶祝時刻，記錄每一個重要的瞬間',
            category: 'celebration',
            date: '2024.01.16'
        },
        {
            id: 3,
            icon: '🌸',
            title: '春天的約定',
            description: '櫻花盛開的季節，我們的美好約定',
            category: 'memories',
            date: '2024.03.15'
        },
        {
            id: 4,
            icon: '🏖️',
            title: '海邊的回憶',
            description: '夏日的美好時光，海風輕拂的日子',
            category: 'memories',
            date: '2024.07.20'
        },
        {
            id: 5,
            icon: '🍂',
            title: '秋天的溫暖',
            description: '楓葉紅了的季節，溫暖的秋日時光',
            category: 'memories',
            date: '2023.11.12'
        },
        {
            id: 6,
            icon: '☕',
            title: '早晨的咖啡',
            description: '開始新的一天，咖啡香伴隨的早晨',
            category: 'daily',
            date: '2024.02.14'
        },
        {
            id: 7,
            icon: '📚',
            title: '學習時光',
            description: '專注的學習時刻，追求知識的旅程',
            category: 'daily',
            date: '2024.03.08'
        },
        {
            id: 8,
            icon: '🚶',
            title: '散步時光',
            description: '放鬆心情的時刻，享受寧靜的步伐',
            category: 'daily',
            date: '2024.04.22'
        },
        {
            id: 9,
            icon: '🎓',
            title: '學業里程碑',
            description: '重要的學業成就，每一個進步都值得慶祝',
            category: 'special',
            date: '2023.06.30'
        },
        {
            id: 10,
            icon: '🎨',
            title: '創意火花',
            description: '藝術創作的靈感，創意的火花閃耀',
            category: 'special',
            date: '2023.09.15'
        },
        {
            id: 11,
            icon: '🌟',
            title: '夢想實現',
            description: '每一個進步的足跡，都是夢想實現的證明',
            category: 'special',
            date: '2024.12.01'
        },
        {
            id: 12,
            icon: '💫',
            title: '魔法時刻',
            description: '生命中最神奇的時刻，充滿無限可能',
            category: 'special',
            date: '2024.01.16'
        }
    ];

    let currentCategory = 'all';
    let currentPhotoIndex = 0;
    let uploadedPhotos = [];

    // 初始化相簿
    function initGallery() {
        renderGalleryItems();
        updateGalleryStats();
        initCategoryTabs();
        initLightbox();
        initUploadFunctionality();
        initFloatingParticles();
    }

    // 渲染相簿項目
    function renderGalleryItems() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = '';

        const filteredPhotos = currentCategory === 'all'
            ? [...galleryPhotos, ...uploadedPhotos]
            : [...galleryPhotos, ...uploadedPhotos].filter(photo => photo.category === currentCategory);

        filteredPhotos.forEach((photo, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = photo.category;
            galleryItem.innerHTML = `
                <div class="gallery-image">
                    <div class="placeholder-image">${photo.icon}</div>
                    <div class="image-overlay">
                        <div class="overlay-content">
                            <h4>${photo.title}</h4>
                            <p>${photo.description}</p>
                            <div class="image-date">${photo.date}</div>
                        </div>
                    </div>
                </div>
            `;

            galleryItem.addEventListener('click', () => openLightbox(index, filteredPhotos));
            galleryGrid.appendChild(galleryItem);
        });

        // 動畫效果
        gsap.from('.gallery-item', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    }

    // 更新相簿統計
    function updateGalleryStats() {
        const totalPhotos = galleryPhotos.length + uploadedPhotos.length;
        const totalMemories = totalPhotos * 2; // 假設每張照片對應2個回憶
        const yearsTogether = 2; // 假設相識2年

        gsap.to('#total-photos', {
            duration: 1,
            textContent: totalPhotos,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });

        gsap.to('#total-memories', {
            duration: 1,
            textContent: totalMemories,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });

        gsap.to('#years-together', {
            duration: 1,
            textContent: yearsTogether,
            ease: 'power2.out',
            snap: { textContent: 1 }
        });
    }

    // 初始化分類標籤
    function initCategoryTabs() {
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.dataset.category;
                renderGalleryItems();

                // 切換動畫
                gsap.from('.gallery-item', {
                    duration: 0.5,
                    scale: 0.9,
                    opacity: 0,
                    stagger: 0.05,
                    ease: 'power2.out'
                });
            });
        });
    }

    // 初始化燈箱
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        const lightboxOverlay = document.querySelector('.lightbox-overlay');

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
        lightboxNext.addEventListener('click', () => navigateLightbox(1));

        // 鍵盤控制
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('hidden')) {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        navigateLightbox(-1);
                        break;
                    case 'ArrowRight':
                        navigateLightbox(1);
                        break;
                }
            }
        });
    }

    // 打開燈箱
    function openLightbox(index, photoList) {
        currentPhotoIndex = index;
        const photo = photoList[index];
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const lightboxDate = document.getElementById('lightbox-date');
        const lightboxCategory = document.getElementById('lightbox-category');

        // 創建圖片URL（使用佔位符）
        lightboxImage.src = `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <text x="400" y="280" text-anchor="middle" fill="white" font-size="80" font-family="Arial">${photo.icon}</text>
                <text x="400" y="350" text-anchor="middle" fill="white" font-size="36" font-family="Arial">${photo.title}</text>
                <text x="400" y="400" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="24" font-family="Arial">${photo.date}</text>
            </svg>
        `)}`;

        lightboxTitle.textContent = photo.title;
        lightboxDescription.textContent = photo.description;
        lightboxDate.textContent = photo.date;
        lightboxCategory.textContent = getCategoryName(photo.category);

        lightbox.classList.remove('hidden');

        gsap.from('.lightbox-content', {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    }

    // 關閉燈箱
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        gsap.to('.lightbox-content', {
            duration: 0.3,
            scale: 0.8,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                lightbox.classList.add('hidden');
            }
        });
    }

    // 導航燈箱
    function navigateLightbox(direction) {
        const filteredPhotos = currentCategory === 'all'
            ? [...galleryPhotos, ...uploadedPhotos]
            : [...galleryPhotos, ...uploadedPhotos].filter(photo => photo.category === currentCategory);

        currentPhotoIndex += direction;

        if (currentPhotoIndex < 0) currentPhotoIndex = filteredPhotos.length - 1;
        if (currentPhotoIndex >= filteredPhotos.length) currentPhotoIndex = 0;

        openLightbox(currentPhotoIndex, filteredPhotos);
    }

    // 獲取分類名稱
    function getCategoryName(category) {
        const names = {
            celebration: '慶祝時刻',
            memories: '美好回憶',
            daily: '日常生活',
            special: '特別時刻'
        };
        return names[category] || category;
    }

    // 初始化上傳功能
    function initUploadFunctionality() {
        const uploadArea = document.getElementById('upload-area');
        const uploadBtn = document.getElementById('upload-btn');
        const photoUpload = document.getElementById('photo-upload');
        const uploadForm = document.getElementById('upload-form');
        const cancelUpload = document.getElementById('cancel-upload');
        const submitUpload = document.getElementById('submit-upload');

        uploadBtn.addEventListener('click', () => photoUpload.click());

        // 拖拽上傳
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        photoUpload.addEventListener('change', (e) => {
            const files = e.target.files;
            handleFiles(files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                uploadArea.classList.add('hidden');
                uploadForm.classList.remove('hidden');

                // 顯示上傳動畫
                gsap.from('#upload-form', {
                    duration: 0.5,
                    scale: 0.9,
                    opacity: 0,
                    ease: 'back.out(1.7)'
                });
            }
        }

        cancelUpload.addEventListener('click', () => {
            uploadForm.classList.add('hidden');
            uploadArea.classList.remove('hidden');
            photoUpload.value = '';
        });

        submitUpload.addEventListener('click', () => {
            const title = document.getElementById('photo-title').value;
            const description = document.getElementById('photo-description').value;
            const category = document.getElementById('photo-category').value;
            const date = document.getElementById('photo-date').value;

            if (title && photoUpload.files.length > 0) {
                const file = photoUpload.files[0];
                const reader = new FileReader();

                reader.onload = function(e) {
                    const newPhoto = {
                        id: Date.now(),
                        icon: '📸', // 默認圖標
                        title: title,
                        description: description,
                        category: category,
                        date: date || '2024.01.16',
                        uploaded: true
                    };

                    uploadedPhotos.push(newPhoto);
                    renderGalleryItems();
                    updateGalleryStats();

                    // 重置表單
                    uploadForm.classList.add('hidden');
                    uploadArea.classList.remove('hidden');
                    document.getElementById('photo-title').value = '';
                    document.getElementById('photo-description').value = '';
                    document.getElementById('photo-date').value = '';
                    photoUpload.value = '';

                    // 成功動畫
                    gsap.from('.gallery-item:last-child', {
                        duration: 0.8,
                        scale: 0,
                        rotation: 360,
                        ease: 'back.out(1.7)'
                    });

                    // 顯示成功訊息
                    showSuccessMessage('照片已成功添加！');
                };

                reader.readAsDataURL(file);
            }
        });
    }

    // 顯示成功訊息
    function showSuccessMessage(message) {
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✨</span>
                ${message}
            </div>
        `;

        document.body.appendChild(successMsg);

        gsap.from(successMsg, {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: 'back.out(1.7)'
        });

        setTimeout(() => {
            gsap.to(successMsg, {
                duration: 0.5,
                y: -50,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => successMsg.remove()
            });
        }, 3000);
    }

    // 初始化浮動粒子
    function initFloatingParticles() {
        const particles = document.querySelectorAll('.gallery-particle');

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

    // 滑鼠互動效果
    document.addEventListener('mousemove', function(e) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / 30;
            const deltaY = (e.clientY - centerY) / 30;

            gsap.to(item, {
                duration: 0.5,
                x: deltaX,
                y: deltaY,
                ease: 'power2.out'
            });
        });
    });

    // 導航切換
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 滾動觸發動畫
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.upload-section', {
        scrollTrigger: {
            trigger: '.upload-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.gallery-comments', {
        scrollTrigger: {
            trigger: '.gallery-comments',
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

    // 初始化相簿
    setTimeout(() => {
        initGallery();
    }, 2500);
});