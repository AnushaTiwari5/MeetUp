import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './Navbar';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const data = {
  labels: ['Location 1 - Time 1', 'Location 1 - Time 2', 'Location 2 - Time 1', 'Location 2 - Time 2'],
  datasets: [
    {
      label: 'No',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [5, 4, 3, 2]
    },
    {
      label: 'Unlikely',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
      hoverBorderColor: 'rgba(255, 159, 64, 1)',
      data: [3, 2, 5, 4]
    },
    {
      label: 'Maybe',
      backgroundColor: 'rgba(255, 205, 86, 0.2)',
      borderColor: 'rgba(255, 205, 86, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 205, 86, 0.4)',
      hoverBorderColor: 'rgba(255, 205, 86, 1)',
      data: [2, 3, 4, 5]
    },
    {
      label: 'Likely',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
      hoverBorderColor: 'rgba(75, 192, 192, 1)',
      data: [4, 5, 2, 3]
    },
    {
      label: 'Yes',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: [5, 5, 1, 2]
    }
  ]
};

const options = {
  plugins: {  // 'legend' now within object 'plugins {}'
    legend: {
      labels: {
        color: "black",  // not 'fontColor:' anymore
        // fontSize: 18  // not 'fontSize:' anymore
        font: {
          size: 18 // 'size' now within object 'font {}'
        }
      }
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ],
    x: {
      ticks: {
        color: 'black',
      }
    },
    y: {
      ticks: {
        color: 'black',
      }
    }
  }
};

const PollBarChart = () => (
  <div
  style={{
    backgroundColor: "rgb(123, 109, 154)",
    height: "200vh"
  }}>
    <MyNavbar />
    <div className="container mt-3">
    <div>
      <div >
        <h2>Event Description</h2>
        <p>Meeting to designate spring 1 tasks and select a timeline for implementation.</p>
        <b>Poll Responses:</b>
      </div>
    </div>
    <Bar data={data} options={options} />
    </div>
  </div>
);

export default PollBarChart;