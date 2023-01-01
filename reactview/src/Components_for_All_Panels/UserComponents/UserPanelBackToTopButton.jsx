import React from "react";
import { Container,Row,Col,ListGroup,Card,Button,Table } from "react-bootstrap";

import { ArrowUp } from 'react-bootstrap-icons';


const UserPanelBackToTopButton = () => {

    React.useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return ( 
        <div>
            <Container>
                <button
                    onClick={() => {
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}
                    style={{
                        position: 'relative', padding: '0.5rem 0.5rem',
                        fontSize: '15px', bottom: '20px',
                        left: '45.7%', backgroundColor: 'rgb(160, 15, 15)',
                        color: 'white',textAlign: 'center', borderRadius:"5%",
                    }}
                >
                    <ArrowUp className="" size={20} />
                    Back to top
                </button>
            </Container>
        </div>
    );
}
 
export default UserPanelBackToTopButton;