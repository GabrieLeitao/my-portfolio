// src/components/ui/About.tsx
import React from 'react';
import { useStore } from '../../store';
import { experiences, personalInfo, skills } from '../../data/experiences';

const About: React.FC = () => {
  const aboutOpen = useStore((state) => state.aboutOpen);
  const setAboutOpen = useStore((state) => state.setAboutOpen);

  if (!aboutOpen) return null;

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
      padding: '40px 20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>
        <button 
          onClick={() => setAboutOpen(false)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>

        <header style={{ marginBottom: '40px', borderBottom: '2px solid #444', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#ffd700' }}>{personalInfo.name}</h1>
          <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '20px' }}>{personalInfo.title}</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.7 }}>
            <span>📧 {personalInfo.email}</span>
            <span>📱 {personalInfo.phone}</span>
            <span>📍 {personalInfo.location}</span>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>LinkedIn</a>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '40px' }}>
          <div>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#ff8c00', marginBottom: '20px' }}>Experience</h2>
              {experiences.filter(exp => exp.type === 'job').map(job => (
                <div key={job.id} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{job.position} @ {job.name}</h3>
                    <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>{job.startDate} - {job.endDate}</span>
                  </div>
                  <p style={{ margin: '10px 0', fontSize: '0.95rem', lineHeight: '1.5' }}>{job.description}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {job.technologies.map(tech => (
                      <span key={tech} style={{ fontSize: '0.75rem', background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.3)', padding: '2px 8px', borderRadius: '12px' }}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#98fb98', marginBottom: '20px' }}>Projects</h2>
              {experiences.filter(exp => exp.type === 'project').map(project => (
                <div key={project.id} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{project.name}</h3>
                    <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>{project.startDate} - {project.endDate}</span>
                  </div>
                  <p style={{ margin: '10px 0', fontSize: '0.95rem', lineHeight: '1.5' }}>{project.description}</p>
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
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>Languages</h2>
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
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>Spoken</h2>
              {personalInfo.languages.map(lang => (
                <div key={lang.name} style={{ marginBottom: '10px', fontSize: '0.95rem' }}>
                  <strong>{lang.name}</strong>: <span style={{ opacity: 0.7 }}>{lang.level}</span>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>Education</h2>
              {experiences.filter(exp => exp.type === 'education').map(edu => (
                <div key={edu.id} style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: '#6495ed' }}>{edu.name}</h3>
                  <p style={{ margin: '5px 0', fontSize: '0.85rem', opacity: 0.7 }}>{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>Certificates</h2>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
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

