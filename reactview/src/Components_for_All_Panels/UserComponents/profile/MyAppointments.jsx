import React from 'react'
import appointmentService from '../../../Services/Api/User/AppointmentService';
import jwtDecode from 'jwt-decode';
import SingleAppointment from '../appointments/SingleAppointment';
import { Button, Col, Nav, Row } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';

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
        <div style={{marginLeft:'5%'}}>
            <h3 className='' style={{fontFamily:'',marginBottom:'2%',marginTop:'-10%',textAlign:'center'}}>My Appointments</h3>
            <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'2.5%'}}>
            Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need. 
            </p>
            <div style={{textAlign:'right'}}>
                <Button variant='flatSolid' size='sm' href='/user/blood-donation-centre' style={{marginBottom:'6%'}}>Make More Appointments</Button>
            </div>
            <div style={{width:'100%'}}>
                {appointments?.length === 0 ? (
                        <Nav.Link href='/user/blood-donation-centre' className='TextColor' style={{textDecoration:'none'}}>Make your first Blood Donation</Nav.Link>
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
    )
}
