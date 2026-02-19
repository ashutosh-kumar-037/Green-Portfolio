function initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4A7A28, 0.6);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
}
