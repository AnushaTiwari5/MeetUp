import React from "react";
import { Button } from "react-bootstrap";

import MyNavbar from "./Navbar";


export default function Home() {
    return (
        <div className="response-page"
            style={{
                backgroundColor: "rgb(125, 112, 156)",
                position: "fixed",
                height: "100%",
                width: "100%"
            }}>
            <MyNavbar />

            <img
                style={{
                    float: "right",
                    width: "60%",
                    height: "60%",
                }}
                src="https://anushasawsbucket.s3.amazonaws.com/MeetUpBG.jpg"
                alt="Meetup Background"
            />

            {/* <MyNavbar /> */}

            <div
                style={{
                    textShadow: "1px 1px 20px white",
                    //textAlign: "center",
                    marginLeft: "3%",
                    zIndex: "-1",
                    position: "relative",
                }}>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "40px",
                    }}>
                    Welcome to MEETUP
                </p>

                <p
                    style={{
                        //textAlign: "left",
                        fontSize: "25px",
                    }}>
                    An Event Scheduler that optimizes timing and location.<br />
                    Give your participants the chance to choose the best times for them!

                    <br />

                    <a href="/CreatePoll">
                        <Button
                            style={{
                                fontSize: "20px",
                                marginTop: "20px",
                                boxShadow: "1px 1px 25px blue",


                            }}>
                            Get Started
                        </Button>
                    </a>
                </p>
            </div>
        </div>
    )
}
