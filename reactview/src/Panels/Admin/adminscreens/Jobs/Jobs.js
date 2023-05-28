import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import { CalendarDateFill, Laptop } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import packageService from "../Services/PackageService";
import SingleJob from "../Components/SingleJob";

export default function Jobs() {
  const [users, setUsers] = React.useState([]);
  const [Title, setTitle] = useState("");
  const [Date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

  const [jobs, setJobs] = React.useState([]);

  const getData = () => {
    packageService
      .getJobPosts()
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, []);
  console.log(jobs.results);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/getJobPost")
      .then((response) => {
        console.log("Response is:", response.data.results.bindings);
        const faqs = response.data.results.bindings.map((faq) => {
          console.log("id of my JOB POST IS :", faq.ID.value);
          return {
            title: faq.Title.value,
            details: faq.Details.value,
            date: faq.Date.value,
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
  // This is a handle submit function to submit the data when the user presses the submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title: Title, postingDate: Date, details: description };
    console.log("the data I am sending is", data);
    axios
      .post("http://localhost:8081/api/admin/addJobPost", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("My data response in Jobs is", response);
        toast.success("Record Added successfully");
        getData();
        setTitle("");
        setDate("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Job post. Please try again!");
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

        doc.save("Jobs.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
    PDFnotify();
  };

  return (
    <div className="turningred">
      <h3 className="color marginss">
        <u>Create a New Job Post </u>
      </h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col">
            <h5 className="rang">Job Title</h5>
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
        <u>Already Posted Campaigns</u>
      </h3>
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      <div style={{ width: "99.1%", marginBottom: "13%" }}>
        {jobs.length === 0 ? (
          <p className="turningreddish">There are no Jobs!!</p>
        ) : (
          <Row className="d-flex justify-content-center m-5">
            {jobs?.results?.bindings?.map((jobs, index) => (
              <Col sm={12} key={index}>
                <SingleJob key={index} jobs={jobs} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
