import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useNetwork } from '../../contexts/NetworkContext';
import { Tooltip } from '@material-ui/core';

export default function BinaryTree({ userId }) {
  const { network } = useNetwork();
  const chartRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [metrics, setMetrics] = useState({
    totalMembers: 0,
    leftLegCount: 0,
    rightLegCount: 0,
    extremeLeft: null,
    extremeRight: null,
    depth: 0
  });

  const calculateMetrics = (userId) => {
    const user = network.find(u => u.id === userId);
    if (!user) return metrics;

    let leftCount = 0, rightCount = 0, maxDepth = 0;
    
    const traverse = (node, level = 0, position = null) => {
      if (!node) return;
      
      maxDepth = Math.max(maxDepth, level);
      
      if (position === 'left') leftCount++;
      if (position === 'right') rightCount++;
      
      if (node.leftLeg) traverse(network.find(u => u.id === node.leftLeg), level + 1, 'left');
      if (node.rightLeg) traverse(network.find(u => u.id === node.rightLeg), level + 1, 'right');
    };

    traverse(user);

    return {
      totalMembers: leftCount + rightCount + 1,
      leftLegCount: leftCount,
      rightLegCount: rightCount,
      extremeLeft: user.extremeLeft,
      extremeRight: user.extremeRight,
      depth: maxDepth
    };
  };

  const formatNetworkData = (userId, level = 0) => {
    if (level >= 10) return null; // Max 10 levels
    
    const user = network.find(u => u.id === userId);
    if (!user) return null;

    const nodeData = {
      name: user.name,
      value: user.earnings,
      id: user.id,
      itemStyle: {
        color: getNodeColor(user),
        borderColor: getBorderColor(user)
      },
      label: {
        formatter: formatLabel(user)
      },
      tooltip: {
        formatter: formatTooltip(user)
      }
    };

    const children = [];
    
    if (user.leftLeg) {
      const leftChild = formatNetworkData(user.leftLeg, level + 1);
      if (leftChild) children.push(leftChild);
    }
    
    if (user.rightLeg) {
      const rightChild = formatNetworkData(user.rightLeg, level + 1);
      if (rightChild) children.push(rightChild);
    }

    if (children.length > 0) {
      nodeData.children = children;
    }

    return nodeData;
  };

  const getNodeColor = (user) => {
    if (user.id === selectedNode) return '#ffd700';
    if (user.rank === 'diamond') return '#b9f2ff';
    if (user.rank === 'gold') return '#ffd700';
    if (user.rank === 'silver') return '#c0c0c0';
    return '#0ea5e9';
  };

  const getBorderColor = (user) => {
    if (user.isActive) return '#00ff00';
    return '#fff';
  };

  const formatLabel = (user) => {
    return [
      `{name|${user.name}}`,
      `{value|$${user.earnings}}`
    ].join('\n');
  };

  const formatTooltip = (user) => {
    return `
      <div class="tooltip">
        <b>${user.name}</b><br/>
        Rank: ${user.rank}<br/>
        Earnings: $${user.earnings}<br/>
        Direct Referrals: ${user.directReferrals}<br/>
        Team Size: ${user.teamSize}
      </div>
    `;
  };

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#fff',
      borderWidth: 1,
      padding: 10,
      textStyle: {
        color: '#fff'
      }
    },
    series: [{
      type: 'tree',
      data: [formatNetworkData(userId)],
      top: '5%',
      bottom: '5%',
      layout: 'orthogonal',
      orient: 'vertical',
      symbol: 'circle',
      symbolSize: 50,
      initialTreeDepth: 3,
      roam: true,
      label: {
        position: 'inside',
        rotate: 0,
        verticalAlign: 'middle',
        align: 'center',
        fontSize: 12,
        color: '#fff',
        rich: {
          name: {
            fontSize: 12,
            color: '#fff',
            padding: [0, 0, 2, 0]
          },
          value: {
            fontSize: 10,
            color: '#fff'
          }
        }
      },
      leaves: {
        label: {
          position: 'inside',
          rotate: 0
        }
      },
      emphasis: {
        focus: 'descendant',
        scale: true
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
      lineStyle: {
        color: '#ccc',
        width: 2,
        curveness: 0.5
      }
    }]
  };

  useEffect(() => {
    const updatedMetrics = calculateMetrics(userId);
    setMetrics(updatedMetrics);
  }, [userId, network]);

  const onChartClick = (params) => {
    if (params.data && params.data.id) {
      setSelectedNode(params.data.id);
      // Trigger any additional actions when node is clicked
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Members" 
          value={metrics.totalMembers} 
          icon="👥"
        />
        <MetricCard 
          title="Left Leg" 
          value={metrics.leftLegCount} 
          icon="←"
        />
        <MetricCard 
          title="Right Leg" 
          value={metrics.rightLegCount} 
          icon="→"
        />
        <MetricCard 
          title="Tree Depth" 
          value={`${metrics.depth}/10`} 
          icon="↕"
        />
      </div>
      
      <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-4">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: '100%', width: '100%' }}
          onEvents={{
            click: onChartClick
          }}
        />
      </div>
    </div>
  );
}

const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center space-x-2">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);
