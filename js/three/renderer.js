function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    scene.rotation.y = Math.sin(time * 0.5) * 0.05;

    if (typeof updateFireflies === 'function') updateFireflies(time);
    if (window.updateNatureWind) window.updateNatureWind(time);

    renderer.render(scene, camera);
}    