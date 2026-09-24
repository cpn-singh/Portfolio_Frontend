/**
 * Main Application Orchestration Script
 * Controls Preloader, Command Palette (Ctrl+K), Project Detail Modal,
 * Sound Equalizer, Copy Feedback, Form Validation, and Mobile Menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCommandPalette();
  initProjectModal();
  initContactActions();
  initSkillsFilter();
  initAudioToggle();
  initMobileMenu();
  initAmbientMode();
});

/* ================= PRELOADER ================= */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const countEl = document.getElementById('preloaderPercent');
  const progressBar = document.getElementById('preloaderBar');

  if (!preloader || !countEl) return;

  let current = 0;
  const target = 100;
  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 8) + 4;
    if (current >= target) {
      current = target;
      clearInterval(interval);
      countEl.textContent = '100%';
      if (progressBar) progressBar.style.width = '100%';

      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.classList.remove('loading-locked');
      }, 350);
    } else {
      countEl.textContent = `${current}%`;
      if (progressBar) progressBar.style.width = `${current}%`;
    }
  }, 40);
}

/* ================= COMMAND PALETTE (CTRL+K) ================= */
function initCommandPalette() {
  const palette = document.getElementById('commandPaletteModal');
  const input = document.getElementById('commandPaletteInput');
  const list = document.getElementById('commandList');
  const triggerBtn = document.getElementById('cmdPaletteTrigger');
  const closeBtn = document.getElementById('closeCmdPalette');

  if (!palette || !input || !list) return;

  const commands = [
    { label: 'Go to Hero / Home', desc: 'Section 01', icon: 'fas fa-home', action: () => scrollToSection('home') },
    { label: 'Explore Featured Projects', desc: 'Section 03 - 5 Live Projects', icon: 'fas fa-code-branch', action: () => scrollToSection('projects') },
    { label: 'Inspect Skills & Arsenal', desc: 'Section 04 - React, JS, Tailwind', icon: 'fas fa-microchip', action: () => scrollToSection('skills') },
    { label: 'About Chaitanya', desc: 'Section 02 - Bio & Philosophy', icon: 'fas fa-user-astronaut', action: () => scrollToSection('about') },
    { label: 'Professional Journey', desc: 'Section 05 - Experience & Education', icon: 'fas fa-graduation-cap', action: () => scrollToSection('experience') },
    { label: 'Contact & Hire Chaitanya', desc: 'Section 06 - Maujpur, Delhi', icon: 'fas fa-paper-plane', action: () => scrollToSection('contact') },
    { label: 'Open Official Resume', desc: 'cpn-resume.vercel.app', icon: 'fas fa-file-pdf', action: () => window.open('https://cpn-resume.vercel.app/', '_blank') },
    { label: 'Visit GitHub Profile', desc: 'github.com/cpn-singh', icon: 'fab fa-github', action: () => window.open('https://github.com/cpn-singh', '_blank') },
    { label: 'Connect on LinkedIn', desc: 'in/chaitanya-pratap-narayan', icon: 'fab fa-linkedin', action: () => window.open('https://www.linkedin.com/in/chaitanya-pratap-narayan-83a42a411/', '_blank') },
    { label: 'Direct WhatsApp Chat', desc: '+91 9350349962', icon: 'fab fa-whatsapp', action: () => window.open('https://wa.me/919350349962', '_blank') },
    { label: 'Copy Email Address', desc: 'cpnsingh2001@gmail.com', icon: 'fas fa-envelope', action: () => copyToClipboard('cpnsingh2001@gmail.com', 'Email copied to clipboard!') },
    { label: 'Copy Phone Number', desc: '+91 9350349962', icon: 'fas fa-phone', action: () => copyToClipboard('+919350349962', 'Phone number copied!') },
    { label: 'Toggle Sound Effects', desc: 'Synthesizer Audio Engine', icon: 'fas fa-volume-high', action: () => toggleSound() },
    { label: 'Toggle Cinematic Ambient Mode', desc: 'Hide UI chrome', icon: 'fas fa-film', action: () => toggleAmbientMode() }
  ];

  function openPalette() {
    palette.classList.add('active');
    input.value = '';
    renderItems(commands);
    setTimeout(() => input.focus(), 100);
    if (window.soundEngine) window.soundEngine.playSwitch();
  }

  function closePalette() {
    palette.classList.remove('active');
  }

  function renderItems(items) {
    list.innerHTML = '';
    if (items.length === 0) {
      list.innerHTML = '<li class="cmd-empty">No matching commands found.</li>';
      return;
    }

    items.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = `cmd-item ${idx === 0 ? 'selected' : ''}`;
      li.innerHTML = `
        <div class="cmd-item-left">
          <i class="${item.icon}"></i>
          <div>
            <span class="cmd-item-label">${item.label}</span>
            <span class="cmd-item-desc">${item.desc}</span>
          </div>
        </div>
        <span class="cmd-item-enter">↵</span>
      `;

      li.addEventListener('click', () => {
        item.action();
        closePalette();
      });

      li.addEventListener('mouseenter', () => {
        list.querySelectorAll('.cmd-item').forEach(el => el.classList.remove('selected'));
        li.classList.add('selected');
      });

      list.appendChild(li);
    });
  }

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    const filtered = commands.filter(c => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    renderItems(filtered);
  });

  input.addEventListener('keydown', (e) => {
    const items = list.querySelectorAll('.cmd-item');
    const currentIndex = Array.from(items).findIndex(el => el.classList.contains('selected'));

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (currentIndex + 1) % items.length;
      items.forEach(el => el.classList.remove('selected'));
      items[next]?.classList.add('selected');
      items[next]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (currentIndex - 1 + items.length) % items.length;
      items.forEach(el => el.classList.remove('selected'));
      items[prev]?.classList.add('selected');
      items[prev]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const sel = items[currentIndex];
      if (sel) sel.click();
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
  if (closeBtn) closeBtn.addEventListener('click', closePalette);

  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ================= PROJECT MODAL ================= */
const PROJECTS_DATA = {
  youtube: {
    title: 'YouTube Cinema Clone',
    tagline: 'Modern Video Streaming & Exploration Platform',
    category: 'React SPA / Media Engine',
    image: 'assets/images/project-youtube.jpg',
    liveUrl: 'https://youtube-clone-psi-henna.vercel.app/',
    githubUrl: 'https://github.com/cpn-singh',
    tags: ['ReactJS', 'Vite', 'Tailwind CSS', 'React Router DOM', 'REST API', 'React Icons'],
    summary: 'A feature-rich YouTube web application providing smooth category browsing, dynamic video playback feeds, video search filtering, and responsive cinema view across desktop, tablet, and mobile devices.',
    highlights: [
      'Built with React functional components and hooks for stateful sidebar and category filtering.',
      'Tailwind CSS design system reproducing authentic YouTube dark/light cinematic aesthetics.',
      'Seamless multi-route navigation using React Router DOM with zero page reloads.',
      'Deployed on Vercel with automated continuous deployment and high-performance bundle delivery.'
    ]
  },
  resume: {
    title: 'Resumind - AI Resume Analyzer',
    tagline: 'Intelligent ATS Scoring & CV Evaluation System',
    category: 'AI Application / Career Tech',
    image: 'assets/images/project-resume.jpg',
    liveUrl: 'https://ai-resume-analyzer-two-chi.vercel.app/',
    githubUrl: 'https://github.com/cpn-singh',
    tags: ['ReactJS', 'Tailwind CSS', 'AI Parsing', 'ATS Scoring', 'JavaScript ES6+', 'Vercel'],
    summary: 'An AI-powered career tool engineered to parse resumes, benchmark candidates against target job descriptions, evaluate ATS compatibility scores, and deliver actionable suggestions for structural optimization.',
    highlights: [
      'Interactive drag-and-drop resume upload with instant client-side file inspection.',
      'Comprehensive scoring breakdown measuring keyword density, impact verbs, and typography.',
      'Real-time suggestions engine providing constructive improvements to bypass recruiters filters.',
      'Polished modern UI engineered with Tailwind CSS, animated score rings, and glassmorphism.'
    ]
  },
  task: {
    title: 'Task Management Dashboard',
    tagline: 'Dynamic Productivity & Workflow Command Center',
    category: 'Web App / Admin Dashboard',
    image: 'assets/images/project-task.jpg',
    liveUrl: 'https://user-task-management-dashboard.vercel.app/',
    githubUrl: 'https://github.com/cpn-singh/User-Task-Management-Dashboard',
    tags: ['ReactJS', 'JavaScript', 'CSS Modules', 'State Management', 'Responsive UI', 'Netlify'],
    summary: 'A clean, responsive administrative task management dashboard engineered for tracking project lifecycles, organizing tasks by priority, and streamlining daily productivity workflows.',
    highlights: [
      'Interactive task lifecycle management (Todo, In Progress, Completed) with visual indicators.',
      'Dynamic filtering, category tags, and priority badging for rapid task prioritization.',
      'Responsive multi-column grid layout adapting effortlessly across widescreen and mobile displays.',
      'Deployed on both Vercel and Netlify with robust Git version control workflows.'
    ]
  },
  plants: {
    title: 'Plantify - Botanic Portfolio & Store',
    tagline: 'Elegantly Designed Flora Exploration Experience',
    category: 'E-Commerce / Concept Design',
    image: 'assets/images/project-plants.jpg',
    liveUrl: 'https://plantsportfolio-website.vercel.app/',
    githubUrl: 'https://github.com/cpn-singh',
    tags: ['HTML5', 'Modern CSS', 'JavaScript', 'Micro-Animations', 'UI/UX Design'],
    summary: 'A visually captivating botanic e-commerce concept showcasing flora collections with organic typography, fluid hover transitions, product cards, and immersive natural aesthetics.',
    highlights: [
      'Handcrafted micro-interactions with smooth scroll transitions and floating plant elements.',
      'Clean modular CSS architecture featuring custom properties, flexbox, and modern CSS grid.',
      'Mobile-optimized interactive navigation drawer with accessible keyboard focus states.',
      'Refined visual color scheme emphasizing harmony, tranquility, and modern organic branding.'
    ]
  },
  fruits: {
    title: 'Fruits Landing Experience',
    tagline: 'Vibrant & Kinetic Product Presentation Page',
    category: 'Landing Page / Kinetic UI',
    image: 'assets/images/project-fruits.jpg',
    liveUrl: 'https://fruits-landing-practice-webpages.vercel.app/',
    githubUrl: 'https://github.com/cpn-singh',
    tags: ['HTML5', 'CSS3 Animations', 'JavaScript', 'Responsive Grid', 'Creative Dev'],
    summary: 'An energetic, vibrant promotional landing page showcasing fruit varieties with dynamic 3D-feel product presentations, bold gradients, and engaging hover animations.',
    highlights: [
      'Bold typographic rhythm and vibrant color blocking engineered for maximum visual impact.',
      'Interactive product showcases reacting to hover with scale transformations and glow.',
      '100% responsive fluid layout optimized for lightning-fast first contentful paint (FCP).',
      'Engineered with modern semantic HTML5 and clean vanilla JavaScript.'
    ]
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectDetailModal');
  const closeBtn = document.getElementById('closeProjectModal');
  if (!modal) return;

  function openProject(key) {
    const data = PROJECTS_DATA[key];
    if (!data) return;

    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectTagline').textContent = data.tagline;
    document.getElementById('modalProjectCategory').textContent = data.category;
    document.getElementById('modalProjectSummary').textContent = data.summary;

    const imgEl = document.getElementById('modalProjectImage');
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }

    const liveBtn = document.getElementById('modalLiveLink');
    if (liveBtn) liveBtn.href = data.liveUrl;

    const githubBtn = document.getElementById('modalGithubLink');
    if (githubBtn) githubBtn.href = data.githubUrl;

    const tagsContainer = document.getElementById('modalProjectTags');
    if (tagsContainer) {
      tagsContainer.innerHTML = data.tags.map(t => `<span class="tech-pill">${t}</span>`).join('');
    }

    const highlightsContainer = document.getElementById('modalProjectHighlights');
    if (highlightsContainer) {
      highlightsContainer.innerHTML = data.highlights.map(h => `<li><i class="fas fa-check-circle"></i><span>${h}</span></li>`).join('');
    }

    modal.classList.add('active');
    if (window.soundEngine) window.soundEngine.playSuccess();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  document.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.openProject;
      openProject(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ================= CONTACT ACTIONS & CLIPBOARD ================= */
function initContactActions() {
  document.querySelectorAll('[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.dataset.copyText;
      const label = btn.dataset.copyLabel || 'Copied to clipboard!';
      copyToClipboard(text, label);
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Generate mailto link as direct fallback
      const mailtoUrl = `mailto:cpnsingh2001@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;
      window.open(mailtoUrl, '_blank');

      showToast('Dispatch initiated! Opening your mail client...', 'success');
      contactForm.reset();

      if (window.soundEngine) window.soundEngine.playSuccess();
    });
  }
}

function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || 'Copied to clipboard!', 'success');
    if (window.soundEngine) window.soundEngine.playSuccess();
  }).catch(() => {
    // Fallback
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(successMsg || 'Copied to clipboard!', 'success');
  });
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toastHud');
  if (!toast) return;

  const icon = toast.querySelector('.toast-icon');
  const text = toast.querySelector('.toast-text');

  if (icon) {
    icon.className = type === 'success' ? 'fas fa-check-circle toast-icon text-emerald' : 'fas fa-exclamation-circle toast-icon text-amber';
  }
  if (text) text.textContent = message;

  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

/* ================= SKILLS FILTER ================= */
function initSkillsFilter() {
  const buttons = document.querySelectorAll('.skills-filter-btn');
  const cards = document.querySelectorAll('.skill-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.classList.add('skill-fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('skill-fade-in');
        }
      });

      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
}

/* ================= AUDIO TOGGLE ================= */
function initAudioToggle() {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (!audioBtn) return;

  function updateVisual(enabled) {
    const bars = audioBtn.querySelectorAll('.sound-bar');
    const label = audioBtn.querySelector('.audio-label');
    if (enabled) {
      audioBtn.classList.add('is-playing');
      bars.forEach(b => b.classList.add('animating'));
      if (label) label.textContent = 'SOUND ON';
    } else {
      audioBtn.classList.remove('is-playing');
      bars.forEach(b => b.classList.remove('animating'));
      if (label) label.textContent = 'SOUND OFF';
    }
  }

  // Initial state check
  if (window.soundEngine) {
    updateVisual(window.soundEngine.enabled);
  }

  audioBtn.addEventListener('click', () => {
    if (window.soundEngine) {
      const state = window.soundEngine.toggle();
      updateVisual(state);
      showToast(state ? 'Sound design enabled' : 'Sound muted');
    }
  });
}

function toggleSound() {
  if (window.soundEngine) {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) audioBtn.click();
  }
}

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !menu) return;

  function toggleMenu() {
    const isOpen = menu.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    menu.classList.add('active');
    if (overlay) overlay.classList.add('active');
    toggle.classList.add('active');
    document.body.classList.add('mobile-locked');
    if (window.soundEngine) window.soundEngine.playSwitch();
  }

  function closeMenu() {
    menu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    toggle.classList.remove('active');
    document.body.classList.remove('mobile-locked');
  }

  toggle.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  links.forEach(l => {
    l.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* ================= AMBIENT MODE ================= */
function initAmbientMode() {
  const ambientBtn = document.getElementById('ambientModeBtn');
  if (ambientBtn) {
    ambientBtn.addEventListener('click', toggleAmbientMode);
  }

  window.addEventListener('keydown', (e) => {
    // Only toggle with 'H' if not typing in an input
    if (e.key.toLowerCase() === 'h' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      toggleAmbientMode();
    }
  });
}

function toggleAmbientMode() {
  document.body.classList.toggle('ambient-cinema-mode');
  const isAmbient = document.body.classList.contains('ambient-cinema-mode');
  showToast(isAmbient ? 'Cinematic Mode Activated (Press H to exit)' : 'Exited Cinematic Mode');
  if (window.soundEngine) window.soundEngine.playSwitch();
}
