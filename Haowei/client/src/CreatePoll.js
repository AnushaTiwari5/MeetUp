import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from "react-router-dom";

function LocationBookForm({ onSubmit }) {
  const [index, setIndex] = useState(0)
  const [date, setDate] = useState("");
  const [firstTime, setfirstTime] = useState("");
  const [lastTime, setlastTime] = useState("");
  const [location, setlocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIndex(index + 1)
    onSubmit({ index, date, firstTime, lastTime, location });

  };

  return (

    <Background>
      <NavBar />
      <form onSubmit={handleSubmit}>

        <label>Set Date:</label>
        <br />
        <input
          name='userDate'
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />

        <label>Set start time:</label>
        <br />
        <input
          name='userfirstTime'
          type='time'
          value={firstTime}
          onChange={(event) => setfirstTime(event.target.value)}
        />
        <br />
        <label>Set end time:</label>
        <br />
        <input
          name='userlastTime'
          type='time'
          value={lastTime}
          onChange={(event) => setlastTime(event.target.value)}
        />
        <br />
        <label>location:</label>
        <br />
        <input
          name='userlocation'
          type='text'
          value={location}
          onChange={(event) => setlocation(event.target.value)}
        />
        <br />
        <input
          type='submit'
          value='Add option'
        />

      </form>
    </Background>
  )
}
function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/CreatePoll">Create Event</Link>
        </li>
        <li>
          <Link to="/">Personal</Link>
        </li>
        <li>
          <Link to="/">Log in</Link>
        </li>
      </ul>
    </nav>
  );
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
  const [sortedEntries, setsEntries] = useState([]);
  const addEntryTolocationBook = (entry) => {
    setsEntries([...sortedEntries, entry]);
    console.log(sortedEntries)
  };
  const remove = (index) => {
    setsEntries(sortedEntries.filter((id) => { return id.index !== index }))
    //sortedEntries.delete(index)
  }

  const submit = async()  =>{
    try{
      let data = await axios.post("http://localhost:4000/CreatePoll",sortedEntries)//post result to server
     
  }catch(e){
      console.log(e)
  }  
  }
  
  return (
    <section>
      <LocationBookForm onSubmit={addEntryTolocationBook} />
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
            <td>{entry.date}</td>
            <td>{entry.firstTime}</td>
            <td>{entry.lastTime}</td>
            <td>{entry.location}</td>
            <td> <button className="SubmitButton"
              onClick={() => remove(entry.index)}>
              remove
            </button></td>
          </tr>
        ))}
      </tbody>
    </table>
      
    <button className="SubmitButton"
              onClick={() => submit()}>
              Finish Creating Poll
            </button>
    </section>

  );
}