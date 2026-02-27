// src/components/ui/ExperienceDetail.tsx
import React from 'react';
import { useStore } from '../../store';
import { renderDescription } from '../../utils/textUtils';

const ExperienceDetail: React.FC = () => {
  const setSelectedExperience = useStore((state) => state.setSelectedExperience);
  const selectedExperience = useStore((state) => state.selectedExperience);

  const onClose = () => {
    setSelectedExperience(null);
  };

  // Only show the detail panel when a planet is selected
  if (!selectedExperience || selectedExperience.type !== 'planet') {
    return null;
  }

  const { data } = selectedExperience;

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      bottom: '10px', // Allow the panel to expand vertically
      background: 'rgba(0,0,0,0.85)',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      maxWidth: '350px',
      width: 'calc(100% - 20px)', // Mobile responsiveness
      zIndex: 100,
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ 
        overflowY: 'auto', 
        paddingRight: '10px',
        flex: 1,
        // Custom scrollbar styling
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.2) transparent'
      }}>
        <button onClick={onClose} style={{
          position: 'sticky',
          top: 0,
          float: 'right',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          color: 'white',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.2em',
          zIndex: 1,
        }}>
          &times;
        </button>

        <h2 style={{ marginTop: 0, color: '#6495ed', paddingRight: '40px' }}>{data.name}</h2>
        
        <div style={{ marginBottom: '15px', fontSize: '0.9em', opacity: 0.7 }}>
          {'startDate' in data && (
            <span>{data.startDate} - {data.endDate}</span>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Description</strong>
          <div style={{ margin: '5px 0', lineHeight: '1.5', opacity: 0.9 }}>
            {renderDescription(data.description)}
          </div>
        </div>

        {data.technologies && data.technologies.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <strong>Technologies</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {data.technologies.map(tech => (
                <span key={tech} style={{
                  background: 'rgba(100, 149, 237, 0.2)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.85em',
                  border: '1px solid rgba(100, 149, 237, 0.3)'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {'satellites' in data && data.satellites && data.satellites.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {data.satellites.map(sat => (
              <div 
                key={sat.name}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '0.95em', marginBottom: '4px' }}>{sat.name}</div>
                {sat.description && (
                  <div style={{ fontSize: '0.85em', opacity: 0.7, lineHeight: '1.4' }}>
                    {renderDescription(sat.description)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceDetail;
