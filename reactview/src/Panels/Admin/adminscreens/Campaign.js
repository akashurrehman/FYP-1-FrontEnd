import React, { useEffect, useState, useRef } from "react";
import { Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { CalendarDateFill, Geo, Laptop } from "react-bootstrap-icons";
import TextField from "@mui/material/TextField";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SingleCampaign from "./Components/SingleCampaign";
import packageService from "./Services/PackageService";
import { toast } from "react-toastify";
export default function Campaign() {
  const [users, setUsers] = React.useState([]);
  const [Title, setTitle] = useState("");
  const [Date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const pdfContainerRef = useRef(null);
  const [campaigns, setCampaigns] = React.useState([]);

  const getData = () => {
    packageService
      .getCampaigns()
      .then((data) => {
        setCampaigns(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, []);
  console.log(campaigns.results);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/getCompaigns")
      .then((response) => {
        console.log("Response is:", response.data.results.bindings);
        const faqs = response.data.results.bindings.map((faq) => {
          return {
            title: faq.Title.value,
            details: faq.Details.value,
            id: faq.ID.value,
          };
        });
        setUsers(faqs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title: Title, postDate: Date, details: description };
    console.log("the data I am sending is", data);
    axios
      .post("http://localhost:8081/api/admin/addCompaigns", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("My data response in Campaigns is", response);
        toast.success("Record Added successfully");
        getData();       
        setTitle("");
        setDate("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Campaign. Please try again!");
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

        doc.save("campaigns.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="turningred">
      <h1 className="color">Campaigns</h1>

      <h3 className="color marginss">
        <u>Create a New Campaign </u>
      </h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col">
            <h5 className="rang">Campaign Title</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <Laptop className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Title">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={Title}
                  onChange={handleTitleChange}
                />
              </FloatingLabel>
            </InputGroup>
          </div>
          <div className="col settingss">
            <h5 className="rang">Select Date</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <CalendarDateFill className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Date">
                <Form.Control
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={Date}
                  onChange={handleDateChange}
                />
              </FloatingLabel>
            </InputGroup>
          </div>

          <h5 className="rang">Description</h5>
          <TextField
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
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={handleSubmit}>
          Submit Data
        </button>
      </div>

      <h3 className="color marginss">
        <u>Campaigns Currently Live</u>
      </h3>
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      <div style={{ width: "99.1%", marginBottom: "13%" }}>
        {campaigns.length === 0 ? (
             <p className="turningreddish">Whoops! No Campaign Live?</p>
        ) : (
          <Row className="d-flex justify-content-center m-5">
            {campaigns?.results?.bindings?.map((campaign, index) => (
              <Col sm={12} key={index}>
                <SingleCampaign key={index} campaign={campaign} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
