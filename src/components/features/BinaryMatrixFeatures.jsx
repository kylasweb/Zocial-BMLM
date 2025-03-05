import React from 'react';
import { useFeatureContext } from '../../contexts/FeatureContext';

function AutoBalancingSection() {
  return (
    <div className="feature-section">
      <h4>Auto Balancing</h4>
      {/* Auto balancing content */}
    </div>
  );
}

function SpilloverSection() {
  return (
    <div className="feature-section">
      <h4>Spillover System</h4>
      {/* Spillover content */}
    </div>
  );
}

function CompressionSection() {
  return (
    <div className="feature-section">
      <h4>Compression</h4>
      {/* Compression content */}
    </div>
  );
}

export function BinaryMatrixFeatures() {
  const { isFeatureEnabled } = useFeatureContext();

  if (!isFeatureEnabled('network.binaryMatrix')) return null;

  return (
    <div className="binary-matrix-features">
      <h3>Binary Matrix Features</h3>
      {isFeatureEnabled('network.binaryMatrix.autoBalancing') && <AutoBalancingSection />}
      {isFeatureEnabled('network.binaryMatrix.spillover') && <SpilloverSection />}
      {isFeatureEnabled('network.binaryMatrix.compression') && <CompressionSection />}
    </div>
  );
}