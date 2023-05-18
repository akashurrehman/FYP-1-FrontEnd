import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { TextField } from "@mui/material";
import { CalendarDateFill, Laptop } from "react-bootstrap-icons";
import JobsPopUp from "../PopUps/JobsPopUp";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Jobs() {
  const [users, setUsers] = React.useState([]);
  const [Title, setTitle] = useState("");
  const [Date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/admin/deleteJobPost/${id}`)
      .then((response) => {
        console.log(response);
        toast.success("Record Deleted successfully");

        // Remove the deleted FAQ from the users state
        setUsers((prevUsers) => prevUsers.filter((faq) => faq.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete Job post. Please try again!");
      });
  };

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

        // Create a new job post object with the same properties as the response data
        const newJobPost = {
          title: Title,
          postingDate: Date,
          details: description,
          id: response.data.id, // Assuming the API returns the new job post's ID
        };

        // Update the jobPosts state by adding the new job post to the existing array
        setUsers((prevJobPosts) => [...prevJobPosts, newJobPost]);

        setTitle("");
        setDate("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Job post. Please try again!");
      });
  };

  const handleUpdate = (input1Value, input2Value, id, dateVal) => {
    // Handle the update logic here

    const updata = {
      title: input1Value,
      details: input2Value,
      date: dateVal,
    };
    console.log("the data for financial donation I am updating is", updata);
    axios
      .put(
        `http://localhost:8081/api/admin/jobPost/JobPostDetails/update/${id}`,
        updata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("Record Updated successfully");

        // Update the state with the new data
        setUsers((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                title: input1Value,
                details: input2Value,
                date: dateVal,
              };
            }
            return item;
          });
          return updatedData;
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // Hide the popup
    setShowPopup(false);
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

      <div className="pdf-campaigns-container" ref={pdfContainerRef}>
        {users.map((faq, index) => (
          <div className="headin" key={index}>
            <h4>Job Title: {faq.title}</h4>
            <div className="row">
              <div className="col-lg-6 col-12">
                <p>
                  <strong>Job Details:</strong> {faq.details}
                </p>
              </div>
              <div className="col-lg-6 col-12">
                <p>
                  {" "}
                  <strong>Posted Date:</strong> {faq.date}
                </p>
              </div>
            </div>

            <p>
              <button
                className="btn btn-danger bton"
                onClick={() => handleDelete(faq.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning bton"
                onClick={() => setShowPopup(true)}
              >
                Edit
              </button>
              {showPopup && (
                <JobsPopUp
                  id={faq.id}
                  title={faq.title}
                  details={faq.details}
                  date={faq.date}
                  onOkClick={handleUpdate}
                />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
