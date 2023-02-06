import React from "react";
import Footer from "../../Components_for_All_Panels/BloodCentre/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import Dashboard from "./adminscreens/Dashboard";
import Donors from "./adminscreens/Donors";
import FAQs from "./adminscreens/FAQs";
import Campaign from "./adminscreens/Campaign";
import News from "./adminscreens/News";
import Profilesettings from "./adminscreens/Profilesettings";
import Bloodstocks from "./adminscreens/Bloodstocks";
import BloodRequests from "./adminscreens/BloodRequests";
import DonorsTables from "./adminscreens/Donors";


const HomeScreen_BloodDonation = () => {
    return (

        <div className="container-fluid maincontainer ">
            <Header />
            <div className="row">
                <div className="col-sm-3 sidemenu  p-0 ml-50">

                    {/* Profile Image and navigation div */}
                    <div className="profilebox2 p-0">

                        <div className=" align-items-start">
                            <div className="profilebox">
                                <div className="img">
                                    <img className="logoimage  mt-3" src={require('../../pictures/images.png')} alt="not found" />

                                </div>
                                <div className="mt-2">
                                    <strong>Salman Ahmed</strong>
                                </div>
                                <div className="mt-2">
                                    <p className="mail">salman.ahmed.org.pk</p>
                                </div>

                            </div>
                            <div>
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link active menu-list" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Dashboard</button>
                                    <button className="nav-link menu-list" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Donors</button>
                                    <button className="nav-link menu-list" id="v-pills-stocks-tab" data-bs-toggle="pill" data-bs-target="#v-pills-stocks" type="button" role="tab" aria-controls="v-pills-stocks" aria-selected="false">Blood Stocks</button>
                                    <button className="nav-link menu-list" id="v-pills-requests-tab" data-bs-toggle="pill" data-bs-target="#v-pills-requests" type="button" role="tab" aria-controls="v-pills-requests" aria-selected="false">Blood Requests</button>
                                    <button className="nav-link menu-list" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Campaigns</button>
                                    <button className="nav-link menu-list" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">News</button>
                                    <button className="nav-link menu-list" id="v-pills-faqs-tab" data-bs-toggle="pill" data-bs-target="#v-pills-faqs" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">FAQ's</button>
                                    <button className="nav-link menu-list" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Profile Settings</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-sm-8 ml-5 p-0 carddiv">
                    <div id="home">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0"><Dashboard /></div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0"><DonorsTables/></div>
                            <div className="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabindex="0"><Campaign /></div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0"><News /></div>
                            <div className="tab-pane fade" id="v-pills-faqs" role="tabpanel" aria-labelledby="v-pills-faqs-tab" tabindex="0"><FAQs /></div>
                            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0"><Profilesettings/></div>
                            <div className="tab-pane fade" id="v-pills-stocks" role="tabpanel" aria-labelledby="v-pills-stocks-tab" tabindex="0"><Bloodstocks/></div>
                            <div className="tab-pane fade" id="v-pills-requests" role="tabpanel" aria-labelledby="v-pills-requests-tab" tabindex="0"><BloodRequests/></div>
                        </div>
                    </div>
                </div>

                {/* Home button Dashboard */}

            </div>
        </div>
    );
}



export default HomeScreen_BloodDonation;