import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MyNavbar from "./Navbar";

export default function Invite() {

    //const eventID;
    //const inviter;
    //const invitee;

    const [eventdata, setEventdata] = useState(null);
    var title = "";
    var description = "";
    var polls = {};
    var pollEntries = [];


    useEffect(() => {
        const url = `http://localhost:3000`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setEventdata(res[0]);
            })
    }, [])

    if (eventdata != null) {
        description = eventdata[0].description;
        title = eventdata[0].title;
        polls = eventdata; //.Polls;
        //pollEntries = Object.entries(polls);
    }

    const displayData = () => {
        for (const [index, entry] of Object.entries(polls)) {
            console.log("func run")
            return (
                <tr key={index}>
                <td>{(entry.index) + 1}</td>
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>{entry.location}</td>
                </tr>
            )
        }
    }

    const [newEmail, setNewEmail] = useState("");
    const [inviteeEmails, setInviteEmails] = useState([]);


    const showTyping = (msg) => {
        setNewEmail(msg)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setInviteEmails(arr => [...arr, newEmail]);
    }

    const handleInvite = () => {
        alert("Invite sent");
    }

    return (
        <div className='mainDisplay'>
            <MyNavbar />
            <h2 style={{ textAlign: "center" }}>
                <b>{description}</b>
            </h2>

            <div className='grid-container'
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto',
                    paddingTop: "20px",
                    marginLeft: "10px"
                }}>

                <div className='data-column'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Location</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* {
                                pollEntries.map((entry, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{entry[1].ID}</td>
                                            <td>{entry[1].date}</td>
                                            <td>{entry[1].time}</td>
                                            <td>{entry[1].location}</td>
                                        </tr>
                                    )
                                })
                            } */}

                            {displayData()}

                        </tbody>
                    </table>
                </div>

                <div className='email-input'>
                    <form onSubmit={e => handleSubmit(e)}>
                        <label style={{ fontWeight: "bold" }}>Enter email address:</label>
                        <br />

                        <input style={{
                            color: "black",
                            width: "300px",
                            border: "2px solid black"
                        }}
                            type="email"
                            id="inviteeEmail"
                            placeholder="name@example.com"
                            onChange={(msg) => showTyping(msg.target.value)}
                        >
                        </input>
                    </form>

                    <Button
                        style={{ marginTop: "5px" }}
                        onClick={handleInvite}>
                        Invite
                    </Button>
                </div>

                <div className='display-email'
                    style={{
                        background: "rgb(181, 159, 228)",
                        float: 'right',
                        width: "300px",
                        whiteSpace: "pre-wrap",
                    }}>
                    <b>Email List:</b>
                    <br />
                    {inviteeEmails.join(`\n`)}
                </div>
            </div>
        </div>
    )
}