import React from 'react'
import requestMakerService from '../../../Services/Api/User/RequestMakerService';
import jwtDecode from 'jwt-decode';
import SingleRequestMaker from '../request_makers/SingleRequestMaker';
import image from '../../../Public/user/image/my-request.jpg';
import { Button, Col, Image, Nav, Row } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';

export default function MyBloodRequests() {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken?.id;
    console.log(id);

    const [requestMakers, setRequestMakers] = React.useState([]);

    const getData = () => {
        requestMakerService
          .getRequestMakersByUserID(id)
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
        <div>
        <Row>
            <Col sm={9}>
            <div style={{marginLeft:'5%'}}>
                <h3 className='RedColor' style={{fontFamily:'',marginBottom:'2%',marginTop:'-10%',textAlign:'center'}}>My Blood Requests</h3>
                <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'4%'}}>
                Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need. 
                </p>
                
                <div style={{width:'100%'}}>
                {requestMakers.length === 0 ? (
                        <Nav.Link href='/user/post-blood-request' className='TextColor' style={{textDecoration:'none'}}>Make your first Blood Request <ArrowRight className="" size={17} /></Nav.Link>

                    ) : (
                        <Row className="d-flex justify-content-center">
                            {requestMakers.results.bindings.map((requestMaker, index) => (
                                <Col sm={12} key={index}>
                                    <SingleRequestMaker key={index} requestMaker={requestMaker} />
                                </Col>
                                
                            ))}
                        </Row>
                    )}
                </div>
            </div>
            </Col>
            <Col sm={3}>
                <div style={{backgroundColor:'#F5F5DC',width:'130%',marginLeft:'7%',borderRadius:'10px'}}>
                    <div style={{textAlign:'left',padding:'8%'}}>
                        <Image src={image} rounded style={{marginLeft: "0%",marginTop:'0%',height: "5rem",opacity:'1.0'}}></Image>
                        <Nav.Link style={{fontSize:'18px',fontWeight:'500',marginTop:'3%'}} className="RedColor" href="/user/post-blood-request">Post more requests <ArrowRight className="" size={17} /></Nav.Link>
                        <p className="" style={{fontSize:'14px',color:'gray'}}>
                        Blood Request is a dedicated blood donation website module that aims to fill the gap between blood donors and individuals in need of blood transfusions. Our platform serves as a vital resource, connecting potential donors with patients, hospitals, and healthcare facilities in urgent need of blood.
                        </p>
                    </div>
                    <div style={{textAlign:'right'}}>
                    <Button variant='flat2Solid' size='sm' href='/user/request-maker' style={{marginBottom:'6%',marginRight:'6%'}}>View All Requests</Button>
                </div>
                </div>
            </Col>
        </Row>
    </div>
    )
}
