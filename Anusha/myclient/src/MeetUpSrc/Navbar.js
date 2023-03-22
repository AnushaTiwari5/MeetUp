import { Nav, Navbar, Image, Button } from "react-bootstrap";

export default function MyNavbar() {
    return (
        <div className="MyNavbar">
            <Navbar >
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


                    {/* <Nav className="createpoll">
                        <Nav.Link href="/CreatePoll"> Create Poll </Nav.Link>
                    </Nav> */}

                    {/* <Nav className='Invite'>
                        <Nav.Link href='/Invite'> Invite </Nav.Link>
                    </Nav> */}

                    <Nav >
                        <Nav.Link href='/Response'> Response </Nav.Link>
                    </Nav>

                    <Nav >
                        <Nav.Link href='/Viewpoll'> View Poll Stats </Nav.Link>
                    </Nav>

                    <Nav className="ms-auto"
                        style={{
                            marginRight: "3%",
                            border: "2px solid black",
                            borderRadius: "30px",
                            fontWeight: "bold"
                        }}>
                        <Nav.Link href='/Login'>
                            {"Login " + String.fromCharCode(8594)}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}