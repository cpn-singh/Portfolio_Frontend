/**
 * Ambient Neural Particle Network
 * Fluid background canvas connecting nodes with reactive mouse physics.
 */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.numParticles = window.innerWidth < 768 ? 40 : 80;
    this.maxDistance = window.innerWidth < 768 ? 90 : 130;
    this.animationFrame = null;
    this.isPaused = false;

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        baseColor: Math.random() > 0.4 ? 'rgba(56, 189, 248,' : 'rgba(129, 140, 248,',
        alpha: Math.random() * 0.4 + 0.2
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.numParticles = window.innerWidth < 768 ? 40 : 80;
      this.maxDistance = window.innerWidth < 768 ? 90 : 130;
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Ripple wave on click
    window.addEventListener('click', (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      this.particles.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          const force = (220 - dist) / 220;
          p.vx += (dx / dist) * force * 5;
          p.vy += (dy / dist) * force * 5;
        }
      });
    });

    // Visibility optimization
    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden;
      if (!this.isPaused) this.animate();
    });
  }

  animate() {
    if (this.isPaused) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Natural movement
      p.x += p.vx;
      p.y += p.vy;

      // Friction to return to calm speed
      p.vx *= 0.98;
      p.vy *= 0.98;
      if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.1;
      if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.1;

      // Bounce at screen borders
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Mouse repulsion/interaction
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 2.2;
          p.y += Math.sin(angle) * force * 2.2;
        }
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.baseColor}${p.alpha})`;
      this.ctx.fill();

      // Connect lines to nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < this.maxDistance) {
          const lineAlpha = (1 - dist / this.maxDistance) * 0.18;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(125, 211, 252, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.particleNetwork = new ParticleNetwork('particleCanvas');
});
