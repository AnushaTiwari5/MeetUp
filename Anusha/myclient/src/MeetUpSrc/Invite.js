import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MyNavbar from "./Navbar";
import { MDBDataTable } from "mdbreact";
import emailjs from 'emailjs-com';

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

export default function Invite() {

    const [eventID, setEventID] = useState(0);
    const [eventdata, setEventdata] = useState(null);
    const data = [];
    const [details, setDetails] = useState(null);
    var title = "";
    var description = "";

    const [newEmail, setNewEmail] = useState("");
    const [inviteeEmails, setInviteEmails] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/getInvite`)
            .then((res) => res.json())
            .then((res) => {
                setEventID(res);
            })
    }, [])

    useEffect(() => {
        if (eventID !== 0) {
            fetch(`http://localhost:3000/PollData/${eventID}`)
                .then((res) => res.json())
                .then((res) => {
                    setEventdata(res);
                })

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

    if (eventdata != null) {
        eventdata.map((poll, index) => {
            let obj = {
                id: index + 1,
                start_time: setDateTime(poll.start_time),
                end_time: setDateTime(poll.end_time),
                location: poll.location
            }
            data.push(obj);
        })
    }


    const showTyping = (msg) => {
        setNewEmail(msg)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setInviteEmails(arr => [...arr, newEmail]);
    }

    const handleInvite = () => {
        emailjs.init("LtLzCDTJpc1Av6YW4");
        
        const serviceID = "service_j93dxvy";
        const templateId = "template_tzz6aas";

        inviteeEmails.map((email, key) => {

        })
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

        rows: data

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