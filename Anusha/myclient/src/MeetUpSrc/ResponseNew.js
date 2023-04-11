import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MyNavbar from "./Navbar";
import { MDBDataTable } from "mdbreact";

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

export default function ResponseNew() {
    const [eventdata, setEventdata] = useState(null);
    const [details, setDetails] = useState(null);
    const data = [];
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
        eventdata.map((poll, index) => {
            let obj = {
                id: index + 1,
                start_time: setDateTime(poll.start_time),
                end_time: setDateTime(poll.end_time),
                location: poll.location,
                respond: <Button
                        >
                            Respond
                        </Button>
            }
            data.push(obj);
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
            },
            {
                label: "Response",
                field: "respond",
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

            <div
                style={{
                    width: "95%%",
                    padding: "2%",
                    border: "1px solid black",
                    textAlign: "center"
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

        </div>
    )
}