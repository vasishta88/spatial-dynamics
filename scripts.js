document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-ins
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 3. 3D Tilt Effect on multiple elements
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            // Calculate mouse position relative to element center (-1 to 1)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const reverse = el.getAttribute('data-tilt-reverse') === 'true' ? -1 : 1;
            const intensity = 15; // Max rotation angle
            
            // Apply rotation
            el.style.transform = `perspective(1000px) rotateY(${x * intensity * reverse}deg) rotateX(${-y * intensity * reverse}deg)`;
            
            // Handle card glow if it exists
            const glow = el.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '1';
                glow.style.transform = `translate(${e.clientX - rect.left - 75}px, ${e.clientY - rect.top - 75}px)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            // Reset transform smoothly
            el.style.transition = 'transform 0.5s ease';
            el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
            
            // Make sure transition is removed after to avoid lag during mousemove
            setTimeout(() => {
                el.style.transition = '';
            }, 500);
            
            // Hide glow
            const glow = el.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
        
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none'; // remove transition for snappy tracking
        });
    });

    // 4. Parallax Scroll Animations for Orbs
    const orbs = document.querySelectorAll('.parallax-orb');
    
    // Each orb gets a different speed relative to scroll
    const orbSpeeds = [
        { el: orbs[0], speed: 0.3, offsetX: 50 },
        { el: orbs[1], speed: -0.15, offsetX: -30 },
        { el: orbs[2], speed: 0.4, offsetX: -60 }
    ];

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        orbSpeeds.forEach(orbData => {
            if(orbData.el) {
                // Move elements down/up based on scroll value to give illusion of depth
                const yPos = scrolled * orbData.speed;
                // Add a subtle horizontal sway based on scroll for extra dimension
                const xPos = Math.sin(scrolled * 0.002) * orbData.offsetX;
                
                orbData.el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            }
        });
    });
});
