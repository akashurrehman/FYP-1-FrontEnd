import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import DataTable from 'react-data-table-component';
import './Styling/print.css';
import {Nav,Dropdown,DropdownButton,Form} from 'react-bootstrap';
import { handleAppointmentPrint } from "./PrintedFiles/AppointmentPrint";
import { useAuth } from "./Auth/AuthContext";
import jwt_decode from 'jwt-decode';
import {PrinterFill} from 'react-bootstrap-icons'
import LoadingSpinner  from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import { InputGroup,FormControl, FormLabel } from "react-bootstrap";
import './Styling/popupcard.css'; 

const Appointments=()=> {
  const [loading, setIsLoading] = useState(true);  
  const [data, setData] = useState([]);
  const [center, setCenterData] = useState({
    name: "",
    city: "",
    licenseNo: "",
    contactNo: "",
    email: "",
    location:"",
    });

  const {token} = useAuth();

  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const id = decodedToken?.id;
  const role = decodedToken?.role;
  const name=decodedToken?.Name;

  const authCentre=()=>{
    if(role!='CENTRE'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

    //For Filter
    const [filterBlood,setFilterBlood] = React.useState("Blood Group");
    const bloodArray = ['A+','B+','AB+','O+','A-','B-','AB-','O-'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterDate,setFilterDate] = React.useState("Donors");
    const dateArray = ['Recent','Day Ago','Week Ago','Month Ago','Year Ago'];

    const [filteredDataArray, setFilteredDataArray] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
    const filterDonorsByBloodGroup = (bloodGroup) => {
      const filteredDonors = data.filter((donor) => {
          return donor.BloodGroup.value.toLowerCase() === bloodGroup.toLowerCase();
      });
      
      setFilteredDataArray(filteredDonors);
      // console.log(filteredDonors);
    };
  
    const filterDonorsByCity = (city) => {
      const filteredDonors = data.filter((donor) => {
          return donor.City.value.toLowerCase() === city.toLowerCase();
      });
      setFilteredDataArray(filteredDonors);
    };
  
  

  useEffect(() => {
    // fetch data from the backend
    fetch(`http://localhost:8081/api/users/appointment/byCentreID/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // map the bindings array to an array of objects
        const rows = data.results.bindings.map((binding) => {
          return {
            ID: binding.ID,
            DonorName: binding.DonorName,
            DOB:binding.DOB,
            DonorEmail: binding.DonorEmail,
            DonorContactNo: binding.DonorContactNo,
            Gender: binding.Gender,
            Address: binding.Address,
            City: binding.City,
            BloodGroup: binding.BloodGroup,
            Location: binding.Location,
            Timings: binding.Timings,
          };
        });
        setData(rows);
        setFilteredDataArray(rows);
      })
      .catch((error) => console.log(error));
      authCentre();
      setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  
  useEffect(()=>{
    axios.get(`http://localhost:8081/api/bloodCenter/RegisteredCenters/${id}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const centerData = results.bindings[0];
        setCenterData({
          name: centerData.Name.value,
          city: centerData.City.value,
          contactNo: centerData.ContactNo.value,
          email: centerData.Email.value,
          licenseNo: centerData.License.value,
          location: centerData.Location.value,
          
        });

    }
  });
  
  },[]);

  const handlePrint = () => {
    handleAppointmentPrint(filteredDataArray,center);
    console.log("Handle Print button in Appointment!")
  };
  const mystyle = {
    height: "7%",
    width: "7%",
    borderRadius: "50px",
    display: "inline-block",
  };  

  const filterDonorsByGender = (name) => {
    console.log("name", name);
    const filteredDonors = data.filter((donor) => {
      return donor.Gender.value.toLowerCase() === name.toLowerCase();
    });
    setFilteredDataArray(filteredDonors);
    console.log("filterDonorsByName", filteredDonors);
  };
  
  const setArray = () => {
    setFilteredDataArray(data);
    console.log("setArray", data);
  };
  
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleClick = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    if(searchTerm !== '') {
      filterDonorsByGender(searchTerm);
    }
    else{
        setArray();
    }
  };

  return (
  <div>
   {loading ? (
    <LoadingSpinner />
    ) : (
    <Container fluid style={{backgroundColor:"#EEEEEE",paddingBottom:"10rem"}}>
      <Header />
      <Row>
        <Col xs={2}>
            <Sidebar />        
        </Col>
        <Col className="mt-md-5" xs={10}>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",marginLeft:"25px",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-2 rounded">
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
              <Card.Body>
                <Card.Title >Booked Appointments</Card.Title>
              </Card.Body>
          </Card>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",marginLeft:"25px",textAlign:"center"}} className="shadow p-3 mb-2 rounded">
              <Card.Body>
                <Card.Title style={{color:"red",fontSize:"15px",fontWeight:"bold"}}>Here you can see all the booked appointments!</Card.Title>
                <Card.Title style={{color:"red",fontSize:"15px",fontWeight:"bold"}}>You can accept or reject the appointments also</Card.Title>
              </Card.Body>
          </Card>

          <Container className='d-flex justify-content-center'>
          <Row style={{ width: '40%' }}>
            <form onSubmit={handleClick}>
                <FormLabel
                  className=" mr-5"
                  style={{ fontWeight: 'bold' ,paddingLeft:'25%'}}
                >
                  Filter by Gender
                </FormLabel>
                <InputGroup size="sm" className="mb-1">
                  <FormControl
                    placeholder="Search blood requests by Gender ..."
                    aria-label="Search Blood Donations"
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={handleChange}
                  />
                    {/* No submit button */}
                    <input type="submit" style={{ display: 'none' }} />
                    <InputGroup.Text id="basic-addon2">
                    <Search className="m-1 PurpleColor" size={18} />
                    </InputGroup.Text>
                </InputGroup>
            </form>
          </Row>
        </Container>
        <Card style={{marginLeft:"25px", marginBottom:"10px",backgroundColor:"#465e7f",color:"#FFFFFF"}}>
        <div style={{marginTop:'1%',marginBottom:'1%',paddingBottom:'3%',paddingTop:'3%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row>
                        <Col>
                            <FormLabel
                              className=" mr-5"
                              style={{ fontWeight: 'bold' ,paddingLeft:'12%'}}
                            >
                              By Blood Group
                            </FormLabel>
                            <FormLabel
                              className=" mr-5"
                              style={{ fontWeight: 'bold' ,paddingLeft:'5%'}}
                            >
                              By City
                            </FormLabel>
                        </Col>
                        <p className='d-flex'>
                            <div className='TextCursive PurpleColor' style={{margin:'5px',paddingRight:'2px',color:"#FFFFFF"}}>Filter by:</div>
                            <DropdownButton
                                id="dropdown-autoclose-false dropdown-menu-align-end"
                                variant="flat" align="end"
                                size='sm'
                                title={filterBlood}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {bloodArray.map((blood)=>(
                                        
                                        <Nav.Link 
                                            className='FilterListHoverColor'
                                            eventKey={blood} 
                                            onClick={() => {setFilterBlood(blood);filterDonorsByBloodGroup(blood)}}
                                        >
                                            <Form.Text>
                                                {`${blood}`} Blood
                                            </Form.Text>
                                        </Nav.Link>
                                    ),)}
                                    
                                </div>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-autoclose-false"
                                variant="flat"
                                size='sm'
                                title={filterCity}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {cityArray.map((city)=>(
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={city} 
                                            onClick={() => {setFilterCity(city);filterDonorsByCity(city)}}
                                        >
                                            <Form.Text>
                                                {`${city}`}
                                            </Form.Text>
                                        </Nav.Link>
                                    ),)}
                                    
                                </div>
                            </DropdownButton>
                            <div style={{paddingLeft:'5px'}}>
                                <Button size='sm' variant="flatSolid" onClick={()=>{setFilterCity('City');setFilterBlood('Blood Group');setFilterDate('Request Makers');setArray();  }}><Trash className="IcomColor" size={18} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </Card>

          {filteredDataArray.length > 0 ? (
          <div style={{marginLeft:"25px"}}>
          {
            filteredDataArray.map((item) => (
              <Col md={12} xs={12}>
                <Card className="shadow p-3 mb-2 rounded" id="card">
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col xs={5}>
                          <h6>
                            Email:  
                          </h6>
                          <h6>
                            Blood Group:
                          </h6>
                          <h6>
                            Gender:
                          </h6> 
                          <h6>
                            Contact No:
                          </h6>
                        </Col>
                        <Col xs={7}>
                          <h6>
                            {item.DonorEmail.value}
                          </h6>
                          <h6>
                            {item.BloodGroup.value}
                          </h6>
                          <h6>
                            {item.Gender.value}
                          </h6>
                          <h6>
                            {item.DonorContactNo.value}
                          </h6>
                        </Col>
                      </Row>
                    </Card.Text>                   
                  </Card.Body> 
                </Card>
              </Col>
            ))
          }
          </div>
          )
           : (
            <div>
              <h6 style={{textAlign:"center",marginTop:"20px"}}>No Appointments Found!</h6>
            </div>
          )}
          {
            filteredDataArray.length>0?(
              <div style={{marginLeft:"25px"}}>
              {
                <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"4px",marginTop:"16px"}}>
                <div>
                  <h6>
                    For Printing the Appointments, click this button. This is for record Purposes only.
                  </h6>
                  <Button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250",color:"#fff"}}><PrinterFill className="" size={20} />Download/Print</Button>
                </div>
              </Col>
              }
              </div>
          )
           : (
            <div>
              
            </div>
            )}
          

        </Col>
      </Row>
    </Container>
    )}
  </div>
  );
}

export default Appointments;