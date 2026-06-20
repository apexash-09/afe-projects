document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. STARRY BACKGROUND CANVAS WITH MOUSE PARALLAX
  // ==========================================================================
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  
  let stars = [];
  const starCount = 120;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // Star Constructor
  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.3;
      this.speed = Math.random() * 0.12 + 0.03;
      this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3})`;
    }
    update() {
      // Slow drift downward
      this.y += this.speed;
      if (this.y > height) {
        this.reset();
        this.y = 0;
      }
    }
    draw() {
      // Calculate parallax offset based on smoothed mouse position
      const px = this.x - mouseX * this.size * 5;
      const py = this.y - mouseY * this.size * 5;
      
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(px, py, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize Stars
  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Smooth mouse position towards target (ease)
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    
    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  window.addEventListener('mousemove', (e) => {
    // Standardize mouse coordinates between -0.5 and 0.5
    targetMouseX = (e.clientX / window.innerWidth) - 0.5;
    targetMouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  // Start Canvas
  initStars();
  animate();

  // ==========================================================================
  // 2. SMOOTH 3D PARALLAX TILT EFFECT (SPLINE DYNAMICS)
  // ==========================================================================
  const sceneContainer = document.getElementById('interactive-scene');
  
  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth) - 0.5;
    const yRatio = (e.clientY / window.innerHeight) - 0.5;
    
    // Smooth tilt limits
    const maxTiltX = 25; // Degrees rotation around Y axis
    const maxTiltY = 25; // Degrees rotation around X axis
    
    const rotateY = xRatio * maxTiltX;
    const rotateX = -yRatio * maxTiltY; // Invert to rotate towards mouse
    
    // Apply smooth 3D rotation to scene container
    sceneContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Reset rotation when mouse leaves the viewport
  window.addEventListener('mouseleave', () => {
    sceneContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

});

// ==========================================================================
// 3. INTERACTIVE CARDS DETAILS DATABASE
// ==========================================================================
const detailsData = {
  python: {
    icon: 'fa-brands fa-python python-icon',
    title: 'Python Development',
    body: `
      <p>Python is my primary tool for algorithmic scripting, problem-solving, and system automation.</p>
      <div class="modal-list-title">Focus Areas:</div>
      <ul class="modal-list">
        <li><i class="fa-solid fa-check"></i> Standard scripting & CLI automations</li>
        <li><i class="fa-solid fa-check"></i> Data structures & algorithms solving</li>
        <li><i class="fa-solid fa-check"></i> Basic server backends (FastAPI)</li>
      </ul>
      <p>I frequently use Python to solve logic puzzles and design custom network/system administration utilities.</p>
    `
  },
  'c-lang': {
    icon: 'fa-solid fa-code c-icon',
    title: 'C Programming',
    body: `
      <p>C provides me with a deep, low-level understanding of hardware memory layout, pointer operations, and system-level architectures.</p>
      <div class="modal-list-title">Acquired Skills:</div>
      <ul class="modal-list">
        <li><i class="fa-solid fa-check"></i> Pointer manipulations & address lookups</li>
        <li><i class="fa-solid fa-check"></i> Manual dynamic memory management (malloc/free)</li>
        <li><i class="fa-solid fa-check"></i> Custom algorithm design & loop optimization</li>
      </ul>
      <p>Studying C has helped strengthen my code efficiency and fundamental understanding of computer systems.</p>
    `
  },
  web: {
    icon: 'fa-brands fa-html5 html-icon',
    title: 'HTML & CSS Web Layouts',
    body: `
      <p>I build clean, semantic, and highly responsive user interfaces using vanilla CSS styling techniques.</p>
      <div class="modal-list-title">Design Strengths:</div>
      <ul class="modal-list">
        <li><i class="fa-solid fa-check"></i> Modern layout engines (Flexbox & CSS Grid)</li>
        <li><i class="fa-solid fa-check"></i> Custom responsive media viewport triggers</li>
        <li><i class="fa-solid fa-check"></i> Premium animations & transitions (3D rotations)</li>
      </ul>
      <p>I prioritize clean page hierarchies, high performance, and visual excellence on every web document I build.</p>
    `
  },
  git: {
    icon: 'fa-brands fa-github git-icon',
    title: 'Git & GitHub Workflows',
    body: `
      <p>I manage code repositories systematically using Git command workflows and publish static sites live via GitHub Pages.</p>
      <div class="modal-list-title">Core Operations:</div>
      <ul class="modal-list">
        <li><i class="fa-solid fa-check"></i> Local repository initialization & commits</li>
        <li><i class="fa-solid fa-check"></i> Branch creations, merging, and conflict resolutions</li>
        <li><i class="fa-solid fa-check"></i> Automated web hosting via GitHub Pages</li>
      </ul>
      <p>All projects are tracked and updated continuously via my public repositories.</p>
    `
  },
  thm: {
    icon: 'fa-solid fa-shield-halved thm-icon',
    title: 'TryHackMe Security Practice',
    body: `
      <p>I regularly practice security concepts on TryHackMe, completing rooms centered on network defenses and operating system configurations.</p>
      <div class="modal-list-title">Practical Experience:</div>
      <ul class="modal-list">
        <li><i class="fa-solid fa-check"></i> Linux administration basics & CLI commands</li>
        <li><i class="fa-solid fa-check"></i> Fundamentals of penetration testing & diagnostics</li>
        <li><i class="fa-solid fa-check"></i> Network protocol analysis & packets tracking</li>
      </ul>
      <p>TryHackMe is my playground for developing a security-centric mindset as a CSIT student.</p>
    `
  },
  networking: {
    icon: 'fa-solid fa-network-wired net-icon',
    title: 'Networking Fundamentals',
    body: `
      <p>I study computer networking architecture, packets traversal, routing, and communication protocols.</p>
      <div class="modal-list-title">Topics Studied:</div>
      <ul class="modal-list">
        <li><i class="fa-solid fa-check"></i> OSI & TCP/IP reference layers</li>
        <li><i class="fa-solid fa-check"></i> IP Address subnettings & packet routings</li>
        <li><i class="fa-solid fa-check"></i> Protocols configuration (DNS, HTTP, DHCP, TCP/UDP)</li>
      </ul>
      <p>This knowledge supports my cyber laboratories on security configurations and packet captures.</p>
    `
  },
  reva: {
    icon: 'fa-solid fa-graduation-cap reva-icon',
    title: 'Reva University Academics',
    body: `
      <p>I am a B.Tech student in CSIT (Computer Science & Information Technology) at Reva University, Bengaluru.</p>
      <div class="modal-list-title">Current Curriculums:</div>
      <ul class="modal-list">
        <li><i class="fa-solid fa-check"></i> Programming logic, C & Python laboratories</li>
        <li><i class="fa-solid fa-check"></i> Computer systems architecture & diagnostics</li>
        <li><i class="fa-solid fa-check"></i> Data structures & engineering communications</li>
      </ul>
      <p>Reva University CSIT program provides me with high-standard academic mentorship and technical foundations.</p>
    `
  },
  languages: {
    icon: 'fa-solid fa-language lang-icon',
    title: 'Languages Spoken',
    body: `
      <p>I communicate in multiple regional and global languages, allowing me to collaborate in diverse environments.</p>
      <div class="modal-list-title">Language Fluency Grid:</div>
      <div class="modal-lang-grid">
        <div class="modal-lang-item">
          <strong>Kannada</strong>
          <span>Native / Fluent</span>
        </div>
        <div class="modal-lang-item">
          <strong>English</strong>
          <span>Professional / Fluent</span>
        </div>
        <div class="modal-lang-item">
          <strong>Hindi</strong>
          <span>Conversational</span>
        </div>
        <div class="modal-lang-item">
          <strong>Marathi</strong>
          <span>Conversational</span>
        </div>
        <div class="modal-lang-item">
          <strong>Bhojpuri</strong>
          <span>Conversational</span>
        </div>
      </div>
    `
  }
};

// Open Detail Modal
function openDetails(key) {
  const modal = document.getElementById('details-modal');
  const placeholder = document.getElementById('modal-content-placeholder');
  const data = detailsData[key];
  
  if (!data) return;
  
  placeholder.innerHTML = `
    <div class="modal-header-row">
      <i class="${data.icon}"></i>
      <h3>${data.title}</h3>
    </div>
    <div class="modal-body">
      ${data.body}
    </div>
  `;
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Close Detail Modal
function closeDetails() {
  const modal = document.getElementById('details-modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal when clicking outside of modal box
window.addEventListener('click', (e) => {
  const modal = document.getElementById('details-modal');
  if (e.target === modal) {
    closeDetails();
  }
});
