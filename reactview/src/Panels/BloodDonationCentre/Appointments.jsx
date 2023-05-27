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
import { handleAppointmentPrint } from "./PrintedFiles/AppointmentPrint";
import { useAuth } from "./Auth/AuthContext";
import jwt_decode from 'jwt-decode';
import {PrinterFill} from 'react-bootstrap-icons'
import LoadingSpinner  from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";

const Appointments=()=> {
  const [loading, setIsLoading] = useState(true);  
  const [data, setData] = useState([]);
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
      })
      .catch((error) => console.log(error));
      authCentre();
      setIsLoading(false);
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
      <Button variant="primary" style={{ borderRadius: 0, height:"50%", widht:"100%" }} onClick={() => alert('Download Receipt Option selected!')}> IP/CT </Button>
    )
  }
];

  return (
  <div>
   {loading ? (
    <LoadingSpinner />
    ) : (
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
            <button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250", color:"white"}}> <PrinterFill className="" size={20} /> Download/Print</button>
          }
          subHeader
        />
        </Col>
      </Row>
    </Container>
    )}
  </div>
  );
}

export default Appointments;