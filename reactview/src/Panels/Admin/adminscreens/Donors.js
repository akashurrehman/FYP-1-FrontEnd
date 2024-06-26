import React, { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import "../adminscreen.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Trash,
} from "react-bootstrap-icons";
import { useAuth } from "../../BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
export default function Donors() {


  const { token } = useAuth();

  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;

  const authCentre = () => {
    if (role !== 'ADMIN') {
      window.location.href = "/user/login";
    }
    console.log("authCentre");
  }

  React.useEffect(() => {
    authCentre();
  }, []);

  const [users, setUsers] = React.useState([]);
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:8081/api/bloodCenter/RegisteredCenters/getDonorInfo"
      )
      .then((response) => {
        console.log("News Data Response is:", response.data.results.bindings);
        // console.log("News Data ssssssssssss is:", response.data.results.bindings[0].news);
        const faqs = response.data.results.bindings.map((faq) => {
          return {
            name: faq.Name.value,
            email: faq.Email.value,
            id: faq.ID.value,
            gender: faq.Gender.value,
            location: faq.Location.value,
            message: faq.Message.value,
            bloodGroup: faq.Blood_Group.value,
            contact: faq.Contact.value,
            city: faq.City.value,
          };
        });
        setUsers(faqs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const generatePDF = () => {
    const doc = new jsPDF();
    const campaignsContainer = pdfContainerRef.current;

    const buttons = campaignsContainer.querySelectorAll(".btn");
    buttons.forEach((button) => (button.style.display = "none"));

    html2canvas(campaignsContainer)
      .then((canvas) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        const imageData = canvas.toDataURL("image/png");

        doc.addImage(imageData, "PNG", 10, 10, 190, 0);

        doc.save("donors.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
    PDFnotify();
  };
  //For Filter
  const bloodArray = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  const cityArray = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);



  useEffect(() => {
    setFilteredDonors(users);
  }, [users]);



  const clearFilters = () => {
    setSelectedBloodGroup(null);
    setSelectedCity(null);
    setFiltersApplied(false);
  };
  useEffect(() => {
    let filteredDonors = users;

    if (selectedBloodGroup) {
      filteredDonors = filteredDonors.filter(
        (donor) => donor.bloodGroup === selectedBloodGroup
      );
    }

    if (selectedCity) {
      filteredDonors = filteredDonors.filter(
        (donor) => donor.city === selectedCity
      );
    }

    setFilteredDonors(filteredDonors);
    setFiltersApplied(selectedBloodGroup || selectedCity);
  }, [selectedBloodGroup, selectedCity, users]);





  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Location</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe title="Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27239.569487006618!2d74.19039984886317!3d31.415608720761064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918fe2c620a57e5%3A0x542f94f8ded04ba8!2sLDA%20Avenue%20One%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1685896289913!5m2!1sen!2s" style={{width:"100%", height:"300px"  }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="turningred fontfamily">
        <div className="pdf-campaigns-container" ref={pdfContainerRef}>
          <div className="buttonInDonor">
            <h1 className="color">Donors List</h1><br />
            <button
              className="btn btn-danger BtnGeneratePDF "
              onClick={generatePDF}
            >
              Generate PDF
            </button>
          </div>

          <div className="row mt-4">
            <div className="col-lg-2 col-12"> <h3>Filters:</h3></div>
            <div className="col-lg-6 gap col-12">

              <DropdownButton
                id="dropdown-item-button"
                // className="custom-dropdown-button"
                title={selectedBloodGroup || "Select Blood Group"}
                onSelect={(bloodGroup) => setSelectedBloodGroup(bloodGroup)}
              >
                {bloodArray.map((bloodGroup, index) => (
                  <Dropdown.Item key={index} eventKey={bloodGroup}>
                    {bloodGroup}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                id="dropdown-item-button"
                title={selectedCity || "Select City"}
                onSelect={(city) => setSelectedCity(city)}
              >
                {cityArray.map((city, index) => (
                  <Dropdown.Item key={index} eventKey={city}>
                    {city}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              {filtersApplied && (

                <button className="btn btn-secondary icnss" onClick={clearFilters}>
                  <Trash className="trashbox" size={18} />
                </button>
              )}

            </div>
          </div>
          <div className="cardsmapping mt-2">
            {filteredDonors.map((faq, index) => (
              <div className="headin" key={index}>
                <div className="card DonoCard">
                  <div className="card-body">
                    <h5 className="card-title"> {faq.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"> {faq.id}</h6>

                    <h5 className="card-title"> Details:</h5>
                    <p className="card-text">
                      <div className="row">
                        <div className="col-lg-9 col-12">
                          <p className="m-1">
                            {" "}
                            <strong>Email: </strong>
                            {faq.email}
                          </p>
                        </div>
                        <div className="col-lg-3 col-12">
                          {" "}
                          <strong> {faq.gender}</strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-9 col-12">
                          <p>
                            {" "}
                            <strong>Contact: </strong>
                            {faq.contact}{" "}
                          </p>
                        </div>
                        <div className="col-lg-3 col-12">
                          {" "}
                          <strong className="red"> {faq.bloodGroup}</strong>
                        </div>
                      </div>
                      <div className="row">
                        <div onClick={handleShow} className="col-12 cursorpointer">
                          <h6 className="card-subtitle mb-2 text-muted">
                            {faq.location}{" "}
                          </h6>
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-12">
                          <strong>City: </strong> {faq.city}{" "}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 ">
                          <strong >Message:</strong> <br />
                          <span className="text-muted">  {faq.message}{" "}</span>

                        </div>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

  );
}
