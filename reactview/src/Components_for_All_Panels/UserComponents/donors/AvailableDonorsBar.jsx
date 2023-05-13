import React from "react";
import { Container,Row,Col,ListGroup,Card,Button,Table, Nav } from "react-bootstrap";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import '../css/style.css';
import donorService from "../../../Services/Api/User/DonorService";
import { ArrowRight, PostcardFill } from "react-bootstrap-icons";

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
                <div className='BarBox' style={{borderBottom:'',width:'130%',borderRadius:'10px'}}>
                    <Row>
                        <Col sm={4}>
                        <div style={{marginTop:'20%',textAlign:'center',marginLeft:'25%',marginBottom:'-10%'}}>
                            <div style={{ width: 50, height: 50,marginLeft:'0%'}}>
                            <CircularProgressbar value={donors?.results?.bindings?.length * 70} text={donors?.results?.bindings?.length *20 + "%"}
                                styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                // rotation: 0.25,
                            
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                            
                                // Text size
                                textSize: '22px',
                            
                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 3,
                            
                                // Can specify path transition in more detail, or remove it entirely
                                pathTransition: '',
                            
                                // Colors
                                pathColor: 'white',
                                textColor: 'white',
                                trailColor: '#D64045',
                                backgroundColor: '#D64045',
                                })}
                            />
                            
                            </div>
                            <div style={{fontSize:'14px',marginTop:'4%',color:'#fff1e1',fontFamily:'cursive'}}>
                                <Nav.Link href='/user/donor'><p>Donations</p></Nav.Link>
                            </div>
                        </div>
                        </Col>
                        <Col sm={2}></Col>
                        <Col sm={6}>
                        <div style={{marginTop:'10%',textAlign:'right',marginRight:'20%',marginBottom:'-5%'}}>
                            <div style={{fontSize:'14px',color:'white'}}>
                                <Nav.Link href='/user/donor'><PostcardFill className="" size={20} /></Nav.Link>    
                            </div>
                            <div style={{fontSize:'15px',color:'white'}}>
                                <p>{donors?.results?.bindings?.length}</p>
                            </div>
                            <div style={{fontSize:'11px',color:'white'}}>
                                <p>Total Donations</p>
                            </div>
                        </div>
                            
                        </Col>
                    </Row>
                    
                </div>
            </Container>
        </div>
        </div>
    </div> );
}
 
export default AvailableDonorsBar;