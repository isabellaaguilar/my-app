import React from 'react';

export interface MamaProps {
  x: string;
}

const Mama: React.FC<MamaProps> = ({ x }) => {
  return (
    <div>
      <h2>Mama</h2>
      <p>ADN: {x}</p>
    </div>
  );
}

export default Mama;
