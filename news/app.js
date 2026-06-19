// ==========================================================================
// 1. ARTICLE DATABASE (NO PLACEHOLDERS, FULL DATA)
// ==========================================================================
const articles = [
  {
    id: 1,
    title: "DeepSeek-R1 Releases: Open Weights Reasoning Competes with Frontier Proprietary Models",
    category: "ai",
    author: "Elena Rostova",
    date: "June 18, 2026",
    readTime: "6 min read",
    excerpt: "DeepSeek introduces R1, utilizing Group Relative Policy Optimization (GRPO) to deliver SOTA mathematical and programming reasoning at a fraction of standard training costs.",
    content: [
      "In a major development for the global AI ecosystem, DeepSeek has released DeepSeek-R1. This open-weights model achieves performance levels comparable to OpenAI's o1 and o3 reasoning models, sparking intense discussion about the efficiency of current reinforcement learning techniques.",
      "Rather than utilizing standard Proximal Policy Optimization (PPO), which requires maintaining a resource-intensive critic network, DeepSeek deployed Group Relative Policy Optimization (GRPO). This technique scores a group of model generations relative to each other, optimizing output structure and accuracy without heavy hardware footprints.",
      "R1 was trained in four key stages: a cold-start Supervised Fine-Tuning phase with thousands of reasoning examples, a reasoning-focused GRPO reinforcement learning phase, an 800,000-sample rejection sampling phase, and a final alignment phase. The result is a model that handles complex math, nested coding tasks, and multi-step logic with ease.",
      "Most remarkably, the company released a series of distilled models based on popular open architectures (Qwen and Llama), allowing developers to run SOTA reasoning capabilities locally on consumer GPUs."
    ],
    gradClass: "g-ai",
    icon: "fa-robot",
    isFeatured: true,
    isTrending: false
  },
  {
    id: 2,
    title: "WebGPU and the Future of In-Browser Real-Time Raytracing",
    category: "tech",
    author: "Marcus Chen",
    date: "June 17, 2026",
    readTime: "4 min read",
    excerpt: "The widespread adoption of WebGPU allows developers to execute complex graphic pipelines and hardware-accelerated raytracing directly in standard browsers.",
    content: [
      "As WebGL starts to show its age, the tech community is rapidly shifting focus toward WebGPU—a modern API that exposes advanced GPU hardware features (like compute shaders and direct memory access) directly to JavaScript applications.",
      "With WebGPU reaching production status in major browsers, developers are now building web-based game engines, offline visual renderers, and interactive simulations that previously required native application wrappers.",
      "This evolution unlocks real-time path tracing, high-fidelity global illumination, and localized physics simulations directly within a browser tab. The implications for collaborative 3D tools, portfolio presentations, and educational visualizations are immense.",
      "Furthermore, the API allows for high-performance machine learning inference directly on the client's GPU, paving the way for browser-based neural networks that do not require round-trips to expensive cloud clusters."
    ],
    gradClass: "g-tech",
    icon: "fa-laptop-code",
    isFeatured: false,
    isTrending: true
  },
  {
    id: 3,
    title: "Artemis III Target Landing Zones Selected on the Lunar South Pole",
    category: "space",
    author: "Sarah Jenkins",
    date: "June 16, 2026",
    readTime: "5 min read",
    excerpt: "NASA publishes nine landing candidates on the Moon's South Pole, chosen for their proximity to permanently shadowed craters housing water ice.",
    content: [
      "NASA has officially finalized the potential landing sites for the historic Artemis III mission, which aims to return humans to the lunar surface. The nine candidates, located near the Moon's South Pole, represent areas of intense scientific interest.",
      "Unlike the relatively flat equatorial regions visited during the Apollo era, the Lunar South Pole features rugged, highly cratered terrain. Crucially, the region contains permanently shadowed craters where temperatures never exceed -150°C, preserving deep deposits of ancient water ice.",
      "Harvesting this water ice is a core objective of the long-term Artemis program, as it can be processed into oxygen for breathing and hydrogen for rocket fuel, establishing a foundation for deep-space Mars missions.",
      "Landing in these areas presents unique challenges, including extreme lighting angles, long shadows that make visual navigation difficult, and steep crater slopes. Planetary scientists are now analyzing high-resolution orbital telemetry to select the final landing zone."
    ],
    gradClass: "g-space",
    icon: "fa-user-astronaut",
    isFeatured: false,
    isTrending: true
  },
  {
    id: 4,
    title: "Neo-Minimalism and the Return of Skewomorphic Gestures in UI",
    category: "design",
    author: "Oliver Bennett",
    date: "June 15, 2026",
    readTime: "3 min read",
    excerpt: "Product designers are moving away from completely flat components, introducing subtle tactile feedback, dynamic depths, and interactive gravity physics.",
    content: [
      "For over a decade, flat design dominated software interfaces, prioritizing absolute simplicity. However, designers are reporting rising interface fatigue, leading to a new design direction: Neo-Minimalism.",
      "This approach maintains clean layout grids, generous white space, and bold typography, but integrates tactile design elements like glassmorphism overlays, soft drop shadows, and microscopic depth adjustments.",
      "Importantly, interfaces are adopting 'skewomorphic gestures'—buttons that depress physically on hover, sliders with elastic spring effects, and elements that respond dynamically to device tilting or mouse speed.",
      "By adding physical feedback, these interfaces feel more intuitive, providing immediate reassurance to users and boosting engagement rates across SaaS dashboards."
    ],
    gradClass: "g-design",
    icon: "fa-bezier-curve",
    isFeatured: false,
    isTrending: false
  },
  {
    id: 5,
    title: "Rust in the Linux Kernel: A Multi-Year Assessment of Memory Safety",
    category: "tech",
    author: "Linus Torvaldsson",
    date: "June 14, 2026",
    readTime: "5 min read",
    excerpt: "Reviewing the security impact and compiler optimizations since integrating Rust driver models into the core kernel branch.",
    content: [
      "When the kernel project first announced experimental Rust support, many developers were skeptical about performance overheads and language friction. Today, three years later, the results speak for themselves.",
      "Several key device drivers, networking stacks, and filesystem abstractions have been rewritten in Rust. Telemetry indicates a complete elimination of use-after-free and buffer-overflow vulnerabilities in those modules.",
      "The integration process was not without hurdles. The kernel developers had to write custom safety wrappers around raw C abstractions, manage complex memory pointers, and reconcile the differences between C and Rust compilation behaviors.",
      "However, the stability gains in driver modules—which historically accounted for a significant percentage of system crashes—have convinced major Linux distributions to compile kernels with Rust support active by default."
    ],
    gradClass: "g-tech",
    icon: "fa-code-branch",
    isFeatured: false,
    isTrending: false
  },
  {
    id: 6,
    title: "Voyager 1 Translates Legacy Memory Logs Using AI-Powered Telemetry",
    category: "space",
    author: "Dr. Arthur Vance",
    date: "June 12, 2026",
    readTime: "4 min read",
    excerpt: "Engineers resolve a deep-space data corruption issue by training a custom decoder to reconstruct damaged telemetry packages.",
    content: [
      "In late 2025, Voyager 1 began sending a repeating stream of gibberish, indicating a failure in its Flight Data Subsystem (FDS). Facing a legacy computing system launched in 1977, NASA engineers resorted to cutting-edge AI decoding.",
      "By feeding decades of clean historical telemetry into a localized decoder model, scientists trained the software to anticipate the signal pattern and reconstruct the damaged memory packets.",
      "The technique worked: the team successfully isolated the corrupted memory chips, redirected the code, and received clean telemetry from a distance of over 15 billion miles.",
      "This represents a unique fusion of historical space engineering and modern data science, demonstrating how machine learning can rescue legacy spacecraft operating near the edge of the heliosphere."
    ],
    gradClass: "g-space",
    icon: "fa-satellite-dish",
    isFeatured: false,
    isTrending: false
  },
  {
    id: 7,
    title: "Adaptive Dark Themes: Using Light Sensors to Adjust Interface Hue",
    category: "design",
    author: "Aria Thorne",
    date: "June 10, 2026",
    readTime: "3 min read",
    excerpt: "Going beyond static dark mode toggle switches, new browser extensions dynamically shift contrast based on ambient room illumination.",
    content: [
      "Traditional dark themes simply swap light backgrounds for dark slates. But in dark rooms, high-contrast white text on black backgrounds can still cause significant eye strain.",
      "Adaptive design addresses this by reading ambient light sensors built into modern laptops and mobile phones. As room illumination decreases, the site dynamically lowers text contrast, shifts color temperature toward warm ambers, and softens backgrounds.",
      "This real-time adjustments significantly reduces ocular fatigue, particularly during late-night programming or reading sessions.",
      "Implementation requires querying the Ambient Light API and adjusting CSS variables dynamically via JavaScript transition filters, resulting in a premium UX."
    ],
    gradClass: "g-design",
    icon: "fa-palette",
    isFeatured: false,
    isTrending: true
  }
];

// Breaking news headlines for ticker
const headlines = [
  "DeepSeek-R1 open weights model goes viral on Hugging Face with 2M+ downloads.",
  "WebGPU API officially enabled in all chromium browsers.",
  "Artemis III lunar lander completes thermal chamber testing.",
  "React 19 launches with native Server Actions support.",
  "Voyager 1 resumes scientific telemetry transmission from interstellar space.",
  "Tech companies adopt Neo-Minimalism layouts in SaaS upgrades."
];

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
let currentCategory = 'all';
let searchQuery = '';
let bookmarkedIds = JSON.parse(localStorage.getItem('chronicle-bookmarks')) || [];

// ==========================================================================
// 3. INITIALIZATION & ELEMENT REFERENCES
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const newsGrid = document.getElementById('news-grid');
  const heroSpotlight = document.getElementById('hero-spotlight');
  const trendingList = document.getElementById('trending-list');
  const tickerContent = document.getElementById('ticker-content');
  const searchInput = document.getElementById('news-search');
  const bookmarkCount = document.getElementById('bookmark-count');
  
  // Theme elements
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  // Bookmarks Sidebar elements
  const bookmarkToggleBtn = document.getElementById('bookmark-toggle-btn');
  const bookmarksSidebar = document.getElementById('bookmarks-sidebar');
  const bookmarksCloseBtn = document.getElementById('bookmarks-close-btn');
  const bookmarksList = document.getElementById('bookmarks-list');

  // Modal elements
  const articleModal = document.getElementById('article-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImgPlaceholder = document.getElementById('modal-img-placeholder');
  const modalTag = document.getElementById('modal-tag');
  const modalReadTime = document.getElementById('modal-read-time');
  const modalDate = document.getElementById('modal-date');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalBookmarkBtn = document.getElementById('modal-bookmark-btn');
  const modalBody = document.getElementById('modal-body');

  // Load Saved Theme
  const savedTheme = localStorage.getItem('chronicle-theme') || 'light';
  document.body.className = '';
  document.body.classList.add(`theme-${savedTheme}`);
  updateThemeIcon(savedTheme);

  // Toggle Theme
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.body.className = '';
    document.body.classList.add(`theme-${newTheme}`);
    localStorage.setItem('chronicle-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }

  // Toggle Bookmarks Sidebar
  bookmarkToggleBtn.addEventListener('click', () => {
    bookmarksSidebar.classList.toggle('open');
  });

  bookmarksCloseBtn.addEventListener('click', () => {
    bookmarksSidebar.classList.remove('open');
  });

  // ==========================================================================
  // 4. RENDER PROCEDURES
  // ==========================================================================
  
  // A. Render Breaking News Ticker
  function initTicker() {
    tickerContent.innerHTML = '';
    // Duplicate headlines to make marquee loop seamless
    const tickerItems = [...headlines, ...headlines];
    tickerItems.forEach(text => {
      const div = document.createElement('div');
      div.className = 'ticker-item';
      div.innerHTML = `<span class="ticker-dot"></span> ${text}`;
      tickerContent.appendChild(div);
    });
  }

  // B. Render Hero Spotlight (Featured Article)
  function renderFeatured() {
    const featured = articles.find(a => a.isFeatured);
    if (!featured) return;

    heroSpotlight.innerHTML = `
      <div class="hero-overlay"></div>
      <div class="hero-bg ${featured.gradClass}"></div>
      <div class="hero-content">
        <span class="card-tag">${featured.category}</span>
        <h2>${featured.title}</h2>
        <div class="hero-meta">
          <span><i class="fa-solid fa-user-pen"></i> ${featured.author}</span>
          <span><i class="fa-regular fa-clock"></i> ${featured.readTime}</span>
        </div>
      </div>
    `;

    // Click behavior to open modal
    heroSpotlight.addEventListener('click', () => {
      openArticleModal(featured.id);
    });
  }

  // C. Render Trending Sidebar
  function renderTrending() {
    trendingList.innerHTML = '';
    const trending = articles.filter(a => a.isTrending);
    
    trending.forEach((article, index) => {
      const div = document.createElement('div');
      div.className = 'trending-item';
      div.innerHTML = `
        <span class="trend-number">0${index + 1}</span>
        <div class="trend-info">
          <h4>${article.title}</h4>
          <div class="trend-meta">
            <span>${article.category.toUpperCase()}</span> &bull; <span>${article.readTime}</span>
          </div>
        </div>
      `;
      div.addEventListener('click', () => {
        openArticleModal(article.id);
      });
      trendingList.appendChild(div);
    });
  }

  // D. Render News Feed Cards Grid
  function renderNewsGrid() {
    newsGrid.innerHTML = '';
    
    // Filter articles
    const filtered = articles.filter(article => {
      // Exclude spotlight
      if (article.isFeatured) return false;

      // Filter by category
      const matchesCategory = currentCategory === 'all' || article.category === currentCategory;

      // Filter by search query
      const matchesSearch = article.title.toLowerCase().includes(searchQuery) ||
                            article.category.toLowerCase().includes(searchQuery) ||
                            article.excerpt.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      newsGrid.innerHTML = `
        <div class="no-results" style="grid-column: span 3; text-align: center; padding: 40px; color: var(--text-secondary);">
          <i class="fa-regular fa-folder-open" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
          No articles found matching your criteria.
        </div>
      `;
      return;
    }

    filtered.forEach(article => {
      const isBookmarked = bookmarkedIds.includes(article.id);
      const card = document.createElement('article');
      card.className = 'news-card';
      card.innerHTML = `
        <div class="card-image-wrapper">
          <div class="card-image-placeholder ${article.gradClass}">
            <i class="fa-solid ${article.icon}"></i>
          </div>
          <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${article.id}" title="Save Article">
            <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
          </button>
        </div>
        <div class="card-info">
          <div class="card-meta">
            <span class="card-tag-text" style="color: var(--color-accent); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">${article.category}</span>
            <span>${article.readTime}</span>
          </div>
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <div class="card-author">
            <i class="fa-solid fa-user-pen"></i> ${article.author}
          </div>
        </div>
      `;

      // Event listener for opening article
      card.addEventListener('click', (e) => {
        // Prevent click trigger when clicking bookmark button
        if (e.target.closest('.card-bookmark-btn')) return;
        openArticleModal(article.id);
      });

      // Bookmark button behavior
      const bmarkBtn = card.querySelector('.card-bookmark-btn');
      bmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmark(article.id);
      });

      newsGrid.appendChild(card);
    });
  }

  // E. Render Bookmarks List inside Sidebar
  function renderBookmarks() {
    bookmarksList.innerHTML = '';
    const bookmarkedArticles = articles.filter(a => bookmarkedIds.includes(a.id));
    bookmarkCount.innerText = bookmarkedIds.length;

    if (bookmarkedArticles.length === 0) {
      bookmarksList.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-secondary);">
          <i class="fa-regular fa-bookmark" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
          No saved stories yet. Click the bookmark icon on cards to save.
        </div>
      `;
      return;
    }

    bookmarkedArticles.forEach(article => {
      const item = document.createElement('div');
      item.className = 'bookmark-item';
      item.innerHTML = `
        <div class="bookmark-thumb ${article.gradClass}">
          <i class="fa-solid ${article.icon}"></i>
        </div>
        <div class="bookmark-details">
          <h4>${article.title}</h4>
          <span>${article.category.toUpperCase()} &bull; ${article.readTime}</span>
        </div>
        <button class="bookmark-delete-btn" data-id="${article.id}" title="Remove Bookmark">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.closest('.bookmark-delete-btn')) return;
        bookmarksSidebar.classList.remove('open');
        openArticleModal(article.id);
      });

      const delBtn = item.querySelector('.bookmark-delete-btn');
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmark(article.id);
      });

      bookmarksList.appendChild(item);
    });
  }

  // ==========================================================================
  // 5. INTERACTION LOGIC
  // ==========================================================================
  
  // A. Toggle Bookmarks
  function toggleBookmark(id) {
    const idx = bookmarkedIds.indexOf(id);
    if (idx > -1) {
      bookmarkedIds.splice(idx, 1);
    } else {
      bookmarkedIds.push(id);
    }

    // Save
    localStorage.setItem('chronicle-bookmarks', JSON.stringify(bookmarkedIds));

    // Re-render components
    renderNewsGrid();
    renderBookmarks();
    updateModalBookmarkBtn(id);
  }

  // B. Dynamic Article Modal Opening
  function openArticleModal(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;

    // Set content
    modalImgPlaceholder.className = `modal-img-placeholder ${article.gradClass}`;
    modalImgPlaceholder.innerHTML = `<i class="fa-solid ${article.icon}"></i>`;
    modalTag.innerText = article.category;
    modalReadTime.innerText = article.readTime;
    modalDate.innerText = article.date;
    modalTitle.innerText = article.title;
    modalAuthor.innerText = article.author;

    // Set body text (multiple paragraphs support)
    modalBody.innerHTML = '';
    article.content.forEach(paragraph => {
      const p = document.createElement('p');
      p.innerText = paragraph;
      modalBody.appendChild(p);
    });

    // Bookmark button listener binding inside modal
    updateModalBookmarkBtn(id);
    
    // Clear old listeners by cloning node
    const newBmarkBtn = modalBookmarkBtn.cloneNode(true);
    modalBookmarkBtn.parentNode.replaceChild(newBmarkBtn, modalBookmarkBtn);
    
    // Re-select element
    const activeBmarkBtn = document.getElementById('modal-bookmark-btn');
    activeBmarkBtn.addEventListener('click', () => {
      toggleBookmark(id);
    });

    // Open modal
    articleModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateModalBookmarkBtn(id) {
    const activeBmarkBtn = document.getElementById('modal-bookmark-btn');
    const isBookmarked = bookmarkedIds.includes(id);
    if (isBookmarked) {
      activeBmarkBtn.className = 'btn btn-primary btn-sm';
      activeBmarkBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Saved';
    } else {
      activeBmarkBtn.className = 'btn btn-outline btn-sm';
      activeBmarkBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Save';
    }
  }

  // Modal Closing Behavior
  const closeModal = () => {
    articleModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);
  articleModal.addEventListener('click', (e) => {
    if (e.target === articleModal) {
      closeModal();
    }
  });

  // C. Search input listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderNewsGrid();
  });

  // D. Category Tabs switching
  const catTabs = document.querySelectorAll('.cat-tab');
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentCategory = tab.getAttribute('data-category');
      renderNewsGrid();
    });
  });

  // ==========================================================================
  // 6. KICK OFF RENDERS
  // ==========================================================================
  initTicker();
  renderFeatured();
  renderTrending();
  renderNewsGrid();
  renderBookmarks();
});
 Rosa
