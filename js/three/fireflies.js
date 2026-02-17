let firefliesPointMesh;
const firefliesCount = 250;
const fireflyVelocities = new Float32Array(firefliesCount * 3);
const fireflyPhases = new Float32Array(firefliesCount);
const fireflyBlinkSpeeds = new Float32Array(firefliesCount);

const createGlowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 235, 59, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 235, 59, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 235, 59, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
};

function initFireflies() {
    const firefliesGeometry = new THREE.BufferGeometry();
    const fireflyPositions = new Float32Array(firefliesCount * 3);
    const fireflyColors = new Float32Array(firefliesCount * 3);

    for (let i = 0; i < firefliesCount; i++) {
        fireflyPositions[i * 3] = (Math.random() - 0.5) * 60;
        fireflyPositions[i * 3 + 1] = Math.random() * 140 - 80;
        fireflyPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;

        fireflyVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
        fireflyVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        fireflyVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

        fireflyPhases[i] = Math.random() * Math.PI * 2;
        fireflyBlinkSpeeds[i] = 1.2 + Math.random() * 2.5;
    }

    firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));
    firefliesGeometry.setAttribute('color', new THREE.BufferAttribute(fireflyColors, 3));

    const firefliesMaterial = new THREE.PointsMaterial({
        size: 0.45,
        map: createGlowTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    firefliesPointMesh = new THREE.Points(firefliesGeometry, firefliesMaterial);
    scene.add(firefliesPointMesh);
}

function updateFireflies(time) {
    if (!firefliesPointMesh) return;
    const ffPos = firefliesPointMesh.geometry.attributes.position.array;
    const ffCol = firefliesPointMesh.geometry.attributes.color.array;

    for (let i = 0; i < firefliesCount; i++) {
        ffPos[i * 3] += fireflyVelocities[i * 3] + Math.sin(time + i) * 0.005;
        ffPos[i * 3 + 1] += fireflyVelocities[i * 3 + 1] + Math.cos(time + i) * 0.005;
        ffPos[i * 3 + 2] += fireflyVelocities[i * 3 + 2];

        if (ffPos[i * 3] > 35) ffPos[i * 3] = -35;
        if (ffPos[i * 3] < -35) ffPos[i * 3] = 35;
        if (ffPos[i * 3 + 1] > 60) ffPos[i * 3 + 1] = -80;
        if (ffPos[i * 3 + 1] < -80) ffPos[i * 3 + 1] = 60;

        const pulse = (Math.sin(time * fireflyBlinkSpeeds[i] + fireflyPhases[i]) + 1) / 2;
        const brightness = 0.3 + pulse * 0.7;

        ffCol[i * 3] = brightness * 1.0;
        ffCol[i * 3 + 1] = brightness * 0.95;
        ffCol[i * 3 + 2] = brightness * 0.4;
    }
    firefliesPointMesh.geometry.attributes.position.needsUpdate = true;
    firefliesPointMesh.geometry.attributes.color.needsUpdate = true;
}
