import React,{useState,useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import DataTable from 'react-data-table-component';
import {handleRequestsPrint} from "./PrintedFiles/BloodRequestsPrint";
import { useAuth } from "./Auth/AuthContext";
import jwtDecode from "jwt-decode";
import {PrinterFill} from 'react-bootstrap-icons'
import LoadingSpinner  from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";

const BloodRequests=()=> {  
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  
    const [center, setCenterData] = useState({
      name: "",
      
    });

  const {token} = useAuth();
  
  //This will get the id  from the token if user is login
  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken?.id;
  const role = decodedToken?.role;

  const authCentre=()=>{
    if(role!='CENTRE'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

  const donatedBy = decodedToken?.id;
  
  const getCentreNameById = () => {
    console.log("In getCentreNameById Method");
    axios.get(`http://localhost:8081/api/bloodCenter/RegisteredCenters/${id}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const centerData = results.bindings[0];
        setCenterData({
          name: centerData.Name.value,
        });

  }
});
    
  }

  const [filterByCenter, setFilterByCenter] = useState(false);
  const [centerId, setCenterId] = useState('');

  const [data, setData] = useState([]);

        const handleApprove = () => {
          console.log(id);
          console.log(center.name);
          const donorName = center.name;
          try {
            axios.put('http://localhost:8081/api/users/accept/bloodRequest/' + id, {
                donatedBy, donorName
            }).then((response)=>{
              console.log("Response Data:"+response.data);
              console.log(donorName);
              console.log(donatedBy)
              console.log("Donated By and Donor Name"+{donatedBy, donorName})
              alert("Request Accepted");
             }).catch((error)=>{
              console.log("Put Error"+error);
              alert("Request Not Accepted");
              console.log("Donated By and Donor Name"+{donatedBy, donorName})
              });
          } catch (error) {
              console.log("Catch Error here"+error);
              console.log("Donated By and Donor Name"+{donatedBy, donorName})
        } 
      };
        /* const handleReject = () => {
            axios
                .post(`http://localhost:8081/api/users/bloodrequest/reject/`+ id)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error)); 
        };
        */
        const handleChange = (state) => {
          // Get the selected rows from the state
        };

  useEffect(() => {
    // fetch data from the backend
    let url = 'http://localhost:8081/api/users/bloodrequest';
    if (filterByCenter) {
      url += `?centerId=${centerId}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // filter the results if filterByCenter is true
        if (filterByCenter) {
          data.results.bindings = data.results.bindings.filter(
            (binding) => binding.CenterID.value === centerId
          );
        }
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
      authCentre();
      getCentreNameById();
      setIsLoading(false);
  }, [selectedRows, filterByCenter, centerId]);

  const handlePrint = () => {
    handleRequestsPrint(data);
  };
  
   
const mystyle = {
  height: "7%",
  width: "7%",
  borderRadius: "50px",
  display: "inline-block",
};  

/* const columns = [
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
        <Button variant="success" style={{ borderRadius: 0,height:"30px", width:"100%", marginRight:"5px" }} onClick={handleApprove}><i class="fa fa-check" aria-hidden="true"></i>Approve</Button>
      </div>
    )
  }  
]; */
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
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-2 rounded">
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >All Blood Requests</Card.Title>
            </Card.Body>
        </Card>
        {/*
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
          actions ={
            <>
            <Button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250",color:"#fff"}}><PrinterFill className="" size={20} />Download/Print</Button>
            
            </>
          }
        /> */}
         {data.length > 0 ? (
          <div>
        {
          data.map((item) => (
            <Col md={12} xs={12}>
              <Card className="shadow p-3 mb-2 rounded">
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
              <h6 style={{textAlign:"center",marginTop:"20px"}}>No Blood Requests Found!</h6>
            </div>
          )}  
        
          {
            data.length>0?(
              <div>
              {
                <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                <div>
                  <h6>
                    For Printing the Blood Requests, click this button. This is for record Purposes only.
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
    )}
    </div>
  )};

export default BloodRequests;
