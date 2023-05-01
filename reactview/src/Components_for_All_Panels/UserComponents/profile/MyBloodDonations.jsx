import React from 'react'
import donorService from '../../../Services/Api/User/DonorService';
import jwtDecode from 'jwt-decode';
import SingleDonor from '../donors/SingleDonor';
import { Col, Nav, Row } from 'react-bootstrap';

export default function MyBloodDonations() {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken?.id;
    console.log(id);

    const [donors, setDonors] = React.useState([]);

    const getData = () => {
        donorService
          .getDonorsByUserID(id)
          .then((data) => {
            setDonors(data);
          })
          .catch((err) => {
            console.log(err);
          });
    };
    React.useEffect(getData, []);
    console.log(donors.results);

    return (
        <div style={{marginLeft:'10%'}}>
            <h3 className='TextColor' style={{fontFamily:'cursive',marginBottom:'2%',marginTop:'-10%',textAlign:'center'}}>My Blood Donations</h3>
            <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'8%'}}>
            Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need. 
            </p>
            <div style={{width:'100%'}}>
                {donors.length === 0 ? (
                        <Nav.Link href='/user/make-blood-donation' className='TextColor' style={{textDecoration:'none'}}>Make your first Blood Donation</Nav.Link>
                    ) : (
                        <Row className="d-flex justify-content-center">
                            {donors.results.bindings.map((donor, index) => (
                                <Col sm={6} key={index}>
                                    <SingleDonor key={index} donor={donor} />
                                </Col>
                                
                            ))}
                        </Row>
                    )}
            </div>
        </div>
    )
}
