import { Container, Row, Col } from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f5f5f5', padding: '20px 0',position: 'fixed', marginTop:10,
        bottom: 0,width:'100%'}}>
            <Container>
                <Row>
                    <Col xs={4}>
                        <h4>About Us</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Col>
                    <Col xs={4}>
                        <h4>Contact Us</h4>
                        <p>Email: info@example.com</p>
                        <p>Phone: 555-555-5555</p>
                    </Col>
                    <Col xs={4} style={{textAlign: 'right'}}>
                        <p>Get Mobile Application</p>
                    </Col>
                </Row>
                <Navbar fixed="bottom" bg="light" className="justify-content-center">
            <Navbar.Text>
                &copy; Copyright 2021
            </Navbar.Text>
        </Navbar>
            </Container>
        </footer>
    );
}

export default Footer;
