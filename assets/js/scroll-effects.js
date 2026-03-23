/**
 * Advanced Scroll Effects for Diego Cadena Ingenieria SAS Website
 * This script enhances the website with various scroll animations and effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // AOS is initialized by main.js on the 'load' event; no need to init it here again

    // 1. Collect scroll-driven elements once, then update in one RAF loop.
    const parallaxElements = document.querySelectorAll('.parallax-scroll');
    const rotateCards = document.querySelectorAll('.rotate-on-scroll');
    const visibleRotateCards = new Set();

    // 2. Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    function updateParallax(scrollPosition) {
        if (parallaxElements.length === 0) return;
        parallaxElements.forEach(element => {
            const speed = Number(element.getAttribute('data-speed') || 0.5);
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }

    function updateProgressBar(scrollPosition) {
        const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollableHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        const scrollPercentage = (scrollPosition / scrollableHeight) * 100;
        progressBar.style.width = `${Math.min(Math.max(scrollPercentage, 0), 100)}%`;
    }

    function updateRotateCards(viewportHeight) {
        if (visibleRotateCards.size === 0) return;
        visibleRotateCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardTop = cardRect.top;
            const cardHeight = cardRect.height;

            if (cardTop < viewportHeight && cardTop > -cardHeight) {
                const scrollPercentage = (viewportHeight - cardTop) / (viewportHeight + cardHeight);
                const rotateY = scrollPercentage * 20 - 10;
                const rotateX = -(scrollPercentage * 20 - 10);
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    }

    if (rotateCards.length > 0) {
        const rotateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleRotateCards.add(entry.target);
                } else {
                    visibleRotateCards.delete(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '200px 0px',
            threshold: 0
        });

        rotateCards.forEach(card => rotateObserver.observe(card));
    }

    let scrollTicking = false;

    function runScrollEffects() {
        scrollTicking = false;
        const scrollPosition = window.pageYOffset || window.scrollY;
        const viewportHeight = window.innerHeight;

        updateParallax(scrollPosition);
        updateProgressBar(scrollPosition);
        updateRotateCards(viewportHeight);
    }

    function scheduleScrollEffects() {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(runScrollEffects);
    }

    window.addEventListener('scroll', scheduleScrollEffects, { passive: true });
    window.addEventListener('resize', scheduleScrollEffects, { passive: true });
    scheduleScrollEffects();

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
                    // Permanece revelado despues de aparecer
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

                            // Formatea el numero para que siempre tenga 2 digitos
                            const formattedCount = String(currentCount).padStart(2, '0');
                            valueNumber.textContent = formattedCount;

                            if (percentage < 1) {
                                requestAnimationFrame(animateCount);
                            } else {
                                // Formatea el numero final para que siempre tenga 2 digitos
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

    // 6. Floating elements (subtle movement) using one shared RAF loop
    const floatingElements = document.querySelectorAll('.float-element');
    if (floatingElements.length > 0) {
        const floatConfigs = Array.from(floatingElements).map((element, index) => ({
            element,
            speed: parseFloat(element.getAttribute('data-float-speed')) || 0.5,
            max: parseFloat(element.getAttribute('data-float-max')) || 20,
            phase: index * 0.8
        }));

        let floatAnimationId = null;
        let animationStart = null;

        function animateFloat(timestamp) {
            if (animationStart === null) animationStart = timestamp;
            const elapsed = (timestamp - animationStart) / 1000;

            floatConfigs.forEach(config => {
                const y = Math.sin((elapsed * config.speed) + config.phase) * config.max;
                config.element.style.transform = `translateY(${y}px)`;
            });

            floatAnimationId = requestAnimationFrame(animateFloat);
        }

        function startFloatAnimation() {
            if (floatAnimationId !== null) return;
            floatAnimationId = requestAnimationFrame(animateFloat);
        }

        function stopFloatAnimation() {
            if (floatAnimationId === null) return;
            cancelAnimationFrame(floatAnimationId);
            floatAnimationId = null;
            animationStart = null;
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopFloatAnimation();
            } else {
                startFloatAnimation();
            }
        });

        startFloatAnimation();
    }
});
