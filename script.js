document.addEventListener('DOMContentLoaded', () => {

    // --- Loading Screen ---
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 800);
    }, 2000);

    // --- Variables ---
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const errorMsg = document.getElementById('error-msg');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    const envelope = document.querySelector('.envelope');
    const audioControl = document.getElementById('audio-control');
    const bgMusic = document.getElementById('bgMusic');
    
    const correctPassword = "2026-05-24";
    let isMusicPlaying = false;

    // --- Password & Envelope Logic ---
    unlockBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    function checkPassword() {
        const value = passwordInput.value.trim();
        if (value === correctPassword) {
            // Success
            errorMsg.style.opacity = '0';
            envelope.classList.add('open');
            
            setTimeout(() => {
                envelopeScreen.style.opacity = '0';
                setTimeout(() => {
                    envelopeScreen.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    audioControl.classList.remove('hidden');
                    playMusic();
                    initFloatingParticles();
                }, 1500);
            }, 1000);
        } else {
            // Error
            errorMsg.style.opacity = '1';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 400);
        }
    }

    // --- Audio Control ---
    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            updateAudioIcon();
        }).catch(() => {
            // Autoplay blocked handling
            console.log("Audio autoplay blocked by browser.");
        });
    }

    audioControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
        } else {
            bgMusic.play();
            isMusicPlaying = true;
        }
        updateAudioIcon();
    });

    function updateAudioIcon() {
        const icon = audioControl.querySelector('i');
        if (isMusicPlaying) {
            icon.classList.remove('fa-music');
            icon.classList.add('fa-volume-up');
        } else {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        }
    }

    // --- Scroll Indicator Fade ---
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden-scroll');
        } else {
            scrollIndicator.classList.remove('hidden-scroll');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger typing animation if letter is revealed
                if (entry.target.classList.contains('letter-paper') && !isTypingStarted) {
                    typeLetter();
                    isTypingStarted = true;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Typing Animation (Love Letter) ---
    const letterText = `To the most beautiful soul,

I wanted to create something special, something just for you, to show you how much you mean to me. Every day spent by your side feels like a dream I never want to wake up from. You are my safe haven, my biggest inspiration, and my truest joy.

As we celebrate this Eid, I look at you and realize that my greatest blessing is already right in front of me. Thank you for your endless love, your comforting warmth, and the beautiful light you bring into my life. 

I love you more than words could ever express, today, tomorrow, and for all eternity.`;

    const typedTextElement = document.getElementById('typed-text');
    let i = 0;
    let isTypingStarted = false;

    function typeLetter() {
        if (i < letterText.length) {
            typedTextElement.innerHTML = letterText.substring(0, i + 1) + '<span class="typing-cursor"></span>';
            i++;
            setTimeout(typeLetter, 40); // Typing speed
        } else {
            typedTextElement.innerHTML = letterText; // Remove cursor at end
        }
    }

    // --- Floating Particles (Hearts & Petals) ---
    function initFloatingParticles() {
        const colors = ['#fef6f8', '#f4dcd6', '#ffffff', '#eef7ff'];
        const shapes = ['fa-heart', 'fa-star', 'fa-circle'];
        
        setInterval(() => {
            const particle = document.createElement('i');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.className = `fas ${shape} floating-particle`;
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.color = color;
            particle.style.fontSize = (Math.random() * 15 + 10) + 'px';
            particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 13000);
        }, 800); // Generate a new particle every 800ms
    }

    // --- Fireworks Animation for Final Section ---
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 2 + 1;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 3 + 1;
            this.vx = Math.cos(angle) * velocity;
            this.vy = Math.sin(angle) * velocity;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.005;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.03; // gravity
            this.alpha -= this.decay;
        }
    }

    function createFirework(x, y) {
        const colors = ['#f4dcd6', '#ffffff', '#eef7ff', '#f7f2ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Randomly launch fireworks
        if (Math.random() < 0.03) {
            createFirework(Math.random() * canvas.width, Math.random() * (canvas.height * 0.6));
        }

        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animateFireworks);
    }
    
    // Start fireworks loop immediately
    animateFireworks();

    // --- Final Modal Logic ---
    const openBtn = document.getElementById('open-heart-btn');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('surprise-modal');

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            modal.classList.add('hidden');
        }
    });

});
