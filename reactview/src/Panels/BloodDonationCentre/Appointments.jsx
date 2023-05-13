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
import { handleAppointmentPrint } from "./PrintedFiles/AppointmentPrint";
const Appointments=()=> {  
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
    fetch('http://localhost:8081/api/users/appointment/byCentreID/Centre_001')
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
      })
      .catch((error) => console.log(error));
      authCentre();
  }, []);

  const handlePrint = () => {
    handleAppointmentPrint(data);
    console.log("Handle Print button in Appointment!")
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
    selector: 'DonorName.value',
  },
  {
    name: 'Email',
    selector: 'DonorEmail.value',
  },
  {
    name: 'Gender',
    selector: 'Gender.value',
  },
  {
    name: 'Blood Group',
    selector: 'BloodGroup.value',
  },
  {
    name: 'Contact',
    selector: 'DonorContactNo.value',
  },
  {
    name: 'City',
    selector: 'City.value',
  },
  {
    name: 'Address',
    selector: 'Address.value',
  },
  {
    name: 'Timings',
    selector: 'Timings.value',
  },
  {
    name: 'Appointment Status',
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
            <Card.Body>
              <Card.Title >Booked Appointments</Card.Title>
            </Card.Body>
        </Card>
        <DataTable title = "All Appointment" columns={columns} data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='450px'
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          
          actions ={
            <button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250", color:"white"}}> <i class="fa fa-download" aria-hidden="true"></i> Download</button>
          }
          subHeader
        />
        </Col>
      </Row>
    </Container>
  );
}

export default Appointments;