import React from "react";
import { Container,Row,Col,ListGroup,Card,Button,Table } from "react-bootstrap";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import '../css/style.css';

const AvailableDonorsBar = () => {
    return ( <div>
        <div className="d-flex justify-content-center">
        <div style={{marginTop:'1%',marginBottom:'5%'}}>
            <Container>
            <div style={{ width: 100, height: 100,marginLeft:'30%'}}>
                <CircularProgressbar value={66} text={150}
                    styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    // rotation: 0.25,
                
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    // strokeLinecap: 'butt',
                
                    // Text size
                    textSize: '17px',
                
                    // How long animation takes to go from one percentage to another, in seconds
                    // pathTransitionDuration: 0.5,
                
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                
                    // Colors
                    pathColor: 'rgb(160, 15, 15)',
                    textColor: 'rgb(160, 15, 15)',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    })}
                />
                
            </div>
            <div style={{textAlign:'',marginTop:'3%',color:'rgb(160, 15, 15)',fontFamily:'cursive'}}>
                <h4>Available Blood Donors</h4>
            </div>
            </Container>
        </div>
        </div>
    </div> );
}
 
export default AvailableDonorsBar;