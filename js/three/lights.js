function initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x558B2F, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
}
