// src/components/ui/About.tsx
import React from 'react';
import { useStore } from '../../store';
import { experiences, personalInfo, skills } from '../../data/experiences';
import { renderDescription } from '../../utils/textUtils';
import { parseDate } from '../../hooks/useDynamicOrbit';

const About: React.FC = () => {
  const aboutOpen = useStore((state) => state.aboutOpen);
  const setAboutOpen = useStore((state) => state.setAboutOpen);

  if (!aboutOpen) return null;

  // Prioritize 'Present' then sort by start date DESC
  const sortByRecency = (a: any, b: any) => {
    // Force LISAT to be at the top
    const LISAT_NAME = 'CDH Department Member @ LISAT Team';
    if (a.name === LISAT_NAME) return -1;
    if (b.name === LISAT_NAME) return 1;

    if (a.endDate === 'Present' && b.endDate !== 'Present') return -1;
    if (a.endDate !== 'Present' && b.endDate === 'Present') return 1;
    return parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime();
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      color: 'white',
      zIndex: 1000,
      padding: '20px',
      overflowY: 'auto',
      overflowX: 'hidden', // Prevent horizontal scroll
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box'
    }}>
      {/* Add responsive styles */}
      <style>{`
        .about-content {
          max-width: 900px;
          width: 100%;
          position: relative;
          padding-bottom: 40px;
          box-sizing: border-box;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .about-header h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>

      <div className="about-content">
        <button 
          onClick={() => setAboutOpen(false)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          &times;
        </button>

        <header className="about-header" style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', paddingTop: '10px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#ffd700' }}>{personalInfo.name}</h1>
          <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '20px' }}>{personalInfo.title}</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.7 }}>
            <span>📧 {personalInfo.email}</span>
            {personalInfo.phone && (<span>📱 {personalInfo.phone}</span>)}
            <span>📍 {personalInfo.location}</span>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: '#6495ed' }}>GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: '#6495ed' }}>LinkedIn</a>
          </div>
        </header>

        <div className="about-grid">
          <div>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#ff8c00', marginBottom: '20px', borderBottom: '1px solid rgba(255,140,0,0.2)', paddingBottom: '5px' }}>Experience</h2>
              {experiences
                .filter(exp => exp.type === 'job' || exp.type === 'general')
                .sort(sortByRecency)
                .map(job => (
                <div key={job.name} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '5px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                      {job.name}
                    </h3>
                    <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>{job.startDate} - {job.endDate}</span>
                  </div>
                  <div style={{ margin: '10px 0', fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                    {renderDescription(job.description, '#ff8c00')}
                  </div>
                  {job.technologies && job.technologies.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {job.technologies.map(tech => (
                        <span key={tech} style={{ fontSize: '0.75rem', background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.3)', padding: '2px 8px', borderRadius: '12px' }}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#98fb98', marginBottom: '20px', borderBottom: '1px solid rgba(152,251,152,0.2)', paddingBottom: '5px' }}>Projects</h2>
              {experiences
                .filter(exp => exp.type === 'project')
                .sort(sortByRecency)
                .map(project => (
                <div key={project.name} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '5px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{project.name}</h3>
                    <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>{project.startDate} - {project.endDate}</span>
                  </div>
                  <div style={{ margin: '10px 0', fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                    {renderDescription(project.description, '#98fb98')}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.technologies.map(tech => (
                      <span key={tech} style={{ fontSize: '0.75rem', background: 'rgba(152,251,152,0.1)', border: '1px solid rgba(152,251,152,0.3)', padding: '2px 8px', borderRadius: '12px' }}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          <aside>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>Languages</h2>
              {skills.programmingLanguages.map(lang => (
                <div key={lang.name} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                    <span>{lang.name}</span>
                    <span style={{ opacity: 0.6 }}>{lang.strength}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px' }}>
                    <div style={{ width: `${lang.strength}%`, height: '100%', background: '#ffd700', borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>Spoken</h2>
              {personalInfo.languages.map(lang => (
                <div key={lang.name} style={{ marginBottom: '10px', fontSize: '0.95rem' }}>
                  <strong>{lang.name}</strong>: <span style={{ opacity: 0.7 }}>{lang.level}</span>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>Education</h2>
              {experiences
                .filter(exp => exp.type === 'education')
                .sort(sortByRecency)
                .map(edu => (
                <div key={edu.name} style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: '#6495ed' }}>{edu.name}</h3>
                  <p style={{ margin: '5px 0', fontSize: '0.85rem', opacity: 0.7 }}>{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>Certificates</h2>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }}>
                {skills.otherQualifications.map(q => (
                  <li key={q} style={{ marginBottom: '8px' }}>{q}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default About;
