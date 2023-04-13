import { Row, Button, Modal } from 'react-bootstrap';
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

function ResponseButtons () {
    const [responseVal, setResponseVal] = useState(null);

    return (
        <div>
            <Button className='No'
                style={{
                    background: "rgb(190, 52, 52)",
                    border: 0
                }}
                onClick={() => setResponseVal(0)}
            >
                No
            </Button>

            <br />

            <Button className='Unlikely'
                style={{
                    background: "rgb(133, 48, 111)",
                    border: 0
                }}
                onClick={() => setResponseVal(0.25)}
            >
                Unlikely
            </Button>

            <br />

            <Button className='Maybe'
                style={{
                    background: "rgb(83, 43, 138)",
                    border: 0
                }}
                onClick={() => setResponseVal(0.5)}
            >
                Maybe
            </Button>

            <br />

            <Button className='Likely'
                style={{
                    background: "rgb(39, 39, 218)",
                    border: 0
                }}
                onClick={() => setResponseVal(0.75)}
            >
                Likely
            </Button>

            <br />

            <Button className='Yes'
                style={{
                    background: "rgb(8, 94, 40)",
                    border: 0
                }}
                onClick={() => setResponseVal(1)}
            >
                Yes
            </Button>

        </div>
    )
}

export default function ResponseNew() {

    const [eventdata, setEventdata] = useState(null);
    const [details, setDetails] = useState(null);
    //const [responsePop, setResponsePop] = useState(false);

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
                showButton: true,
                respondButton:
                        <Button>
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
                field: "respondButton",
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

           {/*  <Modal
                    show={responsePop}
                    onHide={setResponsePop(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Enter New Details
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {ResponseButtons()}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            onClick={setResponsePop(false)}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> */}

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