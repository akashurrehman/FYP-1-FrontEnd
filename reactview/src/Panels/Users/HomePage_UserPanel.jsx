import React, { useEffect, useRef } from "react";
import { Container,Row,Col,ListGroup,Card,Button,Table, Image, Nav } from "react-bootstrap";
import axios from "axios";
import UserPanelFooter from "../../Components_for_All_Panels/UserComponents/UserPanelFooter";
import UserPanelHeader from "../../Components_for_All_Panels/UserComponents/UserPanelHeader";
import CoverImage from "../../Public/user/image/blooddonate.jpg";
import CardImage1 from "../../Public/user/image/CardImage1.jpg";
import CardImage2 from "../../Public/user/image/CardImage2.jpg";
import CardImage3 from "../../Public/user/image/CardImage3.jpg";
import CardImage4 from "../../Public/user/image/CardImage4.jpg";
import CardImage5 from "../../Public/user/image/CardImage6.jpg";
import CardImage6 from "../../Public/user/image/CardImage5.jpg";
import Image1 from "../../Public/user/image/CoverImage21.jpg";
import Image2 from "../../Public/user/image/Image1.jpg";
import { ArrowUp,ArrowRight, } from 'react-bootstrap-icons';
import UserPanelBackToTopButton from "../../Components_for_All_Panels/UserComponents/UserPanelBackToTopButton";
import image_blood_analysis from '../../Public/user/image/blood-analysis.png';
import image_all_centre from '../../Public/user/image/all-centre-menu.png';
import image_post_blood_request from '../../Public/user/image/post-blood-request-menu.png';
import image_make_blood_donation from '../../Public/user/image/make-blood-donation-menu.png';
import image_book_appointment from '../../Public/user/image/book-appointment-menu.png';
import image_news from '../../Public/user/image/news.png';
import image_campaign from '../../Public/user/image/campaign.png';
import image_event from '../../Public/user/image/event.png';
import image_sponsor from '../../Public/user/image/sponsor.png';
import image_financial_donor from '../../Public/user/image/financial_donor.png';
import image_job_post from '../../Public/user/image/job.png';
import image_faq from '../../Public/user/image/faq.png';
import image_advertisement from '../../Public/user/image/advertisement.png';

import { useAuth } from "./../BloodDonationCentre/Auth/AuthContext";
import jwt_decode from 'jwt-decode';
// import { sparqlConnect, setQueryURL } from "sparql-connect";
 

import '../../Components_for_All_Panels/UserComponents/css/style.css';
import AvailableDonorsBar from "../../Components_for_All_Panels/UserComponents/donors/AvailableDonorsBar";
import AvailableRequestMakersBar from "../../Components_for_All_Panels/UserComponents/request_makers/AvailableRequestMakersBar";
import SingleFAQ from "../../Components_for_All_Panels/UserComponents/packages/faqs/SingleFAQ";
import packageService from "../../Services/Api/User/PackageService";
import { toast } from "react-toastify";



const HomeScreen_UserPanel = () => {

    // const endpoint = "http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#";
    // const query = `
    // PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>
    //   SELECT *
    //   WHERE {
    //   ?users bd:userEnrollsIn bd:DONOR_Website
    //   }    
    // `;
    // const sendQuery = async () => {
    //   console.log("Send Query Function Called");
    //   try {
    //     const response = await axios.post(endpoint, {
    //       query: query
    //     });
    //     const results = response.data;
    //     console.log(results);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };


   

    // const url = setQueryURL('http://localhost:3030/#/dataset/blood/query');
 
    // //Write a query that returns some resources with the additional field `label`
    // const query = `
    // SELECT ?persons ?id ?name ?email
    //     WHERE {
    //     ?persons rdf:type bd:Person .
    //     ?persons bd:hasPersonID ?id .
    //     ?persons bd:hasPersonFullName ?name .
    //     ?persons bd:hasPersonEmail ?email .
    //     }
    // `;
    // //Create a connector to populate the component with the results
    // const queryUrl = () => {
    //     const connector = sparqlConnect(query);
    //     console.log(connector);
    // };
    

    const value = 0.66;

    const {token} = useAuth();

    //This will get the id  from the token if user is login
    const decodedToken = token ? jwt_decode(token) : null;

    const role = decodedToken?.role;

    //For User Authentications only
    
    const authCentre=()=>{
    if(role!='USER'){
        window.location.href = "/user/login";
    }
        console.log("authCentre");
    }
    
      
    
    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        backgroundColor: isHover ? '#D64045' : '#27213C',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.9)' : 'scale(0.9)',
        border: isHover ? '' : '1px solid white',
    };

    React.useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        authCentre();
      }, []);

      const [faqs, setFAQs] = React.useState([]);

      const getData = () => {
          packageService
              .getFAQs()
              .then((data) => {
                  setFAQs(data);
              })
              .catch((err) => {
                  console.log(err);
          });
      };
    React.useEffect(getData, []);
    console.log(faqs.results);



    const isInitialRender = useRef(true);
    //For showing toast single time
    useEffect(() => {
        const showToast = () => {
            toast.success('You have successfully authenticated', {
            position: toast.POSITION.TOP_CENTER
            });
        };
    
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            showToast();
        }
    }, []);

    return ( 
        <div>
            <UserPanelHeader/>

            <div style={{position: "relative"}}>
                <div 
                    style={{
                        backgroundImage:`url(${CoverImage})`,backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',opacity: 0.85,paddingTop:"37%",marginBottom:"3%",backgroundColor: "",
                    }}>
                
                </div>

                    <div 
                        style={{position: "absolute",
                            bottom: "10%",left: "10%",
                            backgroundColor: "",color: "white",
                            padding: "30px",
                            marginLeft: "30px",textAlign: "center",
                            width:"80%",fontFamily: "Arial",opacity: "1.0"
                    }}>
                        <Row>
                            <Col sm={9}>
                                
                                <h5 className='pb-4' style={{color:'#f74046',fontWeight:'600'}}>DONATE BLOOD, SAVE LIFE!</h5>
                                <h1 className='pb-4' style={{fontFamily:"cursive",}}>Give the gift of "LIFE" and inspire others to donate</h1>
                                <Button variant="default" style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} href='/user/make-blood-donation'>Donate Now</Button>
                                {/* <h4 className="d-flex"><div style={{fontFamily:'cursive',color:"#D64045"}}>Donate</div><div style={{fontFamily:'cursive',color:'#27213C',fontSize:'15px'}}> life</div></h4> */}
                            </Col>
                            <Col sm={3}>
                                
                                <Row><AvailableDonorsBar></AvailableDonorsBar></Row>
                                <Row style={{marginTop:'7%',marginLeft:'-5%'}}><AvailableRequestMakersBar></AvailableRequestMakersBar></Row>
                                
                            </Col>
                        </Row>
                        
                    </div>
            </div>
            
            <div style={{marginTop:'-1.4%'}}>
                <Container>
                <Row className="" style={{marginBottom:"1%",alignItems: 'center',textAlign: 'center',marginLeft:"14%"}}>
                        <Col className="ColHover" sm={2} style={{backgroundColor:'white',borderRadius:'10px',marginRight:'1%'}}>
                            <div style={{padding:'6%'}}>
                                <Image src={image_blood_analysis} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                <Nav.Link style={{fontSize:'16px',fontWeight:'500',marginLeft:'-2.5%',paddingTop:'8%'}} className="RedColor" href="/user/blood-analysis">Check donor strength </Nav.Link>
                                
                            </div>
                        </Col>
                        <Col className="ColHover" sm={2} style={{backgroundColor:'white',borderRadius:'10px',marginRight:'1%'}}>
                            <div style={{padding:'6%'}}>
                                <Image src={image_post_blood_request} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                <Nav.Link style={{fontSize:'16px',fontWeight:'500',marginLeft:'-2.5%',paddingTop:'8%'}} className="RedColor" href="/user/post-blood-request">Post blood request </Nav.Link>
                                
                            </div>
                        </Col>
                        <Col className="ColHover" sm={2} style={{backgroundColor:'white',borderRadius:'10px',marginRight:'1%'}}>
                            <div style={{padding:'6%'}}>
                                <Image src={image_make_blood_donation} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                <Nav.Link style={{fontSize:'16px',fontWeight:'500',marginLeft:'-2.5%',paddingTop:'8%'}} className="RedColor" href="/user/make-blood-donation">Become a blood donor </Nav.Link>
                                
                            </div>
                        </Col>
                        <Col className="ColHover" sm={2} style={{backgroundColor:'white',borderRadius:'10px',marginRight:'1%'}}>
                            <div style={{padding:'6%'}}>
                                <Image src={image_all_centre} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                <Nav.Link style={{fontSize:'16px',fontWeight:'500',marginLeft:'-2.5%',paddingTop:'8%'}} className="RedColor" href="/user/blood-donation-centre">Where to donate blood </Nav.Link>
                                
                            </div>
                        </Col>
                        <Col className="ColHover" sm={2} style={{backgroundColor:'white',borderRadius:'10px',marginRight:'1%'}}>
                            <div style={{padding:'6%'}}>
                                <Image src={image_book_appointment} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                <Nav.Link style={{fontSize:'16px',fontWeight:'500',marginLeft:'-2.5%',paddingTop:'8%'}} className="RedColor" href="/user/blood-donation-centre">Book or make appointment </Nav.Link>
                                
                            </div>
                        </Col>
                        
                        
                    </Row>
                    
                </Container>
            </div>

        
                
            
            <div className="mb-5 pb-5" style={{backgroundColor:'rgba(245, 241, 241, 0.445)',borderRadius:'10px 100px / 120px'}}>
                <Container>
                    <div style={{textAlign:'center',marginTop:'5%',paddingTop:'4%' ,marginBottom:'5%',fontFamily:'cursive'}}>
                        <h2 className="RedColor">What you can give</h2>
                    </div>
                    <Row className="" style={{marginBottom:"10%"}}>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage1} height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Can I Donate Blood?</Card.Title>
                                    <Card.Text>
                                        See if you are eligible to donate blood today, or find frequently asked questions.
                                    </Card.Text>
                                    <Button href='/user/blood-analysis' size='sm' variant="flat">Check your strength</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage2}  height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Become a Blood Donor?</Card.Title>
                                    <Card.Text>
                                        Discover how you can give blood, plasma or platelets, and book your next donation.
                                    </Card.Text>
                                    <Button href='/user/make-blood-donation' size='sm' variant="flat">Become a Donor</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card  className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage3}  height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Find a Blood Donation Centre?</Card.Title>
                                    <Card.Text>
                                        There are donor centres all across the country. Find one that's closest to you.
                                    </Card.Text>
                                    <Button href='/user/blood-donation-centre' size='sm' variant="flat">Find a Center</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                
                    <Row className="mt-5">
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage4}  height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Find Blood Donors?</Card.Title>
                                    <Card.Text>
                                        There are donor all across the country/city. Find donor one that's closest to you.
                                    </Card.Text>
                                    <Button href='/user/donor' size='sm' variant="flat">Check Donors </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage5}  height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Post Blood Requests?</Card.Title>
                                    <Card.Text>
                                        If any one required blood any time they can post blood request of required blood.
                                    </Card.Text>
                                    <Button href='/user/post-blood-request' size='sm' variant="flat">Post Blood Request</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card  className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage6}  height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Find a Request Makers?</Card.Title>
                                    <Card.Text>
                                        There are request makers all across the country. Find one that's closest to you.
                                    </Card.Text>
                                    <Button href='/user/request-maker' size='sm' variant="flat">Find a Blood Requests</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>                
            </div>


            <div style={{marginTop:"6%",marginBottom:"10%"}}>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <img src={Image1} width="100%" height="500rem" />
                        </Col>
                        
                        <Col sm={4}>
                            <div style={{paddingTop:"30%",paddingLeft:"20%",textAlign:"left"}}>
                                <h5 className='PurpleColor'>Thinking about becoming a donor?</h5>
                                <h3 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Join us. Give the gift of life through blood donation.</h3>
                                <p className="text-left PurpleColor">Remember, by becoming a blood donor, you have the opportunity to positively impact countless lives. "Become a Hero: Donate Blood and Save Lives."</p>
                                <Button size='sm' variant="flatSolid">Register <ArrowRight className="" size={20} /></Button>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </div>


            <div style={{marginTop:"6%",marginBottom:"0%"}}>
                <Container>
                    <Row>
                    
                        <Col sm={4}>
                            <div style={{paddingTop:"30%",paddingLeft:"20%",textAlign:"left"}}>
                                <h5 className='PurpleColor'>Thinking about a blood donation?</h5>
                                <h3 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Join us. Become a blood donor and make a lasting impact.</h3>
                                <p className="text-left PurpleColor">Join the lifesaving community and become a blood donor. Donating blood is a simple and safe way to change lives.</p>
                                <Button size='sm' variant="flatSolid">Sign in <ArrowRight className="" size={20} /></Button>
                            </div>
                            
                        </Col>
                        <Col sm={2}></Col>   
                        <Col sm={6}>
                            <img src={Image2} width="80%" height="520rem" />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{
                paddingBottom:"2%", marginTop:"3%",
                textAlign:"left", paddingTop:"0%",
                fontFamily:"", backgroundColor:'rgba(245, 241, 241, 0.445)'
                }}>
                <div style={{textAlign:'center',marginTop:'5%',paddingTop:'4%' ,marginBottom:'5%',fontFamily:'cursive'}}>
                    <h2 className="RedColor">Your most frequently asked questions</h2>
                </div>
                <div style={{width:'99.1%',marginBottom:'2%'}}>
                    {faqs.length === 0 ? (
                            <p>There are no FAQs</p>
                        ) : (
                            <Row className="d-flex justify-content-center m-1">
                        
                                {faqs?.results?.bindings?.map((faq, index) => (
                                    <Col sm={12} key={index}>
                                        <SingleFAQ key={index} faq={faq} />
                                    </Col>
                                ))}
                            
                            </Row>
                        )}
                </div>
                
            </div>

            <div style={{marginTop:'0%', marginBottom:'0%'}}>
                <Container>
                    <div style={{textAlign:'center',marginTop:'0%',paddingTop:'4%' ,marginBottom:'5%',fontFamily:'cursive'}}>
                        <h2 className="RedColor">You may also like to view</h2>
                    </div>
                    <div>
                        <Row>
                            <Col sm={4}>
                                <div style={{textAlign:'left'}}>
                                    <Image src={image_news} rounded style={{marginLeft: "0%",marginBottom:'2%',height: "7rem",opacity:'1.0'}}></Image>
                                    <Nav.Link style={{fontSize:'22px',fontWeight:'500',marginLeft:'0%'}} className="RedColor" href="/user/news">News <ArrowRight className="" size={17} /></Nav.Link>
                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                    View latest news on our blood donation website thats helps you to be updated with latest news. 
                                    </p>
                                </div>
                                
                            </Col>
                            <Col sm={4}>
                                <div style={{textAlign:'left'}}>
                                    <Image src={image_campaign} rounded style={{marginLeft: "0%",marginBottom:'2%',height: "7rem",opacity:'1.0'}}></Image>
                                    <Nav.Link style={{fontSize:'22px',fontWeight:'500',marginLeft:'0%'}} className="RedColor" href="/user/campaign">Campaigns <ArrowRight className="" size={17} /></Nav.Link>
                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                    View different campaigns on our blood donation website thats helps you to involved in the latest campaigns.
                                    </p>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div style={{textAlign:'left'}}>
                                    <Image src={image_event} rounded style={{marginLeft: "0%",marginBottom:'2%',height: "7rem",opacity:'1.0'}}></Image>
                                    <Nav.Link style={{fontSize:'22px',fontWeight:'500',marginLeft:'0%'}} className="RedColor" href="/user/event">Events <ArrowRight className="" size={17} /></Nav.Link>
                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                    View latest events on our blood donation website thats helps you to attend different donating events.
                                    </p>
                                </div>
                            </Col>
                            
                        </Row>
                        
                        <Row style={{marginTop:'5%',marginBottom:'8%'}}>
                            <Col sm={4}>
                                <div style={{textAlign:'left'}}>
                                    <Image src={image_job_post} rounded style={{marginLeft: "0%",marginBottom:'2%',height: "7rem",opacity:'1.0'}}></Image>
                                    <Nav.Link style={{fontSize:'22px',fontWeight:'500',marginLeft:'0%'}} className="RedColor" href="/user/job-post">Job Posts <ArrowRight className="" size={17} /></Nav.Link>
                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                    View job posts on our blood donation website thats helps you to find different jobs and gives job opportunity to you.
                                    </p>
                                </div>
                                
                            </Col>
                            <Col sm={4}>
                                <div style={{textAlign:'left'}}>
                                    <Image src={image_financial_donor} rounded style={{marginBottom: "2%",marginTop:'0%',height: "7rem",opacity:'1.0'}}></Image>
                                    <Nav.Link style={{fontSize:'22px',fontWeight:'500',marginLeft:'0%'}} className="RedColor" href="/user/financial-donation">Financial Donors <ArrowRight className="" size={17} /></Nav.Link>
                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                    View financial donors on our blood donation website thats encourage you to become a financial donor.
                                    </p>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div style={{textAlign:'left'}}>
                                    <Image src={image_sponsor} rounded style={{marginLeft: "0%",marginBottom:'2%',height: "7rem",opacity:'1.0'}}></Image>
                                    <Nav.Link style={{fontSize:'22px',fontWeight:'500',marginLeft:'0%'}} className="RedColor" href="/user/sponsor">Sponsors <ArrowRight className="" size={17} /></Nav.Link>
                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                    View sponsors of our blood donation websites that provides information about your interest. 
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
            
            <Button
                variant="flat"
                onClick={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}
                style={{
                    position: 'fixed', padding: '0.4rem 0.4rem',
                    fontSize: '13px', bottom: '13px',
                    right: '1%',textAlign: 'center', borderRadius:"50%", borderWidth:'2px'
                }}>
                <ArrowUp className="p-1" size={28} />
            </Button>
        
            <UserPanelFooter />
        </div>
     );
}

export default HomeScreen_UserPanel;