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

const BloodRequests=()=> {  
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const [data, setData] = useState([]);

        const handleApprove = (id) => {
            axios
                .post(`http://localhost:8081/api/users/bloodrequest/approve/${id}`)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error));
        };
        const handleReject = (id) => {
            axios
                .post(`http://localhost:8081/api/users/bloodrequest/reject/${id}`)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error));
        };
        const handleChange = (state) => {
          // Get the selected rows from the state
        };
        

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
      console.log("selectedRows after updating state", selectedRows);
      
  }, [selectedRows]);

  const handlePrint = () => {
    //Console  results
    console.log(selectedRows);
    console.log("Button Clicked Print");
    let printContent = '<h1>All Blood Requests</h1><table>';
    printContent += '<tr><th>ID</th><th>Name</th><th>Email</th><th>Gender</th><th>Location</th><th>Message</th><th>Blood Group</th><th>Contact</th><th>City</th><th>Hospital</th></tr>';
      // Check if any rows are selected
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => {
        printContent += `<tr><td>${row.ID?.value}</td><td>${row.Name?.value}</td><td>${row.Email?.value}</td><td>${row.Gender?.value}</td><td>${row.Location?.value}</td><td>${row.Message?.value}</td><td>${row.Blood_Group?.value}</td><td>${row.Contact?.value}</td><td>${row.City?.value}</td><td>${row.Hospital?.value}</td></tr>`;
      });
    } else {
      data.forEach((row) => {
        printContent += `<tr><td>${row.ID.value}</td><td>${row.Name.value}</td><td>${row.Email.value}</td><td>${row.Gender.value}</td><td>${row.Location.value}</td><td>${row.Message.value}</td><td>${row.Blood_Group.value}</td><td>${row.Contact.value}</td><td>${row.City.value}</td><td>${row.Hospital.value}</td></tr>`;
      });
    }

    printContent += '</table>';
    // Create a new window with the printable HTML and print it
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="primary" style={{ borderRadius: 0,height:"30px", width:"100%", marginRight:"5px" }} onClick={handleApprove}>Remove</Button>
        <Button variant="success" style={{ borderRadius: 0,height:"30px",  width:"100%" }} onClick={handleReject}>Update</Button>
      </div>
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
              <Card.Title >All Blood Requests</Card.Title>
            </Card.Body>
        </Card>
        <DataTable 
          title="All Blood Requests"
          columns={columns}
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='500px'
          selectableRows
          subHeader
          onSelectedRowsChange={handleChange}
          selectableRowsHighlight
          highlightOnHover
        />
        </Col>
        <div>
              <button
                className='btn btn-info'
                onClick={handlePrint}
                style={{backgroundColor: "#153250", color:"white"}}
                disabled={selectedRows.length === 0} // disable the button if no rows are selected
              >
                Download Selected Blood Requests
              </button>
            </div>
      </Row>
    </Container>
  );
}

export default BloodRequests;