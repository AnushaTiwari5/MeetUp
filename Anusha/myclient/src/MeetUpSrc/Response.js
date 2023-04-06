import "./Response.css";
import MyNavbar from "./Navbar";

import { Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Response() {

    const [details, setDetails] = useState(null);
    const [eventdata, setEventdata] = useState(null);
    const [display, setDisplay] = useState(false);

    var description = "";
    var title = "";

    useEffect(() => {
        fetch(`http://localhost:3000/PollData`)
            .then((res) => res.json())
            .then((res) => {
                setEventdata(res[0]);
            })

        fetch(`http://localhost:3000/PollTitle`)
            .then((res) => res.json())
            .then((res) => {
                setDetails(res)
            })

    }, [])

    if (eventdata != null && details != null) {
        description = details[0].description ? details[0].description : "";
        title = details[0].title;
        setDisplay(true);
    }

    const [mouseHoverN, setMouseHoverN] = useState(false);
    const [mouseHoverU, setMouseHoverU] = useState(false);
    const [mouseHoverM, setMouseHoverM] = useState(false);
    const [mouseHoverL, setMouseHoverL] = useState(false);
    const [mouseHoverY, setMouseHoverY] = useState(false);
    const [mouseHoverR, setMouseHoverR] = useState(false);

    const [responseVal, setResponseVal] = useState(null);
    const [responded, setResponded] = useState(false);

    const mouseEnterN = () => {
        setMouseHoverN(true);
    }
    const mouseLeaveN = () => {
        setMouseHoverN(false);
    }

    const mouseEnterU = () => {
        setMouseHoverU(true);
    }
    const mouseLeaveU = () => {
        setMouseHoverU(false);
    }

    const mouseEnterM = () => {
        setMouseHoverM(true);
    }
    const mouseLeaveM = () => {
        setMouseHoverM(false);
    }

    const mouseEnterL = () => {
        setMouseHoverL(true);
    }
    const mouseLeaveL = () => {
        setMouseHoverL(false);
    }

    const mouseEnterY = () => {
        setMouseHoverY(true);
    }
    const mouseLeaveY = () => {
        setMouseHoverY(false);
    }

    const mouseEnterR = () => {
        setMouseHoverR(true);
    }
    const mouseLeaveR = () => {
        setMouseHoverR(false);
    }

    const updateResponseVal = (val) => {
        setResponseVal(val);
        setResponded(true);
        console.log(val);
    }

    function showResponseButtons() {
        return (
            <Row md={5}
                style={{
                    paddingTop: "10px",
                    paddingLeft: "150px",
                    paddingRight: "150px"
                }}
            >
                <Button className='No'
                    style={{
                        background: "rgb(190, 52, 52)",
                        opacity: mouseHoverN ? 1 : 0.9,
                        border: 0
                    }}
                    onMouseEnter={mouseEnterN}
                    onMouseLeave={mouseLeaveN}
                    onClick={() => updateResponseVal(0)}
                >
                    No
                </Button>

                <Button className='Unlikely'
                    style={{
                        background: "rgb(133, 48, 111)",
                        opacity: mouseHoverU ? 1 : 0.9,
                        border: 0
                    }}
                    onMouseEnter={mouseEnterU}
                    onMouseLeave={mouseLeaveU}
                    onClick={() => updateResponseVal(0.25)}
                >
                    Unlikely
                </Button>

                <Button className='Maybe'
                    style={{
                        background: "rgb(83, 43, 138)",
                        opacity: mouseHoverM ? 1 : 0.9,
                        border: 0
                    }}
                    onMouseEnter={mouseEnterM}
                    onMouseLeave={mouseLeaveM}
                    onClick={() => updateResponseVal(0.5)}
                >
                    Maybe
                </Button>

                <Button className='Likely'
                    style={{
                        background: "rgb(39, 39, 218)",
                        opacity: mouseHoverL ? 1 : 0.9,
                        border: 0
                    }}
                    onMouseEnter={mouseEnterL}
                    onMouseLeave={mouseLeaveL}
                    onClick={() => updateResponseVal(0.75)}
                >
                    Likely
                </Button>

                <Button className='Yes'
                    style={{
                        background: "rgb(8, 94, 40)",
                        opacity: mouseHoverY ? 1 : 0.9,
                        border: 0
                    }}
                    onMouseEnter={mouseEnterY}
                    onMouseLeave={mouseLeaveY}
                    onClick={() => updateResponseVal(1)}
                >
                    Yes
                </Button>
            </Row>
        )

    }

    function showResponse() {
        let responseChoice = "";

        if (responseVal === 0) {
            responseChoice = "No";

        } else if (responseVal === 0.25) {
            responseChoice = "Unlikely";

        } else if (responseVal === 0.5) {
            responseChoice = "Maybe";

        } else if (responseVal === 0.75) {
            responseChoice = "Likely";

        } else if (responseVal === 1) {
            responseChoice = "Yes";
        }

        return (
            <p className="ShowResponse"
                style={{
                    paddingTop: "30px",
                    fontSize: "20px",
                    textAlign: "center"
                }}>

                You have responded with
                <span style={{
                    textTransform: "uppercase",
                    fontWeight: "bold"
                }}>
                    {responseChoice + "."}
                </span>
                Thank you for your response!

                <br />
                <Button className='changeResponse'
                    style={{
                        background: "rgb(83, 43, 138)",
                        marginTop: "10px",
                        opacity: mouseHoverR ? 1 : 0.9,
                        border: 0
                    }}
                    onMouseEnter={mouseEnterR}
                    onMouseLeave={mouseLeaveR}
                    onClick={() => setResponded(false)}
                >
                    Change your response?
                </Button>
            </p>
        )

    }

    function showDetails() {
        return (
            <div>
                <h2
                    style={{
                        textAlign: "center"
                    }}>
                    {title}
                </h2>
                <h4
                    style={{
                        textAlign: "center"
                    }}>
                    {description}
                </h4>

                <p
                    style={{
                        paddingTop: "10px",
                        lineHeight: "2.0",
                        textAlign: "center"
                    }}>
                    <span style={{ fontSize: "30px" }}>{eventdata.start_time}</span>
                    <br />
                    <span style={{ fontSize: "30px" }}>{eventdata.end_time}</span>
                    <br />
                    <span style={{ fontSize: "25px" }}>{eventdata.location}</span>
                </p>
            </div>
        )
    }

    return (
        <div className="mainDisplay">
            <MyNavbar />

            {/* <h2
                style={{
                    textAlign: "center"
                }}>
                {title}
            </h2>
            <h4
                style={{
                    textAlign: "center"
                }}>
                {description}
            </h4>

            <p
                style={{
                    paddingTop: "10px",
                    lineHeight: "2.0",
                    textAlign: "center"
                }}>
                <span style={{ fontSize: "30px" }}>{eventdata.start_time}</span>
                <br />
                <span style={{ fontSize: "30px" }}>{eventdata.end_time}</span>
                <br />
                <span style={{ fontSize: "25px" }}>{eventdata.location}</span>
            </p> */}

            {display ? showDetails() : <h3>Loading details...</h3>}

            {responded ? showResponse() : showResponseButtons()}

        </div>
    )
}