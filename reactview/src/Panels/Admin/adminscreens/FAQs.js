import { TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Book, CalendarDateFill, Geo } from "react-bootstrap-icons";
import FAQsPopUp from "./PopUps/FAQsPopUp";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function FAQs() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/getFAQ")
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/admin/deleteFAQ/${id}`)
      .then((response) => {
        console.log(response);
        alert("Question deleted successfully!");

        // Remove the deleted FAQ from the users state
        setUsers((prevUsers) => prevUsers.filter((faq) => faq.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete Question. Please try again!");
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title: Title, details: description };
    console.log("the data I am sending is", data);
    axios
      .post("http://localhost:8081/api/admin/addFAQ", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("My data response in Faqs is", response);
        alert("FAQs added successfully!");
        // Update the users state with the new FAQ
        const newFAQ = {
          title: Title,
          details: description,
          id: response.data.id, // Assuming the API returns the new FAQ's ID
        };
        setUsers((prevUsers) => [...prevUsers, newFAQ]);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Question. Please try again!");
      });
  };

  const filteredUsers = users.filter((faq) =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (input1Value, input2Value, id) => {
    // Handle the update logic here
    console.log(`Input 1 value: ${input1Value}`);
    console.log(`Input 2 value: ${input2Value}`);
    console.log("test ID value is", id);
    console.log("Title value", input1Value);
    console.log("Details value", input2Value);

    const updata = { title: input1Value, details: input2Value };
    console.log("the data I am updating is", updata);
    axios
      .put(
        `http://localhost:8081/api/admin/faq/FAQDetails/update/{${id}`,
        updata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Campaign updated successfully");

        // Update the state with the new data
        setUsers((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.id === id) {
              return { ...item, title: input1Value, details: input2Value };
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

        doc.save("FAQs.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
  };
  return (
    <div className="turningred">
      <h1 className="color">Frequently Asked Questions</h1>
      <h3 className="color marginss">
        <u>Add a New Question</u>
      </h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col settingss">
            <h5 className="rang">Question</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Book className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter Question Title Here"
              >
                <Form.Control
                  type="City"
                  placeholder="Enter Question Title Here"
                  value={Title}
                  onChange={handleTitleChange}
                />
              </FloatingLabel>
            </InputGroup>
          </div>

          <h5 className="rang">Answer</h5>
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
      </div>
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={handleSubmit}>
          Submit Data
        </button>
      </div>
      <h3 className="color marginss">
        <u>Already Posted Questions</u>
      </h3>
      <FloatingLabel controlId="floatingPassword" label="Search By  Title Here">
        <Form.Control
          type="City"
          placeholder="Enter Question Title Here"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FloatingLabel>
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      <div className="pdf-campaigns-container" ref={pdfContainerRef}>
        {filteredUsers.map((faq, index) => (
          <div className="headin" key={index}>
            <h4>Question: {faq.title}</h4>
            <p>
              Answer: {faq.details}
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
                <FAQsPopUp
                  id={faq.id}
                  title={faq.title}
                  details={faq.details}
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
