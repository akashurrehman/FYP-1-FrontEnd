import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../Admin/adminscreen.css";

import { useAuth } from "../../BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import faker from 'faker';
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'No. of visitors on the Website',
    },
  },
};
export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'No. of Request Makers on the Website',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Visitors',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(100, 3, 1)',
      backgroundColor: 'rgb(200, 3, 1)',
    },
  ],
};
export const data1 = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Request Makers',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(100, 3, 1)',
      backgroundColor: 'rgb(200, 3, 1)',
    },
  ],
};


function Dashboard() {
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
  return (
    <div className="turningred fontfamily">
      <h1 className="color">Dashboard</h1>
      {/* Carousel Slider */}
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={require("../AdminPhotos/11.png")}
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h4 style={{ color: "black" }}>Hiring Alerts!</h4> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={require("../AdminPhotos/22.png")}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h4>Campaigns Live</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../AdminPhotos/33.png")}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h4>Breaking News</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div class="container text-center carddivs m-0 row">
   <div className="row">
    {/* <div className="col-lg-6">Boc 1</div> */}
    <div className="col-lg-6"><Line options={options} data={data} /></div>
    {/* <div className="col-lg-6"><Bar options={options} data={data} /></div> */}
    <div className="col-lg-6"><Line options={options1} data={data1} /></div>
   </div>
      </div>
    </div>
  );
}
export default Dashboard;
