const flowerMeshes = [];

function initFlowers() {
    for (let i = 0; i < 20; i++) {
        const t = i / 19;
        const pos = mainVineCurve.getPoint(t);
        const flower = createFlower(pos, 0xFFA6C9);
        flowerMeshes.push({ mesh: flower, t: t });
        gsap.to(flower.scale, { x: 1, y: 1, z: 1, duration: 2, delay: 1 + (t * 2), ease: "back.out(1.7)" });
    }
}

function createFlower(position, color = 0xFFA6C9) {
    const flowerGroup = new THREE.Group();
    const centerGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const centerMat = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    const center = new THREE.Mesh(centerGeo, centerMat);
    flowerGroup.add(center);
    const petalGeo = new THREE.ConeGeometry(0.08, 0.2, 8);
    const petalMat = new THREE.MeshStandardMaterial({ color: color });
    for (let i = 0; i < 5; i++) {
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.rotation.z = (Math.PI * 2 / 5) * i;
        petal.position.y = 0.1;
        const pivot = new THREE.Group();
        pivot.add(petal);
        pivot.rotation.x = Math.PI / 2.5;
        flowerGroup.add(pivot);
    }
    flowerGroup.position.copy(position);
    flowerGroup.scale.set(0, 0, 0);
    scene.add(flowerGroup);
    return flowerGroup;
}
