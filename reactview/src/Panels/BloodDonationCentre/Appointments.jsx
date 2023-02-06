import React,{useState} from "react";
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

const Appointments=()=> {
/*  
    const endpoint = "http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#";
    const query = `
    PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>
      SELECT *
      WHERE {
      ?users bd:userEnrollsIn bd:DONOR_Website
      }    
    `;
    const sendQuery = async () => {
      console.log("Send Query Function Called");
      try {
        const response = await axios.post(endpoint, {
          query: query
        });
        const results = response.data;
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    };
  */
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
  
    const handleChange = (event) => {
      setImage(event.target.files[0]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append("image", image);
  
      axios
        .post("http://localhost:3003/users/upload", formData)
        .then((res) => {
          console.log(res.data)
          setMessage(res.data.message);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    };  
const mystyle = {
  height: "7%",
  width: "7%",
  borderRadius: "50px",
  display: "inline-block",
};  

const columns = [

  {
    name: "Donor Name",
    selector: (row) => row.name,
    sortable: true
  },
  {
    name: "Donor Address",
    selector: (row) => row.nativeName
  },
  {
    name: "Donor Age",
    selector: (row) => row.capital
  },
  {
    name: "Donors Details",
    selector: (row) => <img width ={50} height={50} src ={row.flag}/>
  },
  {
    name: 'Action',
    cell: (row) => (
      <button className='btn btn-primary' onClick={() => alert(row.alpha2Code)}> Download Receipt</button>
    )
  }
];
  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar />        
        </Col>
        <Col className="mt-md-5" xs={9}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}} >
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Booked Appointments</Card.Title>
            </Card.Body>
        </Card>
  <DataTable title = "All Appointment" columns={columns}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    
    actions ={
      <button className='btn btn-info'> Download</button>
    }
    subHeader
  />
        <CardGroup>
            <form onSubmit={handleSubmit}>
              <input type="file" accept="image/*"  onChange={handleChange} />
              <button type="submit">Upload</button>
              {message && <p>{message}</p>}
            </form>
        </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Appointments;