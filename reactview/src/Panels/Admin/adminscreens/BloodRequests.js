import React, { useEffect, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import "../adminscreen.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";

export default function BloodRequests() {
  const {token} = useAuth();
    
  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;

  const authCentre=()=>{
    if(role!='ADMIN'){
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
    <div className="turningred fontfamily">
      <div className="pdf-campaigns-container" ref={pdfContainerRef}>
        <div className="buttonInDonor">
          <h1 className="color">Blood Request</h1>
          <button className="btn btn-danger" onClick={generatePDF}>
            Generate PDF
          </button>
        </div>
        <div className="cardsmapping">
          {users.map((faq, index) => (
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
                      <div className="col-12">
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
                      <div className="col-12">
                        <strong>Hospital: </strong> {faq.hospital}{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 ">
                        <strong>Message:</strong> <br />
                        <span className="text-muted"> {faq.message} </span>
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
  );
}
