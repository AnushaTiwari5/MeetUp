import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import MyNavbar from "./Navbar";

import { AuthContext } from './Firebase/Auth'

import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function setDateTime(str) {
  const months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December",
  }

  let dt = "";
  str = str.replace("T", " ").substring(0, 16);

  let date = str.split(" ")[0];
  let time = str.split(" ")[1];
  let hr = parseInt(time.split(":")[0]);

  dt = date.split("-")[2] + " " + months[date.split("-")[1]] + ", " + date.split("-")[0] + " ";
  dt += hr >= 12 ? (hr - 12) + time.substring(2) + "pm" : hr + time.substring(2) + "am";

  return dt;
}

function LocationBookForm({ onSubmit }) {

  const [index, setIndex] = useState(1)
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setlocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIndex(index + 1)
    onSubmit({ index, title, description, startTime, endTime, location });

  };

  return (

    <Background>

      <form
        style={{
          marginInline: "10px"
        }}
        onSubmit={handleSubmit}>

        <label style={{ fontWeight: "bold" }}>Event Name</label>
        <br />
        <input
          name="eventTitle"
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />

        <label style={{ fontWeight: "bold" }}>Event Description</label>
        <br />
        <input
          name="eventDesc"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDesc(event.target.value)}
        />
        <br />

        <label style={{ fontWeight: "bold" }}>Start Date and Time:</label>
        <br />
        <input
          name='userfirstTime'
          type='datetime-local'
          required
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
        <br />
        <label style={{ fontWeight: "bold" }}>End Date and Time:</label>
        <br />
        <input
          name='userlastTime'
          type='datetime-local'
          required
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
        <br />
        <label style={{ fontWeight: "bold" }}>Location:</label>
        <br />
        <input
          name='userlocation'
          type='text'
          required
          placeholder="Location"
          value={location}
          onChange={(event) => setlocation(event.target.value)}
        />
        <br />

        <input
          style={{
            fontWeight: "bold",
            border: "1px solid black"
          }}
          type='submit'
          value='Add option'
        />

        {/* <Button onClick={handleSubmit}>
          Add Poll Option
        </Button> */}

      </form>
    </Background>
  )
}

function Background(props) {
  return (
    <div className="background">
      <div className="content">{props.children}</div>
    </div>
  );
}



// function InformationTable({ entries }) {
//   const [sortedEntries, setsEntries] = useState(entries);

//   useEffect(() => {
//     setsEntries(entries);
//   }, [entries]);

//   const remove = (index) => {
//     setsEntries(sortedEntries.filter((id) => { return id.index !== index }))
//     //sortedEntries.delete(index)
//   }
//   return (
//     <table className='informationTable'>
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Start Time</th>
//           <th>End Time</th>
//           <th>location</th>
//         </tr>
//       </thead>
//       <tbody>
//         {sortedEntries.map((entry, index) => (
//           <tr key={index}>
//             <td>{entry.date}</td>
//             <td>{entry.firstTime}</td>
//             <td>{entry.lastTime}</td>
//             <td>{entry.location}</td>
//             <td> <button className="SubmitButton"
//               onClick={() => remove(entry.index)}>
//               remove
//             </button></td>
//           </tr>


//         ))}
//       </tbody>
//     </table>
//   );
// }

export default function LocationBook() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [sortedEntries, setsEntries] = useState([]);
  const [eventID, setEventId] = useState(0);

  const addEntryTolocationBook = (entry) => {
    setsEntries([...sortedEntries, entry]);
    console.log(sortedEntries)
  };

  const remove = (index) => {
    setsEntries(sortedEntries.filter((id) => { return id.index !== index }))
    //sortedEntries.delete(index)
  }

  const submit = async () => {
    try {
      let data = await axios.post("http://localhost:3000/CreatePoll", sortedEntries)//post result to server
      setEventId(data.data.event_id);

      if(eventID !== 0) {
        console.log("new event: " + eventID);
        alert("Poll created successfully");
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleInvite = async () => {
    console.log("invite id: " + eventID);

    try {
      await fetch(`http://localhost:3000/setInvite/${eventID}`)
      .then((res) => res.json())
      .then((res) => {
        if(res === eventID) {
          console.log("eid " + eventID);
          navigate("/Invite");
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  /* const ifEmail = () => {
    if (currentUser != null) {
      return (currentUser.email)
    } else {
      return (0);
    }
  } */

  return (
    <section className="mainDisplay">
      <MyNavbar />
      <h2 style={{ textAlign: "center", marginTop: "5px" }}>
        Welcome to the Event Creation Page!
      </h2>

      <p style={{ textAlign: "center", fontSize: "25px" }}>Enter the relevant details for your event below</p>

      <div className='grid-container'
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          paddingTop: "20px",
          marginLeft: "10px"
        }}>

        <div>
          <LocationBookForm onSubmit={addEntryTolocationBook} />
        </div>

        <div>
          <table className='informationTable'
          style={{
            textAlign: "center",
            borderCollapse: "separate",
            borderSpacing: "10px 4px"
          }}
          >
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{setDateTime(entry.startTime)}</td>
                  <td>{setDateTime(entry.endTime)}</td>
                  <td>{entry.location}</td>

                  <td> <Button onClick={() => remove(entry.index)}>
                    remove
                  </Button></td>
                </tr>
              ))}
            </tbody>
          </table>



          <Button
            style={{
              marginTop: "5%"
            }}
            onClick={() => submit()}>
            Finish Creating Poll
          </Button>

        </div>

        <div>
          <Button
          onClick={() => handleInvite()}
          >
            Invite Participants
          </Button>
        </div>

      </div>

    </section>

  );
}