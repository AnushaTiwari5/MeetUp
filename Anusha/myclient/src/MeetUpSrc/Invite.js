import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MyNavbar from "./Navbar";
import { MDBDataTable } from "mdbreact";

export default function Invite() {

    const [eventdata, setEventdata] = useState(null);
    const [details, setDetails] = useState(null);
    var title = "";
    var description = "";

    useEffect(() => {
       fetch(`http://localhost:3000/PollData`)
            .then((res) => res.json())
            .then((res) => {
                setEventdata(res);
            })

        fetch(`http://localhost:3000/PollTitle`)
            .then((res) => res.json())
            .then((res) => {
                setDetails(res)
            })

    }, [])

    if (details != null) { 
        description = details[0].description ? details[0].description : "";
        title = details[0].title;
    }

    if (eventdata != null) {
        console.log(eventdata);

        eventdata.map((poll, index) => {
            poll = {
                id: index,
                start_time: poll.start_time.replace("T", " "),
                end_time: poll.end_time.replace("T", " ") 
            }
        })

        //console.log("r: ", eventdata);
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

    const tableData = {
        columns: [
            {
                label: "ID",
                field: "id",
                width: 10,
            },
            {
                label: "Start Time",
                field: "start_time",
                width: 30,
            },
            {
                label: "End Time",
                field: "end_time",
                width: 30
            },
            {
                label: "Location",
                field: "location",
                width: 30
            }
        ],

        rows: eventdata

    }

    return (
        <div className='mainDisplay'
        /* style={{
            height: "100%"
        }} */
        >
            <MyNavbar />
            <p style={{ textAlign: "center" }}>
                <b style={{ fontSize: "20px" }}>{title}</b>
                <br />
                <i style={{ fontSize: "15px" }}>{description}</i>
            </p>


            <div className='grid-container'
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto',
                    paddingTop: "20px",
                    marginLeft: "10px"
                }}>
                <div
                    style={{
                        width: "95%%",
                        padding: "2%",
                        border: "1px solid black"
                    }}>
                    <MDBDataTable
                        scrollX
                        scrollY
                        maxHeight='50%'
                        striped
                        bordered
                        small
                        hover
                        data={tableData}
                    />
                </div>

                <div className='email-input'
                    style={{
                        marginLeft: "2%"
                    }}>
                    <form onSubmit={e => handleSubmit(e)}>
                        <label style={{
                            fontWeight: "bold",
                        }}>
                            Enter email address:
                        </label>
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