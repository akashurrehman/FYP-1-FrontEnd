import React,{useState,useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import Header from "./LabComponents/Header";
import { handleRequestReportsPrint } from "./LabComponents/PrintedFiles/RequestedReport";
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import {  PrinterFill } from 'react-bootstrap-icons';
const ReportRequests=()=> {  
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
        const handleApprove = (id) => {
          console.log("ID:"+id);
        
          // Find the approved data from the current data state and remove it
          const approvedItem = data.find((item) => item.ID.value === id);
          setData(data.filter((item) => item.ID.value !== id));
          console.log("Data after removing approved item", data);
          // Add the approved data to the approvedData state array
          setApprovedData((prevData) => [...prevData, approvedItem]);
          console.log("approvedData", approvedData);

        };
        const handleReject = (id) => {
          console.log("ID:"+id);  
          /* axios
                .post(`http://localhost:8081/api/users/bloodrequest/reject/${id}`)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error)); */
              // Find the rejected data from the current data state and remove it
              setData(data.filter((item) => item.ID.value !== id));
              console.log("Data after removing rejected item", data);
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
      setIsLoading(false);
  }, []);
  const handlePrint = () => {
    handleRequestReportsPrint(data);
  };
   
const mystyle = {
  height: "7%",
  width: "7%",
  borderRadius: "50px",
  display: "inline-block",
};  
/* 
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
        <Button variant="primary" style={{ borderRadius: 0, width:"100%", height:"auto",marginRight:"5px" }} onClick={() => handleApprove(row.ID.value)}>Approve</Button>
        <Button variant="success" style={{ borderRadius: 0, width:"100%",height:"auto" }} onClick={() => handleReject(row.ID.value)}>Deny</Button>
      </div>
    )
  }  
]; */
  return (
    loading ? <LoadingSpinner/> :
    <Container style={{backgroundColor:"#EEEEEE"}} fluid>
      <Header />
      <Row>
        <Col className="mt-sm-5" xs={12}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#85586F",color:"white"}} className="shadow p-3 mb-2 rounded">
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >All Report Requests</Card.Title>
            </Card.Body>
        </Card>
        {/*  <DataTable title = "All Reports Requests" columns={columns} data={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='500px'
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            actions ={
              <button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250",color:"white"}}> Download All Report Requests</button>
            }
            subHeader
          /> */}
          {data.length > 0 ? (
          <div>
          {
            data.map((item) => (
              <Col md={12} xs={12}>
                <Card className="shadow p-3 mb-2 mt-2 rounded">
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
                            {item.Email.value}
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
              <h6 style={{textAlign:"center",marginTop:"20px"}}>No Report Requests Found!</h6>
            </div>
          )}
          {
            data.length>0?(
              <div>
              {
                <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                  <div>
                    <h6>
                      For Printing the Report list, click this button. This is for record Purposes only.
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

export default ReportRequests;