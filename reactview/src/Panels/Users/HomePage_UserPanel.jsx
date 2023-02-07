import React from "react";
import { Container,Row,Col,ListGroup,Card,Button,Table } from "react-bootstrap";
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
import { ArrowUp,ArrowRight,QuestionCircle,HospitalFill,BatteryHalf,PeopleFill,QuestionLg,PostcardFill, DropletFill } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UserPanelBackToTopButton from "../../Components_for_All_Panels/UserComponents/UserPanelBackToTopButton";

import '../../Components_for_All_Panels/UserComponents/css/style.css';



const HomeScreen_UserPanel = () => {

    const value = 0.66;

    
    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'white',
        color: isHover ? 'white' : 'rgb(160, 15, 15)',
        transform: isHover ? '' : 'scale(1.05)',
    };

    React.useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return ( 
        <div>
            <UserPanelHeader/>

            <div style={{position: "relative"}}>
                <div 
                    style={{
                        backgroundImage:`url(${CoverImage})`,backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',opacity: 0.8,paddingTop:"37%",marginBottom:"3%",backgroundColor: "",
                    }}>
                
                </div>

                    <div 
                        style={{position: "absolute",
                            bottom: "20%",left: "22%",
                            backgroundColor: "",color: "white",
                            padding: "30px",
                            marginLeft: "30px",textAlign: "center",
                            width:"50%",fontFamily: "Arial",opacity: "1.0"
                    }}>
                        <h5 className='pb-4' style={{}}>DONATE BLOOD, SAVE LIFE!</h5>
                        <h1 className='pb-4' style={{fontFamily:"cursive",}}>Give the gift of "LIFE" and inspire others to donate</h1>
                        
                        
                        <Button variant="default" style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Donate <ArrowRight className="" size={22} /></Button>
                    </div>
            </div>
            
            <div style={{}}>
                <Container>
                <Row className="" style={{marginBottom:"1%",alignItems: 'center',textAlign: 'center',marginLeft:"14%"}}>
                        <Col sm={2}>
                            <a href='/user/make-blood-donation' style={{color: 'rgb(160, 15, 15)',alignItems: 'center',textAlign: 'center'}}>
                                <DropletFill className="IconHover" size={43} />
                                <p className="pt-3">How to give blood?</p>
                            </a>
                        </Col>
                        <Col sm={2}>
                            <a href='/user/home' style={{color: 'rgb(160, 15, 15)',alignItems: 'center',textAlign: 'center'}}>
                                <HospitalFill className="IconHover" size={43} />
                                <p className="pt-3">Where to give blood?</p>
                            </a>
                        </Col>
                        <Col sm={2}>
                            <a href='/user/donor' style={{color: 'rgb(160, 15, 15)',alignItems:'center',textAlign:'center'}}>
                                <PeopleFill className="IconHover" size={43} />
                                <p className="pt-3">Blood Donors?</p>
                            </a>
                        </Col>
                        <Col sm={2}>
                            <a href='/user/request-maker' style={{color: 'rgb(160, 15, 15)',alignItems: 'center',textAlign: 'center'}}>
                                <PostcardFill className="IconHover" size={43} />
                                <p className="pt-3">Blood Requests?</p>
                            </a>
                        </Col>
                        <Col sm={2}>
                            <a href='/user/home' style={{color: 'rgb(160, 15, 15)',alignItems: 'center',textAlign: 'center'}}>
                                <QuestionLg className="IconHover" size={43} />
                                <p className="pt-3">Can I give blood?</p>
                            </a>
                        </Col>
                        
                        
                    </Row>
                    
                </Container>
            </div>

        
            <div style={{marginTop:'5%',marginBottom:'5%'}}>
                <Container>
                <div style={{ width: 100, height: 100,marginLeft:'45%'}}>
                    <CircularProgressbar value={66} text={111}
                     styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        // rotation: 0.25,
                    
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        // strokeLinecap: 'butt',
                    
                        // Text size
                        textSize: '17px',
                    
                        // How long animation takes to go from one percentage to another, in seconds
                        // pathTransitionDuration: 0.5,
                    
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',
                    
                        // Colors
                        pathColor: 'rgb(160, 15, 15)',
                        textColor: 'rgb(160, 15, 15)',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                    />
                    
                </div>
                <div style={{textAlign:'center',marginTop:'2%',color:'rgb(160, 15, 15)'}}>
                    <h4>Available Blood Donors</h4>
                </div>
                </Container>
            </div>
                
            
            <div className="mb-5 pb-5" style={{backgroundColor:'rgba(245, 241, 241, 0.445)',borderRadius:'10px 100px / 120px'}}>
                <Container>
                    <div style={{textAlign:'center',marginTop:'5%',paddingTop:'4%' ,marginBottom:'5%',color:'rgb(160, 15, 15)',fontFamily:'cursive'}}>
                        <h2>What you can give</h2>
                    </div>
                    <Row className="" style={{marginBottom:"10%"}}>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={CardImage1} height="275rem"/>
                                <Card.Body>
                                    <Card.Title>Can I Donate Blood?</Card.Title>
                                    <Card.Text>
                                        See if you are eligible to donate blood today, or find answers to frequently asked questions.
                                    </Card.Text>
                                    <Button variant="flat">Check eligibility <ArrowRight className="" size={22} /></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={CardImage2}  height="275rem"/>
                                <Card.Body>
                                    <Card.Title>Making Your Donation?</Card.Title>
                                    <Card.Text>
                                        Discover how you can give blood, plasma or platelets, and book your next donation.
                                    </Card.Text>
                                    <Button variant="flat">Know how to donate <ArrowRight className="" size={22} /></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card  className="ColHover" border="danger" style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={CardImage3}  height="275rem"/>
                                <Card.Body>
                                    <Card.Title>Find a Blood Donation Centre?</Card.Title>
                                    <Card.Text>
                                        There are donor centres all across the country. Find one that's closest to you.
                                    </Card.Text>
                                    <Button variant="flat">Find a Center <ArrowRight className="" size={22} /></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                
                    <Row className="mt-5">
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={CardImage4}  height="275rem"/>
                                <Card.Body>
                                    <Card.Title>Find Blood Donors?</Card.Title>
                                    <Card.Text>
                                        There are donor all across the country/city. Find donor one that's closest to you.
                                    </Card.Text>
                                    <Button variant="flat">Check donors <ArrowRight className="" size={22} /></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={CardImage5}  height="275rem"/>
                                <Card.Body>
                                    <Card.Title>Post Blood Requests?</Card.Title>
                                    <Card.Text>
                                        If any one required blood any time they can post blood request of required blood anytime.
                                    </Card.Text>
                                    <Button variant="flat">Post Blood Request <ArrowRight className="" size={22} /></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card  className="ColHover" border="danger" style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={CardImage6}  height="275rem"/>
                                <Card.Body>
                                    <Card.Title>Find a Request Makers?</Card.Title>
                                    <Card.Text>
                                        There are request makers all across the country. Find one that's closest to you.
                                    </Card.Text>
                                    <Button variant="flat">Find a Request Maker <ArrowRight className="" size={22} /></Button>
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
                            <img src={Image1} width="100%" height="550rem" />
                        </Col>
                        
                        <Col sm={4}>
                            <div style={{paddingTop:"30%",paddingLeft:"20%",textAlign:"left"}}>
                                <h5>Thinking about becoming a donor?</h5>
                                <h1 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Join us. Be the Life of a dead person.</h1>
                                <p className="text-left">Our blood donors might not look or sound alike, but they all share one thing. Together, they’re the Lifeblood of Pakistan. Join us.</p>
                                <Button variant="flatSolid">Register <ArrowRight className="" size={22} /></Button>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </div>


            <div style={{marginTop:"6%",marginBottom:"10%"}}>
                <Container>
                    <Row>
                    
                        <Col sm={4}>
                            <div style={{paddingTop:"30%",paddingLeft:"20%",textAlign:"left"}}>
                                <h5>Thinking about a blood donation?</h5>
                                <h1 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Join us. Be the Life Donor.</h1>
                                <p className="text-left">Our blood donors might not look or sound alike, but they all share one thing. Together, they’re the Lifeblood of Pakistan. Join us.</p>
                                <Button variant="flatSolid">Sign in <ArrowRight className="" size={22} /></Button>
                            </div>
                            
                        </Col>
                        <Col sm={2}></Col>   
                        <Col sm={6}>
                            <img src={Image2} width="80%" height="650rem" />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{
                paddingBottom:"6%", marginTop:"7%",
                textAlign:"left", paddingTop:"2%",
                fontFamily:"cursive", backgroundColor:'rgba(245, 241, 241, 0.445)'
                }}>
                <Container className="mt-5">
                    <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)"}}>Your most asked questions</h2>
                    <div>
                        <Row className="mt-5">
                            <Col sm={5} style={{}}><a href="/user/register" className="TextColor">
                                If I've been diagnosed with COVID-19, When can i donate blood?</a>
                            </Col>
                            <Col sm={2}></Col>
                            <Col sm={5} style={{}}><a href="/user/register" className="TextColor">
                                I have a tattoo, Can I donate blood?</a>
                            </Col>
                        </Row>
                        
                        <Row className="mt-4">
                            <Col sm={5} style={{}}><a href="/user/register" className="TextColor">
                                I lived in the Pakistan for six months in 2014, When will I be able to donate?</a>
                            </Col>
                            <Col sm={2}></Col>
                            <Col sm={5} style={{}}><a href="/user/register" className="TextColor">
                                I have a low iron, Can I donate blood?</a>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col sm={5} style={{}}><a href="/user/register" className="TextColor">
                                What medications will prevent me from donating?</a>
                            </Col>
                            <Col sm={2}></Col>
                            <Col sm={5} style={{}}><a href="/user/register" className="TextColor">
                                All frequently asked questions?</a>
                            </Col>
                        </Row>
                        
                    </div>
                </Container>
                
            </div>

            

            <div>
                <Container>
                    <UserPanelBackToTopButton></UserPanelBackToTopButton>
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