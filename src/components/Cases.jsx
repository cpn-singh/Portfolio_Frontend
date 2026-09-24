import React, { useState } from 'react';
import StarIcon from './StarIcon';
import LiveReelPreview from './LiveReelPreview';
import LiveProjectModal from './LiveProjectModal';

// Imported PNG preview assets
import ulearnezImg from '../../assets/images/live-preview-ulearnez.png';
import youtubeImg from '../../assets/images/live-preview-youtube.png';
import taskImg from '../../assets/images/live-preview-task.png';
import plantsImg from '../../assets/images/live-preview-plants.png';
import fruitsImg from '../../assets/images/live-preview-fruits.png';
import ultronImg from '../../assets/images/live-preview-ultron.png';

export default function Cases() {
  const [selectedCaseModal, setSelectedCaseModal] = useState(null);

  const projects = [
    {
      id: 'ulearnez',
      number: '01',
      title: 'U-Learnez',
      category: 'EDTECH PLATFORM, UX/UI, REACT & NEXT.JS',
      desc: 'An interactive online learning and skill-building web application featuring dynamic course catalogs, structured video lectures, and student analytics dashboards.',
      tags: ['Next.js', 'ReactJS', 'Tailwind CSS', 'Vercel', 'UI/UX'],
      image: ulearnezImg,
      liveUrl: 'https://u-learnez.vercel.app/',
      githubUrl: 'https://github.com/cpn-singh',
      layout: 'left-text' // Col 1: Text, Col 2: Live Reel
    },
    {
      id: 'youtube',
      number: '02',
      title: 'YouTube Cinema',
      category: 'UX/UI DESIGN, DEVELOPMENT',
      desc: 'A bespoke streaming web application featuring responsive sidebar navigation, category feeds, and dynamic cinema mode.',
      tags: ['ReactJS', 'Vite', 'Tailwind CSS', 'REST API'],
      image: youtubeImg,
      liveUrl: 'https://youtube-clone-psi-henna.vercel.app/',
      githubUrl: 'https://github.com/cpn-singh/Youtube-landing-page',
      layout: 'left-image' // Col 1: Live Reel, Col 2: Text
    },
    {
      id: 'task',
      number: '03',
      title: 'Task/User Management',
      category: 'STATE ARCHITECTURE, KANBAN UI',
      desc: 'A sleek productivity command center with kanban-inspired task lifecycle management, status indicators, and responsive multi-column layouts.',
      tags: ['ReactJS', 'JavaScript', 'CSS Modules', 'State Architecture'],
      image: taskImg,
      liveUrl: 'https://user-task-management-dashboard.vercel.app/',
      githubUrl: 'https://github.com/cpn-singh/User-Task-Management-Dashboard',
      layout: 'left-text' // Col 1: Text, Col 2: Live Reel
    },
    {
      id: 'plants',
      number: '04',
      title: 'Plantify Store',
      category: 'BRANDING, UI DESIGN, DEVELOPMENT',
      desc: 'A botanic-themed modern responsive web platform designed with organic typography, fluid micro-interactions, and earthy minimalism.',
      tags: ['HTML5', 'Modern CSS', 'JavaScript', 'Micro-Animations'],
      image: plantsImg,
      liveUrl: 'https://plantsportfolio-website.vercel.app/',
      githubUrl: 'https://github.com/cpn-singh/Plants-Portfolio-Website',
      layout: 'left-image' // Col 1: Live Reel, Col 2: Text
    },
    {
      id: 'fruits',
      number: '05',
      title: 'Fruits Landing',
      category: 'INTERACTION DESIGN, DEVELOPMENT',
      desc: 'High-energy kinetic promotional landing page blending bold color rhythm, 3D card perspectives, and fluid cross-device responsiveness.',
      tags: ['HTML5', 'CSS3 Animations', 'JavaScript', 'Kinetic UI'],
      image: fruitsImg,
      liveUrl: 'https://fruits-landing-practice-webpages.vercel.app/',
      githubUrl: 'https://github.com/cpn-singh/fruits-landing-practice-webpages',
      layout: 'left-text' // Col 1: Text, Col 2: Live Reel
    },
    {
      id: 'ultron',
      number: '06',
      title: 'ULTRON AI Living Brain',
      category: 'AI, UX/UI DESIGN, DEVELOPMENT',
      desc: 'An immersive AI-inspired web experience featuring a futuristic digital brain interface, interactive visual elements, and a cinematic user experience designed around intelligent technology.',
      tags: ['ReactJS', 'Vite', 'Tailwind CSS', 'JavaScript'],
      image: ultronImg,
      liveUrl: 'https://ultron-living-ai-brain.vercel.app/',
      githubUrl: '#',
      layout: 'left-image'
    }
  ];

  return (
    <>
      {/* Section header */}
      <section className="section-title pd-cases-title-bar">
        <div className="main-wrapper">
          <div className="text cases-title-group">
            <div className="scaling-svg">
              <StarIcon size={52} />
            </div>
            <div className="info item-fade">
              <p className="h2--uppercase cases-title-text">
                <span>All cases</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects list */}
      <section id="cases" className="pd-cases-section">
        <div className="main-wrapper">
          <div className="pd-grid-large">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className={`pd-case-pair-row layout-${proj.layout}`}
              >
                {/* Project details */}
                <div className="case-text-block">
                  <div className="case-text-wrapper">
                    <span className="case-index-num">{proj.number}</span>
                    <h3 className="heading--uppercase--inline case-item-title">
                      <span className="line">{proj.title}</span>
                    </h3>
                    <p className="uppercase case-item-category">
                      {proj.category}
                    </p>
                    <p className="case-item-desc">{proj.desc}</p>
                    <div className="case-item-actions">
                      <button
                        type="button"
                        className="case-action-link"
                        onClick={() => setSelectedCaseModal(proj)}
                      >
                        <span>live preview</span>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.875 13.357V3.643L1.518 17 0 15.482 13.357 2.125H3.643V0H17v13.357z" fill="#FFF" />
                        </svg>
                      </button>

                      {proj.githubUrl && proj.githubUrl !== '#' && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="case-action-link secondary"
                        >
                          <span>source code</span>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.875 13.357V3.643L1.518 17 0 15.482 13.357 2.125H3.643V0H17v13.357z" fill="#FFF" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Media preview */}
                <div className="case-media-block">
                  <div className="case-media-inner">
                    <LiveReelPreview
                      project={proj}
                      onOpenModal={(p) => setSelectedCaseModal(p)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project preview modal */}
      {selectedCaseModal && (
        <LiveProjectModal
          project={selectedCaseModal}
          onClose={() => setSelectedCaseModal(null)}
        />
      )}
    </>
  );
}
