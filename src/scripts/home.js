import { gsap } from "gsap";



// script.js
window.addEventListener('load', function () {
    // const backgroundContainer = document.querySelector('.wrapper-hero');

    // // Remove the blur effect
    // backgroundContainer.style.filter = 'blur(0)';

    // // You can adjust the time (1000ms = 1 second) for the desired fading duration
    // backgroundContainer.style.transition = 'filter .3s ease-in-out';

    // const dropInText = document.getElementById('drop-in-text');
    var tl = gsap.timeline();
    tl.to(".wrapper-hero", {filter: 'blur(0)', duration: .5, ease: "power1.out"},1);

    tl.to('#drop-in-text', {opacity: 1, duration: .1} ,1);
    tl.to('#drop-up-text', {opacity: 1, duration: .1} ,1);
    tl.to('.nav', {opacity: 1, duration: .1} ,1);
    tl.to('#name', {opacity: 1, duration: .1} ,1);

    tl.from("#drop-in-text", {y: -100, duration: .3 , ease: "power1.out", },2);
    tl.from("#drop-up-text", {y: 100, duration: .3 , ease: "power1.out", },2);
    tl.from("#name", {y: -150, duration: .5 , ease: "power1.out", },3);
    tl.from(".nav", {y: -100, duration: .3 , ease: "power1.out", },3);
    
});