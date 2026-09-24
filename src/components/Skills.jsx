import React, { useState } from 'react';
import StarIcon from './StarIcon';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'ALL SKILLS' },
    { id: 'backend', label: 'PYTHON & BACKEND' },
    { id: 'database', label: 'POSTGRESQL & MYSQL' },
    { id: 'frontend', label: 'FRONTEND & REACT' },
    { id: 'styling', label: 'STYLING & KINETIC UI' }
  ];

  const skillGroups = [
    {
      id: 'backend',
      category: 'PYTHON & BACKEND ARCHITECTURE',
      tagline: 'Robust Server Logic, Clean APIs & Scalable Services',
      skills: [
        {
          name: 'Python 3',
          level: 'Core Language',
          highlight: true,
          desc: 'OOP architecture, data structures, scripting, clean Pythonic paradigms.',
          projects: ['Python Full Stack', 'API Gateways']
        },
        {
          name: 'Django',
          level: 'Framework',
          highlight: true,
          desc: 'MVT structure, robust ORM, middleware, session management, secure routing.',
          projects: ['Full Stack Web Apps', 'Admin Portals']
        },
        {
          name: 'Django REST Framework',
          level: 'API Engine',
          highlight: true,
          desc: 'Serializers, ViewSets, JWT authentication, pagination, API permission classes.',
          projects: ['RESTful Backends', 'Service Endpoints']
        },
        {
          name: 'RESTful API Architecture',
          level: 'Standard',
          highlight: false,
          desc: 'CRUD operations, HTTP verbs, status codes, JSON response formatting.',
          projects: ['YouTube Cinema', 'U-Learnez']
        }
      ]
    },
    {
      id: 'database',
      category: 'RELATIONAL DATABASES: POSTGRESQL & MYSQL',
      tagline: 'ACID Compliance, Schema Normalization & Query Tuning',
      skills: [
        {
          name: 'PostgreSQL',
          level: 'Advanced RDBMS',
          highlight: true,
          desc: 'Complex JOINs, constraints, transactional integrity, foreign key modeling, indexing.',
          projects: ['Full Stack Backends', 'Data Schemas']
        },
        {
          name: 'MySQL',
          level: 'Relational Database',
          highlight: true,
          desc: 'Relational table design, normalized schemas, SQL queries, transaction management.',
          projects: ['Relational Systems', 'User Data Stores']
        },
        {
          name: 'Django ORM & Migrations',
          level: 'Data Mapping',
          highlight: false,
          desc: 'Automated schema migrations, query optimization, prefetch_related, select_related.',
          projects: ['Backend Persistence', 'Data Models']
        },
        {
          name: 'Database Architecture',
          level: 'Design Pattern',
          highlight: false,
          desc: '1-to-many & many-to-many entity relationships, data validation, cascading rules.',
          projects: ['Task Management', 'LMS Database']
        }
      ]
    },
    {
      id: 'frontend',
      category: 'MODERN FRONTEND & REACT ECOSYSTEM',
      tagline: 'High-Performance 60fps Client-Side Architecture',
      skills: [
        {
          name: 'React.js (React 19)',
          level: 'Frontend Core',
          highlight: true,
          desc: 'Component lifecycle, hooks (useState, useEffect, useMemo), virtual DOM reconciliation.',
          projects: ['YouTube Cinema', 'Task Dashboard', 'ULTRON AI Brain', 'Portfolio']
        },
        {
          name: 'Next.js',
          level: 'Full Stack React',
          highlight: true,
          desc: 'App Router, SSR, SSG, dynamic route segments, optimized images, SEO metadata.',
          projects: ['U-Learnez Learning Hub']
        },
        {
          name: 'JavaScript (ES6+)',
          level: 'Language Core',
          highlight: true,
          desc: 'Promises, async/await, closures, array methods, DOM APIs, modular architecture.',
          projects: ['All Projects', 'Fruits Landing', 'Plantify Store']
        },
        {
          name: 'Vite & Build Tooling',
          level: 'Modern Bundler',
          highlight: false,
          desc: 'Lightning-fast HMR, Rollup bundling, environment configurations, micro-optimizations.',
          projects: ['YouTube Cinema', 'Portfolio V2', 'ULTRON AI']
        },
        {
          name: 'State Architecture',
          level: 'Data Flow',
          highlight: false,
          desc: 'Kanban state management, unidirectional data flow, context APIs, event buses.',
          projects: ['Task/User Dashboard', 'U-Learnez LMS']
        }
      ]
    },
    {
      id: 'styling',
      category: 'STYLING, KINETIC UI & DESIGN CRAFT',
      tagline: 'Editorial Brutalism, Responsive Systems & Fluid Micro-Interactions',
      skills: [
        {
          name: 'Tailwind CSS',
          level: 'Utility Engine',
          highlight: true,
          desc: 'Custom design tokens, JIT compiler, responsive modifiers, dark mode setups.',
          projects: ['U-Learnez', 'YouTube Cinema', 'ULTRON AI Brain']
        },
        {
          name: 'CSS3 Keyframes & 3D Transforms',
          level: 'Animation',
          highlight: true,
          desc: '3D card perspectives, hardware-accelerated transitions, kinetic motion design.',
          projects: ['Fruits Landing', 'Plantify Botanic Store']
        },
        {
          name: 'Responsive Systems & Flex/Grid',
          level: 'Layout',
          highlight: false,
          desc: 'Strict aspect-ratio enforcement (zero stretch), fluid clamp() typography, mobile-first design.',
          projects: ['All 6 Live Deployments']
        },
        {
          name: 'Smooth Motion & View Transitions',
          level: 'Motion Design',
          highlight: false,
          desc: 'Lenis inertial smooth scrolling, hardware-accelerated CSS keyframes, interactive view transitions.',
          projects: ['Award-Grade Portfolio']
        }
      ]
    }
  ];

  const filteredGroups = activeCategory === 'all'
    ? skillGroups
    : skillGroups.filter((g) => g.id === activeCategory);

  return (
    <>
      {/* Section header */}
      <section id="skills" className="section-title pd-skills-title-bar">
        <div className="main-wrapper">
          <div className="text cases-title-group">
            <div className="scaling-svg">
              <StarIcon size={52} />
            </div>
            <div className="info item-fade">
              <p className="h2--uppercase cases-title-text">
                <span>Technical Arsenal &amp; Skills</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="pd-skills-section">
        <div className="main-wrapper skills-main-wrapper">
          {/* Overview */}
          <div className="skills-editorial-col">
            <svg
              className="skills-bg-circle-svg"
              width="1056"
              height="1056"
              viewBox="0 0 1056 1056"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle stroke="#F8EEE4" cx="528" cy="528" r="527.5" fill="none" opacity=".25" />
            </svg>

            <h3 className="heading--uppercase--inline skills-split-heading">
              <span className="split"><span className="line">ENGINEERING</span></span>
              <span className="split"><span className="line">ROBUST STACKS</span></span>
              <span className="split">
                <span className="line">FROM CORE TO UI</span>
                <div className="symbol--right">&amp; backed by live projects</div>
              </span>
            </h3>

            {/* Counter */}
            <div className="skills-counter-badge">
              <div className="scaling-svg">
                <StarIcon size={52} />
              </div>
              <div className="skills-num-data">
                <span>1</span> <span>8</span>
              </div>
              <div className="skills-label-wrap">
                <span className="label-h3">skills</span>
                <span className="label-h6">in action</span>
              </div>
            </div>

            <p className="skills-editorial-summary">
              Every skill in my toolkit is grounded in production code across my live web applications: from architecting Python, Django, PostgreSQL, and MySQL backends to crafting 60fps responsive interfaces with React.js, Next.js, and Tailwind CSS.
            </p>

            {/* Filter tabs */}
            <div className="skills-filter-nav">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`skills-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skills cards */}
          <div className="skills-display-col">
            <div className="skills-groups-stack">
              {filteredGroups.map((group) => (
                <div key={group.id} className="skill-group-card">
                  <div className="group-card-header">
                    <div className="group-title-wrap">
                      <span className="group-category-pill">{group.category}</span>
                      <h4 className="group-tagline">{group.tagline}</h4>
                    </div>
                  </div>

                  <div className="group-skills-grid">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`skill-item-card ${skill.highlight ? 'is-highlight' : ''}`}
                      >
                        <div className="skill-item-header">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level-tag">{skill.level}</span>
                        </div>
                        <p className="skill-desc">{skill.desc}</p>
                        <div className="skill-projects-applied">
                          <span className="applied-label">Applied in:</span>
                          <div className="applied-pills">
                            {skill.projects.map((p, pIdx) => (
                              <span key={pIdx} className="applied-pill">{p}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech marquee */}
        <div className="skills-running-marquee" aria-hidden="true">
          <div className="skills-marquee-track">
            <div className="skills-marquee-inner">
              <span>PYTHON 3 • DJANGO • DJANGO REST FRAMEWORK • POSTGRESQL • MYSQL • REACT.JS • NEXT.JS • TAILWIND CSS • JAVASCRIPT ES6+ • VITE • RESTFUL APIS • STATE ARCHITECTURE • KINETIC CSS3 • GIT &amp; GITHUB • VERCEL DEPLOYMENT • </span>
              <span>PYTHON 3 • DJANGO • DJANGO REST FRAMEWORK • POSTGRESQL • MYSQL • REACT.JS • NEXT.JS • TAILWIND CSS • JAVASCRIPT ES6+ • VITE • RESTFUL APIS • STATE ARCHITECTURE • KINETIC CSS3 • GIT &amp; GITHUB • VERCEL DEPLOYMENT • </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
