import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import { fetchChartData, selectChartData, selectChartLoading, selectChartError } from '../store/slices/chartSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const PlatformChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector(selectChartData);
  const loading = useSelector(selectChartLoading);
  const error = useSelector(selectChartError);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

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
      data: chartData.categories,
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
    series: chartData.series.map(s => ({
      ...s,
      type: 'line',
      smooth: true,
      symbol: 'none'
    })),
    legend: {
      bottom: 0,
      left: 'center',
      data: chartData.series.map(s => s.name)
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center" style={{ height: '320px' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center" style={{ height: '320px' }}>
        <ErrorMessage error={error} />
      </div>
    );
  }

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