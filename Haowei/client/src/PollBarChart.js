import React from 'react';
import Chart from 'chart.js/auto';

import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

//Chart.scaleService.registerScaleType('customScale', CustomScale, CustomScaleDefaultConfig);
const PollBarChart = () => {
  const [data,setData] = useState({
    labels: ['No', 'Unlikely', 'Maybe', 'Likely', 'Yes'],
    datasets: [
      {
        label: 'Poll Response',
        data: [10, 20, 30, 40, 50],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF5733',
        ],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className="container">
      <h2>Poll Response Bar Chart</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default PollBarChart;