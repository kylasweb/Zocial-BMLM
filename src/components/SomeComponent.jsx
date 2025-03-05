import React from 'react';
import { BinaryMatrixFeatures } from './features/BinaryMatrixFeatures';
import { PoolSystem } from './features/PoolSystem';
import { CommissionSystem } from './features/CommissionSystem';

function SomeComponent() {
  return (
    <div className="some-component">
      <h2>Network Features</h2>
      <BinaryMatrixFeatures />
      <PoolSystem />
      <CommissionSystem />
    </div>
  );
}

export default SomeComponent;
