// const hoverLink = document.querySelector('.hover-link');
// const mouseFollower = document.querySelector('.mouse-follower');

// hoverLink.addEventListener('mouseover', (e) => {
//     mouseFollower.style.opacity = 1;
// });

// hoverLink.addEventListener('mousemove', (e) => {
//     const xPos = e.offsetX;
//     const yPos = e.offsetY;

//     mouseFollower.style.transform = `translate(${xPos}px, ${yPos}px)`;
// });

// hoverLink.addEventListener('mouseout', (e) => {
//     mouseFollower.style.opacity = 0;
// });


function createMouseHoverEffect(hoverElementSelector, followerElementSelector) {
    const hoverLink = document.querySelector(hoverElementSelector);
    const mouseFollower = document.querySelector(followerElementSelector);

    hoverLink.addEventListener('mouseover', (e) => {
        mouseFollower.style.opacity = 1;
        
    });

    hoverLink.addEventListener('mousemove', (e) => {
        const xPos = e.offsetX;
        const yPos = e.offsetY;

        mouseFollower.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });

    hoverLink.addEventListener('mouseout', (e) => {
        mouseFollower.style.opacity = 0;
    });
}

// Example usage:
createMouseHoverEffect('.hover-link-reset', '.mouse-follower-reset');
// Example usage:
createMouseHoverEffect('.hover-link-mici', '.mouse-follower-mici');
createMouseHoverEffect('.hover-link-vending', '.mouse-follower-vending');

console.log('hello world')