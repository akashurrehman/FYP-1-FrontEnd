import React,{useState,useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import DataTable from 'react-data-table-component';
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import './Styling/print.css';
import { handleDonorPrint } from "./PrintedFiles/DonorsPrint";
import { useAuth } from "./Auth/AuthContext";
import jwt_decode from 'jwt-decode';
import {  PrinterFill } from 'react-bootstrap-icons';
import LoadingSpinner  from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import { toast } from "react-toastify";
import { InputGroup,FormControl } from "react-bootstrap";
import './Styling/popupcard.css'; 
import {BsFillAwardFill} from "react-icons/bs";
const ViewCenterDonors=()=> {
  const [loading, setIsLoading] = useState(true);  
  const [data, setData] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {token} = useAuth();
  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const id = decodedToken?.id;
  const role = decodedToken?.role;
  const authCentre=()=>{
    if(role!='CENTRE'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

  

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8081/api/bloodCenter/RegisteredCenters/getDonorInfo')
      .then((response) => response.json())
      .then((res) => {
        // Map the bindings array to an array of objects
        const rows = res.results.bindings.map((binding) => {
          return {
            ID: binding.ID,
            Name: binding.Name,
            Email: binding.Email,
            Gender: binding.Gender,
            Location: binding.Location,
            Message: binding.Message,
            Blood_Group: binding.Blood_Group,
            Contact: binding.Contact,
            City: binding.City,
          };
        });
        setData(rows);
        setFilteredDataArray(rows);
        console.log("Data:", rows);
      })
      .catch((error) => console.log(error));
    authCentre();
    setIsLoading(false);
    toast.info('You are in center Donor Page!', { position: toast.POSITION.TOP_CENTER });
  }, []);
  

  const handlePrint = () => {
    handleDonorPrint(data);
    console.log("Handle Print button in Donors!")
  };
  const mystyle = {
    height: "7%",
    width: "7%",
    borderRadius: "50px",
    display: "inline-block",
  };  
  const filterDonorsByName = (name) => {
    console.log("name", name);
    const filteredDonors = data.filter((donor) => {
      return donor.Name.value.toLowerCase() === name.toLowerCase();
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
        filterDonorsByName(searchTerm);
    }
    else{
        setArray();
    }
  };

/* const columns = [
  {
    name: 'ID',
    selector: 'ID.value',
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'Name.value',
  },
  {
    name: 'Email',
    selector: 'Email.value',
  },
  {
    name: 'Gender',
    selector: 'Gender.value',
  },
  {
    name: 'Blood Group',
    selector: 'Blood_Group.value',
  },
  {
    name: 'Contact',
    selector: 'Contact.value',
  },
  {
    name: 'City',
    selector: 'City.value',
  },
]; */

  return (
    loading ? <LoadingSpinner /> :
    <Container fluid style={{backgroundColor:"#EEEEEE"}}>
      <Header />
      <Row>
        <Col xs={2}>
            <Sidebar />        
        </Col>
        <Col className="mt-md-5" xs={10}>
          <Card className="shadow p-3 mb-2 rounded" style={{marginTop:30,paddingBottom:10,alignItems:"center",marginLeft:"25px",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} >
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
              <Card.Body style={{alignItems:"center",justifyContent:"center",textAlign:"center"}}>
                <Card.Title>All Donors till Now</Card.Title>
                <Card.Title>Contains the information of all the donors who donate at your blood donation center!</Card.Title>
              </Card.Body>
          </Card>

            {/* <DataTable title = "All donors" columns={columns} data={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='450px'
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            
            actions ={
              <button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250",color:"#fff"}}> <PrinterFill className="" size={20} />Download/Print</button>
            }
            subHeader
            /> */}
          <Container className='d-flex justify-content-center'>
            <Row style={{ width: '40%' }}>
              <form onSubmit={handleClick}>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                        placeholder="Search blood donor by name ..."
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
          
          {filteredDataArray.length > 0 ? (
          <div style={{marginLeft:"25px"}}>
          {
            filteredDataArray.map((item) => (
              <Col md={12} xs={12}>
                <Card className="shadow p-3 mb-2 mt-2 rounded" id="card">
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col xs={5} md={5}>
                          <h6>
                            Email:  
                          </h6>
                          <h6>
                            Name:  
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
                          <h6>
                            City:
                          </h6>
                        </Col>
                        <Col xs={7} md={4}>
                          <h6>
                            {item.Email.value}
                          </h6>
                          <h6>
                            {item.Name.value}
                          </h6>
                          <h6>
                            {item.Blood_Group.value}
                          </h6>
                          <h6>
                            {item.Gender.value}
                          </h6>
                          <h6>
                            {item.Contact.value}
                          </h6>
                          <h6>
                            {item.City.value}
                          </h6>
                        </Col>
                        <Col md={3} id="verifyicon">
                        <BsFillAwardFill className="mt-5" size={55} color="#003268"/>
                        <h5>VERIFIED</h5>
                        </Col>
                      </Row>
                    </Card.Text>                   
                  </Card.Body> 
                </Card>
              </Col>
            ))
         }
         </div>
          ) : (
            <div>
              <h6 style={{textAlign:"center",marginTop:"20px"}}>No Donors Found!</h6>
            </div>
          )}
          {
            filteredDataArray.length>0?(
              <div>
              {
                <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                  <div>
                    <h6>
                      For Printing the Donors list, click this button. This is for record Purposes only.
                    </h6>
                      <Button className='btn btn-info mb-3' onClick={handlePrint} style={{backgroundColor: "#153250",color:"#fff"}}><PrinterFill className="" size={20} />Download/Print</Button>
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
  );
}

export default ViewCenterDonors;