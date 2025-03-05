import { useEffect, useRef } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { TreeChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TreeChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer
]);

export default function BinaryMatrix({ data }) {
  const chartRef = useRef(null);

  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [{
      type: 'tree',
      data: [data],
      top: '5%',
      left: '7%',
      bottom: '5%',
      right: '7%',
      symbolSize: 12,
      orient: 'vertical',
      label: {
        position: 'top',
        rotate: 0,
        verticalAlign: 'middle',
        align: 'center',
        fontSize: 14
      },
      leaves: {
        label: {
          position: 'bottom',
          rotate: 0,
          verticalAlign: 'middle',
          align: 'center'
        }
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }]
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Binary Matrix</h2>
      <div className="h-[600px]">
        <ReactEChartsCore
          ref={chartRef}
          echarts={echarts}
          option={getOption()}
          style={{ height: '100%', width: '100%' }}
          className="binary-matrix-chart"
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
}