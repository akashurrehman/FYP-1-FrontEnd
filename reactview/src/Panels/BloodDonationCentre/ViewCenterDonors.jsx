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

const ViewCenterDonors=()=> {  
  const [data, setData] = useState([]);
  useEffect(() => {
    // fetch data from the backend
    fetch('http://localhost:8081/api/users/bloodrequest')
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
            Hospital: binding.Hospital,
          };
        });
        setData(rows);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePrint = () => {
    let printContent = '<h1>All Booked Appointment</h1><table>';
    printContent += '<tr><th>ID</th><th>Name</th><th>Email</th><th>Gender</th><th>Location</th><th>Message</th><th>Blood Group</th><th>Contact</th><th>City</th><th>Hospital</th></tr>';
    data.forEach((row) => {
      printContent += `<tr><td>${row.ID.value}</td><td>${row.Name.value}</td><td>${row.Email.value}</td><td>${row.Gender.value}</td><td>${row.Location.value}</td><td>${row.Message.value}</td><td>${row.Blood_Group.value}</td><td>${row.Contact.value}</td><td>${row.City.value}</td><td>${row.Hospital.value}</td></tr>`;
    });
    printContent += '</table>';
  // Add the watermark image
  printContent += '<div class="watermark"><img src="/../../Components_for_All_Panels/BloodCentre/Image/A-positive.jpg" /></div>';

      // Use CSS to style the background image
  const style = `
  <style>
    table {
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    .watermark {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.3;
    }
    .watermark img {
      display: block;
      margin: 0 auto;
      max-width: 50%;
      max-height: 50%;
    }
  
  </style>
`;
  
    // Create a new window with the printable HTML and print it
    const printWindow = window.open('', '_blank');

    printWindow.document.write(style + printContent);
    printWindow.document.close();
    printWindow.print();
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
    name: 'Hospital',
    selector: 'Hospital.value',
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
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}} >
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
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
            <button className='btn btn-info' onClick={handlePrint}> Download</button>
          }
          subHeader
        />
        </Col>
      </Row>
    </Container>
  );
}

export default ViewCenterDonors;