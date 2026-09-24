/**
 * Scrollytelling, Smooth Scroll Transitions & Visual Morphing Engine
 * Controls scroll progress bar, section reveals, pinned project transitions,
 * and live image/video swapping on scroll.
 */

class ScrollytellingEngine {
  constructor() {
    this.progressBar = document.getElementById('scrollProgressBar');
    this.progressText = document.getElementById('scrollPercentHud');
    this.projectMediaSlides = [];
    this.projectCards = [];
    this.countersTriggered = false;

    this.init();
    this.bindScrollEvents();
    this.initProjectScrollytelling();
    this.initStatCounters();
    this.initScrollReveals();
  }

  init() {
    this.projectMediaSlides = document.querySelectorAll('.scrolly-media-slide');
    this.projectCards = document.querySelectorAll('.scrolly-card-item');
  }

  bindScrollEvents() {
    window.addEventListener('scroll', () => {
      this.updateScrollProgress();
      this.handleProjectScrollMorph();
    }, { passive: true });

    // Initial check
    this.updateScrollProgress();
  }

  updateScrollProgress() {
    const docElem = document.documentElement;
    const docBody = document.body;
    const scrollTop = docElem.scrollTop || docBody.scrollTop;
    const scrollHeight = (docElem.scrollHeight || docBody.scrollHeight) - docElem.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (this.progressBar) {
      this.progressBar.style.width = `${progress}%`;
    }
    if (this.progressText) {
      this.progressText.textContent = `${Math.min(100, Math.round(progress))}%`;
    }
  }

  initProjectScrollytelling() {
    if (!this.projectCards.length || !this.projectMediaSlides.length) return;

    // Observe each project card item as it scrolls through the center of screen
    const options = {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0.2
    };

    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.projectIndex, 10);
          if (!isNaN(index)) {
            this.switchProjectMedia(index);
          }
        }
      });
    }, options);

    this.projectCards.forEach((card) => projectObserver.observe(card));
  }

  switchProjectMedia(index) {
    this.projectMediaSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1) translateZ(0)';
      } else {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.96) translateZ(0)';
      }
    });

    this.projectCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('card-in-focus');
      } else {
        card.classList.remove('card-in-focus');
      }
    });
  }

  handleProjectScrollMorph() {
    // Parallax shift for floating elements
    const scrollY = window.scrollY;
    document.querySelectorAll('[data-parallax-speed]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.1;
      el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  }

  initStatCounters() {
    const statsSection = document.getElementById('about');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.countersTriggered) {
          this.countersTriggered = true;
          this.runCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  runCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach((counter) => {
      const target = parseFloat(counter.dataset.target);
      const prefix = counter.dataset.prefix || '';
      const suffix = counter.dataset.suffix || '';
      const duration = 1600;
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        counter.textContent = `${prefix}${current}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(update);
    });
  }

  initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el) => observer.observe(el));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollytellingEngine = new ScrollytellingEngine();
});
