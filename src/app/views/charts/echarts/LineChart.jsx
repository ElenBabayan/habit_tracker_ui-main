import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import {useEffect, useState} from "react";
import axios from "../../../../axios.js";
import {da} from "date-fns/locale";

const LineChart = ({ height, color = [] }) => {
  const theme = useTheme();
  const [data, setData] = useState({this:[], last: []});

  useEffect(async () => {
    const { data } = await axios.post('/report/week');
    setData({this: data.this, last: data.last});
    console.log(data)
  }, [])

  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    series: [
      {
        data: data.this,
        type: 'line',
        stack: 'This Week',
        name: 'This week',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: data.last,
        type: 'line',
        stack: 'Last Week',
        name: 'Last week',
        color: 'red',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default LineChart;
