// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000); // Aspect ratio matches the container size
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 300); // Match the container size
document.getElementById('threejs-scene').appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Create a plate (a flat cylinder)
const plateGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
const plateMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const plate = new THREE.Mesh(plateGeometry, plateMaterial);
scene.add(plate);

// Create food items (simple shapes for demonstration)
// A sphere representing a fruit (e.g., tomato)
const tomatoGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const tomatoMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
tomato.position.set(0, 0.5, 0); // Place on the plate
scene.add(tomato);

// A cube representing a piece of food (e.g., cheese)
const cheeseGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const cheeseMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
cheese.position.set(1, 0.5, 0); // Place on the plate
scene.add(cheese);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the plate and food items
    plate.rotation.y += 0.01;
    tomato.rotation.y += 0.01;
    cheese.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Start the animation
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('threejs-scene');
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});