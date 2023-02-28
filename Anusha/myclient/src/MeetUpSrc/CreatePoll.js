import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import MyNavbar from "./Navbar";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function LocationBookForm({ onSubmit }) {
  const [index, setIndex] = useState(0)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setlocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIndex(index + 1)
    //onSubmit({ index, date, firstTime, lastTime, location });
    onSubmit({ index, title, desc, startTime, endTime, location });

  };

  return (

    <Background>
      {/* <NavBar /> */}
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
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
        />
        <br />

        {/* <label>Date:</label>
        <br />
        <input
          name='userDate'
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br /> */}

        <label style={{ fontWeight: "bold" }}>Start Date and Time:</label>
        <br />
        <input
          name='userfirstTime'
          type='datetime-local'
          required
          value={startTime}
          onChange={(event) => setStartTime(event.target.value.replace("T", " "))}
        />
        <br />
        <label style={{ fontWeight: "bold" }}>End Date and Time:</label>
        <br />
        <input
          name='userlastTime'
          type='datetime-local'
          required
          value={endTime}
          onChange={(event) => setEndTime(event.target.value.replace("T", " "))}
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

// function NavBar() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/CreatePoll">Create Event</Link>
//         </li>
//         <li>
//           <Link to="/">Personal</Link>
//         </li>
//         <li>
//           <Link to="/">Log in</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

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
  const [sortedEntries, setsEntries] = useState([]);
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
      let data = await axios.post("http://localhost:4000/CreatePoll", sortedEntries)//post result to server

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <section
      style={{
        backgroundColor: "rgb(125, 112, 156)",
        height: "100vh"
      }}>
      <MyNavbar />
      <h2 style={{ textAlign: "center", marginTop: "5px" }}>
        Welcome to the Event Creation Page!
      </h2>

      <p style={{ textAlign: "center", fontSize: "25px" }}>Enter the relevant details for your event below</p>

      <div
        style={{
          float: "left",
          padding: "3%"
        }}>
        <LocationBookForm onSubmit={addEntryTolocationBook} />
      </div>

      <div
        style={{
          float: "left",
          padding: "3%",
        }}>

        <table className='informationTable'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>location</th>
            </tr>
          </thead>

          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr key={index}>
                {/* <td>{entry.date}</td> */}
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>{entry.location}</td>

                <td> <Button onClick={() => remove(entry.index)}>
                  remove
                </Button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <p />
        <Button
          style={{
            marginTop: "5%"
          }}
          onClick={() => submit()}>
          Finish Creating Poll
        </Button>

      </div>

      <p />
      <a href="/Invite">
        <Button
          style={{
            margin: "3%",
            float: "left"
          }}>
          Invite Participants
        </Button>
      </a>
    </section>

  );
}