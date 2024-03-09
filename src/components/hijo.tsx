import React from 'react';
import Mama, { MamaProps } from './mama';
import Papa, { PapaProps } from './papa';

interface HijoProps extends MamaProps, PapaProps {}

const Hijo: React.FC<HijoProps> = ({ x, y }) => {
  return (
    <div>
      <h2>Hijo</h2>
      <span>{x} + {y}</span>
      <Mama x={x} />
      <Papa y={y} />
    </div>
  );
}

export default Hijo;
