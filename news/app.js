// ==========================================================================
// 1. OFFLINE / FALLBACK STATIC DATABASE
// ==========================================================================
const fallbackArticles = [
  {
    id: 9991,
    title: "DeepSeek-R1 Releases: Open Weights Reasoning Competes with Frontier Proprietary Models",
    category: "ai",
    author: "Elena Rostova",
    date: "June 18, 2026",
    readTime: "6 min read",
    excerpt: "DeepSeek introduces R1, utilizing Group Relative Policy Optimization (GRPO) to deliver SOTA mathematical and programming reasoning at a fraction of standard training costs.",
    content: "DeepSeek-R1 is an open-weights reasoning model that uses reinforcement learning (GRPO) to self-correct and reason, producing results comparable to closed-weights frontier models.",
    gradClass: "g-ai",
    icon: "fa-robot",
    isFeatured: true,
    isTrending: false
  },
  {
    id: 9992,
    title: "WebGPU and the Future of In-Browser Real-Time Raytracing",
    category: "tech",
    author: "Marcus Chen",
    date: "June 17, 2026",
    readTime: "4 min read",
    excerpt: "The widespread adoption of WebGPU allows developers to execute complex graphic pipelines and hardware-accelerated raytracing directly in standard browsers.",
    content: "WebGPU is a modern Web API exposing advanced GPU features directly to browser clients, enabling high-performance graphics and local neural network execution.",
    gradClass: "g-tech",
    icon: "fa-laptop-code",
    isFeatured: false,
    isTrending: true
  },
  {
    id: 9993,
    title: "Artemis III Target Landing Zones Selected on the Lunar South Pole",
    category: "space",
    author: "Sarah Jenkins",
    date: "June 16, 2026",
    readTime: "5 min read",
    excerpt: "NASA publishes nine landing candidates on the Moon's South Pole, chosen for their proximity to permanently shadowed craters housing water ice.",
    content: "NASA's Artemis III mission plans to return astronauts to the lunar surface. Selection candidates are at the South Pole, targeting resource ice extraction.",
    gradClass: "g-space",
    icon: "fa-user-astronaut",
    isFeatured: false,
    isTrending: true
  }
];

// Live Breaking news ticker items (updated dynamically)
let headlines = [
  "DeepSeek-R1 open weights model goes viral on Hugging Face with 2M+ downloads.",
  "WebGPU API officially enabled in all chromium browsers.",
  "Artemis III lunar lander completes thermal chamber testing.",
  "React 19 launches with native Server Actions support.",
  "Voyager 1 resumes scientific telemetry transmission from interstellar space."
];

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
let articles = []; // Loaded from API
let currentCategory = 'all';
let searchQuery = '';
let bookmarkedIds = JSON.parse(localStorage.getItem('chronicle-bookmarks')) || [];

// Category color mappings
const categoryGradients = {
  tech: "g-tech",
  ai: "g-ai",
  space: "g-space",
  design: "g-design"
};

const categoryIcons = {
  tech: "fa-laptop-code",
  ai: "fa-robot",
  space: "fa-satellite-dish",
  design: "fa-palette"
};

// ==========================================================================
// 3. INITIALIZATION & FETCH LOGIC
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

  // Live Refresh Button - refetch latest articles from Dev.to
  const refreshBtn = document.getElementById('refresh-news-btn');
  const refreshIcon = refreshBtn.querySelector('i');

  refreshBtn.addEventListener('click', async () => {
    // Spin the icon while loading
    refreshIcon.classList.add('fa-spin');
    refreshBtn.disabled = true;
    refreshBtn.title = 'Refreshing...';

    await fetchLiveNews();

    // Stop spinning once done
    refreshIcon.classList.remove('fa-spin');
    refreshBtn.disabled = false;
    refreshBtn.title = 'Refresh Live News';

    // Brief green flash feedback to confirm success
    refreshBtn.style.borderColor = '#10b981';
    refreshBtn.style.color = '#10b981';
    setTimeout(() => {
      refreshBtn.style.borderColor = '';
      refreshBtn.style.color = '';
    }, 1500);
  });

  // ==========================================================================
  // 4. DEV.TO API FETCH PIPELINE (REAL-TIME LIVE NEWS)
  // ==========================================================================
  async function fetchLiveNews() {
    newsGrid.innerHTML = `
      <div style="grid-column: span 3; text-align: center; padding: 50px;">
        <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 3rem; color: var(--color-accent); margin-bottom: 15px;"></i>
        <p>Loading real-time news streams...</p>
      </div>
    `;

    // AbortController: auto-cancel fetch if it takes longer than 5 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(
        'https://dev.to/api/articles?per_page=24&state=rising',
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('API response error');
      const data = await response.json();

      if (data && data.length > 0) {
        articles = data.map((apiItem, index) => {
          const tagsStr = (apiItem.tag_list || []).join(' ').toLowerCase();
          let category = 'tech';
          if (tagsStr.includes('ai') || tagsStr.includes('machinelearning') || tagsStr.includes('deepseek') || tagsStr.includes('gpt') || tagsStr.includes('llm')) {
            category = 'ai';
          } else if (tagsStr.includes('space') || tagsStr.includes('nasa') || tagsStr.includes('science') || tagsStr.includes('physics')) {
            category = 'space';
          } else if (tagsStr.includes('design') || tagsStr.includes('css') || tagsStr.includes('ux') || tagsStr.includes('ui') || tagsStr.includes('figma')) {
            category = 'design';
          }

          return {
            id: apiItem.id,
            title: apiItem.title || 'Untitled Article',
            category: category,
            author: (apiItem.user && apiItem.user.name) ? apiItem.user.name : 'Anonymous',
            date: apiItem.readable_publish_date || 'Recently',
            readTime: `${apiItem.reading_time_minutes || 3} min read`,
            excerpt: apiItem.description || 'Click to read the full article.',
            coverImage: apiItem.cover_image || null,
            gradClass: categoryGradients[category],
            icon: categoryIcons[category],
            isFeatured: index === 0,
            isTrending: index > 0 && index < 4
          };
        });

        headlines = articles.slice(0, 6).map(a => a.title);
      } else {
        useFallback();
      }
    } catch (e) {
      clearTimeout(timeoutId);
      console.warn('Dev.to API unavailable, loading local feeds.', e.message);
      useFallback();
    }

    // Always render — never stays stuck
    initTicker();
    renderFeatured();
    renderTrending();
    renderNewsGrid();
    renderBookmarks();
  }

  function useFallback() {
    articles = fallbackArticles;
  }

  // ==========================================================================
  // 5. RENDER ENGINE
  // ==========================================================================
  
  // A. Render Breaking News Ticker
  function initTicker() {
    tickerContent.innerHTML = '';
    const tickerItems = [...headlines, ...headlines]; // seamless marquee loop
    tickerItems.forEach(text => {
      const div = document.createElement('div');
      div.className = 'ticker-item';
      div.innerHTML = `<span class="ticker-dot"></span> ${text}`;
      tickerContent.appendChild(div);
    });
  }

  // B. Render Featured Spotlight Banner
  function renderFeatured() {
    const featured = articles.find(a => a.isFeatured);
    if (!featured) return;

    // Use cover image if provided, else use CSS gradient background
    const bgStyle = featured.coverImage 
      ? `background-image: url('${featured.coverImage}'); background-size: cover; background-position: center;` 
      : '';

    heroSpotlight.innerHTML = `
      <div class="hero-overlay"></div>
      <div class="hero-bg ${featured.coverImage ? '' : featured.gradClass}" style="${bgStyle}"></div>
      <div class="hero-content">
        <span class="card-tag">${featured.category.toUpperCase()}</span>
        <h2>${featured.title}</h2>
        <div class="hero-meta">
          <span><i class="fa-solid fa-user-pen"></i> ${featured.author}</span>
          <span><i class="fa-regular fa-clock"></i> ${featured.readTime}</span>
        </div>
      </div>
    `;

    // Reset old listeners
    const newSpotlight = heroSpotlight.cloneNode(true);
    heroSpotlight.parentNode.replaceChild(newSpotlight, heroSpotlight);
    newSpotlight.addEventListener('click', () => {
      openArticleModal(featured.id);
    });
  }

  // C. Render Trending Sidebar List
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

  // D. Render Card Feed Grid
  function renderNewsGrid() {
    newsGrid.innerHTML = '';
    
    // Filter articles
    const filtered = articles.filter(article => {
      // Exclude spotlight
      if (article.isFeatured) return false;

      // Filter by category tab
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
          No live feeds match your search criteria.
        </div>
      `;
      return;
    }

    filtered.forEach(article => {
      const isBookmarked = bookmarkedIds.includes(article.id);
      const card = document.createElement('article');
      card.className = 'news-card';
      
      const imgStyle = article.coverImage 
        ? `background-image: url('${article.coverImage}'); background-size: cover; background-position: center;` 
        : '';

      card.innerHTML = `
        <div class="card-image-wrapper">
          <div class="card-image-placeholder ${article.coverImage ? '' : article.gradClass}" style="${imgStyle}">
            ${article.coverImage ? '' : `<i class="fa-solid ${article.icon}"></i>`}
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
          <p>${article.excerpt || 'No description available.'}</p>
          <div class="card-author">
            <i class="fa-solid fa-user-pen"></i> ${article.author}
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-bookmark-btn')) return;
        openArticleModal(article.id);
      });

      const bmarkBtn = card.querySelector('.card-bookmark-btn');
      bmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmark(article.id);
      });

      newsGrid.appendChild(card);
    });
  }

  // E. Render Bookmarks List
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
      
      const thumbStyle = article.coverImage 
        ? `background-image: url('${article.coverImage}'); background-size: cover; background-position: center;` 
        : '';

      item.innerHTML = `
        <div class="bookmark-thumb ${article.coverImage ? '' : article.gradClass}" style="${thumbStyle}">
          ${article.coverImage ? '' : `<i class="fa-solid ${article.icon}"></i>`}
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
  // 6. INTERACTIVE DYNAMIC MODAL (FETCING SINGLE ARTICLE CONTENT FROM API)
  // ==========================================================================
  async function openArticleModal(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;

    // Loading State
    modalImgPlaceholder.className = `modal-img-placeholder ${article.gradClass}`;
    modalImgPlaceholder.style.backgroundImage = article.coverImage ? `url('${article.coverImage}')` : '';
    modalImgPlaceholder.innerHTML = article.coverImage ? '' : `<i class="fa-solid ${article.icon}"></i>`;
    modalTag.innerText = article.category.toUpperCase();
    modalReadTime.innerText = article.readTime;
    modalDate.innerText = article.date;
    modalTitle.innerText = article.title;
    modalAuthor.innerText = article.author;

    // Show loading text in body
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 30px;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--color-accent); margin-bottom: 10px;"></i>
        <p>Loading full live article text...</p>
      </div>
    `;

    // Open modal immediately to show loading spinner
    articleModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Fetch full body HTML from single article endpoint if it is a Dev.to article
    if (!article.content) { // Dev.to live articles do not have static content fields
      try {
        const res = await fetch(`https://dev.to/api/articles/${id}`);
        if (!res.ok) throw new Error('API fetch error');
        const detailData = await res.json();
        
        if (detailData && detailData.body_html) {
          modalBody.innerHTML = detailData.body_html;
        } else {
          modalBody.innerHTML = `<p>${article.excerpt || 'No additional content loaded.'}</p>`;
        }
      } catch (err) {
        modalBody.innerHTML = `<p>${article.excerpt || 'Failed to load details. Please check connection.'}</p>`;
      }
    } else {
      // Fallback local articles simply use static paragraph list
      modalBody.innerHTML = `<p>${article.content}</p>`;
    }

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
  }

  function toggleBookmark(id) {
    const idx = bookmarkedIds.indexOf(id);
    if (idx > -1) {
      bookmarkedIds.splice(idx, 1);
    } else {
      bookmarkedIds.push(id);
    }

    localStorage.setItem('chronicle-bookmarks', JSON.stringify(bookmarkedIds));

    // Re-render components
    renderNewsGrid();
    renderBookmarks();
    updateModalBookmarkBtn(id);
  }

  function updateModalBookmarkBtn(id) {
    const activeBmarkBtn = document.getElementById('modal-bookmark-btn');
    if (!activeBmarkBtn) return;
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

  // Search input listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderNewsGrid();
  });

  // Category Tabs switching
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
  // 7. INITIALIZE API FETCH
  // ==========================================================================
  fetchLiveNews();
});
