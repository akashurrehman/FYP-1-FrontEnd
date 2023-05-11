import React from 'react'
import requestMakerService from '../../../Services/Api/User/RequestMakerService';
import jwtDecode from 'jwt-decode';
import SingleRequestMaker from '../request_makers/SingleRequestMaker';
import { Col, Nav, Row } from 'react-bootstrap';

export default function AcceptedBloodRequests() {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken?.id;
    console.log(id);

    const [requestMakers, setRequestMakers] = React.useState([]);

    const getData = () => {
        requestMakerService
            .getAcceptedRequestsByUserID(id)
            .then((data) => {
                setRequestMakers(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(getData, []);
    console.log(requestMakers.results);

    return (
        <div style={{marginleft:'10%'}}>
            <h3 className='TextColor' style={{fontFamily:'cursive',marginBottom:'2%',marginTop:'-10%',textAlign:'center'}}>Accepted Blood Requests</h3>
            <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'8%'}}>
            Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need.
            </p>
            <div style={{width:'100%'}}>
                {requestMakers.length === 0 ? (
                        <Nav.Link href='/user/post-blood-request' className='TextColor' style={{textDecoration:'none'}}>Make your first Blood Request</Nav.Link>

                    ) : (
                        <Row className="d-flex justify-content-center">
                            {requestMakers.results.bindings.map((requestMaker, index) => (
                                <Col sm={6} key={index}>
                                    <SingleRequestMaker key={index} requestMaker={requestMaker} />
                                </Col>
                                
                            ))}
                        </Row>
                    )}
            </div>
        </div>
    )
}
