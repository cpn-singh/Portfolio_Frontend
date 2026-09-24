/**
 * Interactive Cursor, Mouse Reaction & Spark Engine
 * Provides custom magnetic cursor, dynamic state badges, particle trail,
 * and radial shockwave bursts on every click.
 */

class InteractiveCursor {
  constructor() {
    this.mouse = { x: -100, y: -100, targetX: -100, targetY: -100, vx: 0, vy: 0 };
    this.ring = { x: -100, y: -100 };
    this.isActive = false;
    this.isTouch = false;
    this.trailParticles = [];
    this.maxTrail = 20;

    this.initElements();
    this.initEventListeners();
    this.initTrailCanvas();
    this.animate();
  }

  initElements() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      this.isTouch = true;
    }

    this.dot = document.createElement('div');
    this.dot.className = 'custom-cursor-dot';

    this.ringEl = document.createElement('div');
    this.ringEl.className = 'custom-cursor-ring';
    this.ringLabel = document.createElement('span');
    this.ringLabel.className = 'custom-cursor-label';
    this.ringEl.appendChild(this.ringLabel);

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ringEl);
  }

  initTrailCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'cursor-trail-canvas';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initEventListeners() {
    window.addEventListener('mousemove', (e) => {
      const prevX = this.mouse.targetX;
      const prevY = this.mouse.targetY;
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.vx = e.clientX - prevX;
      this.mouse.vy = e.clientY - prevY;

      if (!this.isActive) {
        this.isActive = true;
        this.ring.x = e.clientX;
        this.ring.y = e.clientY;
        this.dot.style.opacity = '1';
        this.ringEl.style.opacity = '1';
      }

      const speed = Math.hypot(this.mouse.vx, this.mouse.vy);
      if (speed > 2.5 && this.trailParticles.length < this.maxTrail) {
        this.addTrailParticle(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseleave', () => {
      this.dot.style.opacity = '0';
      this.ringEl.style.opacity = '0';
    });

    window.addEventListener('mouseenter', () => {
      this.dot.style.opacity = '1';
      this.ringEl.style.opacity = '1';
    });

    // Responses on EVERY mouse click
    window.addEventListener('click', (e) => {
      this.triggerClickShockwave(e.clientX, e.clientY);
      this.triggerSparksBurst(e.clientX, e.clientY);
      if (window.soundEngine) {
        window.soundEngine.playClick();
      }
    });

    this.setupHoverListeners();
    this.setupTiltEffect();
  }

  setupHoverListeners() {
    const bindHover = () => {
      document.querySelectorAll('a, button, input, textarea, select, .interactive').forEach((el) => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = 'true';

        el.addEventListener('mouseenter', () => {
          this.ringEl.classList.add('cursor-hover');
          if (window.soundEngine) window.soundEngine.playHover();
        });
        el.addEventListener('mouseleave', () => {
          this.ringEl.classList.remove('cursor-hover');
          this.setLabel('');
        });
      });

      document.querySelectorAll('.project-card, [data-cursor="project"]').forEach((el) => {
        if (el.dataset.cursorProjBound) return;
        el.dataset.cursorProjBound = 'true';

        el.addEventListener('mouseenter', () => {
          this.ringEl.classList.add('cursor-card');
          this.setLabel('VIEW');
          if (window.soundEngine) window.soundEngine.playCardHover();
        });
        el.addEventListener('mouseleave', () => {
          this.ringEl.classList.remove('cursor-card');
          this.setLabel('');
        });
      });

      document.querySelectorAll('.video-preview-wrap, [data-cursor="video"]').forEach((el) => {
        if (el.dataset.cursorVidBound) return;
        el.dataset.cursorVidBound = 'true';

        el.addEventListener('mouseenter', () => {
          this.ringEl.classList.add('cursor-video');
          this.setLabel('PLAY');
        });
        el.addEventListener('mouseleave', () => {
          this.ringEl.classList.remove('cursor-video');
          this.setLabel('');
        });
      });

      document.querySelectorAll('[data-cursor="copy"]').forEach((el) => {
        if (el.dataset.cursorCopyBound) return;
        el.dataset.cursorCopyBound = 'true';

        el.addEventListener('mouseenter', () => {
          this.ringEl.classList.add('cursor-copy');
          this.setLabel('COPY');
        });
        el.addEventListener('mouseleave', () => {
          this.ringEl.classList.remove('cursor-copy');
          this.setLabel('');
        });
      });
    };

    bindHover();
    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  setLabel(text) {
    this.ringLabel.textContent = text;
  }

  setupTiltEffect() {
    const applyTilt = () => {
      document.querySelectorAll('.tilt-card, .project-card, .skill-card, .about-card').forEach((card) => {
        if (card.dataset.tiltBound) return;
        card.dataset.tiltBound = 'true';

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
          card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      });
    };

    applyTilt();
    const obs = new MutationObserver(applyTilt);
    obs.observe(document.body, { childList: true, subtree: true });
  }

  addTrailParticle(x, y) {
    this.trailParticles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2.8 + 1.8,
      alpha: 0.7,
      color: Math.random() > 0.4 ? '#38bdf8' : '#818cf8'
    });
  }

  triggerClickShockwave(x, y) {
    const wave = document.createElement('div');
    wave.className = 'cursor-shockwave';
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    document.body.appendChild(wave);

    setTimeout(() => {
      wave.remove();
    }, 600);
  }

  triggerSparksBurst(x, y) {
    const sparkCount = 20;
    const colors = ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#ffffff'];

    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 4.5 + 3.2;
      this.trailParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 2,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  animate() {
    const ease = 0.16;
    this.ring.x += (this.mouse.targetX - this.ring.x) * ease;
    this.ring.y += (this.mouse.targetY - this.ring.y) * ease;

    this.dot.style.transform = `translate3d(${this.mouse.targetX}px, ${this.mouse.targetY}px, 0)`;
    this.ringEl.style.transform = `translate3d(${this.ring.x}px, ${this.ring.y}px, 0)`;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.trailParticles.length - 1; i >= 0; i--) {
      const p = this.trailParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.024;
      p.size = Math.max(0, p.size - 0.05);

      if (p.alpha <= 0 || p.size <= 0) {
        this.trailParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.interactiveCursor = new InteractiveCursor();
});
