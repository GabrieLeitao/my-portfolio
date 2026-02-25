// src/components/ui/ExperienceDetail.tsx
import React from 'react';
import { useStore } from '../../store';
import { shallow } from 'zustand/shallow';

const ExperienceDetail: React.FC = () => {
  // Get action creator directly for stable reference
  const setSelectedExperience = useStore((state) => state.setSelectedExperience);

  // Select state individually
  const selectedExperience = useStore((state) => state.selectedExperience);

  const onClose = () => {
    setSelectedExperience(null);
    // Potentially reset camera state here as well in the future
  };

  if (!selectedExperience) {
    return null;
  }

  const { type, data } = selectedExperience;

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '300px',
      zIndex: 100,
    }}>
      <button onClick={onClose} style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.2em',
        cursor: 'pointer',
      }}>
        &times;
      </button>
      <h2>{data.name}</h2>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Technologies:</strong> {data.technologies.join(', ')}</p>
      {'startDate' in data && 'endDate' in data && <p><strong>Dates:</strong> {data.startDate} - {data.endDate}</p>}
      {'position' in data && <p><strong>Position:</strong> {(data as any).position}</p>}
    </div>
  );
};

export default ExperienceDetail;


