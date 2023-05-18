import React, { useEffect, useState, useRef } from "react";
import NewsCardTemplate from "./news/NewsCardTemplate";
import Newsdata from "./news/Newsdata";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { CalendarDateFill, Filter, Laptop } from "react-bootstrap-icons";
import TextField from "@mui/material/TextField";
import axios from "axios";
import NewsPopUp from "./PopUps/NewsPopUp";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ncard(val) {
  return (
    <NewsCardTemplate
      imgsrc={val.imgsrcs}
      title={val.title}
      Category={val.Category}
      Posted_on={val.Posted_on}
      details={val.details}
      id={val.id}
    />
  );
}

export default function News() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [Title, setTitle] = useState("");
  const [Date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/getNews")
      .then((response) => {
        console.log("News Data Response is:", response.data.results.bindings);
        // console.log("News Data ssssssssssss is:", response.data.results.bindings[0].news);
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
      .delete(`http://localhost:8081/api/admin/deleteNews/${id}`)
      .then((response) => {
        console.log(response);
        // alert("News deleted successfully!");
        toast.success("Record Deleted Successfully");
        // Remove the deleted FAQ from the users state
        setUsers((prevUsers) => prevUsers.filter((faq) => faq.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete News. Please try again!");
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
      .post("http://localhost:8081/api/admin/addNews", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("My data response in news is", response);
        toast.success("Record Added successfully");

        // Create a new news object with the same properties as the response data
        const newNews = {
          title: Title,
          postDate: Date,
          details: description,
          id: response.data.id, // Assuming the API returns the new news item's ID
        };

        // Update the news state by adding the new news item to the existing array
        setUsers((prevNews) => [...prevNews, newNews]);

        setTitle("");
        setDate("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add news. Please try again!");
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
        `http://localhost:8081/api/admin/news/NewsDetails/update/${id}`,
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

        doc.save("news.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
    PDFnotify();
  };

  return (
    <div className="turningred">
      <h1 className="color">News</h1>
      <h3 className="color marginss">
        <u>Create a new News Feed </u>
      </h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col">
            <h5 className="rang">News Title</h5>
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
            <h5 className="rang">Category</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <CalendarDateFill className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Category">
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
            value={description}
            onChange={handleDescriptionChange}
            // defaultValue=""
          />
        </div>
      </div>
      <div className="generatePDFButton">
        <button className="btn btn-danger bton" onClick={handleSubmit}>
          Submit Data
        </button>
      </div>

      <h3 className="color marginss">
        <u>News Currently Live</u>
      </h3>

      <FloatingLabel
        controlId="floatingPassword"
        label="Search By News Title Here"
      >
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
          <div className="headin">
            <h4>Title: {faq.title}</h4>
            <p>
              Description: {faq.details}
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
                <NewsPopUp
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
