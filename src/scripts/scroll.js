const animationContainer = document.getElementById('animation');

// Load the Lottie animation
const animation = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg', // Use 'svg' or 'canvas' based on your preference
    loop: true,
    autoplay: true,
    path: './animation_lnte4i0z.json', // Replace with the path to your Lottie JSON file
});