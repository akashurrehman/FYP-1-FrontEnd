import React from "react";
import { Container,Row,Col,ListGroup,Card,Button,Table, Nav } from "react-bootstrap";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import '../css/style.css';
import donorService from "../../../Services/Api/User/DonorService";
import requestMakerService from "../../../Services/Api/User/RequestMakerService";

const AvailableRequestMakersBar = () => {

    const [requestMakers, setRequestMakers] = React.useState([]);

    const getData = () => {
        requestMakerService
            .getRequestMakers()
            .then((data) => {
                setRequestMakers(data);
            })
            .catch((err) => {
                console.log(err);
        });
    };
    React.useEffect(getData, []);
    console.log(requestMakers?.results?.bindings?.length);

    return ( <div>
        <div className="d-flex justify-content-center">
        <div style={{}}>
            <Container>
                <div style={{border:'2px solid white', backgroundColor:'#7A5C58',width:'115%',borderRadius:'5%'}}>
                    <div style={{margin:'5%',textAlign:'center'}}>
                    <div style={{ width: 70, height: 70,marginLeft:'30%'}}>
                    <CircularProgressbar value={requestMakers?.results?.bindings?.length} text={requestMakers?.results?.bindings?.length}
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
                        pathColor: '#184A45FF',
                        textColor: '#B0B8B4FF',
                        trailColor: '#B0B8B4FF',
                        backgroundColor: '#B0B8B4FF',
                        })}
                    />
                    
                    </div>
                    <div style={{textAlign:'',marginTop:'4%',color:'#B0B8B4FF',fontFamily:'cursive'}}>
                        <Nav.Link href='/user/request-maker'><h7>Available Request Makers</h7></Nav.Link>
                    </div>
                    </div>
                </div>
            </Container>
        </div>
        </div>
    </div> );
}
 
export default AvailableRequestMakersBar;