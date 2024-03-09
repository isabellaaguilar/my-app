import React from 'react';

export interface PapaProps {
  y: string;
}

const Papa: React.FC<PapaProps> = ({ y }) => {
  return (
    <div>
      <h2>Papa</h2>
      <p>ADN: {y}</p>
    </div>
  );
}

export default Papa;
