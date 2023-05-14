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
import './Styling/print.css';
import { handleDonorPrint } from "./PrintedFiles/DonorsPrint";

const ViewCenterDonors=()=> {  
  const [data, setData] = useState([]);
  // const {token} = useAuth();
  const authCentre=()=>{
    //if(!token){
      //   window.location.href = "/Login";
      // }
      console.log("authCentre");
  }

//This will get the id  from the token if user is login
// const {id} = jwt_decode(token);

  useEffect(() => {
    // fetch data from the backend
    fetch('http://localhost:8081/api/bloodCenter/RegisteredCenters/getDonorInfo')
      .then((response) => response.json())
      .then((data) => {
        // map the bindings array to an array of objects
        const rows = data.results.bindings.map((binding) => {
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
      })
      .catch((error) => console.log(error));
      authCentre();
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

const columns = [
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
  {
    name: 'Action',
    cell: (row) => (
      <Button variant="primary" style={{ borderRadius: 0, height:"50%", widht:"100%" }} onClick={() => alert('Download Receipt Option selected!')}>Download Receipt</Button>
    )
  }
];

  return (
    <Container fluid style={{backgroundColor:"#EEEEEE"}}>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar />        
        </Col>
        <Col className="mt-md-5" xs={9}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} >
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body style={{alignItems:"center",justifyContent:"center",textAlign:"center"}}>
              <Card.Title >All Donors till Now</Card.Title>
              <Card.Title >Contains the information of all the donors who donate at your blood donation center!</Card.Title>
            </Card.Body>
        </Card>
        <DataTable title = "All donors" columns={columns} data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='450px'
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          
          actions ={
            <button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250",color:"#fff"}}> Download</button>
          }
          subHeader
        />
        </Col>
      </Row>
    </Container>
  );
}

export default ViewCenterDonors;