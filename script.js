/* 
==============================================
   DraperU Summer Carnival Pitch Competition 
   Vanilla JavaScript
============================================== 
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle active class on header
            header.classList.toggle('active');

            // Get the associated content panel
            const content = header.nextElementSibling;

            // Toggle max-height for smooth opening/closing
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }

            // Close other open accordions (optional, but good for premium feel)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });


    // 2. Navbar Scroll Effect (Floating/Glassmorphism Enhancement)
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.top = '10px';
            // Enhance blur/shadow on scroll
            navbar.querySelector('.nav-container').style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.top = '20px';
            // Reset to default
            navbar.querySelector('.nav-container').style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        }
    });


    // 3. Simple Floating Particles Effect in Hero Section
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            
            // Random styling for particles
            const size = Math.random() * 4 + 2; // 2px to 6px
            const posX = Math.random() * 100; // 0% to 100%
            const posY = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 20 + 10; // 10s to 30s
            const delay = Math.random() * 5; // 0s to 5s
            
            // Apply styles inline
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = 'rgba(255, 179, 0, 0.6)'; // Golden yellow with opacity
            particle.style.borderRadius = '50%';
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.boxShadow = '0 0 10px rgba(255, 179, 0, 0.8)';
            particle.style.pointerEvents = 'none';
            
            // CSS Animation
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add dynamic keyframes to document head
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0.3;
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100px) translateX(50px) scale(1.5);
                    opacity: 0.1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 4. Countdown Timer Logic
    const countdownTimer = document.getElementById('timer-display');
    const countdownMessage = document.getElementById('countdown-message');
    
    if (countdownTimer) {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        // Target Date: June 7, 2026 10:00 AM IST
        // IST is UTC+5:30
        const targetDate = new Date("2026-06-07T10:00:00+05:30").getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance <= 0) {
                clearInterval(timerInterval);
                countdownTimer.style.display = 'none';
                countdownMessage.classList.remove('hidden');
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initial call to prevent 1s delay
        updateCountdown();
        
        // Update every second
        const timerInterval = setInterval(updateCountdown, 1000);
    }

    // 5. Official Poster Parallax Effect
    const posterShowcase = document.querySelector('.poster-showcase');
    const posterContainer = document.getElementById('poster-tilt');

    if (posterShowcase && posterContainer) {
        posterShowcase.addEventListener('mousemove', (e) => {
            const rect = posterShowcase.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation (max 5 degrees for a subtle effect)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            posterContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        posterShowcase.addEventListener('mouseleave', () => {
            // Reset the transform smoothly when the mouse leaves
            posterContainer.style.transform = `rotateX(0) rotateY(0) translateZ(0)`;
        });
    }
});
