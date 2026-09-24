/**
 * Live Video Transition & Ambient Video Controller
 * Manages smooth crossfade transitions between live video loops on scroll,
 * handles project live preview reels, and optimizes video playback.
 */

class VideoTransitionController {
  constructor() {
    this.videoLayers = {};
    this.activeSection = null;
    this.isVideoMuted = true;
    this.isPlaying = true;
    this.isLowPower = false;

    this.initVideoElements();
    this.setupScrollObserver();
    this.setupProjectVideoHover();
    this.setupControls();
  }

  initVideoElements() {
    // Map section IDs to their corresponding video elements
    const videoMappings = [
      { id: 'home', elId: 'bgVideoHero' },
      { id: 'about', elId: 'bgVideoAbout' },
      { id: 'projects', elId: 'bgVideoProjects' },
      { id: 'skills', elId: 'bgVideoSkills' },
      { id: 'experience', elId: 'bgVideoExperience' },
      { id: 'contact', elId: 'bgVideoContact' }
    ];

    videoMappings.forEach((map) => {
      const el = document.getElementById(map.elId);
      if (el) {
        el.muted = true;
        el.playsInline = true;
        el.loop = true;
        this.videoLayers[map.id] = el;
      }
    });

    // Start with hero video active
    this.transitionTo('home');
  }

  setupScrollObserver() {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0.1, 0.4, 0.7]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const sectionId = entry.target.id;
          if (sectionId !== this.activeSection) {
            this.transitionTo(sectionId);
            this.updateActiveNav(sectionId);
          }
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
  }

  transitionTo(sectionId) {
    if (!this.videoLayers[sectionId] && !this.videoLayers['home']) return;
    this.activeSection = sectionId;

    // Cross-fade opacity between background videos
    Object.keys(this.videoLayers).forEach((id) => {
      const vid = this.videoLayers[id];
      if (!vid) return;

      if (id === sectionId) {
        vid.classList.add('video-active');
        vid.style.opacity = '1';
        vid.style.zIndex = '2';
        // Play active video
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay restricted fallback
          });
        }
      } else {
        vid.classList.remove('video-active');
        vid.style.opacity = '0';
        vid.style.zIndex = '1';
        // Delay pause slightly to allow smooth 1.2s crossfade
        setTimeout(() => {
          if (this.activeSection !== id && !vid.classList.contains('video-active')) {
            vid.pause();
          }
        }, 1200);
      }
    });

    // Notify sound engine on section switch
    if (window.soundEngine) {
      window.soundEngine.playSwitch();
    }
  }

  updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-link, .nav-dot').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const hudBadge = document.getElementById('currentSectionHud');
    if (hudBadge) {
      const sectionNames = {
        home: '01 / HERO',
        about: '02 / ABOUT',
        projects: '03 / WORKS',
        skills: '04 / ARSENAL',
        experience: '05 / JOURNEY',
        contact: '06 / DISPATCH'
      };
      hudBadge.textContent = sectionNames[sectionId] || sectionId.toUpperCase();
    }
  }

  setupProjectVideoHover() {
    // Project cards preview video interaction
    document.querySelectorAll('.project-card').forEach((card) => {
      const video = card.querySelector('video');
      if (!video) return;

      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      card.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        const p = video.play();
        if (p) p.catch(() => {});
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    });
  }

  setupControls() {
    // Ambient video pause/play toggle
    const videoToggleBtn = document.getElementById('videoToggleBtn');
    if (videoToggleBtn) {
      videoToggleBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        Object.values(this.videoLayers).forEach((v) => {
          if (this.isPlaying) {
            if (v.classList.contains('video-active')) v.play();
          } else {
            v.pause();
          }
        });

        const icon = videoToggleBtn.querySelector('i');
        if (icon) {
          icon.className = this.isPlaying ? 'fas fa-video' : 'fas fa-video-slash';
        }
        videoToggleBtn.setAttribute('title', this.isPlaying ? 'Pause Background Video' : 'Play Background Video');
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.videoController = new VideoTransitionController();
});
