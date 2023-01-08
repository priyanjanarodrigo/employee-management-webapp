import Navbar from 'react-bootstrap/Navbar';

import { ReactElement } from "react"
import { Container } from 'react-bootstrap';

const HeaderComponent: React.FC = (): ReactElement => {
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">Employee Management App</Navbar.Brand>
                        {/* <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav> */}
                    </Container>
                </Navbar>
            </header>
        </div>
    );
}

export default HeaderComponent;