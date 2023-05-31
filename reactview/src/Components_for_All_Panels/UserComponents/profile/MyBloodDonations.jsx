import React from 'react'
import donorService from '../../../Services/Api/User/DonorService';
import jwtDecode from 'jwt-decode';
import SingleDonor from '../donors/SingleDonor';
import { Button, Col, Image, Nav, Row } from 'react-bootstrap';
import image from '../../../Public/user/image/my-donation.jpg';
import { ArrowRight } from 'react-bootstrap-icons';
import SingleDonorForAccount from '../donors/SingleDonorForAccount';


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
        <div>
        <Row>
            <Col sm={9}>
            <div style={{marginLeft:'5%'}}>
                <h3 className='RedColor' style={{fontFamily:'',marginBottom:'2%',marginTop:'-10%',textAlign:'center'}}>My Blood Donations</h3>
                <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'4%'}}>
                Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need. 
                </p>
                
                <div style={{width:'100%'}}>
                {donors.length === 0 ? (
                        <Nav.Link href='/user/make-blood-donation' className='TextColor' style={{textDecoration:'none'}}>Make your first Blood Donation  <ArrowRight className="" size={17} /></Nav.Link>
                    ) : (
                        <Row className="d-flex justify-content-center">
                            {donors.results.bindings.map((donor, index) => (
                                <Col sm={12} key={index}>
                                    <SingleDonorForAccount key={index} donor={donor} />
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
                        <Nav.Link style={{fontSize:'18px',fontWeight:'500',marginTop:'3%'}} className="RedColor" href="/user/make-blood-donation">Make more donation <ArrowRight className="" size={17} /></Nav.Link>
                        <p className="" style={{fontSize:'14px',color:'gray'}}>
                            Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need.  
                        </p>
                    </div>
                    <div style={{textAlign:'right'}}>
                    <Button variant='flat2Solid' size='sm' href='/user/donor' style={{marginBottom:'6%',marginRight:'6%'}}>View All Donations</Button>
                </div>
                </div>
            </Col>
        </Row>
    </div>
        
    )
}
