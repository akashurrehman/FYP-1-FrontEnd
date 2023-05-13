import React, { useEffect, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import "../adminscreen.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Bloodstocks() {
  const [users, setUsers] = React.useState([]);
  const pdfContainerRef = useRef(null);

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
        {users.map((faq, index) => (
          <div className="headin" key={index}>
            <h4> ID: {faq.id}</h4>
            <div className="row">
              <div className="col-lg-4">
                <p>
                  <strong>No Of Bags:</strong> {faq.noOfBags}{" "}
                </p>
              </div>
              <div className="col-lg-4">
                <p>
                  <strong>Gender:</strong> {faq.gender}{" "}
                </p>
              </div>
              <div className="col-lg-4">
                <p>
                  <strong>Blood Group:</strong> {faq.bloodGroup}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
