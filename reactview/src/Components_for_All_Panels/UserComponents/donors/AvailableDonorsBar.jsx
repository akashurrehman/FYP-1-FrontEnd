import React from "react";
import { Container,Row,Col,ListGroup,Card,Button,Table, Nav } from "react-bootstrap";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import '../css/style.css';
import donorService from "../../../Services/Api/User/DonorService";

const AvailableDonorsBar = () => {

    const [donors, setDonors] = React.useState([]);

    const getData = () => {
        donorService
            .getDonors()
            .then((data) => {
                setDonors(data);
            })
            .catch((err) => {
                console.log(err);
        });
    };
    React.useEffect(getData, []);
    console.log(donors?.results?.bindings?.length);

    return ( <div>
        <div className="d-flex justify-content-center">
        <div style={{}}>
            <Container>
                <div style={{border:'2px solid white', backgroundColor:'#d2601a',width:'120%',borderRadius:'5%'}}>
                    <div style={{margin:'5%',textAlign:'center'}}>
                    <div style={{ width: 70, height: 70,marginLeft:'30%'}}>
                    <CircularProgressbar value={donors?.results?.bindings?.length} text={donors?.results?.bindings?.length}
                        styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        // rotation: 0.25,
                    
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        // strokeLinecap: 'butt',
                    
                        // Text size
                        textSize: '20px',
                    
                        // How long animation takes to go from one percentage to another, in seconds
                        // pathTransitionDuration: 0.5,
                    
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',
                    
                        // Colors
                        pathColor: '#1d3c45',
                        textColor: '#fff1e1',
                        trailColor: '#fff1e1',
                        backgroundColor: '#fff1e1',
                        })}
                    />
                    
                    </div>
                    <div style={{textAlign:'',marginTop:'4%',color:'#fff1e1',fontFamily:'cursive'}}>
                        <Nav.Link href='/user/donor'><h7>Available Blood Donors</h7></Nav.Link>
                    </div>
                    </div>
                </div>
            </Container>
        </div>
        </div>
    </div> );
}
 
export default AvailableDonorsBar;