import { gsap } from "gsap";



// script.js
window.addEventListener('load', function () {
    console.log('HOME.JS loaded');
    // const backgroundContainer = document.querySelector('.wrapper-hero');

    // // Remove the blur effect
    // backgroundContainer.style.filter = 'blur(0)';

    // // You can adjust the time (1000ms = 1 second) for the desired fading duration
    // backgroundContainer.style.transition = 'filter .3s ease-in-out';

    // const dropInText = document.getElementById('drop-in-text');
    var tl = gsap.timeline();
    tl.to(".wrapper-hero", {filter: 'blur(0)', duration: .5, ease: "power1.out"},1);

    tl.to('#drop-in-text', {opacity: 1, duration: .2} ,2);
    tl.to('#drop-up-text', {opacity: 1, duration: .1} ,1);
    tl.to('.nav', {opacity: 1, duration: .1} ,1);
    tl.to('#name', {opacity: 1, duration: .2} ,2);

    tl.from("#drop-in-text", {y: -100, duration: .3 , ease: "power1.out", },2);
    tl.from("#drop-up-text", {y: 100, duration: .3 , ease: "power1.out", },2);
    tl.from("#name", {y: -150, duration: .5 , ease: "power1.out", },3);
    tl.from(".nav", {y: -100, duration: .3 , ease: "power1.out", },3);

    
});


// var profile = document.querySelectorAll('.word');

// // Iterate through each element and add a 'mouseenter' event listener
// profile.forEach(function(letter) {

//     var tl = gsap.timeline();
//   letter.addEventListener('mouseenter', function() {
//     // this.animation.play();
//     tl.to(".word", {y: -100, duration: .3 , ease: "power1.out",},1);
//     tl.from(".word", {y: 100, duration: .3 , ease: "power1.out",},2);
//   });
// });

// Target the text element
// const text = document.getElementById('text-wrapper');

// // Add event listener for mouse enter and mouse leave
// text.addEventListener('mouseenter', () => {

//     var tl = gsap.timeline();
//   tl.to('#text', {
//     duration: 0.3,
//     y: -30,
//     ease: "bounce.out",
//     yoyo: true,
//   });

//   tl.to('#text', {
//     duration: 0.01,
//     y: 30,
//     ease: "bounce.out",
//     yoyo: true,
//   });


//   tl.to('#text', {
//     duration: 0.3,
//     y: 0,
//     ease: "power1.out",
//     yoyo: true,
//   });
// });






// profile.forEach(function(letter) {
//     letter.addEventListener('mouseleave', function() {
//       // this.animation.play();
//       gsap.to(".word", {y: 100, duration: .3 , ease: "power1.out",});
//     });
//   });

// var word = document.querySelector('.word');

// // Add a mouseenter event listener to the word
// word.addEventListener('mouseenter', function() {
//   // Create a rolling animation using GSAP
//   gsap.to(word, {
//     rotation: 360, // Rotate 360 degrees
//     transformOrigin: "center", // Set the transform origin to the center of the word
//     duration: 1, // Set the duration of the animation to 1 second
//     ease: "power3.out" // Use a cubic easing function for a smooth animation
//   });
// });

// // Add a mouseleave event listener to reset the rotation
// word.addEventListener('mouseleave', function() {
//   // Reset the rotation to 0
//   gsap.to(word, {
//     rotation: 0,
//     duration: 0 // Set the duration to 0 to reset instantly
//   });
// });






