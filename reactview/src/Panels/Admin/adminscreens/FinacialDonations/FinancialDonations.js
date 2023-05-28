import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import { CalendarDateFill, Laptop, PhoneVibrate } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import packageService from "../Services/PackageService";
import SingleFinancialDonation from "../Components/SingleFinancialDonation";

export default function FinancialDonations() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [Date, setDate] = useState("");
  const [Contact, setContact] = useState("");
  const [Title, setTitle] = useState("");
  const [Amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

  const [fdon, setFdon] = React.useState([]);

  const getData = () => {
    packageService
      .getFinancialDonations()
      .then((data) => {
        setFdon(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, []);
  console.log(fdon.results);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/getFinancialDonation")
      .then((response) => {
        console.log("Response is:", response.data.results.bindings);
        const faqs = response.data.results.bindings.map((faq) => {
          return {
            title: faq.Name.value,
            contact: faq.ContactNo.value,
            date: faq.Date.value,
            amount: faq.Amount.value,
            message: faq.Message.value,
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

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: Title,
      donationDate: Date,
      message: description,
      contactNo: Contact,
      donationAmount: Amount,
    };
    console.log("the data I am sending is", data);
    axios
      .post("http://localhost:8081/api/admin/addFinancialDonation", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("My data response in Financial Donation is", response);
        toast.success("Record Added successfully");
        getData();
        setTitle("");
        setDate("");
        setDescription("");
        setContact("");
        setAmount("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Donation. Please try again!");
      });
  };

  const handleUpdate = (
    input1Value,
    input2Value,
    id,
    dateVal,
    amountVal,
    messageVal
  ) => {
    // Handle the update logic here

    const updata = {
      title: input1Value,
      contact: input2Value,
      date: dateVal,
      amount: amountVal,
      message: messageVal,
    };
    console.log("the data for financial donation I am updating is", updata);
    axios
      .put(
        `http://localhost:8081/api/admin/financialDonation/financialDonationDetails/update/${id}`,
        updata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("Record Deleted successfully");

        // Update the state with the new data
        setUsers((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                title: input1Value,
                contact: input2Value,
                date: dateVal,
                amount: amountVal,
                message: messageVal,
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

        doc.save("FinancialDonations.pdf");
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
        <u>Add A New Financial Donation</u>
      </h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col">
            <h5 className="rang">Donator's Name</h5>
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
            <h5 className="rang">Donation Date</h5>
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
          <div className="col settingss">
            <h5 className="rang">Contact Number</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <PhoneVibrate className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Phone Number*">
                <Form.Control
                  type="tel"
                  placeholder="Contact"
                  value={Contact}
                  onChange={handleContactChange}
                />
              </FloatingLabel>
            </InputGroup>
          </div>
          <h5 className="rang">Amount Donated</h5>
          <InputGroup className="mb-3 input">
            <InputGroup.Text id="basic-addon1">
              <Laptop className="Appcolor" size={30} />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Amount">
              <Form.Control
                type="number"
                placeholder="Donation Amount"
                value={Amount}
                onChange={handleAmountChange}
              />
            </FloatingLabel>
          </InputGroup>

          <h5 className="rang">Kindness Message</h5>
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
        <button className="btn btn-danger bton" onClick={handleSubmit}>
          Submit Data
        </button>
      </div>

      <h3 className="color marginss">
        <hu>Financially Contributors List</hu>
      </h3>
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
      <div style={{ width: "99.1%", marginBottom: "13%" }}>
        {fdon.length === 0 ? (
           <p className="turningreddish">No Donations Yet!!</p>
        ) : (
          <Row className="cardsmapping m-5">
            {fdon?.results?.bindings?.map((fdon, index) => (
              <Col sm={12} key={index}>
                <SingleFinancialDonation key={index} fdon={fdon} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
