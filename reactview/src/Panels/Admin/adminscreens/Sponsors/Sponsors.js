import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { TextField } from "@mui/material";
import { Book } from "react-bootstrap-icons";
import SponsersPopUp from "../PopUps/SponsersPopUp";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FAQs() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/admin/deleteSponsor/${id}`)
      .then((response) => {
        console.log(response);
        toast.success("Record Deleted successfully");

        // Remove the deleted FAQ from the users state
        setUsers((prevUsers) => prevUsers.filter((faq) => faq.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete Sponsor Record. Please try again!");
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

        // Create a new sponsor object with the same properties as the response data
        const newSponsor = {
          name: Title,
          message: description,
          id: response.data.id, // Assuming the API returns the new sponsor's ID
        };

        // Update the sponsors state by adding the new sponsor to the existing array
        setUsers((prevSponsors) => [...prevSponsors, newSponsor]);

        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Sponsor. Please try again!");
      });
  };

  const handleUpdate = (input1Value, input2Value, id) => {
    // Handle the update logic here
    console.log(`Input 1 value: ${input1Value}`);
    console.log(`Input 2 value: ${input2Value}`);
    console.log("test ID value is", id);
    console.log("Title value", input1Value);
    console.log("Details value", input2Value);

    const updata = { name: input1Value, message: input2Value };
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
              return { ...item, title: input1Value, message: input2Value };
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

        doc.save("Sponsers.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
    PDFnotify();
  };
  return (
    <div className="turningred">
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
      <div className="pdf-campaigns-container" ref={pdfContainerRef}>
        {users.map((sponsor) => (
          <div className="headin" key={sponsor.id}>
            <h4>Name: {sponsor.title}</h4>
            <p>
              Description: {sponsor.message}
              <button
                className="btn btn-danger bton"
                onClick={() => handleDelete(sponsor.id)}
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
                <SponsersPopUp
                  id={sponsor.id}
                  title={sponsor.title}
                  details={sponsor.message}
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
