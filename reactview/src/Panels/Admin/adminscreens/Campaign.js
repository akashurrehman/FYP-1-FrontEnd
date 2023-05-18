import React, { useEffect, useState, useRef } from "react";
import Cards from "./Cards";
import CardData from "./CardData";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { CalendarDateFill, Geo, Laptop } from "react-bootstrap-icons";
import TextField from "@mui/material/TextField";
import axios from "axios";
import PopUp from "./PopUps/PopUp";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ncard(val) {
  return (
    <Cards
      imgsrc={val.imgsrcs}
      title={val.title}
      date={val.date}
      location={val.location}
      details={val.details}
      id={val.id}
    />
  );
}

export default function Campaign() {
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/admin/deleteCompaigns/${id}`)
      .then((response) => {
        console.log(response);
        toast.success("Record Deleted successfully");

        // Remove the deleted FAQ from the users state
        setUsers((prevUsers) => prevUsers.filter((faq) => faq.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete Campaign. Please try again!");
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

        // Create a new campaign object with the same properties as the response data
        const newUsers = {
          title: Title,
          postDate: Date,
          details: description,
        };

        // Update the campaigns state by adding the new campaign to the existing array
        setUsers((prevCampaigns) => [...prevCampaigns, newUsers]);

        setTitle("");
        setDate("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Campaign. Please try again!");
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
        `http://localhost:8081/api/admin/campaign/CampaignDetails/update/${id}`,
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

        doc.save("campaigns.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
    PDFnotify();
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
            <h4>Title: {faq.title}</h4>
            <p>
              Details: {faq.details}
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
                <PopUp
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
