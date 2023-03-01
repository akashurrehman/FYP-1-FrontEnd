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
import {SparqlEndpointFetcher} from "fetch-sparql-endpoint";


const Appointments=()=> {  
  const [queryResult, setQueryResult] = useState(null)

  /**
   * Method for Sparql Query
   */
  const queryUrl= async()=>{  

    const myFetcher = new SparqlEndpointFetcher({
      method: 'POST',                           // A custom HTTP method for issuing (non-update) queries, defaults to POST. Update queries are always issued via POST.
      additionalUrlParams: new URLSearchParams({'infer': 'true', 'sameAs': 'false'}),  // A set of additional parameters that well be added to fetchAsk, fetchBindings & fetchTriples requests
      fetch: fetch,                             // A custom fetch-API-supporting function
      prefixVariableQuestionMark: false,        // If variable names in bindings should be prefixed with '?', defaults to false
      timeout: 5000                             // Timeout for setting up server connection (Once a connection has been made, and the response is being parsed, the timeout does not apply anymore).
    });
    
    const bindingsStream = await myFetcher.fetchBindings('https://dbpedia.org/sparql', 'SELECT * WHERE { ?s ?p ?o } LIMIT 100');
    bindingsStream.on('data', (bindings) => console.log("Bindings",bindings));
    // Will print [ variable('s'), variable('p'), variable('o') ] 
    bindingsStream.on('variables', (variables) => console.log(variables));
    
    /*
    const query = `
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX p: <http://www.wikidata.org/prop/>
    PREFIX ps: <http://www.wikidata.org/prop/statement/>
    PREFIX pq: <http://www.wikidata.org/prop/qualifier/>
    
    SELECT ?value WHERE {
      wd:Q243 p:P2048 ?height.
      ?height pq:P518 wd:Q24192182;
        ps:P2048 ?value .
    }`

    const url = 'https://query.wikidata.org/sparql'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json'
      },
      body: query
    })

    const data = await response.json()

    setQueryResult(data.results.bindings)
    console.log("data",data)
    */
  }

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
            <Button variant="primary" onClick={queryUrl}>
        Send Query to Ontology
      </Button >
        </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Appointments;