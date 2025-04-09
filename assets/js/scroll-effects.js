/**
 * Advanced Scroll Effects for Diego Cadena Ingenieria SAS Website
 * This script enhances the website with various scroll animations and effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 2000,
        easing: 'ease-in-out',
        once: true,  // Ahora los elementos permanecen visibles después de aparecer
        mirror: false, // No revertir animaciones al scrollear hacia arriba
        anchorPlacement: 'top-bottom'
    });

    // Custom scroll effects

    // 1. Parallax scrolling effect for hero sections
    const parallaxElements = document.querySelectorAll('.parallax-scroll');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }

    // 2. Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });

    // 3. Text reveal effect for section titles
    const revealElements = document.querySelectorAll('.reveal-text');
    if (revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Permanece revelado después de aparecer
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // 4. Counter animation for values section
    const countElements = document.querySelectorAll('.count-on-scroll');
    if (countElements.length > 0) {
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const valueNumber = container.querySelector('.value-number');
                    
                    if (valueNumber) {
                        const targetCount = parseInt(valueNumber.getAttribute('data-count'));
                        const duration = 800; // ms - Velocidad aumentada
                        let startTime = null;

                        function animateCount(timestamp) {
                            if (!startTime) startTime = timestamp;
                            const progress = timestamp - startTime;
                            const percentage = Math.min(progress / duration, 1);
                            const currentCount = Math.floor(percentage * targetCount);
                            
                            // Formatea el número para que siempre tenga 2 dígitos
                            const formattedCount = String(currentCount).padStart(2, '0');
                            valueNumber.textContent = formattedCount;
                            
                            if (percentage < 1) {
                                requestAnimationFrame(animateCount);
                            } else {
                                // Formatea el número final para que siempre tenga 2 dígitos
                                const formattedFinalCount = String(targetCount).padStart(2, '0');
                                valueNumber.textContent = formattedFinalCount;
                                observer.unobserve(container);
                            }
                        }
                        
                        requestAnimationFrame(animateCount);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        countElements.forEach(element => {
            countObserver.observe(element);
        });
    }

    // 5. Staggered fade-in for items in grids or lists
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const staggerItems = container.querySelectorAll('.stagger-item');
        const staggerObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('stagger-visible');
                    }, 100 * index);
                });
                observer.unobserve(container);
            }
        }, { threshold: 0.1 });
        
        staggerObserver.observe(container);
    });

    // 6. Scroll-triggered 3D rotation for cards
    const rotateCards = document.querySelectorAll('.rotate-on-scroll');
    if (rotateCards.length > 0) {
        window.addEventListener('scroll', function() {
            rotateCards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                const cardHeight = card.offsetHeight;
                const windowHeight = window.innerHeight;
                
                if (cardTop < windowHeight && cardTop > -cardHeight) {
                    const scrollPercentage = (windowHeight - cardTop) / (windowHeight + cardHeight);
                    const rotateY = scrollPercentage * 20 - 10; // -10 to 10 degrees
                    const rotateX = -(scrollPercentage * 20 - 10); // -10 to 10 degrees
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            });
        });
    }

    // 7. Floating elements (subtle movement)
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach(element => {
        let floatPosition = 0;
        let floatDirection = 1;
        let floatSpeed = parseFloat(element.getAttribute('data-float-speed')) || 0.5;
        let floatMax = parseFloat(element.getAttribute('data-float-max')) || 20;
        
        function animateFloat() {
            floatPosition += floatSpeed * floatDirection;
            
            if (floatPosition >= floatMax || floatPosition <= -floatMax) {
                floatDirection *= -1;
            }
            
            element.style.transform = `translateY(${floatPosition}px)`;
            requestAnimationFrame(animateFloat);
        }
        
        animateFloat();
    });
});
