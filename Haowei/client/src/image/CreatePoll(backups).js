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
          type='text'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />

        <label>Set start time:</label>
        <br />
        <input
          name='userfirstTime'
          type='text'
          value={firstTime}
          onChange={(event) => setfirstTime(event.target.value)}
        />
        <br />
        <label>Set end time:</label>
        <br />
        <input
          name='userlastTime'
          type='text'
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
          <Link to="/">Create Event</Link>
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

function InformationTable({ entries }) {
  const [sortedEntries, setsEntries] = useState(entries);

  useEffect(() => {
    setsEntries(entries);
  }, [entries]);

  const remove = (index) => {
    setsEntries(sortedEntries.filter((id) => { return id.index !== index }))
    //sortedEntries.delete(index)
  }
  return (
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
  );
}

export default function LocationBook() {
  const [entries, setEntries] = useState([]);
  const addEntryTolocationBook = (entry) => {
    setEntries([...entries, entry]);
    console.log(entries)
  };


  return (
    <section>
      <LocationBookForm onSubmit={addEntryTolocationBook} />
      <InformationTable entries={entries} />
      <input
        type='submit'
        value='Finish poll'
      />
    </section>

  );
}