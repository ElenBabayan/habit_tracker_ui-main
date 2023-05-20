import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import {useEffect, useState} from "react";
import axios from "../../../../axios";

const ComparisonChart2 = ({ height }) => {
  const { palette } = useTheme();
  const [data, setData] = useState([[]]);

  useEffect( async ()=> {
    const { data } = await axios.get('/report/yearly');
    setData(data);
  })

  const option = {
    grid: { left: '6%', bottom: '10%', right: '1%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    color: [
      palette.error.light,
      palette.secondary.light,
      palette.primary.dark,
      palette.primary.light,
    ],
    barMaxWidth: '10px',
    dataset: {
      source: [
        ['Month', 'Fail', 'Half', 'Success'], ...data
      ],
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default ComparisonChart2;
