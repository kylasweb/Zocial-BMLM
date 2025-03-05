export default function NetworkVisualizer() {
  return (
    <div className="network-visualizer">
      <ForceGraph3D
        graphData={networkData}
        nodeColor={node => getNodeColor(node.rank)}
        nodeThreeObject={node => createNodeObject(node)}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
      <LiveMetrics />
      <NetworkControls />
    </div>
  )
}