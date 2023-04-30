import React, { useState, useContext, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './Navbar';
import axios from 'axios';
import { AuthContext } from './Firebase/Auth'
import { useLocation, useParams } from "react-router-dom";
import "./PollBarChart.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Zoom
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const PollBarChart = () => {

  const [eventID, setEventID] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [details, setDetails] = useState(null);
  const [optionIDs, setOptionIDs] = useState(null);
  var title = "";
  var description = "";

  /*useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const event_id = parseInt(searchParams.get("event_id"));
    if (event_id) {
      setEventID(event_id);
    }
  }, [location.search]);*/

  useEffect(() => {
    fetch(`http://localhost:3000/getStatID`)
      .then((res) => res.json())
      .then((res) => {
        setEventID(res);
      })
  }, [])


  useEffect(() => {
    if (eventID !== 0) {
      fetch(`http://localhost:3000/PollTitle/${eventID}`)
        .then((res) => res.json())
        .then((res) => {
          setDetails(res)
        })
    }
  }, [eventID])

  if (details != null) {
    description = details[0].description ? details[0].description : "";
    title = details[0].title;
  }

  function handleOptionClick(optionIndex) {
    setSelectedOption(optionIndex);
  }

  function handleOptionHover(optionIndex) {
    setHoveredOption(optionIndex);
  }

  function handleOptionLeave() {
    setHoveredOption(null);
  }


  function handleSubmit() {
    if (selectedOption !== null) {
      let data = axios.post("http://localhost:3000/finalize", { 'eventID': eventID, 'optionID': optionIDs[selectedOption] });
      alert(`You have selected Option ${optionIDs[selectedOption]}`);
    } else {
      alert("Please select an option before submitting.");
    }
  }

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'No',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
      },
      {
        label: 'Unlikely',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
        hoverBorderColor: 'rgba(255, 159, 64, 1)',
        data: []
      },
      {
        label: 'Maybe',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 205, 86, 0.4)',
        hoverBorderColor: 'rgba(255, 205, 86, 1)',
        data: []
      },
      {
        label: 'Likely',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: []
      },
      {
        label: 'Yes',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: []
      }
    ]
  });

  const [likelihoods, setLikelhoods] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const percentages = [76, 52, 20];
  useEffect(() => {
    axios.get('http://localhost:3000/allresponses/' + eventID.toString())
      .then(response => {

        setData({
          ...data,
          labels: response.data.time_location,
          datasets: data.datasets.map((dataset, i) => ({
            ...dataset,
            data: response.data.response_count[i]
          }))
        });

        setLikelhoods(response.data.likelihoods);
        setRecommendations(response.data.recommendations);
        setOptionIDs(response.data.optionIDs);
        console.log(response.data.time_location);
      })
      .catch(error => {
        console.log(error);
      });
  }, [eventID]);

  const options = {
    indexAxis: 'y',
    //maintainAspectRatio: false,
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
    plugins: {
      title: {
        display: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'y'
        },
        zoom: {
          pinch: {
            enabled: true       // Enable pinch zooming
          },
          wheel: {
            enabled: true       // Enable wheel zooming
          },
          mode: 'y',
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
          font: {
            size: 18
          }
        }
      },
      y: {
        ticks: {
          color: 'black',
          font: {
            size: 18
          }
        }
      }
    }
  };

  function getTextColor(percentage) {
    if (percentage >= 75) {
      return "#4CAF50"; // green
    } else if (percentage >= 50) {
      return "#FFEB3B"; // yellow
    } else {
      return "#F44336"; // red
    }
  }

  return (

    <div className='mainDisplay'
      style={{
        height: "100%",
        paddingBottom: "5%",
      }}
    >

      <MyNavbar />

      <p style={{ textAlign: "center" }}>
        <b style={{ fontSize: "50px" }}>{title}</b>
        <br />
        <i style={{ fontSize: "20px" }}>{description}</i>
      </p>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
        <div style={{ flex: "0 0 30%", alignSelf: "flex-start", paddingLeft: "50px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <b style={{ fontSize: "30px" }}>Attendance Likelihoods:</b>
            {recommendations.map((rec_idx, index) => (
              <div
                key={index}
                className="rounded bg-white p-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  border: `2px solid ${index === hoveredOption || index === selectedOption ? "#007bff" : "transparent"}`,
                }}
                onClick={() => handleOptionClick(index)}
                onMouseEnter={() => handleOptionHover(index)}
                onMouseLeave={() => handleOptionLeave()}
              >
                <p>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: getTextColor(likelihoods[rec_idx]),
                      fontSize: "2.1rem",
                      marginRight: "0.2rem"
                    }}
                  >
                    {likelihoods[rec_idx]}%
                  </span>
                  <br />
                  likely to attend at
                </p>

                <div style={{ display: "flex", flexDirection: "column", fontSize: "1.3rem", }}>
                  <span>Location: <span style={{ fontWeight: "bold" }}>{data.labels[rec_idx][2]}</span > </span>
                  <span>Start Time: <span style={{ fontWeight: "bold" }}>{data.labels[rec_idx][0]}</span > </span>
                  <span>End Time: <span style={{ fontWeight: "bold" }}>{data.labels[rec_idx][1]}</span > </span>
                </div>
              </div>
            ))}

          </div>

          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Finalize Time/Location
          </button>

        </div>

        <div style={{ flex: "60%", width: "100%", paddingLeft: "7%" }}>
          <b style={{ fontSize: "30px" }}>Poll Responses:</b>
          <div style={{ width: "100%" }}><Bar data={data} options={options} /></div>
        </div>

      </div>
      {selectedOption !== null && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#f8f9fa", padding: "10px" }}>
          You have selected Option {selectedOption + 1}
        </div>

      )}
    </div>
  );
};

export default PollBarChart;