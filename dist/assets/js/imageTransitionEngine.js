/**
 * Live Image Transition & Dynamic Background Stage Engine
 * Controls full-bleed live image/video transitions, mouse parallax depth,
 * interactive project image morphing, and backdrop crossfading.
 */

class ImageTransitionEngine {
  constructor() {
    this.stage = document.getElementById('ambientBackdropStage');
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.activeBackdropId = 'bg-hero';
    this.activeProjectIndex = 0;
    this.isTransitioning = false;

    this.projectsData = [
      {
        id: 'youtube',
        title: 'YouTube Cinema Clone',
        subtitle: 'ReactJS • Vite • Tailwind • REST API',
        bgImage: 'assets/images/bg-youtube.jpg',
        stageImage: 'assets/images/project-youtube.jpg',
        video: 'assets/videos/tech-matrix.mp4',
        liveUrl: 'https://youtube-clone-psi-henna.vercel.app/',
        githubUrl: 'https://github.com/cpn-singh',
        color: '#ef4444'
      },
      {
        id: 'resume',
        title: 'Resumind - AI Resume Analyzer',
        subtitle: 'ReactJS • AI Engine • ATS Scoring',
        bgImage: 'assets/images/bg-ai.jpg',
        stageImage: 'assets/images/project-resume.jpg',
        video: 'assets/videos/particle-nebula.mp4',
        liveUrl: 'https://ai-resume-analyzer-two-chi.vercel.app/',
        githubUrl: 'https://github.com/cpn-singh',
        color: '#c084fc'
      },
      {
        id: 'task',
        title: 'Task Management Dashboard',
        subtitle: 'ReactJS • State Architecture • Kanban',
        bgImage: 'assets/images/bg-tech.jpg',
        stageImage: 'assets/images/project-task.jpg',
        video: 'assets/videos/hero-ambient.mp4',
        liveUrl: 'https://user-task-management-dashboard.vercel.app/',
        githubUrl: 'https://github.com/cpn-singh/User-Task-Management-Dashboard',
        color: '#38bdf8'
      },
      {
        id: 'plants',
        title: 'Plantify - Botanic Portfolio',
        subtitle: 'HTML5 • Modern CSS • Fluid UI',
        bgImage: 'assets/images/bg-botanic.jpg',
        stageImage: 'assets/images/project-plants.jpg',
        video: 'assets/videos/cyber-flow.mp4',
        liveUrl: 'https://plantsportfolio-website.vercel.app/',
        githubUrl: 'https://github.com/cpn-singh',
        color: '#34d399'
      },
      {
        id: 'fruits',
        title: 'Fruits Landing Experience',
        subtitle: 'HTML5 • CSS3 Keyframes • Kinetic UI',
        bgImage: 'assets/images/bg-fruits.jpg',
        stageImage: 'assets/images/project-fruits.jpg',
        video: 'assets/videos/tech-matrix.mp4',
        liveUrl: 'https://fruits-landing-practice-webpages.vercel.app/',
        githubUrl: 'https://github.com/cpn-singh',
        color: '#f59e0b'
      }
    ];

    this.init();
  }

  init() {
    this.initBackdropParallax();
    this.initProjectStage();
    this.bindHoverBackdrops();
    this.bindSectionBackdrops();
  }

  /* --- 3D Mouse Parallax on Background Stage --- */
  initBackdropParallax() {
    window.addEventListener('mousemove', (e) => {
      // Normalize -1 to 1
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const updateParallax = () => {
      const ease = 0.08;
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * ease;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * ease;

      if (this.stage) {
        const moveX = this.mouse.x * 24;
        const moveY = this.mouse.y * 24;
        this.stage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.06)`;
      }

      requestAnimationFrame(updateParallax);
    };

    updateParallax();

    // Pulse background slightly on click
    window.addEventListener('click', () => {
      if (this.stage) {
        this.stage.classList.add('backdrop-pulse');
        setTimeout(() => this.stage.classList.remove('backdrop-pulse'), 400);
      }
    });
  }

  /* --- Smooth Background Crossfader --- */
  setBackdrop(layerId) {
    if (this.activeBackdropId === layerId) return;
    this.activeBackdropId = layerId;

    document.querySelectorAll('.backdrop-layer').forEach((layer) => {
      if (layer.id === layerId) {
        layer.classList.add('active');
        if (layer.tagName === 'VIDEO') {
          const p = layer.play();
          if (p) p.catch(() => {});
        }
      } else {
        layer.classList.remove('active');
        if (layer.tagName === 'VIDEO') {
          setTimeout(() => {
            if (!layer.classList.contains('active')) layer.pause();
          }, 800);
        }
      }
    });

    // Update HUD indicator
    const hudBadge = document.getElementById('currentBackdropLabel');
    if (hudBadge) {
      hudBadge.textContent = layerId.replace('bg-', '').toUpperCase();
    }
  }

  /* --- Section Scroll Backdrop Observer --- */
  bindSectionBackdrops() {
    const sectionMap = {
      home: 'bg-hero',
      about: 'bg-about',
      projects: 'bg-project-youtube',
      skills: 'bg-skills',
      experience: 'bg-experience',
      contact: 'bg-contact'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          const secId = entry.target.id;
          const bgId = sectionMap[secId] || 'bg-hero';
          this.setBackdrop(bgId);
        }
      });
    }, { threshold: [0.35, 0.6] });

    document.querySelectorAll('section[id]').forEach((sec) => observer.observe(sec));
  }

  /* --- Project Cards Hover & Click Backdrop Transitions --- */
  bindHoverBackdrops() {
    document.querySelectorAll('[data-project-backdrop]').forEach((el) => {
      const targetBg = el.dataset.projectBackdrop;

      el.addEventListener('mouseenter', () => {
        this.setBackdrop(targetBg);
        if (window.soundEngine) window.soundEngine.playCardHover();
      });

      el.addEventListener('click', () => {
        this.setBackdrop(targetBg);
      });
    });
  }

  /* --- Interactive Live Project Image Stage --- */
  initProjectStage() {
    const tabs = document.querySelectorAll('.stage-nav-tab');
    const stageImg = document.getElementById('stageMainImage');
    const stageTitle = document.getElementById('stageTitle');
    const stageSubtitle = document.getElementById('stageSubtitle');
    const stageLiveBtn = document.getElementById('stageLiveBtn');
    const stageGithubBtn = document.getElementById('stageGithubBtn');
    const stagePills = document.getElementById('stagePills');

    if (!stageImg) return;

    this.switchToProject = (idx) => {
      if (idx < 0 || idx >= this.projectsData.length) return;
      this.activeProjectIndex = idx;
      const data = this.projectsData[idx];

      // Update Tabs UI
      tabs.forEach((tab, i) => {
        if (i === idx) tab.classList.add('active');
        else tab.classList.remove('active');
      });

      // Animate Stage Image with Wipe & Scale Transition
      stageImg.classList.add('image-switching');

      setTimeout(() => {
        stageImg.src = data.stageImage;
        stageImg.alt = data.title;
        if (stageTitle) stageTitle.textContent = data.title;
        if (stageSubtitle) stageSubtitle.textContent = data.subtitle;
        if (stageLiveBtn) stageLiveBtn.href = data.liveUrl;
        if (stageGithubBtn) stageGithubBtn.href = data.githubUrl;

        // Also transition full backdrop to match project
        this.setBackdrop(`bg-project-${data.id}`);

        setTimeout(() => {
          stageImg.classList.remove('image-switching');
        }, 80);
      }, 250);

      if (window.soundEngine) window.soundEngine.playSwitch();
    };

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        this.switchToProject(idx);
      });

      tab.addEventListener('mouseenter', () => {
        if (window.soundEngine) window.soundEngine.playHover();
      });
    });

    // Arrow controls
    const prevBtn = document.getElementById('stagePrevBtn');
    const nextBtn = document.getElementById('stageNextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const nextIdx = (this.activeProjectIndex - 1 + this.projectsData.length) % this.projectsData.length;
        this.switchToProject(nextIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIdx = (this.activeProjectIndex + 1) % this.projectsData.length;
        this.switchToProject(nextIdx);
      });
    }

    // Scroll-driven sync: as user scrolls through the scrolly cards, sync active project
    document.querySelectorAll('.scrolly-card-item').forEach((card) => {
      const idx = parseInt(card.dataset.projectIndex, 10);
      card.addEventListener('mouseenter', () => {
        if (!isNaN(idx)) this.switchToProject(idx);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.imageTransitionEngine = new ImageTransitionEngine();
});
