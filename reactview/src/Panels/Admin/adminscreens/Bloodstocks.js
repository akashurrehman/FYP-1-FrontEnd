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
export default function Bloodstocks() {
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
      .get(
        "http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetails"
      )
      .then((response) => {
        console.log("News Data Response is:", response.data.results.bindings);
        // console.log("News Data ssssssssssss is:", response.data.results.bindings[0].news);
        const faqs = response.data.results.bindings.map((faq) => {
          return {
            bloodGroup: faq.Blood_Group.value,
            noOfBags: faq.No_Of_Bags.value,
            id: faq.ID.value,
            gender: faq.Gender.value,
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

        doc.save("bloodStock.pdf");
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
          <h1 className="color">Blood Stock</h1>
          <button className="btn btn-danger" onClick={generatePDF}>
            Generate PDF
          </button>
        </div>
        <div className="cardsmapping">
          {users.map((faq, index) => (
            <div className="headin" key={index}>
              <div className="card DonoCard">
                <div className="card-body">
                  <h5 className="card-title aligncenter justifycenter">
                    {" "}
                    <h1>{faq.bloodGroup}</h1>
                  </h5>

                  <h5 className="card-title">
                    {" "}
                    <strong>No of Bags: </strong> {faq.noOfBags}{" "}
                  </h5>
                  <p className="card-text">
                    <div className="row">
                      <div className="col-lg-12 col-12">{faq.gender} </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-12 text-muted">{faq.id}</div>
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
