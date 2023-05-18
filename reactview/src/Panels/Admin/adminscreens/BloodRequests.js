import React, { useEffect, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import "../adminscreen.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BloodRequests() {
  const [users, setUsers] = React.useState([]);
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/bloodCenter/RegisteredCenters/getRequest")
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
            hospital: faq.Hospital.value,
          };
        });
        setUsers(faqs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

        doc.save("bloodRequest.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
    PDFnotify();
  };

  return (
    <div className="turningred">
      <div className="pdf-campaigns-container" ref={pdfContainerRef}>
        <div className="buttonInDonor">
          <h1 className="color">Blood Request</h1>
          <button className="btn btn-danger" onClick={generatePDF}>
            Generate PDF
          </button>
        </div>
        {users.map((faq, index) => (
          <div className="headin" key={index}>
            <h4> Name: {faq.name}</h4>
            <div className="row">
              <div className="col-lg-4 col-12">
                {" "}
                <p>
                  {" "}
                  <strong>ID:</strong> {faq.id}{" "}
                </p>
              </div>
              <div className="col-lg-4 col-12">
                <p>
                  {" "}
                  <strong>Email: </strong>
                  {faq.email}
                </p>
              </div>
              <div className="col-lg-4 col-12">
                <p>
                  <strong>Gender: </strong> {faq.gender}{" "}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-12">
                <p>
                  {" "}
                  <strong>Location: </strong>
                  {faq.location}{" "}
                </p>
              </div>
              <div className="col-lg-4 col-12">
                <p>
                  {" "}
                  <strong>Message:</strong> {faq.message}{" "}
                </p>
              </div>
              <div className="col-lg-4 col-12">
                <p>
                  <strong>Blood Group:</strong> {faq.bloodGroup}{" "}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                {" "}
                <p>
                  {" "}
                  <strong>Contact:</strong> {faq.contact}{" "}
                </p>
              </div>
              <div className="col-lg-4">
                <p>
                  {" "}
                  <strong>City: </strong> {faq.city}{" "}
                </p>
              </div>
              <div className="col-lg-4">
                <p>
                  {" "}
                  <strong>Hospital: </strong> {faq.hospital}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
