import React from 'react'
import appointmentService from '../../../Services/Api/User/AppointmentService';
import jwtDecode from 'jwt-decode';
import SingleAppointment from '../appointments/SingleAppointment';
import { Button, Col, Image, Nav, Row } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import image_news from '../../../Public/user/image/appointment.jpg';


export default function MyAppointments() {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken?.id;
    // console.log(id);

    const [appointments, setAppointments] = React.useState([]);

    const getData = () => {
        appointmentService
            .getAppointmentsByUserID(id)
            .then((data) => {
                setAppointments(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(getData, []);
    // console.log(appointments);

    return (
        <div>
            <Row>
                <Col sm={9}>
                <div style={{marginLeft:'5%'}}>
                    <h3 className='RedColor' style={{fontFamily:'',marginBottom:'2%',marginTop:'-10%',textAlign:'center'}}>My Appointments</h3>
                    <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'4%'}}>
                    Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need. 
                    </p>
                    
                    <div style={{width:'100%'}}>
                        {appointments?.length === 0 ? (
                                <Nav.Link href='/user/blood-donation-centre' className='TextColor' style={{textDecoration:'none'}}>Make your first Appointment <ArrowRight className="" size={17} /></Nav.Link>
                            ) : (
                                <Row className="d-flex justify-content-center">
                                    {appointments?.results?.bindings?.map((appointment, index) => (
                                        <Col sm={12} key={index}>
                                            <SingleAppointment key={index} appointment={appointment} />
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
                            <Image src={image_news} rounded style={{marginLeft: "0%",marginTop:'0%',height: "5rem",opacity:'1.0'}}></Image>
                            <Nav.Link style={{fontSize:'18px',fontWeight:'500',marginTop:'3%'}} className="RedColor" href="/user/blood-donation-centre">Make more appointments <ArrowRight className="" size={17} /></Nav.Link>
                            <p className="" style={{fontSize:'14px',color:'gray'}}>
                                Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need.  
                            </p>
                        </div>
                        <div style={{textAlign:'right'}}>
                        <Button variant='flat2Solid' size='sm' href='/user/blood-donation-centre' style={{marginBottom:'6%',marginRight:'6%'}}>Book Appointment</Button>
                    </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
