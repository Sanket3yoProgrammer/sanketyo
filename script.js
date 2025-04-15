function runScript() {
    // Check for mobile view
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    console.log(isMobile ? "Mobile view" : "Desktop view");
    
    // Common functions that work for both mobile and desktop
    function initCommonFunctionality() {
        initImageTiltEffect();
        initTypingEffect();
        initFloatingNav();
        initNavigationToggle();
        initGSAPAnimations();
        initScrollRevealAnimations();
        initGSAPScrollTrigger();
        initParallaxEffects();
        initLetterTiltEffect();
        initSocialIconsHover();
        initScrollRedDiv();
        initWAIContainer();
        initClockUpdate();
        initScrollingText();
        initNavScrollToSection();
        initFooterAnimation();
    }

    // Initialize canvas animation based on viewport
    function initCanvasAnimation() {
        const canvas = document.getElementById("circleCanvas");
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        // Mobile has smaller size
        const size = isMobile ? 94 : 150;
        const cornerRadius = 20;
        let progress = 0;
        
        function drawRoundedSquare() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            
            const startX = canvas.width / 2 - size / 2;
            const startY = canvas.height / 2 - size / 2;
            
            ctx.moveTo(startX + cornerRadius, startY);
            ctx.lineTo(startX + size - cornerRadius, startY);
            ctx.quadraticCurveTo(startX + size, startY, startX + size, startY + cornerRadius);
            ctx.lineTo(startX + size, startY + size - cornerRadius);
            ctx.quadraticCurveTo(startX + size, startY + size, startX + size - cornerRadius, startY + size);
            ctx.lineTo(startX + cornerRadius, startY + size);
            ctx.quadraticCurveTo(startX, startY + size, startX, startY + size - cornerRadius);
            ctx.lineTo(startX, startY + cornerRadius);
            ctx.quadraticCurveTo(startX, startY, startX + cornerRadius, startY);
            
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            
            // Use different animation techniques based on mobile/desktop
            if (isMobile) {
                ctx.stroke();
            } else {
                ctx.save();
                ctx.setLineDash([progress * 300, 300]);
                ctx.stroke();
                ctx.restore();
            }
            
            if (progress < 1) {
                progress += 0.02;
                requestAnimationFrame(drawRoundedSquare);
            }
        }
        
        // Intersection Observer to start animation when visible
        const circleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progress = 0;
                    drawRoundedSquare();
                }
            });
        }, { threshold: 0.1 });
        
        circleObserver.observe(canvas);
    }

    // Scroll position adjustments - different for mobile/desktop
    function initScrollPositionAdjustments() {
        // console.log("Initializing scroll position adjustments");
        
        // Set initial positions
        let welcomeText = document.getElementById('welcome-text');
        let bigBgText = document.getElementById('big-bgtext');
        
        // Set initial positions
        if (welcomeText) {
            welcomeText.style.top = isMobile ? "50vh" : "58vh";
            // console.log("Set welcome-text initial position:", welcomeText.style.top);
        }
        
        if (bigBgText) {
            bigBgText.style.top = isMobile ? "56vh" : "58vh";
            // console.log("Set big-bgtext initial position:", bigBgText.style.top);
        }
        
        // Add scroll event listener
        document.addEventListener('scroll', () => {
            let scrollPosition = window.scrollY;
            
            if (welcomeText) {
                // Different top position calculation based on viewport
                let newWelcomeTop = Math.max(isMobile ? 50 - scrollPosition / 10 : 58 - scrollPosition / 10, 0);
                welcomeText.style.top = `${newWelcomeTop}vh`;
                // console.log("Updated welcome-text position:", welcomeText.style.top);
            }
            
            if (bigBgText) {
                let newBigBgTop = Math.max(isMobile ? 56 - scrollPosition / 20 : 58 - scrollPosition / 20, 0);
                bigBgText.style.top = `${newBigBgTop}vh`;
                // console.log("Updated big-bgtext position:", bigBgText.style.top);
            }
        });
        
        // console.log("Scroll position adjustments initialized");
    }

    // COMMON FUNCTIONS - IMPLEMENTATION

    // Image tilt effect
    function initImageTiltEffect() {
        let image = document.getElementById('image');
        if (image) {
            image.addEventListener('mousemove', tiltEffect);
            image.addEventListener('touchmove', tiltEffect);
            image.addEventListener('mouseleave', resetTilt);
            image.addEventListener('touchend', resetTilt);
        }

        function tiltEffect(e) {
            const { left, top, width, height } = image.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            const rotateX = y * 20;
            const rotateY = x * 20;

            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }

        function resetTilt() {
            image.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        }
    }

    // Typing effect
    function initTypingEffect() {
        const words = ["Web Developer", "Programmer", "Web Designer", "Chess Player", "Script Writer", "Graphic Designer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let textElement = document.getElementById("text");
        
        if (textElement) {
            function typeEffect() {
                const currentWord = words[wordIndex];
                const displayText = isDeleting 
                    ? currentWord.substring(0, charIndex - 1) 
                    : currentWord.substring(0, charIndex + 1);
                
                textElement.textContent = displayText;
                
                if (!isDeleting && charIndex === currentWord.length) {
                    setTimeout(() => isDeleting = true, 1000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
                
                charIndex += isDeleting ? -1 : 1;
                setTimeout(typeEffect, isDeleting ? 100 : 200);
            }
            
            typeEffect();
        }
    }
    
    // Floating Nav effect
    function initFloatingNav() {
        let floatingNav = document.querySelector('.floating-nav');
        if (floatingNav) {
            floatingNav.addEventListener('mousemove', scaleIcons);
            floatingNav.addEventListener('touchmove', scaleIcons);
            floatingNav.addEventListener('mouseleave', resetScale);
            floatingNav.addEventListener('touchend', resetScale);
        }
        
        function scaleIcons(e) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
            document.querySelectorAll('.floating-nav a').forEach(link => {
                const rect = link.getBoundingClientRect();
                const linkX = rect.left + rect.width / 2;
                const linkY = rect.top + rect.height / 2;
        
                const distance = Math.sqrt((clientX - linkX) ** 2 + (clientY - linkY) ** 2);
                const scale = Math.max(1, 2 - distance / 100);
        
                link.style.transform = `scale(${scale})`;
            });
        }
        
        function resetScale() {
            document.querySelectorAll('.floating-nav a').forEach(link => {
                link.style.transform = 'scale(1)';
            });
        }
    }
    
    // Navigation toggle
    function initNavigationToggle() {
        let navContainer = document.getElementById('nav-c');
        let navToggle = document.getElementById('nav-c-toggle');
        let body = document.body;

        // console.log('Nav elements:', { 
        //     navContainer: navContainer, 
        //     navToggle: navToggle 
        // });

        if (navContainer && navToggle) {
            navToggle.addEventListener('click', (e) => {
                // console.log('Nav toggle clicked');
                e.preventDefault();
                
                const isOpen = navContainer.classList.contains('nav-open');
                // console.log('Current nav state:', { isOpen });
                
                // Get scroll-red-div element
                let scrollRedDiv = document.querySelector('.scroll-red-div');
                
                if (isOpen) {
                    // console.log('Closing nav');
                    navContainer.classList.remove('nav-open');
                    navToggle.classList.remove('nav-toggle-active');
                    body.classList.remove('nav-open');
                    
                    // Remove any custom social lines we added
                    document.querySelectorAll('.social-line, .hire-me-line').forEach(line => {
                        line.remove();
                    });
                    
                    // Animate scroll-red-div back into view
                    if (scrollRedDiv) {
                        gsap.to(scrollRedDiv, {
                            x: 0,
                            rotation: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "elastic.out(1, 0.5)",
                            delay: 0.2
                        });
                    }
                    
                    // Also bring back any revealed elements
                    let revealedElements = document.querySelectorAll('.sr-element');
                    gsap.to(revealedElements, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.05
                    });
                    
                } else {
                    // console.log('Opening nav');
                    navContainer.classList.add('nav-open');
                    navToggle.classList.add('nav-toggle-active');
                    body.classList.add('nav-open');
                    
                    // Animate scroll-red-div out of view with rotation
                    if (scrollRedDiv) {
                        gsap.to(scrollRedDiv, {
                            x: 300,
                            rotation: 90,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.inOut"
                        });
                    }
                    
                    // Also move revealed elements
                    revealedElements = document.querySelectorAll('.sr-element');
                    gsap.to(revealedElements, {
                        x: -100,
                        opacity: 0.2,
                        duration: 0.5,
                        ease: "power3.out",
                        stagger: 0.05
                    });
                    
                    handleNavOpenAnimations(navContainer);
                }
                
                // console.log('Updated nav classes:', {
                //     containerClasses: navContainer.classList.toString(),
                //     toggleClasses: navToggle.classList.toString()
                // });
            });

            // console.log('Initial nav state:', {
            //     containerClasses: navContainer.classList.toString(),
            //     toggleClasses: navToggle.classList.toString()
            // });
        } else {
            console.error('Navigation elements not found:', {
                'nav-c': !navContainer,
                'nav-c-toggle': !navToggle
            });
        }
        
        // Helper function for nav open animations
        function handleNavOpenAnimations(navContainer) {
            // Create entrance animations for nav-c elements
            let astronaut2 = navContainer.querySelector('#astronaut2');
            let navP1 = navContainer.querySelector('#nav-p4');
            let navP4 = navContainer.querySelector('#nav-p1');
            let navP5 = navContainer.querySelector('#nav-p5');
            
            // Debug - check if elements are found
            // console.log('Nav animation elements:', {
            //     astronaut2: astronaut2,
            //     navP1: navP1,
            //     navP4: navP4,
            //     navP5: navP5
            // });
            
            // Reset positions first - making sure all elements exist
            let elementsToAnimate = [astronaut2, navP1, navP4, navP5].filter(Boolean);
            gsap.set(elementsToAnimate, { 
                opacity: 0
            });
            
            // Create astronaut2 floaty entrance animation from right
            if (astronaut2) {
                gsap.fromTo(astronaut2, 
                    { x: 200, y: 50, rotation: 15, opacity: 0 },
                    { 
                        x: 0, 
                        y: 0, 
                        rotation: 0,
                        opacity: 1, 
                        duration: 1.2, 
                        ease: "elastic.out(1, 0.5)",
                        delay: 0.3,
                        onComplete: () => {
                            // Add floating animation after entrance
                            gsap.to(astronaut2, {
                                y: "+=15",
                                rotation: "+=3",
                                duration: 2.5,
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut"
                            });
                        }
                    }
                );
            }
            
            // Give navP4 the same entrance animation as astronaut2 but from left side
            if (navP4) {
                gsap.fromTo(navP4, 
                    { x: -200, y: 50, rotation: -15, opacity: 0 },  // Mirror from left side
                    { 
                        x: 0, 
                        y: 0, 
                        rotation: 0,
                        opacity: 1, 
                        duration: 1.2, 
                        ease: "elastic.out(1, 0.5)",
                        delay: 0.3,
                        onComplete: () => {
                            // Add floating animation after entrance
                            gsap.to(navP4, {
                                y: "+=15",
                                rotation: "-=3",  // Opposite rotation for variety
                                duration: 2.5,
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut"
                            });
                        }
                    }
                );
            }
            
            // Create navP1 entrance from bottom-left diagonal
            if (navP1) {
                gsap.fromTo(navP1,
                    { x: -100, y: 100, opacity: 0, scale: 0.7 },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        delay: 0.1
                    }
                );
            }
            
            // Create navP5 entrance from bottom-right diagonal
            if (navP5) {
                gsap.fromTo(navP5,
                    { x: 120, y: 80, opacity: 0, scale: 1.3, rotation: 20 },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.9,
                        ease: "elastic.out(1, 0.4)",
                        delay: 0.4
                    }
                );
            }
            
            navContainer.offsetHeight;
            navContainer.scrollTop = 0;
            
            let navItems = navContainer.querySelectorAll('h4, .btn');
            if (navItems.length > 0) {
                let lastItem = navItems[navItems.length - 1];
                let containerHeight = navContainer.clientHeight;
                let lastItemBottom = lastItem.offsetTop + lastItem.offsetHeight;
                
                if (lastItemBottom > containerHeight) {
                    navContainer.style.paddingBottom = '120px';
                }
            }

            // Create entrance animations for nav-c h4 elements
            let h4Elements = navContainer.querySelectorAll('h4');

            if (h4Elements.length > 0) {
                h4Elements.forEach((h4, index) => {
                    // Mark h4 as currently animating
                    h4.classList.add('animating');
                    
                    // Split the text into individual letters
                    let letters = h4.textContent.split('');
                    h4.innerHTML = ''; // Clear the original text

                    // Create a span for each letter and append it to the h4
                    letters.forEach(letter => {
                        let span = document.createElement('span');
                        span.textContent = letter;
                        span.style.display = 'inline-block'; // Ensure letters are inline-block for animation
                        h4.appendChild(span);
                    });

                    // Animate each letter with a wave effect
                    gsap.fromTo(h4.children, 
                        { y: 50, opacity: 0 }, // Start from below and invisible
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "back.out(1.7)",
                            stagger: {
                                amount: 0.5, // Total time for the stagger
                                from: "start", // Start from the first letter
                                ease: "power1.inOut" // Easing for the wave effect
                            },
                            delay: index * 0.1, // Delay for each h4 element
                            onComplete: function() {
                                // Remove animating class once entrance animation is complete
                                h4.classList.remove('animating');
                            }
                        }
                    );
                });
            }

            // Create entrance animations for social icons
            let socialIcons = navContainer.querySelectorAll('.social-icons a');
            let socialIconsContainer = navContainer.querySelector('.social-icons');
            let socialIconsLines = [];
            
            if (socialIconsContainer) {
                // Check if mobile view
                const isMobile = window.matchMedia("(max-width: 768px)").matches;
                
                // Only add lines in desktop view
                if (!isMobile) {
                    // Create pseudo-elements for animation targeting
                    const beforeLine = document.createElement('div');
                    beforeLine.classList.add('social-line', 'social-line-before');
                    
                    beforeLine.style.width = '1px';
                    beforeLine.style.height = '5rem';
                    beforeLine.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    
                    const afterLine = document.createElement('div');
                    afterLine.classList.add('social-line', 'social-line-after');
                    
                    afterLine.style.width = '1px';
                    afterLine.style.height = '5rem';
                    afterLine.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    
                    // Insert lines at beginning and end of container
                    socialIconsContainer.insertBefore(beforeLine, socialIconsContainer.firstChild);
                    socialIconsContainer.appendChild(afterLine);
                    
                    socialIconsLines = [beforeLine, afterLine];
                    
                    // For desktop, animate vertically
                    gsap.set(socialIconsLines, { 
                        opacity: 0, 
                        scaleY: 0,
                        transformOrigin: "center" 
                    });
                    
                    // Animate lines
                    gsap.to(socialIconsLines, {
                        opacity: 1,
                        scaleY: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        stagger: 0.2,
                        delay: 0.1
                    });
                }
            }

            if (socialIcons.length > 0) {
                // Check if mobile view
                const isMobile = window.matchMedia("(max-width: 768px)").matches;
                
                if (isMobile) {
                    // For mobile, animate from below
                    gsap.set(socialIcons, { opacity: 0, y: 15 }); // Start from below
                    
                    gsap.to(socialIcons, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                        stagger: {
                            amount: 0.4, // Total time for the stagger
                            from: "center", // Start from the center for a nice effect
                            ease: "power1.inOut" // Easing for the wave effect
                        },
                        delay: 0.3 // Delay for the entire group
                    });
                } else {
                    // For desktop, use original vertical animation
                    gsap.set(socialIcons, { opacity: 0, y: 25 }); // Set initial state
                    
                    gsap.to(socialIcons, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                        stagger: {
                            amount: 0.5, // Total time for the stagger
                            from: "start", // Start from the first icon
                            ease: "power1.inOut" // Easing for the wave effect
                        },
                        delay: 0.3 // Delay for the entire group
                    });
                }
            }

            // Create entrance animations for hire-me-container
            let hireMeContainer = navContainer.querySelector('.hire-me-container');
            let hireMeText = navContainer.querySelector('.hire-me-text');
            let hireMeLines = [];
            
            if (hireMeContainer) {
                // Check if mobile view
                const isMobile = window.matchMedia("(max-width: 768px)").matches;
                
                // Only add lines in desktop view
                if (!isMobile) {
                    // Create pseudo-elements for animation targeting
                    const beforeLine = document.createElement('div');
                    beforeLine.classList.add('hire-me-line', 'hire-me-line-before');
                    
                    beforeLine.style.width = '1px';
                    beforeLine.style.height = '5rem';
                    beforeLine.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    
                    const afterLine = document.createElement('div');
                    afterLine.classList.add('hire-me-line', 'hire-me-line-after');
                    
                    afterLine.style.width = '1px';
                    afterLine.style.height = '5rem';
                    afterLine.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    
                    // Insert lines at beginning and end of container
                    hireMeContainer.insertBefore(beforeLine, hireMeContainer.firstChild);
                    hireMeContainer.appendChild(afterLine);
                    
                    hireMeLines = [beforeLine, afterLine];
                    
                    // For desktop, animate vertically
                    gsap.set(hireMeLines, { 
                        opacity: 0, 
                        scaleY: 0,
                        transformOrigin: "center" 
                    });
                    
                    // Animate lines
                    gsap.to(hireMeLines, {
                        opacity: 1,
                        scaleY: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        stagger: 0.2,
                        delay: 0.1
                    });
                }
            }

            if (hireMeText) {
                // Check if mobile view
                const isMobile = window.matchMedia("(max-width: 768px)").matches;
                
                if (isMobile) {
                    // For mobile, animate from below
                    gsap.set(hireMeText, { opacity: 0, y: 15 }); // Start from below
                    
                    gsap.to(hireMeText, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                        delay: 0.3 // Delay for the entire group
                    });
                } else {
                    // For desktop, use original vertical animation
                    gsap.set(hireMeText, { opacity: 0, y: 25 }); // Set initial state
                    
                    gsap.to(hireMeText, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                        delay: 0.3 // Delay for the entire group
                    });
                }
            }
        }
    }
    
    // Basic GSAP animations
    function initGSAPAnimations() {
        if (typeof gsap !== 'undefined') {
            // Header elements entrance animations
            const headerElements = {
                navToggle: document.querySelector('#nav-c-toggle'),
                scrollRedDiv: document.querySelector('.scroll-red-div')
            };

            // Set initial states
            gsap.set([headerElements.navToggle, headerElements.scrollRedDiv], {
                y: -50,
                opacity: 0
            });

            // Create entrance animation timeline
            const headerTimeline = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: "power3.out"
                }
            });

            headerTimeline
                .to(headerElements.navToggle, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out(1.7)"
                })
                .to(headerElements.scrollRedDiv, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.3");

            // Big background text entrance animation
            const bigBgText = document.querySelector('#big-bgtext');
            if (bigBgText) {
                gsap.set(bigBgText, {
                    y: 100,
                    opacity: 0
                });

                gsap.to(bigBgText, {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    delay: 0.5
                });
            }

            // Original animations
            gsap.from(".home-img img", { duration: 1.2, y: 10, opacity: 0, ease: "power3.out" });
            gsap.from(".home-content h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out", delay: 0.5 });
            gsap.from(".typing-container", { duration: 1, scale: 0.8, opacity: 0, ease: "elastic.out(1, 0.5)", delay: 1 });
        }
    }
    
    // ScrollReveal animations
    function initScrollRevealAnimations() {
        if (typeof ScrollReveal !== 'undefined') {
            // Create a custom instance with default settings
            let sr = ScrollReveal({
                duration: 1000,
                easing: 'ease-in-out',
                reset: true,
                beforeReveal: function(element) {
                    // Add class to revealed elements so we can target them later
                    element.classList.add('sr-element');
                }
            });
            
            sr.reveal('.image-container', {
                duration: 1000, 
                origin: 'bottom', 
                distance: '50px', 
                delay: 200, 
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.image-container', {
                duration: 1200,
                origin: 'left', 
                distance: '80px', 
                delay: 200, 
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.image-container', {
                duration: 1000, 
                scale: 0.85, 
                delay: 200, 
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.about-content p', {
                duration: 1000,
                origin: 'right',
                distance: '50px',
                delay: 300,
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.about-content .about-icons', {
                duration: 1200,
                origin: 'bottom',
                distance: '70px',
                delay: 400,
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.detail-item', {
                duration: 900,
                origin: 'left',
                distance: '50px',
                delay: 300,
                easing: 'ease-in-out',
                interval: 150,
                reset: true
            });
            
            sr.reveal('.skills__box', {
                duration: 1000,
                origin: 'bottom',
                distance: '70px',
                delay: 300,
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.projects-section h2', {
                duration: 1000,
                origin: 'top',
                distance: '50px',
                delay: 200,
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.projects-section p', {
                duration: 1000,
                origin: 'bottom',
                distance: '50px',
                delay: 300,
                easing: 'ease-in-out',
                reset: true
            });
            
            sr.reveal('.project-card', {
                duration: 900,
                origin: 'left',
                distance: '50px',
                delay: 200,
                easing: 'ease-in-out',
                interval: 150,
                reset: true
            });
            
            sr.reveal('.sb3', {
                duration: 900,
                origin: 'left',
                distance: '50px',
                delay: 200,
                easing: 'ease-in-out',
                interval: 150,
                reset: true
            });
        }
    }

    // GSAP ScrollTrigger animations
    function initGSAPScrollTrigger() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            function animateOnView(targets, animation) {
                gsap.from(targets, {
                    scrollTrigger: {
                        trigger: targets,
                        start: "top 80%", 
                        once: true, 
                    },
                    ...animation
                });
            }

            // Pattern animations
            let pattern1 = document.getElementById('pattern2-1');
            if (pattern1) {
                // Create a timeline for smooth sequence of animations
                let pattern1Timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: pattern1,
                        start: "top 80%", // Start animation when the top of the element is 80% from the top of the viewport
                        toggleActions: "play none none reverse" // Play on enter, reverse on leave
                    }
                });
                
                // Add entrance animation
                pattern1Timeline.fromTo(pattern1, 
                    { x: 100, opacity: 0 }, // Start from the right
                    { 
                        x: 0, 
                            opacity: 1,
                        duration: 1, 
                        ease: "power2.out"
                    }
                )
                // Seamlessly add the continuous movement animation
                .to(pattern1, {
                    x: 15, // Move right
                    duration: 2,
                    ease: "sine.inOut",
                    yoyo: true, // Reverse the animation
                    repeat: -1, // Repeat indefinitely
                }, "+=0.1"); // Small offset for smooth transition
            }

            // Animate entrance for pattern2-2 from the left when scrolled into view
            let pattern2 = document.getElementById('pattern2-2');
            if (pattern2) {
                // Create a timeline for smooth sequence of animations
                let pattern2Timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: pattern2,
                        start: "top 80%", 
                        toggleActions: "play none none reverse" 
                    }
                });
                
                // Add entrance animation
                pattern2Timeline.fromTo(pattern2, 
                    { x: -100, opacity: 0 }, // Start from the left
                    { 
                        x: 0, 
                        opacity: 1, 
                        duration: 1, 
                        ease: "power2.out"
                    }
                )
                // Seamlessly add the continuous movement animation
                .to(pattern2, {
                    x: -15, // Move left (since it's rotated 180 degrees)
                    duration: 2,
                    ease: "sine.inOut",
                    yoyo: true, // Reverse the animation
                    repeat: -1, // Repeat indefinitely
                }, "+=0.1"); // Small offset for smooth transition
            }
            
            // Create the welcome text animation timeline
            const welcomeText = document.querySelector('#welcome-text');
            if (welcomeText) {
                const welcomeTextTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#welcome-text",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
                
                // Replace with more dynamic, bouncy animations
                welcomeTextTimeline
                    .from(".text-line", {
                        opacity: 0,
                        y: -50,
                        duration: 1.2,
                        ease: "elastic.out(1, 0.3)"  // Bouncy elastic effect
                    })
                    .from("#styled-text", {
                        opacity: 0,
                        y: 50,
                        duration: 1.5,
                        ease: "power2.out",  // Changed to a smoother easing function
                    }, "-=0.5");  // Adjusted delay to start a bit later for smoother flow
                
                // Fix welcome text initial position - update these to match new animation
                gsap.set(".text-line", { opacity: 0, y: -50 });  // Start above final position
                gsap.set("#styled-text", { opacity: 0, y: 50 });  // Start below final position
                
                // Set initial position and make sure the welcome text is properly positioned
                gsap.set(welcomeText, { opacity: 0, x: 0, y: 0 }); // Reset position
            }
        }
    }

    // Parallax effects for home section 
    function initParallaxEffects() {
        let homeSection = document.querySelector('.home');
        let earth = document.querySelector('#earth');
        let welcomeText = document.querySelector('#welcome-text');
        let astronaut = document.querySelector('#astronaut');
        let homeBg = document.querySelector('#home-bg');
        
        // No mouse effect for welcome text
        let welcomeTextInteractionEnabled = false;
        
        if (homeSection && (earth || astronaut)) {
            homeSection.addEventListener('mousemove', (e) => {
                // Simplified mouse position calculation (0-1 range)
                let mouseX = e.clientX / window.innerWidth;
                let mouseY = e.clientY / window.innerHeight;
                
                // Calculate normalized mouse position (-0.5 to 0.5 range)
                let normalizedX = mouseX - 0.5;
                let normalizedY = mouseY - 0.5;
    
                // Calculate offset values for earth and astronaut (fixed calculation)
                if (earth) {
                    let earthX = -normalizedX * 40; // Negative to move opposite to mouse
                    let earthY = -normalizedY * 30; // Negative to move opposite to mouse
                    
                    gsap.to(earth, {
                        x: earthX,
                        y: earthY,
                        duration: 1.2,
                        ease: "power2.out"
                    });
                }
                
                if (astronaut) {
                    let astronautX = -normalizedX * 50; // Negative to move opposite to mouse
                    let astronautY = -normalizedY * 25; // Negative to move opposite to mouse
                    
                    gsap.to(astronaut, {
                        x: astronautX,
                        y: astronautY,
                        duration: 1.5,
                        ease: "power1.out"
                    });
                }
            });
            
            // Reset positions when mouse leaves the section
            homeSection.addEventListener('mouseleave', () => {
                const elements = [earth, astronaut].filter(Boolean);
                
                if (elements.length > 0) {
                    gsap.to(elements, {
                        x: 0,
                        y: 0,
                        duration: 2.5,  // Increased duration for smoother motion
                        ease: "elastic.out(1, 0.3)",  // Changed to elastic for a bouncy, natural feel
                        overwrite: true  // Ensures this animation takes precedence
                    });
                }
                
                // Fix background image if it exists
                if (homeBg) {
                    gsap.to(homeBg, {
                        scale: 1.05, // Keep slight zoom for better coverage
                        duration: 1.8,
                        ease: "power2.out"
                    });
                }
                
                // Restart the floating animation after returning to center
                setTimeout(() => {
                    if (typeof floatTimeline !== 'undefined' && floatTimeline) {
                        floatTimeline.restart();
                    }
                }, 2500); // Match the duration of the return animation
            });
            
            // Fix background image to prevent revealing sections
            if (homeBg) {
                gsap.set(homeBg, {
                    scale: 1.05, // Slightly larger to prevent edge gaps
                    filter: "brightness(0.2) contrast(1.1) blur(1px)" // Enhance contrast a bit
                });
            }
            
            // Create floating animation to pause during mouse interaction
            if (earth || astronaut) {
                let floatTimeline = gsap.timeline({
                    repeat: -1,
                    yoyo: true,
                    paused: false // We'll control when it plays
                });
    
                if (earth) {
                    floatTimeline.to(earth, {
                        y: "+=10",
                        rotation: "+=2",
                        duration: 3,
                        ease: "sine.inOut"
                    }, 0);
                }
                
                if (astronaut) {
                    floatTimeline.to(astronaut, {
                        y: "+=15",
                        rotation: "-=1",
                        duration: 4,
                        ease: "sine.inOut"
                    }, 0);
                }
    
                // Pause floating animation during mouse movement
                homeSection.addEventListener('mousemove', () => {
                    // Pause the floating animation when mouse is moving
                    floatTimeline.pause();
                });
                
                // Make floatTimeline accessible to other functions
                window.floatTimeline = floatTimeline;
            }
        }
    }

    // Letter tilt effect
    function initLetterTiltEffect() {
        let h4Elements = document.querySelectorAll('#nav-c h4');

        h4Elements.forEach(h4 => {
            // Only setup letter animations if not already done by nav open animation
            if (h4.children.length === 0) {
                let letters = h4.textContent.split('');
                h4.innerHTML = ''; // Clear the original text

                // Create a span for each letter and append it to the h4
                letters.forEach(letter => {
                    let span = document.createElement('span');
                    span.textContent = letter;
                    span.style.display = 'inline-block'; // Ensure letters are inline-block for animation
                    h4.appendChild(span);
                });
            }

            // Add mouse enter and leave events
            h4.addEventListener('mouseenter', () => {
                // Only apply hover effect if not currently in entrance animation
                if (!h4.classList.contains('animating')) {
                    h4.querySelectorAll('span').forEach((span, index) => {
                        gsap.to(span, {
                            rotation: 8, // Tilt to the right
                            duration: 0.6, // Increased duration
                            ease: "power1.out",
                            transformOrigin: "bottom left", // Set the pivot point to the bottom left
                            delay: index * 0.1 // Stagger the animation
                        });
                    });
                }
            });

            h4.addEventListener('mouseleave', () => {
                // Only apply reset if not currently in entrance animation
                if (!h4.classList.contains('animating')) {
                    // Stop any ongoing animations for the letters
                    gsap.killTweensOf(h4.querySelectorAll('span'));

                    h4.querySelectorAll('span').forEach((span, index) => {
                        gsap.to(span, {
                            rotation: 0, // Reset to original position
                            duration: 0.4, // Increased duration
                            ease: "power1.out",
                            transformOrigin: "bottom left", // Set the pivot point to the bottom left
                            delay: index * 0.1 // Stagger the animation
                        });
                    });
                }
            });
        });
    }

    // Social icons hover effect
    function initSocialIconsHover() {
        let socialIcons = document.querySelectorAll('.social-icons a');

        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.1, // Slight zoom effect
                    y: -5, // Translate up
                    rotation: 15, // Rotate
                    duration: 0.3, // Duration of the animation
                    ease: "power2.out"
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1, // Reset scale
                    y: 0, // Reset translation
                    rotation: 0, // Reset rotation
                    duration: 0.3, // Duration of the animation
                    ease: "power2.out"
                });
            });
        });
    }

    // Scroll red div click handler
    function initScrollRedDiv() {
        const scrollRedDiv = document.querySelector('.scroll-red-div');
        
        if (scrollRedDiv) {
            scrollRedDiv.addEventListener('click', () => {
                console.log('Yuhooooo!!');
                if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: {
                            y: "+=350vh",
                            autoKill: false // Optional: Prevents killing the scroll animation if the user scrolls
                        },
                        duration: 0.4,
                        ease: "power4.out"
                    });
                } else {
                    // Fallback if ScrollToPlugin is not available
                    window.scrollBy({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    // WAI container hover effects
    function initWAIContainer() {
        const waiContainer = document.getElementById("wai-container");
        if (!waiContainer) return;
        
        const hiText = document.getElementById("hi");
        const parenthesis1 = document.getElementById("parenthesis1");
        const parenthesis2 = document.getElementById("parenthesis2");
        
        if (hiText && parenthesis1 && parenthesis2) {
            // Hover effect for text
            waiContainer.addEventListener("mousemove", (e) => {
                const { clientX, clientY } = e;
                const { width, height, left, top } = waiContainer.getBoundingClientRect();
            
                // Calculate normalized position (-1 to 1) for smoother movement
                const x = (clientX - left - width / 2) / (width / 2);
                const y = (clientY - top - height / 2) / (height / 2);
            
                // Apply movement to the text with a smaller multiplier for subtler effect
                const maxTranslate = 20;
                hiText.style.transform = `translate3d(${-x * maxTranslate}px, ${-y * maxTranslate}px, 0)`;
                
                // Also add subtle rotation for more dynamic effect
                parenthesis1.style.transform = `translate3d(${-x * 5}px, ${-y * 5}px, 0) rotate(${-x * 3}deg)`;
                parenthesis2.style.transform = `translate3d(${x * 5}px, ${-y * 5}px, 0) rotate(${x * 3}deg)`;
            });
            
            waiContainer.addEventListener("mouseleave", () => {
                // Reset all transforms smoothly when mouse leaves
                hiText.style.transform = "translate3d(0, 0, 0)";
                parenthesis1.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
                parenthesis2.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
            });
            
            // GSAP animation for { and }
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.from(parenthesis1, {
                    scrollTrigger: {
                        trigger: waiContainer,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                        markers: false // Set to true for debugging
                    },
                    x: -50,
                    y: -50,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    onComplete: () => {
                        // Make sure opacity is set to 1 after animation completes
                        parenthesis1.style.opacity = 1;
                    }
                });
                
                gsap.from(parenthesis2, {
                    scrollTrigger: {
                        trigger: waiContainer,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                        markers: false // Set to true for debugging
                    },
                    x: 50,
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    onComplete: () => {
                        // Make sure opacity is set to 1 after animation completes
                        parenthesis2.style.opacity = 1;
                    }
                });
            }
        }
    }
    
    // Clock update function
    function initClockUpdate() {
        if (document.getElementById("abt-middle-rt")) {
            function updateTime() {
                let now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';
            
                hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
                minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if needed
            
                document.getElementById("abt-middle-rt").innerHTML = `${hours}:${minutes} ${ampm}`;
            }
            
            // Update time immediately and every second
            updateTime();
            setInterval(updateTime, 1000);
        }
    }
    
    // Scrolling text animation
    function initScrollingText() {
        document.querySelectorAll(".scrolling-text").forEach((element) => {
            let clone = element.innerHTML;
            element.innerHTML += clone; // Double the content to make looping seamless
        });
    }

    // Navigation scroll to section functionality
    function initNavScrollToSection() {
        const navContainer = document.getElementById('nav-c');
        if (!navContainer) return;
        
        // Get all h4 elements in the navigation
        const navLinks = navContainer.querySelectorAll('h4');
        
        // Add cursor pointer style to make them look clickable
        navLinks.forEach(link => {
            link.style.cursor = 'pointer';
            
          
            
            // Add click animation
            link.addEventListener('click', () => {
                // Add a quick scale animation for feedback
                gsap.to(link, {
                    scale: 0.95,
                    duration: 0.1,
                    ease: "power2.in",
                    onComplete: () => {
                        gsap.to(link, {
                            scale: 1,
                            duration: 0.2,
                            ease: "elastic.out(1, 0.5)"
                        });
                    }
                });
            });
        });
        
        // Map of navigation text to section IDs
        const sectionMap = {
            'ABOUT': 'section4',
            'SKILLS': 'section5',
            'PROJECTS': 'section6',
            'CONTACT': 'footer' // Assuming contact is in the footer
        };
        
        // Add click event listeners to each h4
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get the text content of the clicked h4
                const linkText = link.textContent;
                
                // Get the corresponding section ID
                const sectionId = sectionMap[linkText];
                
                if (sectionId) {
                    // Get the section element
                    const section = document.getElementById(sectionId);
                    
                    if (section) {
                        // Close the navigation menu if it's open
                        if (navContainer.classList.contains('nav-open')) {
                            // Get the nav toggle element
                            const navToggle = document.getElementById('nav-c-toggle');
                            const body = document.body;
                            
                            // Remove nav-open classes
                            navContainer.classList.remove('nav-open');
                            navToggle.classList.remove('nav-toggle-active');
                            body.classList.remove('nav-open');
                            
                            // Remove any custom social lines
                            document.querySelectorAll('.social-line, .hire-me-line').forEach(line => {
                                line.remove();
                            });
                            
                            // Animate scroll-red-div back into view
                            const scrollRedDiv = document.querySelector('.scroll-red-div');
                            if (scrollRedDiv) {
                                gsap.to(scrollRedDiv, {
                                    x: 0,
                                    rotation: 0,
                                    opacity: 1,
                                    duration: 0.8,
                                    ease: "elastic.out(1, 0.5)",
                                    delay: 0.2
                                });
                            }
                            
                            // Bring back any revealed elements
                            const revealedElements = document.querySelectorAll('.sr-element');
                            gsap.to(revealedElements, {
                                x: 0,
                                opacity: 1,
                                duration: 0.8,
                                ease: "power3.out",
                                stagger: 0.05
                            });
                            
                            // Wait for the nav to close before scrolling
                            setTimeout(() => {
                                // Smooth scroll to the section
                                gsap.to(window, {
                                    duration: 0.6,
                                    scrollTo: {
                                        y: section,
                                        offsetY: 80 // Offset to account for fixed header
                                    },
                                    ease: "power4.out"
                                });
                            }, 300); // Reduced wait time from 500ms to 300ms
                        } else {
                            // If nav is already closed, just scroll to the section
                            gsap.to(window, {
                                duration: 0.6,
                                scrollTo: {
                                    y: section,
                                    offsetY: 80 // Offset to account for fixed header
                                },
                                ease: "power4.out"
                            });
                        }
                    }
                }
            });
        });
    }

    // Footer reveal animations
    function initFooterAnimation() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            const footer = document.getElementById('footer');
            if (!footer) return;
            
            // Get footer elements
            const footerBrand = footer.querySelector('.footer-brand');
            const footerLogo = footer.querySelector('.footer-logo'); // Specifically target the logo
            const lwtText = document.getElementById('lwt-text');
            const statsContainer = footer.querySelector('.stats-container');
            const statBoxes = footer.querySelectorAll('.stat-box');
            const contactMeDiv = document.getElementById('cm-div');
            const contactMeBtn = document.getElementById('cm-btn');
            const contactMeSubtext = document.getElementById('cm-btn-subtext');
            const footerSocials = footer.querySelector('.footer-socials');
            const socialLinks = footer.querySelectorAll('.social-link');
            const footerCredits = footer.querySelector('.footer-credits');
            
            // Set initial states
            if (footerBrand) {
                // Remove all animations and ensure visibility
                gsap.set(footerBrand, {
                    clearProps: "all"
                });
                
                // Remove logo animations
                if (footerLogo) {
                    gsap.set(footerLogo, {
                        clearProps: "all"
                    });
                }
            }
            
            if (lwtText) {
                gsap.set(lwtText, {
                    opacity: 0,
                    scale: 0.9,
                    y: 50 // Start from below
                });
                
                // Create a separate scroll-linked animation for lwt-text
                ScrollTrigger.create({
                    trigger: lwtText,
                    start: "top 90%", // Start earlier
                    end: "top 40%", // End point for full animation
                    scrub: 0.5, // Smooth scrubbing effect tied to scroll
                    markers: false, // Set to true for debugging
                    // onEnter: () => {
                    //     console.log("LWT text entered viewport");
                    // },
                    // onLeave: () => {
                    //     console.log("LWT text left viewport");
                    // },
                    // onEnterBack: () => {
                    //     console.log("LWT text entered viewport again");
                    // },
                    // onLeaveBack: () => {
                    //     console.log("LWT text left viewport again");
                    // }
                    onEnter: () => {
                        console.log("👀 Someone just saw the magic. Hire Sanket, and let the magic happen for you too!");
                    },
                    onLeave: () => {
                        console.log("👋 You scrolled away... but Sanket's skills are still 🔥 Hire him before someone else does!");
                    },
                    onEnterBack: () => {
                        console.log("🎯 Back again? That's the Sanket effect. Let’s build something awesome together!");
                    },
                    onLeaveBack: () => {
                        console.log("🚀  Let’s collaborate and create something incredible. Reach out before it’s too late!");
                    }
                    
                });
                
                // Replace the timeline animation with a scroll-driven animation
                gsap.to(lwtText, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: lwtText,
                        start: "top 90%",
                        end: "top 40%",
                        scrub: 0.5,
                        toggleActions: "restart none none reverse", // Restart on each scroll into view
                        markers: false // Set to true for debugging
                    }
                });
                
                // Remove the lwt-text from the main footer timeline since we're handling it separately
                footerTimeline.remove(lwtText);
            }
            
            if (statsContainer) {
                gsap.set(statsContainer, {
                    opacity: 0,
                    y: 30
                });
            }
            
            if (statBoxes.length > 0) {
                gsap.set(statBoxes, {
                    opacity: 0,
                    scale: 0.8
                });
            }
            
            if (contactMeDiv) {
                gsap.set(contactMeDiv, {
                    opacity: 0,
                    y: 20
                });
            }
            
            if (contactMeBtn) {
                gsap.set(contactMeBtn, {
                    scale: 0.9
                });
            }
            
            if (footerSocials) {
                gsap.set(footerSocials, {
                    opacity: 0,
                    y: 30
                });
            }
            
            if (socialLinks.length > 0) {
                gsap.set(socialLinks, {
                    opacity: 0,
                    x: -20
                });
            }
            
            if (footerCredits) {
                gsap.set(footerCredits, {
                    opacity: 0,
                    y: 20
                });
            }
            
            // Create timeline for footer
            const footerTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: footer,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: false
                }
            });
            
            // Skip footer brand animation, start with stats container
            if (statsContainer) {
                footerTimeline.to(statsContainer, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out"
                });
            }
            
            if (statBoxes.length > 0) {
                footerTimeline.to(statBoxes, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "back.out(1.5)"
                }, "-=0.5");
                
                // Add counter animation to stat numbers
                statBoxes.forEach(box => {
                    const statNumber = box.querySelector('.stat-number');
                    if (statNumber) {
                        const finalValue = statNumber.textContent;
                        
                        // Check if it contains a plus sign
                        const hasPlus = finalValue.includes('+');
                        
                        // Check if it contains commas
                        const hasCommas = finalValue.includes(',');
                        
                        // Remove all non-numeric characters for the calculation
                        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                        
                        // Store the original text content
                        statNumber.setAttribute('data-final-value', finalValue);
                        
                        // Set the initial values to zero
                        if (hasPlus) {
                            statNumber.textContent = '0+';
                        } else if (hasCommas) {
                            statNumber.textContent = '0';
                        } else {
                            statNumber.textContent = '0';
                        }
                        
                        // Create a separate timeline for the counter
                        const counterTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: box,
                                start: "top 80%",
                                toggleActions: "play none none none",
                                once: true,
                                markers: false
                            }
                        });
                        
                        // Add the counter animation
                        counterTimeline.to(statNumber, {
                            duration: 2,
                            ease: "power1.inOut",
                            onStart: () => {
                                // Check if this counter has already been animated
                                if (statNumber.classList.contains('counter-animated')) {
                                    return; // Skip animation if already done
                                }
                                
                                // Add a glowing effect to the number
                                gsap.to(statNumber, {
                                    color: "#ffffff",
                                    textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
                                    scale: 1.1,
                                    duration: 0.4
                                });
                                
                                let startValue = 0;
                                const incrementValue = numericValue / 60; // Smoother counting
                                let isAnimating = true; // Add a flag to control the animation
                                
                                const updateCounter = () => {
                                    if (!isAnimating) return; // Stop if animation is complete
                                    
                                    startValue += incrementValue;
                                    
                                    if (startValue >= numericValue) {
                                        // When we reach the final value, set the exact text
                                        statNumber.textContent = finalValue;
                                        
                                        // Add a "pop" effect when reaching the final value
                                        gsap.fromTo(statNumber, 
                                            { scale: 1.2 },
                                            { scale: 1, duration: 0.3, ease: "elastic.out(1.2, 0.5)" }
                                        );
                                        
                                        // Reset the text color with a slight delay
                                        gsap.to(statNumber, {
                                            color: "",
                                            textShadow: "0 0 0 rgba(255, 255, 255, 0)",
                                            scale: 1,
                                            duration: 0.5,
                                            delay: 0.2
                                        });
                                        
                                        isAnimating = false; // Stop the animation
                                        
                                        // Mark this counter as animated
                                        statNumber.classList.add('counter-animated');
                                    } else {
                                        // Format the current value appropriately
                                        if (hasPlus) {
                                            statNumber.textContent = Math.floor(startValue) + '+';
                                        } else if (hasCommas) {
                                            // Format with commas for thousands
                                            statNumber.textContent = Math.floor(startValue).toLocaleString('en-US');
                                        } else {
                                            statNumber.textContent = Math.floor(startValue);
                                        }
                                        requestAnimationFrame(updateCounter);
                                    }
                                };
                                
                                updateCounter();
                            }
                        });
                        
                        // Add a bounce effect to the box after counting
                        counterTimeline.to(box, {
                            y: -8,
                            duration: 0.2,
                            ease: "power2.out"
                        }, "+=0.1");
                        
                        counterTimeline.to(box, {
                            y: 0,
                            duration: 0.5,
                            ease: "bounce.out",
                            backgroundColor: "rgba(255, 255, 255, 0)",
                            boxShadow: "0 0 0 rgba(255, 255, 255, 0)"
                        });
                    }
                });
            }
            
            if (contactMeDiv) {
                footerTimeline.to(contactMeDiv, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out"
                }, "-=0.3");
            }
            
            if (contactMeBtn) {
                footerTimeline.to(contactMeBtn, {
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }, "-=0.5");
                
                // Add subtle pulse animation to the contact button
                footerTimeline.add(() => {
                    gsap.to(contactMeBtn, {
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                        duration: 1.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                });
            }
            
            if (contactMeSubtext) {
                footerTimeline.to(contactMeSubtext, {
                    opacity: 1,
                    duration: 0.5
                }, "-=0.3");
            }
            
            if (footerSocials) {
                footerTimeline.to(footerSocials, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out"
                }, "-=0.4");
            }
            
            if (socialLinks.length > 0) {
                footerTimeline.to(socialLinks, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.5");
                
                // Add hover effects for social links
                socialLinks.forEach(link => {
                    link.addEventListener('mouseenter', () => {
                        gsap.to(link, {
                            y: -5,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        
                        // Also animate the icon
                        const icon = link.querySelector('i');
                        if (icon) {
                            gsap.to(icon, {
                                scale: 1.2,
                                color: "#ffffff",
                                duration: 0.3,
                                ease: "back.out(1.7)"
                            });
                        }
                    });
                    
                    link.addEventListener('mouseleave', () => {
                        gsap.to(link, {
                            y: 0,
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        
                        // Reset the icon
                        const icon = link.querySelector('i');
                        if (icon) {
                            gsap.to(icon, {
                                scale: 1,
                                color: "",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }
                    });
                });
            }
            
            if (footerCredits) {
                footerTimeline.to(footerCredits, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out"
                }, "-=0.2");
                
                // Add a subtle highlight to the "Made with" text
                const creditText = footerCredits.querySelector('p');
                if (creditText) {
                    footerTimeline.to(creditText, {
                        textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                        duration: 0.5
                    }, "-=0.3");
                }
            }
            
            // Add hover effect for the contact button
            if (contactMeBtn) {
                contactMeBtn.addEventListener('mouseenter', () => {
                    gsap.to(contactMeBtn, {
                        scale: 1.05,
                        boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                contactMeBtn.addEventListener('mouseleave', () => {
                    gsap.to(contactMeBtn, {
                        scale: 1,
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
                        backgroundColor: "",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            }
        }
    }

    // Add this as a completely separate function, outside of the existing structure
    function fixScrollAnimationAndFooterLogo() {
        // console.log("Applying direct fixes for scroll animations, footer logo, and project button");
        
        // --------- FIX SCROLL ANIMATIONS ----------
        // Direct approach to handle welcome text and big background text scrolling
        function handleScrollAnimations() {
            // Set initial positions immediately
            const welcomeText = document.getElementById('welcome-text');
            const bigBgText = document.getElementById('big-bgtext');
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            
            if (welcomeText) {
                const welcomeStartPosition = isMobile ? 50 : 58;
                welcomeText.style.top = `${welcomeStartPosition}vh`;
                // console.log("Welcome text initial position set:", welcomeStartPosition);
            }
            
            if (bigBgText) {
                const bgStartPosition = isMobile ? 56 : 58;
                bigBgText.style.top = `${bgStartPosition}vh`;
                // console.log("Big bg text initial position set:", bgStartPosition);
            }
            
            // Add scroll handler
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                
                // Fix for welcome text
                if (welcomeText) {
                    const welcomeStartPosition = isMobile ? 50 : 58;
                    const newPosition = Math.max(welcomeStartPosition - scrollPosition / 10, 0);
                    welcomeText.style.top = `${newPosition}vh`;
                }
                
                // Fix for background text
                if (bigBgText) {
                    const bgStartPosition = isMobile ? 56 : 58;
                    const newPosition = Math.max(bgStartPosition - scrollPosition / 20, 0);
                    bigBgText.style.top = `${newPosition}vh`;
                }
            });
        }
        
        // --------- FIX FOOTER LOGO ----------
        function fixFooterLogo() {
            // Try multiple selectors to find the footer logo
            let footerLogo = document.querySelector('.footer-brand .footer-logo');
            
            if (!footerLogo) {
                footerLogo = document.querySelector('#footer .footer-logo');
            }
            
            if (!footerLogo) {
                footerLogo = document.querySelector('.footer-logo');
            }
            
            if (footerLogo) {
                // Force the logo to be visible with inline styles - more aggressive approach
                footerLogo.style.cssText = `
                    opacity: 1 !important;
                    display: block !important;
                    visibility: visible !important;
                    width: 100px !important;
                    height: auto !important;
                    margin: 0 auto 20px auto !important;
                    
                    padding: 5px !important;
                    position: relative !important;
                    z-index: 100 !important;
                `;
                
                // Also fix the parent container
                const footerBrand = document.querySelector('.footer-brand');
                if (footerBrand) {
                    footerBrand.style.cssText = `
                        opacity: 1 !important;
                        display: flex !important;
                        visibility: visible !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                        margin-bottom: 25px !important;
                        position: relative !important;
                        z-index: 100 !important;
                    `;
                }
                
                // console.log("Footer logo visibility fixed with aggressive style override", footerLogo);
            } else {
                console.error("Footer logo not found after trying multiple selectors");
                
                // Last resort - try to create a new logo element
                const footerBrand = document.querySelector('.footer-brand');
                if (footerBrand) {
                    const newLogo = document.createElement('img');
                    newLogo.src = "https://avatars.githubusercontent.com/u/152056082?v=4";
                    newLogo.alt = "Sanket's Logo";
                    newLogo.className = "footer-logo";
                    newLogo.style.cssText = `
                        opacity: 1 !important;
                        display: block !important;
                        visibility: visible !important;
                        width: 100px !important;
                        height: auto !important;
                        margin: 0 auto 20px auto !important;
                        // border: 2px solid rgba(255,255,255,0.3) !important;
                        // border-radius: 50% !important;
                        padding: 5px !important;
                        position: relative !important;
                        z-index: 100 !important;
                    `;
                    
                    // Insert at beginning
                    footerBrand.insertBefore(newLogo, footerBrand.firstChild);
                    // console.log("Created new footer logo element", newLogo);
                }
            }
        }
        
        // --------- FIX PROJECT BUTTON ANIMATION ----------
        function fixProjectButtonAnimation() {
            // console.log("Fixing project button animation timing");
            
            const projectsButton = document.querySelector('.projects-btn');
            const section6 = document.getElementById('section6');
            
            if (projectsButton && section6) {
                // Clear any existing animations
                if (typeof gsap !== 'undefined') {
                    gsap.killTweensOf(projectsButton);
                    
                    // Set initial state to visible
                    gsap.set(projectsButton, {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    });
                }
            }
        }
        
        // Call both fixes
        handleScrollAnimations();
        fixFooterLogo();
        fixProjectButtonAnimation(); // Add the new fix
        
        // console.log("All direct fixes applied");
    }

    // Multiple ways to ensure the function is called
    document.addEventListener('DOMContentLoaded', fixScrollAnimationAndFooterLogo);
    window.onload = function() {
        // console.log("Window load event - applying fixes");
        fixScrollAnimationAndFooterLogo();
        
        // Apply again after a short delay to catch any late-loading elements
        setTimeout(fixScrollAnimationAndFooterLogo, 1000);
        
        // Initialize scroll-synced animations after a short delay
        // setTimeout(initScrollSyncedRevealAnimations, 1200);
    };
    // Call immediately as well in case the page is already loaded
    fixScrollAnimationAndFooterLogo();
    // Call scroll-synced animations immediately as well
    // initScrollSyncedRevealAnimations();

    // Call all initialization functions
    document.addEventListener('DOMContentLoaded', () => {
        initCommonFunctionality();
        initCanvasAnimation();
        initScrollPositionAdjustments(); // Make sure this is called
    });

    // Add this as a completely separate function, outside of the existing structure
    function fixCounterAnimation() {
        // console.log("Applying direct fixes for counter animation");
        
        // Get all stat boxes
        const statBoxes = document.querySelectorAll('.stat-box');
        
        if (statBoxes.length > 0) {
            statBoxes.forEach(box => {
                const statNumber = box.querySelector('.stat-number');
                if (statNumber) {
                    // Skip if this counter has already been animated
                    if (statNumber.hasAttribute('data-animated')) {
                        return;
                    }

                    const finalValue = statNumber.textContent;
                    
                    // Check if it contains a plus sign
                    const hasPlus = finalValue.includes('+');
                    
                    // Check if it contains commas
                    const hasCommas = finalValue.includes(',');
                    
                    // Remove all non-numeric characters for the calculation
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    // Store the original text content
                    statNumber.setAttribute('data-final-value', finalValue);
                    
                    // Set the initial values to zero
                    if (hasPlus) {
                        statNumber.textContent = '0+';
                    } else if (hasCommas) {
                        statNumber.textContent = '0';
                    } else {
                        statNumber.textContent = '0';
                    }
                    
                    // Create a separate timeline for the counter
                    const counterTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: box,
                            start: "top 80%",
                            toggleActions: "play none none none",
                            once: true,
                            markers: false
                        }
                    });
                    
                    // Add the counter animation
                    counterTimeline.to(statNumber, {
                        duration: 2,
                        ease: "power1.inOut",
                        onStart: () => {
                            let startValue = 0;
                            const incrementValue = numericValue / 60; // Smoother counting
                            let isAnimating = true; // Add a flag to control the animation
                            
                            const updateCounter = () => {
                                if (!isAnimating) return; // Stop if animation is complete
                                
                                startValue += incrementValue;
                                
                                if (startValue >= numericValue) {
                                    // When we reach the final value, set the exact text
                                    statNumber.textContent = finalValue;
                                    isAnimating = false; // Stop the animation
                                    // Mark this counter as animated
                                    statNumber.setAttribute('data-animated', 'true');
                                } else {
                                    // Format the current value appropriately
                                    if (hasPlus) {
                                        statNumber.textContent = Math.floor(startValue) + '+';
                                    } else if (hasCommas) {
                                        // Format with commas for thousands
                                        statNumber.textContent = Math.floor(startValue).toLocaleString('en-US');
                                    } else {
                                        statNumber.textContent = Math.floor(startValue);
                                    }
                                    requestAnimationFrame(updateCounter);
                                }
                            };
                            
                            updateCounter();
                        }
                    });
                }
            });
        }
    }
    
    // Call the function when the page loads
    document.addEventListener('DOMContentLoaded', fixCounterAnimation);
    window.onload = fixCounterAnimation;
    // Call immediately as well in case the page is already loaded
    fixCounterAnimation();

    // Add a new function to override scroll animations and sync them with scrolling
    function initScrollSyncedRevealAnimations() {
        // console.log("Initializing scroll-synced reveal animations");
        
        // Add a small delay to ensure the DOM is fully ready
        setTimeout(() => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                // First, ensure all sections have overflow:hidden
                const sections = document.querySelectorAll('#section2, #section3, #section4, #section5, #section6');
                sections.forEach(section => {
                    section.style.overflow = 'hidden';
                });
                
                // Common animation setup for all sections
                function setupScrollAnimation(sectionId, elements, animations = {}) {
                    const section = document.getElementById(sectionId);
                    if (!section) return;
                    
                    // Set initial states for the elements
                    elements.forEach(el => {
                        if (!el.element) return;
                        
                        // Default values - use smaller values to prevent overflow
                        const defaults = {
                            y: 10, // Reduced from 20
                            opacity: 0,
                            scale: 0.99 // Very close to 1 to prevent overflow
                        };
                        
                        // Combine defaults with custom initial states
                        const initialState = {...defaults, ...(el.initialState || {})};
                        gsap.set(el.element, initialState);
                        
                        // Create scroll-synced animation
                        gsap.to(el.element, {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 75%", // Start when the top of the section is 75% from the top of the viewport
                                end: "top 25%", // End when the top of the section is 25% from the top
                                scrub: 0.3, // Reduced from 0.5 for smoother animation
                                once: false,
                                toggleActions: "play none none reverse",
                                markers: false
                            },
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            ...animations,
                            ease: "power1.out", // Changed from power2 for smoother animation
                            immediateRender: false
                        });
                    });
                }
                
                // Section 2 Animation
                const section2Elements = [];
                const section2 = document.getElementById('section2');
                if (section2) {
                    // Main section animation
                    const mainElements = [
                        {element: section2, initialState: {y: 100, opacity: 0, scale: 0.95}},
                        {element: document.getElementById('sec-2-container')},
                        {element: document.getElementById('sec-2-inner-t-container')}
                    ];
                    
                    // Filter out null elements
                    const validMainElements = mainElements.filter(item => item.element);
                    setupScrollAnimation('section2', validMainElements);
                    
                    // Special handling for WAI image and text - with faster animation
                    const waiImg = document.getElementById('wai-img-container');
                    const waiText = document.getElementById('wai-me-text');
                    
                    if (waiImg) {
                        gsap.set(waiImg, {x: -20, opacity: 0});
                        
                        // Create a non-scrubbed animation that plays as soon as the section is in view
                        gsap.to(waiImg, {
                            scrollTrigger: {
                                trigger: section2,
                                start: "top 85%", // Trigger earlier
                                toggleActions: "play none none none",
                                once: true // Only animate once
                            },
                            x: 0,
                            opacity: 1,
                            duration: 0.8, // Set duration instead of scrub
                            ease: "back.out(1.2)", // More dynamic easing
                            immediateRender: false // Changed to false to prevent jump at start
                        });
                    }
                    
                    if (waiText) {
                        gsap.set(waiText, {x: 20, opacity: 0});
                        
                        // Create a non-scrubbed animation that plays as soon as the section is in view
                        gsap.to(waiText, {
                            scrollTrigger: {
                                trigger: section2,
                                start: "top 85%", // Trigger earlier
                                toggleActions: "play none none none",
                                once: true // Only animate once
                            },
                            x: 0,
                            opacity: 1,
                            duration: 0.8, // Set duration instead of scrub
                            delay: 0.1, // Slight delay after image animation starts
                            ease: "back.out(1.2)", // More dynamic easing
                            immediateRender: false // Changed to false to prevent jump at start
                        });
                    }
                }
                
                // Section 3 Animation
                const section3Elements = [];
                const section3 = document.getElementById('section3');
                if (section3) {
                    const elementsToAnimate = [
                        {element: section3, initialState: {opacity: 0}},
                        {element: document.getElementById('band1'), initialState: {x: -100, opacity: 0}},
                        {element: document.getElementById('band2'), initialState: {x: 100, opacity: 0}}
                    ];
                    
                    // Filter out null elements
                    const validElements = elementsToAnimate.filter(item => item.element);
                    setupScrollAnimation('section3', validElements);
                }
                
                // Section 4 Animation
                const section4 = document.getElementById('section4');
                if (section4) {
                    const elementsToAnimate = [
                        {element: document.getElementById('abt-sec-main-title'), initialState: {y: -20, opacity: 0}},
                        {element: document.getElementById('about-p1'), initialState: {rotationX: 45, y: 100, opacity: 0}},
                        {element: document.getElementById('about-p2'), initialState: {rotationX: 45, y: 100, opacity: 0}},
                        {element: document.getElementById('about-p3'), initialState: {rotationX: 45, y: 100, opacity: 0}}
                    ];
                    
                    // Filter out null elements
                    const validElements = elementsToAnimate.filter(item => item.element);
                    setupScrollAnimation('section4', validElements, {rotationX: 0});
                }
                
                // Section 5 Animation
                const section5 = document.getElementById('section5');
                if (section5) {
                    const techTitle = document.getElementById('tech-sec-main-title');
                    const techCards = document.querySelectorAll('.tech_t');
                    const techIcons = document.querySelectorAll('.tech-wrapper-div');
                    
                    // Title animation
                    if (techTitle) {
                        setupScrollAnimation('section5', [{element: techTitle, initialState: {y: -30, opacity: 0}}]);
                    }
                    
                    // Cards animation - staggered
                    if (techCards.length > 0) {
                        techCards.forEach((card, index) => {
                            gsap.set(card, {opacity: 0, y: 50, scale: 0.9});
                            
                            gsap.to(card, {
                                scrollTrigger: {
                                    trigger: section5,
                                    start: "top 75%",
                                    end: "top 25%",
                                    scrub: 0.5,
                                    once: false,
                                    toggleActions: "play none none reverse"
                                },
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                ease: "power2.out",
                                delay: index * 0.1 // Staggered effect
                            });
                        });
                    }
                    
                    // Icons animation
                    if (techIcons.length > 0) {
                        techIcons.forEach((icon, index) => {
                            gsap.set(icon, {opacity: 0, scale: 0.7});
                            
                            gsap.to(icon, {
                                scrollTrigger: {
                                    trigger: section5,
                                    start: "top 75%",
                                    end: "top 25%",
                                    scrub: 0.5,
                                    once: false,
                                    toggleActions: "play none none reverse"
                                },
                                opacity: 1,
                                scale: 1,
                                ease: "back.out(1.7)",
                                delay: index * 0.05 // Staggered effect
                            });
                        });
                    }
                }
                
                // Section 6 Animation
                const section6 = document.getElementById('section6');
                if (section6) {
                    // const projectsTitle = document.getElementById('pj-sec-main-title');
                    // const projectsButton = document.querySelector('.projects-btn');
                    const projectsParticles = document.querySelectorAll('.particle');
                    
                    
                    // if (projectsTitle) {
                    //     setupScrollAnimation('section6', [{
                    //         element: projectsTitle, 
                    //         initialState: {y: -30, opacity: 0, scale: 0.9}
                    //     }]);
                        
                        
                    //     ScrollTrigger.create({
                    //         trigger: section6,
                    //         start: "top 75%",
                    //         end: "top 25%",
                    //         scrub: true,
                    //         onUpdate: (self) => {
                    //             if (projectsTitle) {
                    //                 const progress = self.progress;
                    //                 const shadowIntensity = progress * 15;
                    //                 projectsTitle.style.textShadow = `0 0 ${shadowIntensity}px rgba(255,255,255,0.3)`;
                    //             }
                    //         }
                    //     });
                    // }
                    
                    
                    // if (projectsButton) {
                    //     setupScrollAnimation('section6', [{
                    //         element: projectsButton, 
                    //         initialState: {y: 50, opacity: 0, scale: 0.9}
                    //     }]);
                    // }
                    
                    // Particles animation
                    if (projectsParticles.length > 0) {
                        projectsParticles.forEach((particle, index) => {
                            gsap.set(particle, {opacity: 0, scale: 0});
                            
                            gsap.to(particle, {
                                scrollTrigger: {
                                    trigger: section6,
                                    start: "top 75%",
                                    end: "top 25%",
                                    scrub: 0.5,
                                    once: false,
                                    toggleActions: "play none none reverse"
                                },
                                opacity: 1,
                                scale: 1,
                                ease: "elastic.out(1, 0.3)",
                                delay: index * 0.03 // Staggered effect
                            });
                        });
                    }
                }
                
                // Footer Animation
                const footer = document.getElementById('footer');
                if (footer) {
                    const statsContainer = footer.querySelector('.stats-container');
                    const statBoxes = footer.querySelectorAll('.stat-box');
                    const contactMeDiv = document.getElementById('cm-div');
                    const footerSocials = footer.querySelector('.footer-socials');
                    const socialLinks = footer.querySelectorAll('.social-link');
                    const footerCredits = footer.querySelector('.footer-credits');
                    
                    // Stats container
                    if (statsContainer) {
                        setupScrollAnimation('footer', [{
                            element: statsContainer, 
                            initialState: {y: 30, opacity: 0}
                        }]);
                    }
                    
                    // Stat boxes
                    if (statBoxes.length > 0) {
                        statBoxes.forEach((box, index) => {
                            gsap.set(box, {opacity: 0, scale: 0.8});
                            
                            gsap.to(box, {
                                scrollTrigger: {
                                    trigger: footer,
                                    start: "top 75%",
                                    end: "top 25%",
                                    scrub: 0.5,
                                    once: false,
                                    toggleActions: "play none none reverse"
                                },
                                opacity: 1,
                                scale: 1,
                                ease: "back.out(1.7)",
                                delay: index * 0.1 // Staggered effect
                            });
                        });
                    }
                    
                    // Contact me div
                    if (contactMeDiv) {
                        setupScrollAnimation('footer', [{
                            element: contactMeDiv, 
                            initialState: {y: 20, opacity: 0}
                        }]);
                    }
                    
                    // Footer socials
                    if (footerSocials) {
                        setupScrollAnimation('footer', [{
                            element: footerSocials, 
                            initialState: {y: 30, opacity: 0}
                        }]);
                    }
                    
                    // Social links
                    if (socialLinks.length > 0) {
                        socialLinks.forEach((link, index) => {
                            gsap.set(link, {opacity: 0, x: -20});
                            
                            gsap.to(link, {
                                scrollTrigger: {
                                    trigger: footer,
                                    start: "top 75%",
                                    end: "top 25%",
                                    scrub: 0.5,
                                    once: false,
                                    toggleActions: "play none none reverse"
                                },
                                opacity: 1,
                                x: 0,
                                ease: "power2.out",
                                delay: index * 0.05 // Staggered effect
                            });
                        });
                    }
                    
                    // Footer credits
                    if (footerCredits) {
                        setupScrollAnimation('footer', [{
                            element: footerCredits, 
                            initialState: {y: 20, opacity: 0}
                        }]);
                    }
                }
            }
        }, 100); // Add 100ms delay
    }

    function initSection6Animation() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            const section6 = document.getElementById('section6');
            if (!section6) return;
            
            // Get section6 elements
            const projectsTitle = document.getElementById('pj-sec-main-title');
            const projectsButton = document.querySelector('.projects-btn');
            const projectsParticles = document.querySelectorAll('.particle');
            
            // Set initial states
            if (projectsTitle) {
                gsap.set(projectsTitle, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    textShadow: "0 0 5px rgba(255,255,255,0.2)"
                });
            }
            
            if (projectsButton) {
                gsap.set(projectsButton, {
                    opacity: 1,
                    scale: 1,
                    y: 0
                });
                
                // Set initial state for arrow
                const buttonArrow = projectsButton.querySelector('.projects-btn-arrow');
                if (buttonArrow) {
                    gsap.set(buttonArrow, {
                        x: 0,
                        opacity: 1
                    });
                }
                
                // Set initial state for text content
                const buttonContent = projectsButton.querySelector('.projects-btn-content');
                if (buttonContent) {
                    gsap.set(buttonContent, {
                        opacity: 1
                    });
                }
            }
            
            // Set initial state for particles
            if (projectsParticles.length > 0) {
                gsap.set(projectsParticles, {
                    opacity: 0.7,
                    scale: 1,
                    transformOrigin: "center"
                });
            }
        }
    }
}

// Run on page load
runScript();

// Run when window resizes
window.addEventListener("resize", runScript)
