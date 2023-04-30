import React from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "./Firebase/Auth";
import MyNavbar from "./Navbar";


export default function Home() {

    const { currentUser } = useContext(AuthContext);

    const Buttons = () => {
        if (currentUser === null) {
            return (
                <div>
                    <a href="/#/Login">
                        <Button
                            style={{
                                fontSize: "20px",
                                margin: "auto",
                                width: "30%",
                                marginTop: "20px",
                                boxShadow: "1px 1px 25px rgba(0, 0, 255, 0.7)",
                            }}>
                            Login | Register
                        </Button>
                    </a>
                </div>

            )
        } else {
            return (
                <a href="/#/CreatePoll">
                    <Button
                        style={{
                            fontSize: "20px",
                            margin: "auto",
                            width: "30%",
                            marginTop: "20px",
                            boxShadow: "1px 1px 25px rgba(0, 0, 255, 0.7)",
                        }}>
                        Continue to Create Polls
                    </Button>
                </a>
            )
        }
    }

    const b = Buttons();

    return (
        <div className="mainDisplay"
            style={{
                /* backgroundColor: "rgb(125, 112, 156)", */
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
                    marginRight: "3%",
                    borderRadius: "40px"
                }}
                src="https://anushasawsbucket.s3.amazonaws.com/MeetUpBG.jpg"
                alt="Meetup Background"
            />


            <div
                style={{
                    /* textShadow: "1px 1px 20px black", */
                    marginLeft: "3%",
                    zIndex: "-1",
                    position: "relative",
                    /* fontWeight: "bold", */
                    marginTop: "3%",
                }}>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "35px",
                    }}>
                    Welcome to MEETUP
                </p>

                <p
                    style={{
                        fontSize: "25px",
                    }}>
                    An Event Scheduler that optimizes timing and location.<br />
                    Give your participants the chance to choose the best times for themselves!

                </p>

                {b}
                
            </div>
        </div>
    )
}
