// src/utils/animations.js

// Utility function to trigger animations on scroll
export function animateOnScroll(element, animationClass) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(element);
}

// Utility function to trigger animations on hover
export function animateOnHover(element, animationClass) {
    element.addEventListener('mouseenter', () => {
        element.classList.add(animationClass);
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove(animationClass);
    });
}