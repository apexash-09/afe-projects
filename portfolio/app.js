document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileMenu = () => {
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileMenuToggle.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ==========================================================================
  // 2. THEME SELECTOR & DROP-DOWN
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeOpts = document.querySelectorAll('.theme-opt');

  themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('hidden');
  });

  // Close dropdown on click outside
  document.addEventListener('click', () => {
    themeDropdown.classList.add('hidden');
  });

  themeDropdown.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing dropdown immediately
  });

  themeOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      const selectedTheme = opt.getAttribute('data-theme');
      
      // Update body theme class
      document.body.className = '';
      document.body.classList.add(`theme-${selectedTheme}`);

      // Save theme preference to local storage
      localStorage.setItem('portfolio-theme', selectedTheme);

      // Update active option styling
      themeOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      
      // Close dropdown
      themeDropdown.classList.add('hidden');
    });
  });

  // Load Saved Theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    document.body.className = '';
    document.body.classList.add(`theme-${savedTheme}`);
    themeOpts.forEach(opt => {
      if (opt.getAttribute('data-theme') === savedTheme) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 3. INTERACTIVE SCROLL ENTRANCE ANIMATIONS (SEXY MICRO-INTERACTIONS)
  // ==========================================================================
  const scrollTriggers = document.querySelectorAll('.scroll-trigger');

  const scrollObserverOptions = {
    root: null, // Viewport
    threshold: 0.15, // Trigger when 15% of section is visible
    rootMargin: '0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, scrollObserverOptions);

  scrollTriggers.forEach(trigger => {
    scrollObserver.observe(trigger);
  });

  // ==========================================================================
  // 4. ACTIVE NAVIGATION LINK ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. PROJECT CATEGORIES FILTER
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Hide card first with smooth fade
        card.style.opacity = '0';
        card.style.transform = 'scale(0.85) translateY(10px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.classList.remove('hidden');
            // Force browser reflow to re-trigger transition
            void card.offsetWidth;
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          } else {
            card.classList.add('hidden');
          }
        }, 300);
      });
    });
  });

  // ==========================================================================
  // 6. DYNAMIC RESUME BUILDER (REAL-TIME PREVIEW & PDF PRINT)
  // ==========================================================================
  const resNameInput = document.getElementById('res-name');
  const resTitleInput = document.getElementById('res-title');
  const resEmailInput = document.getElementById('res-email');
  const resPhoneInput = document.getElementById('res-phone');
  const resSummaryInput = document.getElementById('res-summary');
  const resSkillsInput = document.getElementById('res-skills');
  const updateResumeBtn = document.getElementById('update-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  // Preview elements
  const viewResName = document.getElementById('view-res-name');
  const viewResTitle = document.getElementById('view-res-title');
  const viewResEmail = document.getElementById('view-res-email');
  const viewResPhone = document.getElementById('view-res-phone');
  const viewResSummary = document.getElementById('view-res-summary');
  const viewResSkills = document.getElementById('view-res-skills');

  const updateResumePreview = () => {
    viewResName.innerText = resNameInput.value || 'Your Name';
    viewResTitle.innerText = resTitleInput.value || 'Professional Title';
    viewResEmail.innerHTML = `<i class="fa-regular fa-envelope"></i> ${resEmailInput.value || 'email@example.com'}`;
    viewResPhone.innerHTML = `<i class="fa-solid fa-phone"></i> ${resPhoneInput.value || '+1 (555) 123-4567'}`;
    viewResSummary.innerText = resSummaryInput.value || 'A brief professional overview.';

    // Generate Skills Grid
    const skillsList = resSkillsInput.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    viewResSkills.innerHTML = '';
    skillsList.forEach(skill => {
      const skillTag = document.createElement('div');
      skillTag.className = 'resume-skill-tag';
      skillTag.innerText = skill;
      viewResSkills.appendChild(skillTag);
    });
  };

  // Run update initially
  updateResumePreview();

  // Attach event listener
  updateResumeBtn.addEventListener('click', updateResumePreview);
  printResumeBtn.addEventListener('click', () => {
    updateResumePreview();
    window.print(); // Triggers print dialog which utilizes @media print styles
  });

  // ==========================================================================
  // 7. CONTACT FORM VALIDATION & SIMULATION
  // ==========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const successAlert = document.getElementById('contact-success-alert');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate Fields
    const fields = ['contact-name', 'contact-email', 'contact-message'];
    fields.forEach(fieldId => {
      const input = document.getElementById(fieldId);
      const parent = input.parentElement;

      if (!input.value.trim()) {
        parent.classList.add('has-error');
        isFormValid = false;
      } else if (input.type === 'email' && !validateEmail(input.value)) {
        parent.classList.add('has-error');
        isFormValid = false;
      } else {
        parent.classList.remove('has-error');
      }

      // Input Event to clear error on type
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          if (input.type === 'email' && !validateEmail(input.value)) {
            // Keep error
          } else {
            parent.classList.remove('has-error');
          }
        }
      });
    });

    if (isFormValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        successAlert.classList.remove('hidden');
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        submitBtn.disabled = false;

        // Auto hide alert after 5 seconds
        setTimeout(() => {
          successAlert.classList.add('hidden');
        }, 5000);
      }, 1500);
    }
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // ==========================================================================
  // 8. INTERACTIVE STARFIELD & COMETS BACKGROUND
  // ==========================================================================
  const canvas = document.createElement('canvas');
  canvas.id = 'comet-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let stars = [];
  let comets = [];
  const starCount = 120;
  
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
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
      this.y += this.speed;
      if (this.y > height) this.reset();
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
      const px = this.x - mouseX * this.size * 6;
      const py = this.y - mouseY * this.size * 6;
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class Comet {
    constructor() {
      this.reset();
      this.active = Math.random() > 0.7;
    }
    reset() {
      this.active = false;
      this.x = Math.random() * width;
      this.y = -50;
      this.length = Math.random() * 80 + 40;
      this.speedX = Math.random() * 4 + 3;
      this.speedY = Math.random() * 3 + 2.5;
      if (Math.random() > 0.5) {
        this.speedX = -this.speedX;
        this.x = Math.random() * (width * 0.5) + (width * 0.5);
      } else {
        this.x = Math.random() * (width * 0.5);
      }
      this.width = Math.random() * 1.5 + 1;
      this.alpha = 1;
      this.fadeSpeed = Math.random() * 0.005 + 0.005;
    }
    update() {
      if (!this.active) {
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
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.speedX * 4, this.y - this.speedY * 4);
      ctx.stroke();
      ctx.restore();
    }
  }

  function init() {
    stars = [];
    comets = [];
    for (let i = 0; i < starCount; i++) stars.push(new Star());
    for (let i = 0; i < 3; i++) comets.push(new Comet());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    stars.forEach(star => {
      star.update();
      star.draw();
    });

    comets.forEach(comet => {
      comet.update();
      comet.draw();
    });

    requestAnimationFrame(animate);
  }

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
});
