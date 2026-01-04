// gallery.js - 魔法畫廊頁面邏輯
document.addEventListener('DOMContentLoaded', function() {
    // GSAP 動畫時間軸
    const tl = gsap.timeline();

    // 頁面載入動畫
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
    }, '-=0.5');

    // 模擬相片數據
    const photos = [
        {
            id: 1,
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ff6b6b"/><text x="150" y="110" text-anchor="middle" fill="white" font-size="24" font-family="Arial">童年快樂時光</text></svg>',
            title: '童年快樂時光',
            description: '小時候最愛的遊戲時光，那些無憂無慮的日子',
            category: 'childhood',
            date: '2010-05-15',
            location: '家裡後院'
        },
        {
            id: 2,
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%234ecdc4"/><text x="150" y="110" text-anchor="middle" fill="white" font-size="24" font-family="Arial">家人團聚</text></svg>',
            title: '家人團聚',
            description: '和家人一起度過的溫馨時刻',
            category: 'family',
            date: '2020-12-25',
            location: '家裡客廳'
        },
        {
            id: 3,
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%2345b7d1"/><text x="150" y="110" text-anchor="middle" fill="white" font-size="24" font-family="Arial">朋友們</text></svg>',
            title: '最好的朋友們',
            description: '和朋友們一起創造的美好回憶',
            category: 'friends',
            date: '2019-08-20',
            location: '學校操場'
        },
        {
            id: 4,
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f9ca24"/><text x="150" y="110" text-anchor="middle" fill="white" font-size="24" font-family="Arial">魔法時刻</text></svg>',
            title: '魔法誕生',
            description: '生命中最神奇的時刻',
            category: 'magic',
            date: '2024-01-04',
            location: '魔法世界'
        },
        {
            id: 5,
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f0932b"/><text x="150" y="110" text-anchor="middle" fill="white" font-size="24" font-family="Arial">成長足跡</text></svg>',
            title: '成長的足跡',
            description: '記錄每一個重要的成長時刻',
            category: 'childhood',
            date: '2015-06-10',
            location: '學校'
        },
        {
            id: 6,
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23eb4d4b"/><text x="150" y="110" text-anchor="middle" fill="white" font-size="24" font-family="Arial">歡樂時光</text></svg>',
            title: '歡樂時光',
            description: '充滿歡笑和快樂的日子',
            category: 'friends',
            date: '2021-07-15',
            location: '海邊'
        }
    ];

    // 模擬回憶數據
    const memories = [
        { text: '小時候最喜歡在雨後的彩虹下奔跑，那種感覺就像魔法一樣！', color: '#ff6b6b' },
        { text: '和家人一起烤餅乾的時光是最溫暖的回憶', color: '#4ecdc4' },
        { text: '第一次學會騎腳踏車，那種自由的感覺永遠難忘', color: '#45b7d1' },
        { text: '和最好的朋友們一起看星星，分享彼此的夢想', color: '#f9ca24' }
    ];

    let currentCategory = 'all';
    let currentPhotoIndex = 0;
    let uploadedPhotos = [];

    // 初始化畫廊
    function initGallery() {
        renderPhotos();
        renderMemories();
    }

    // 渲染相片
    function renderPhotos() {
        const photoGrid = document.getElementById('photo-grid');
        photoGrid.innerHTML = '';

        const filteredPhotos = currentCategory === 'all'
            ? [...photos, ...uploadedPhotos]
            : [...photos, ...uploadedPhotos].filter(photo => photo.category === currentCategory);

        filteredPhotos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <div class="photo-image">
                    <img src="${photo.src}" alt="${photo.title}" loading="lazy">
                    <div class="photo-overlay">
                        <div class="photo-info">
                            <h3>${photo.title}</h3>
                            <p>${photo.description}</p>
                        </div>
                    </div>
                </div>
                <div class="photo-meta">
                    <span class="photo-date">${photo.date}</span>
                    <span class="photo-category">${getCategoryName(photo.category)}</span>
                </div>
            `;

            photoItem.addEventListener('click', () => openLightbox(index, filteredPhotos));
            photoGrid.appendChild(photoItem);
        });

        // 動畫效果
        gsap.from('.photo-item', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    }

    // 渲染回憶
    function renderMemories() {
        const memoryNotes = document.getElementById('memory-notes');
        memoryNotes.innerHTML = '';

        memories.forEach(memory => {
            const memoryNote = document.createElement('div');
            memoryNote.className = 'memory-note';
            memoryNote.style.background = memory.color;
            memoryNote.innerHTML = `
                <p>${memory.text}</p>
                <div class="note-decoration">✨</div>
            `;

            memoryNotes.appendChild(memoryNote);
        });

        // 隨機位置
        document.querySelectorAll('.memory-note').forEach(note => {
            const randomRotation = (Math.random() - 0.5) * 10;
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;

            gsap.set(note, {
                rotation: randomRotation,
                x: randomX,
                y: randomY
            });
        });
    }

    // 獲取分類名稱
    function getCategoryName(category) {
        const names = {
            childhood: '童年時光',
            family: '家人陪伴',
            friends: '朋友們',
            magic: '魔法時刻'
        };
        return names[category] || category;
    }

    // 分類切換
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            renderPhotos();
        });
    });

    // 燈箱功能
    function openLightbox(index, photoList) {
        currentPhotoIndex = index;
        const photo = photoList[index];
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const lightboxDate = document.getElementById('lightbox-date');
        const lightboxLocation = document.getElementById('lightbox-location');

        lightboxImage.src = photo.src;
        lightboxTitle.textContent = photo.title;
        lightboxDescription.textContent = photo.description;
        lightboxDate.textContent = photo.date;
        lightboxLocation.textContent = photo.location;

        lightbox.classList.remove('hidden');

        gsap.from('.lightbox-content', {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    }

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

    function navigateLightbox(direction) {
        const filteredPhotos = currentCategory === 'all'
            ? [...photos, ...uploadedPhotos]
            : [...photos, ...uploadedPhotos].filter(photo => photo.category === currentCategory);

        currentPhotoIndex += direction;

        if (currentPhotoIndex < 0) currentPhotoIndex = filteredPhotos.length - 1;
        if (currentPhotoIndex >= filteredPhotos.length) currentPhotoIndex = 0;

        openLightbox(currentPhotoIndex, filteredPhotos);
    }

    // 燈箱事件監聽器
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightbox')) {
            closeLightbox();
        }
    });
    document.getElementById('lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => navigateLightbox(1));

    // 鍵盤控制燈箱
    document.addEventListener('keydown', function(e) {
        if (!document.getElementById('lightbox').classList.contains('hidden')) {
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

    // 上傳功能
    const uploadArea = document.getElementById('upload-area');
    const uploadBtn = document.getElementById('upload-btn');
    const photoUpload = document.getElementById('photo-upload');
    const uploadForm = document.getElementById('upload-form');
    const cancelUpload = document.getElementById('cancel-upload');
    const submitUpload = document.getElementById('submit-upload');

    uploadBtn.addEventListener('click', () => photoUpload.click());
    photoUpload.addEventListener('change', handleFileSelect);

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

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            uploadArea.classList.add('hidden');
            uploadForm.classList.remove('hidden');

            // 預覽第一張圖片
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // 這裡可以添加圖片預覽
                };
                reader.readAsDataURL(file);
            }
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
        const location = document.getElementById('photo-location').value;

        if (title && photoUpload.files.length > 0) {
            const file = photoUpload.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const newPhoto = {
                    id: Date.now(),
                    src: e.target.result,
                    title: title,
                    description: description,
                    category: category,
                    date: date || new Date().toISOString().split('T')[0],
                    location: location
                };

                uploadedPhotos.push(newPhoto);
                renderPhotos();

                // 重置表單
                uploadForm.classList.add('hidden');
                uploadArea.classList.remove('hidden');
                document.getElementById('photo-title').value = '';
                document.getElementById('photo-description').value = '';
                document.getElementById('photo-date').value = '';
                document.getElementById('photo-location').value = '';
                photoUpload.value = '';

                // 成功動畫
                gsap.from('.photo-item:last-child', {
                    duration: 0.8,
                    scale: 0,
                    rotation: 360,
                    ease: 'back.out(1.7)'
                });
            };

            reader.readAsDataURL(file);
        }
    });

    // 回憶功能
    const addMemoryBtn = document.getElementById('add-memory-btn');
    const memoryModal = document.getElementById('memory-modal');
    const memoryModalClose = document.getElementById('memory-modal-close');
    const submitMemory = document.getElementById('submit-memory');
    let selectedColor = '#ff6b6b';

    addMemoryBtn.addEventListener('click', () => {
        memoryModal.classList.remove('hidden');
        gsap.from('.modal-content', {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    });

    memoryModalClose.addEventListener('click', () => {
        memoryModal.classList.add('hidden');
    });

    memoryModal.addEventListener('click', (e) => {
        if (e.target === memoryModal) {
            memoryModal.classList.add('hidden');
        }
    });

    // 顏色選擇
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedColor = this.dataset.color;
        });
    });

    submitMemory.addEventListener('click', () => {
        const memoryText = document.getElementById('memory-text').value.trim();
        if (memoryText) {
            const newMemory = {
                text: memoryText,
                color: selectedColor
            };

            memories.push(newMemory);
            renderMemories();

            // 重置表單
            document.getElementById('memory-text').value = '';
            memoryModal.classList.add('hidden');

            // 新回憶動畫
            gsap.from('.memory-note:last-child', {
                duration: 0.8,
                scale: 0,
                rotation: -180,
                ease: 'back.out(1.7)'
            });
        }
    });

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

    gsap.from('.memory-wall', {
        scrollTrigger: {
            trigger: '.memory-wall',
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
        const photos = document.querySelectorAll('.photo-item');
        photos.forEach((photo, index) => {
            const rect = photo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / 50;
            const deltaY = (e.clientY - centerY) / 50;

            gsap.to(photo, {
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

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 初始化
    initGallery();
});