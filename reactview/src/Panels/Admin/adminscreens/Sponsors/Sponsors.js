import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import { Book } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import packageService from "../Services/PackageService";
import SingleSponsor from "../Components/SingleSponsor";
import { useAuth } from "../../../BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";
export default function Sponsors() {
  const {token} = useAuth();
    
  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;

  const authCentre=()=>{
    if(role!='ADMIN'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

  React.useEffect(() => {
    authCentre();
  }, []);

  const [users, setUsers] = React.useState([]);
  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };
  const [sponsors, setSponsors] = React.useState([]);
  const getData = () => {
    packageService
      .getSponsors()
      .then((data) => {
        setSponsors(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, []);
  console.log(sponsors.results);
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/getSponsor")
      .then((response) => {
        console.log("Response is:", response.data.results.bindings);
        const faqs = response.data.results.bindings.map((faq) => {
          return {
            title: faq.Name.value,
            message: faq.Message.value,
            id: faq.ID.value,
          };
        });
        setUsers(faqs);
        console.log("Sponser message", faqs.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name: Title, message: description };
    console.log("the data I am sending is", data);
    axios
      .post("http://localhost:8081/api/admin/addSponsor", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("My data response in Sponsors is", response);
        toast.success("Record Added successfully");
        getData();
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Sponsor. Please try again!");
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const campaignsContainer = pdfContainerRef.current;

    const buttons = campaignsContainer.querySelectorAll(".bton");
    buttons.forEach((button) => (button.style.display = "none"));

    html2canvas(campaignsContainer)
      .then((canvas) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));
        const imageData = canvas.toDataURL("image/png");
        doc.addImage(imageData, "PNG", 10, 10, 190, 0);
        doc.save("Sponsers.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));
        console.error("Error generating PDF:", error);
      });
    PDFnotify();
  };
  return (
    <div className="turningred fontfamily">
      <h1 className="color">Sponsors List</h1>

      <h3 className="color marginss">
        <u>Add a New Sponsor</u>
      </h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col settingss">
            <h5 className="rang">Name</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Book className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter Sponsor Name Here"
              >
                <Form.Control
                  type="City"
                  placeholder="Enter Sponsor Name Here"
                  value={Title}
                  onChange={handleTitleChange}
                />
              </FloatingLabel>
            </InputGroup>
          </div>

          <h5 className="rang">Description</h5>
          <div className="container-fluid">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              // defaultValue=""
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>

        <button className="btn btn-danger bton" onClick={handleSubmit}>
          Submit Data
        </button>
      </div>
      <h3 className="color marginss">
        <u>Sponsors List</u>
      </h3>

      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      <div style={{ width: "99.1%", marginBottom: "13%" }}>
        {sponsors.length === 0 ? (
             <p className="turningreddish">Hmmm....No Sponsors!!</p>
        ) : (
          <Row className=" cardsmapping m-5">
            {sponsors?.results?.bindings?.map((sponsors, index) => (
              <Col sm={12} key={index}>
                <SingleSponsor key={index} sponsors={sponsors} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
