import { Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';


export default function Invite() {

    //const eventID;
    //const inviter;
    //const invitee;

    const [eventdata, setEventdata] = useState(null);
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
        description = eventdata.description;
        polls = eventdata.Polls;
        pollEntries = Object.entries(polls);
    }

    const [newEmail, setNewEmail] = useState("");
    const [inviteeEmails, setInviteEmails] = useState([]);


    const showTyping = (msg) => {
        setNewEmail(msg)
    }

    const displayEmails = (event) => {
        if (event.key === "Enter") {
            setInviteEmails(arr => [...arr, newEmail]);
        }
        //emailList = inviteeEmails.join("\n");
    }

    

    const handleInvite = () => {
        alert("Invite sent");
    }

    return (
        <div>
            <h2>
                {description}
            </h2>

            <table style={{
                // marginTop: "30px"
            }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                    </tr>
                </thead>

                <tbody>
                    {
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
                    }
                </tbody>
            </table>

            <div>
                <input style={{
                    color: "black",
                    border: "2px solid black",
                    position: 'absolute',
                    top: "100px",
                    left: "530px",
                    width: "300px"
                }}
                    type="email"
                    id="inviteeEmail"
                    placeholder="name@example.com"
                    onChange={(msg) => showTyping(msg.target.value)}
                    onKeyDown={displayEmails}
                    required
                >
                </input>
            </div>

            <Button
                style={{
                    position: 'absolute',
                    top: "170px",
                    left: "530px"
                }}
                onClick={handleInvite}>
                Invite
            </Button>

            <Container 
                style={{
                    position: 'absolute',
                    top: "90px",
                    right: "100px",
                    background: "pink",
                    float: 'right',
                    width: "300px",
                    whiteSpace: "pre-wrap"
                }}>
                Email List:
                <br />
                {inviteeEmails.join(`\n`)}
            </Container>




        </div>
    )
}