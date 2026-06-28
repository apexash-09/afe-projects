/**
 * app.js - Web3 Space Portal Core Logic
 * Handles the Starfield + Comet Canvas, 3D Mouse Parallax, and Web Audio API synth sounds.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. INTERACTIVE STARFIELD & COMETS CANVAS
  // ==========================================================================
  const canvas = document.getElementById('comet-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let stars = [];
    let comets = [];
    const starCount = 150;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Star Class
    class Star {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // Distribute vertically initially
      }

      reset() {
        this.x = Math.random() * width;
        this.y = 0;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.15 + 0.05;
        this.alpha = Math.random() * 0.6 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        // Slow downward drift
        this.y += this.speed;
        if (this.y > height) {
          this.reset();
        }

        // Twinkle effect
        this.alpha += this.twinkleSpeed * this.twinkleDirection;
        if (this.alpha > 0.9) {
          this.alpha = 0.9;
          this.twinkleDirection = -1;
        } else if (this.alpha < 0.2) {
          this.alpha = 0.2;
          this.twinkleDirection = 1;
        }
      }

      draw() {
        // Parallax offset
        const px = this.x - mouseX * this.size * 6;
        const py = this.y - mouseY * this.size * 6;

        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Comet Class (Shooting Stars)
    class Comet {
      constructor() {
        this.reset();
        // Start randomly in time so they don't all spawn at once
        this.active = Math.random() > 0.7;
      }

      reset() {
        this.active = false;
        // Comets fly from top-left/top-right to bottom-right/bottom-left
        this.x = Math.random() * width;
        this.y = -50;
        this.length = Math.random() * 80 + 40;
        this.speedX = Math.random() * 4 + 3;
        this.speedY = Math.random() * 3 + 2.5;
        
        // Randomly fly left-to-right or right-to-left
        if (Math.random() > 0.5) {
          this.speedX = -this.speedX;
          this.x = Math.random() * (width * 0.5) + (width * 0.5);
        } else {
          this.x = Math.random() * (width * 0.5);
        }

        this.width = Math.random() * 1.5 + 1;
        this.alpha = 1;
        this.fadeSpeed = Math.random() * 0.005 + 0.005;
        this.color = '#ffffff';
      }

      update() {
        if (!this.active) {
          // 0.2% chance to spawn a comet per frame if inactive
          if (Math.random() < 0.002) {
            this.reset();
            this.active = true;
          }
          return;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.fadeSpeed;

        if (this.alpha <= 0 || this.y > height || this.x < -100 || this.x > width + 100) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;

        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * 4, this.y - this.speedY * 4);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Init Arrays
    function init() {
      stars = [];
      comets = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
      for (let i = 0; i < 4; i++) {
        comets.push(new Comet());
      }
    }

    // Animation Loop
    function animate() {
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse coordinates ease
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      comets.forEach((comet) => {
        comet.update();
        comet.draw();
      });

      requestAnimationFrame(animate);
    }

    // Listeners
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    });

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    init();
    animate();
  }

  // ==========================================================================
  // 2. 3D PERSPECTIVE PARALLAX TILT
  // ==========================================================================
  const planetScene = document.getElementById('planet-scene');
  if (planetScene) {
    window.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth) - 0.5;
      const yRatio = (e.clientY / window.innerHeight) - 0.5;
      
      // Calculate rotation angles (tilted 3D effect)
      const rotateY = xRatio * 30; // degrees
      const rotateX = -yRatio * 30; // degrees

      planetScene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    window.addEventListener('mouseleave', () => {
      // Smoothly return to default tilt
      planetScene.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // ==========================================================================
  // 3. WEB AUDIO API SYNTHESIZED SOUND TRIGGERS
  // ==========================================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playHoverSound(freq = 600, duration = 0.12) {
    try {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Cyber/space chime sound signature
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      // Frequency slide up slightly for a futuristic feel
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Web API blocked or not supported: ', e);
    }
  }

  function playClickSound() {
    try {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const oscNode = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscNode.type = 'triangle';
      oscNode.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscNode.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

      oscNode.start();
      oscNode.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio play failed: ', e);
    }
  }

  // Attach audio effects to interactive components
  const hoverElements = document.querySelectorAll('.grid-card, .card, .cta-btn, .nav-pill a, .logo, .central-portfolio-card');
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      // Alternate tone pitch based on element class
      let pitch = 500;
      if (el.classList.contains('cta-btn')) pitch = 700;
      if (el.classList.contains('central-portfolio-card')) pitch = 850;
      playHoverSound(pitch);
    });

    el.addEventListener('click', () => {
      playClickSound();
    });
  });
});
