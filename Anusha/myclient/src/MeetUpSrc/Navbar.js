import { Nav, Navbar, Image } from "react-bootstrap";

export default function MyNavbar() {
    return (
        <div className="MyNavbar">
            <Navbar >
                <Navbar.Brand href="/">
                    <Image style={{ marginLeft: "10%" }}
                        src="https://anushasawsbucket.s3.amazonaws.com/MeetUp+Logo.png" roundedCircle
                        width="130px"
                        height="80px"
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

                    <Nav className='home'>
                        <Nav.Link href='/'> Meet Up </Nav.Link>
                    </Nav>
                    

                    {/* <Nav className="createpoll">
                        <Nav.Link href="/CreatePoll"> Create Poll </Nav.Link>
                    </Nav> */}

                    {/* <Nav className='Invite'>
                        <Nav.Link href='/Invite'> Invite </Nav.Link>
                    </Nav> */}

                    <Nav className='Response'>
                        <Nav.Link href='/Response'> Response </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}