import React from 'react';
import ReactECharts from 'echarts-for-react';

const PlatformChart = () => {
  const option = {
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: '#CCCCCC',
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666666',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 14000,
      interval: 3500,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666666',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: '#CCCCCC',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'Orders',
        type: 'line',
        data: [4200, 5800, 7200, 8100, 9500, 11200, 10800],
        smooth: true,
        lineStyle: {
          color: '#8884D8',
          width: 2
        },
        areaStyle: {
          color: 'rgba(136, 132, 216, 0.6)'
        },
        symbol: 'none'
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [2800, 4200, 5600, 6300, 7800, 9100, 8700],
        smooth: true,
        lineStyle: {
          color: '#82CA9D',
          width: 2
        },
        areaStyle: {
          color: 'rgba(130, 202, 157, 0.6)'
        },
        symbol: 'none'
      },
      {
        name: 'Users',
        type: 'line',
        data: [1200, 1800, 2400, 2700, 3200, 3800, 3600],
        smooth: true,
        lineStyle: {
          color: '#FFC658',
          width: 2
        },
        areaStyle: {
          color: 'rgba(255, 198, 88, 0.6)'
        },
        symbol: 'none'
      }
    ],
    legend: {
      bottom: 0,
      left: 'center',
      data: [
        {
          name: 'orders',
          textStyle: { color: '#8884D8' }
        },
        {
          name: 'revenue',
          textStyle: { color: '#82CA9D' }
        },
        {
          name: 'users',
          textStyle: { color: '#FFC658' }
        }
      ]
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 lg:p-5 border-b border-gray-200">
        <h3 className="text-sm lg:text-base font-medium text-gray-900">Platform Performance</h3>
      </div>
      <div className="p-4 lg:p-5">
        <ReactECharts 
          option={option} 
          style={{ height: window.innerWidth < 768 ? '240px' : '320px' }} 
        />
      </div>
    </div>
  );
};

export default PlatformChart;
