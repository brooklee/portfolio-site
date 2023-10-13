var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });  // Enable transparency
renderer.setClearColor(0x000000, 0);  // Set clear color with alpha 0
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

var geometry = new THREE.BufferGeometry();
var vertices = [];
var originalPositions = []; // Store the original positions
var numParticles = 5000; // Increase the number of particles
var particleSize = 0.1; // Make the particles smaller
var particleOpacity = 0.8; // Set opacity to 20%

// Generate random positions on a sphere
var radius = 5; // Adjust this value to control the size of the sphere
for (var i = 0; i < numParticles; i++) {
    var theta = Math.random() * Math.PI * 2; // Random angle in radians
    var phi = Math.random() * Math.PI; // Random angle in radians
    var x = radius * Math.sin(phi) * Math.cos(theta);
    var y = radius * Math.sin(phi) * Math.sin(theta);
    var z = radius * Math.cos(phi);
    vertices.push(x);
    vertices.push(y);
    vertices.push(z);
    originalPositions.push(x, y, z);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
var material = new THREE.PointsMaterial({ color: 0x888888, size: particleSize, opacity: particleOpacity, transparent: true }); // Adjust material properties
var particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 50;

var mouse = new THREE.Vector2();
var particleSpeed = 0.05;  // Adjust this value for the desired trailing speed
var repulsionDistance = 5;  // Adjust this value to control the repulsion distance
var restoringForce = 0.02;  // Adjust this value to control the strength of the restoring force

var targetPosition = new THREE.Vector3(); // Store the target position for the particles

var horizontalFov = 90;
camera.fov = (Math.atan(Math.tan(((horizontalFov / 2) * Math.PI) / 180) / (window.innerWidth / window.innerHeight)) * 2 * 180) / Math.PI;
camera.updateProjectionMatrix(); // Update the camera's projection matrix

window.addEventListener('mousemove', (event) => {
    var vec = new THREE.Vector3(); // create once and reuse
    var pos = new THREE.Vector3(); // create once and reuse

    vec.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);

    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    var distance = -camera.position.z / vec.z;

    targetPosition.copy(camera.position).add(vec.multiplyScalar(distance));

    // You can adjust the target position here if needed
});



// Update the camera's aspect ratio when the window is resized
window.addEventListener('resize', () => {
    const newAspect = window.innerWidth / window.innerHeight;
    camera.aspect = newAspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

var swirlStrength = 0.1; // Adjust this value to control the strength of the swirl effect

function animate() {
    requestAnimationFrame(animate);

    // Calculate the target position for the particles based on the mouse
    var targetX = targetPosition.x;
    var targetY = targetPosition.y;

    // Add a random offset to the target position to create the swirl effect
    var randomSwirlX = (Math.random() - 20) * swirlStrength;
    var randomSwirlY = (Math.random() - 20) * swirlStrength;

    targetX += randomSwirlX;
    targetY += randomSwirlY;

    // Interpolate particle positions towards the target (mouse-following)
    particles.position.x += (targetX - particles.position.x) * particleSpeed;
    particles.position.y += (targetY - particles.position.y) * particleSpeed;

    // Repulsion effect
    var positions = particles.geometry.attributes.position.array;
    for (var i = 0; i < positions.length; i += 3) {
        // Rest of your repulsion effect code...

        // Apply continuous random displacement to the particles
        var randomDisplacementX = (Math.random() - 0.5) * 0.1;
        var randomDisplacementY = (Math.random() - 0.5) * 0.1;
        var randomDisplacementZ = (Math.random() - 0.5) * 0.1;

        positions[i] += randomDisplacementX;
        positions[i + 1] += randomDisplacementY;
        positions[i + 2] += randomDisplacementZ;
    }

    particles.geometry.attributes.position.needsUpdate = true; // Update particle positions

    renderer.render(scene, camera);
}

animate();
