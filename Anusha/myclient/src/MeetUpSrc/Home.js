import React from "react";
import { Button } from "react-bootstrap";

import MyNavbar from "./Navbar";


export default function Home() {
    return (
        <div className="response-page">
            <img
                style={{
                    resize: "stretch",
                    position: "absolute",
                    width: "100%",
                    opacity: "1"
                }}
                src="https://anushasawsbucket.s3.amazonaws.com/MeetUpBG.jpg"
                alt="Meetup Background"
            />

            <MyNavbar />
            
            <div
                style={{
                    position: "relative",
                    zIndex: "1",
                    textShadow: "1px 1px 20px white",
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                <p
                    style={{
                        fontSize: "50px",
                    }}>
                    Welcome to MEETUP
                </p>

                <p
                    style={{
                        fontSize: "30px",
                    }}>
                    An Event Scheduler that optimizes timing and location.<br />
                    Give your participants the chance to choose the best times for them!

                    <br />

                    <a href="/CreatePoll">
                        <Button
                        style={{
                            fontSize: "20px",
                            marginTop: "20px",
                            boxShadow: "1px 1px 20px blue"
                        }}>
                            Get Started Now!
                            </Button>
                    </a>
                </p>
            </div>
        </div>
    )
}
