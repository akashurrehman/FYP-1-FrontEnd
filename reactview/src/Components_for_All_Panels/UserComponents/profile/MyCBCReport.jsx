import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react'
import { Button, Col, Image, Nav, Row } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'

export default function MyCBCReport() {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userName = decodedToken?.name

    const [image, setImage] = React.useState('');

    React.useEffect(() => {
        getImage();
        console.log(image);
    },[]);

    const getImage = () => {
        console.log(userName);
        axios
            .get("http://localhost:3003/users/images/" + userName)
            .then((res) => {
                
                setImage(res.data);
            })
            .catch((error) => {
                
                console.log("error",error)
            });
    };

    return (
        <div>
            <Row>
                <Col sm={9}>
                <div style={{marginLeft:'5%'}}>
                    <h3 className='RedColor' style={{fontFamily:'',marginBottom:'2%',marginTop:'-10%',textAlign:'center'}}>My CBC Report</h3>
                    <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'4%'}}>
                    Donate blood, save a life - a small act of kindness can make a big difference in someone's life. Every drop counts - by donating blood, you have the power to bring hope and healing to someone in need. 
                    </p>
                    
                    <div style={{width:'70%',textAlign:'center'}}>
                    {image ? (
                        <img src={`http://localhost:3003/${image.imagePath.replace(/\\/g, '/').replace('public/', '')}`} alt="Image" />
                    ) : (
                        <Nav.Link className='RedColor'>Kindly upload your CBC report first then you will be able to view your CBC report here</Nav.Link>
                    )}
                    </div>
                </div>
                </Col>
                <Col sm={3}>
                    
                </Col>
            </Row>
        </div>
    )
}
