// three-bg.js - Three.js 3D背景
function initThreeBG() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('three-bg').appendChild(renderer.domElement);

    // 創建幾何體
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8e44ad,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // 添加更多幾何體
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x3498db,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-15, 0, -10);
    scene.add(sphere);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xe74c3c,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(15, 0, -10);
    scene.add(cube);

    camera.position.z = 30;

    // 動畫循環
    function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;

        sphere.rotation.x += 0.008;
        sphere.rotation.y += 0.01;

        cube.rotation.x += 0.006;
        cube.rotation.z += 0.008;

        renderer.render(scene, camera);
    }

    animate();

    // 響應式
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 初始化
initThreeBG();