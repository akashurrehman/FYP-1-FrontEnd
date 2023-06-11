import React, { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import "../adminscreen.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";
import { Trash } from "react-bootstrap-icons";
import { Dropdown, DropdownButton } from "react-bootstrap";
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
   //For Filter
   const bloodArray = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
   const [selectedBloodGroup, setSelectedBloodGroup] = useState(null); 
   const [filteredDonors, setFilteredDonors] = useState([]);
   const [filtersApplied, setFiltersApplied] = useState(false);
 
 
 
   useEffect(() => {
     setFilteredDonors(users);
   }, [users]);
 
 
 
   const clearFilters = () => {
     setSelectedBloodGroup(null);
    
     setFiltersApplied(false);
   };
   useEffect(() => {
     let filteredDonors = users;
 
     if (selectedBloodGroup) {
       filteredDonors = filteredDonors.filter(
         (donor) => donor.bloodGroup === selectedBloodGroup
       );
     }
 
    
     setFilteredDonors(filteredDonors);
     setFiltersApplied(selectedBloodGroup);
   }, [selectedBloodGroup, users]);
 
 

  return (
    <div className="turningred fontfamily">
      <div className="pdf-campaigns-container" ref={pdfContainerRef}>
        <div className="buttonInDonor">
          <h1 className="color">Blood Stock</h1>
          <button className="btn btn-danger" onClick={generatePDF}>
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
