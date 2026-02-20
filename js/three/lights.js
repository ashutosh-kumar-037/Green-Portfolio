function initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x385520, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
}
