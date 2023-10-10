var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

window.addEventListener('mousemove', (event) => {
    // Convert mouse coordinates to the range [-1, 1]
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
});

function animate() {
    requestAnimationFrame(animate);

    // Calculate the target position for the particles based on the mouse
    var targetX = mouse.x * 20 * (window.innerWidth / window.innerHeight);
    var targetY = mouse.y * 20;

    // Interpolate particle positions towards the target (mouse-following)
    particles.position.x += (targetX - particles.position.x) * particleSpeed;
    particles.position.y += (targetY - particles.position.y) * particleSpeed;

    // Repulsion effect
    var positions = particles.geometry.attributes.position.array;
    for (var i = 0; i < positions.length; i += 3) {
        var x = positions[i];
        var y = positions[i + 1];
        var z = positions[i + 2];

        var distance = Math.sqrt((x - particles.position.x) ** 2 + (y - particles.position.y) ** 2);

        // Apply repulsion if the particles are too close to the mouse
        if (distance < repulsionDistance) {
            var repulsionStrength = 0.05; // Adjust this value to control the repulsion strength
            var deltaX = x - particles.position.x;
            var deltaY = y - particles.position.y;
            var magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            deltaX /= magnitude;
            deltaY /= magnitude;
            
            positions[i] += deltaX * repulsionStrength;
            positions[i + 1] += deltaY * repulsionStrength;
        } else {
            // Apply restoring force to bring particles back to their original positions
            var originalX = originalPositions[i];
            var originalY = originalPositions[i + 1];
            var originalZ = originalPositions[i + 2];
            
            positions[i] += (originalX - x) * restoringForce;
            positions[i + 1] += (originalY - y) * restoringForce;
            positions[i + 2] += (originalZ - z) * restoringForce;
        }

        // Apply continuous random displacement to the particles
        var randomDisplacementX = (Math.random() - 0.5) * 0.1;
        var randomDisplacementY = (Math.random() - 0.5) * 0.1;
        var randomDisplacementZ = (Math.random() - 0.5) * 0.1;
        
        positions[i] += randomDisplacementX;
        positions[i + 1] += randomDisplacementY;
        positions[i + 2] += randomDisplacementZ;
    }

    particles.geometry.attributes.position.needsUpdate = true;  // Update particle positions

    renderer.render(scene, camera);
}
animate();
