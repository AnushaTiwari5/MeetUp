import { useContext } from "react";
import { Nav, Navbar, Image, Button } from "react-bootstrap";
import { AuthContext } from "./Firebase/Auth";
import firebase from "firebase/compat/app";
import firebaseApp from "./Firebase/firebase";
import { doSignOut } from "./Firebase/firebaseops";
import { Link, useNavigate } from "react-router-dom";


export default function MyNavbar() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const Botton = () => {
        if (currentUser === null) {
            return (
                <Button
                    style={{
                        borderRadius: "30px",
                    }}
                    onClick={() => Login()}
                >
                    {"Login " + String.fromCharCode(8594)}
                </Button>
            )
        } else {
            /* console.log(currentUser.email); */
            return (
                <Button
                    style={{
                        borderRadius: "30px",
                    }}
                    onClick={() => Signout()}
                >
                    {currentUser.email}
                    <br />
                    {"Logout " + String.fromCharCode(8594)}
                </Button>
            )
        }
    }

    const Login = () => {
        navigate('/Login');
    }
    const connect = () => {
        navigate('/COnnection');
    }

    const Signout = () => {
        doSignOut();
        navigate('/');
    }

    const b = Botton();

    return (
        <div className="MyNavbar">
            <Navbar variant="light">
                <Navbar.Brand href="/">
                    <Image style={{ marginLeft: "10%" }}
                        src="https://anushasawsbucket.s3.amazonaws.com/MeetUp+Logo.png" roundedCircle
                        width="150px"
                        height="90px"
                        alt="MeetUp Logo"
                    />
                </Navbar.Brand>

                <Navbar.Collapse id='basic-navbar-nav'
                    style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textShadow: "1px 1px 25px white"
                    }}>

                    <Nav >
                        <Nav.Link href='/'> Meet Up </Nav.Link>
                    </Nav>

                    <Nav >
                        <Nav.Link href='/#/Dashboard'> User Dashboard </Nav.Link>
                    </Nav>


                    {/* <Nav className="createpoll">
                        <Nav.Link href="/CreatePoll"> Create Poll </Nav.Link>
                    </Nav> */}

                    {/* <Nav className='Invite'>
                        <Nav.Link href='/Invite'> Invite </Nav.Link>
                    </Nav> */}

                    <Nav >
                        <Nav.Link href='/#/Response'> Response </Nav.Link>
                    </Nav>

                    <Nav >
                        <Nav.Link href='/#/Viewpoll'> View Poll Stats </Nav.Link>
                    </Nav>
                    <Nav >
                        <Nav.Link href='/#/Connection'> Connection </Nav.Link>
                    </Nav>

                    <Nav className="ms-auto"
                        style={{
                            marginRight: "3%",
                        }}>
                        {b}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}