import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',// as const,
    },
    title: {
      display: true,
      text: 'Poll Response',
    },
  },
};

const data = {
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
};

const PollBarChart = () => {
  return (
    <div className="container">
      <h2>Poll Response Bar Chart</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default PollBarChart;