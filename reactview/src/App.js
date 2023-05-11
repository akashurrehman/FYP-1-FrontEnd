import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';



/* BloodDonationCenterPanel Imports */
import BloodCentreHomeScreen from './Panels/BloodDonationCentre/HomeScreen_BloodDonation';
import Footer from './Components_for_All_Panels/BloodCentre/Footer';
import Header from './Components_for_All_Panels/BloodCentre/Header';
import ProfileSettings from './Panels/BloodDonationCentre/ProfileSettings';
import BloodStock from './Panels/BloodDonationCentre/BloodStock'
import UserBloodInformation from './Panels/BloodDonationCentre/BloodInformation'
import Appointments from './Panels/BloodDonationCentre/Appointments';
import AddNewUser from './Panels/BloodDonationCentre/AddNewUser';
import BloodRequests from './Panels/BloodDonationCentre/BloodRequests';
import AddBloodRequest from './Panels/BloodDonationCentre/AddBloodRequest';
import MyAccountCenter from './Panels/BloodDonationCentre/MyAccountCenter';
/* AdminPanel Imports */
import AdminPanelHomeScreen from './Panels/Admin/screen';
/* UserPanel Imports */
import UserPanelHomeScreen from './Panels/Users/HomePage_UserPanel';
import UserLogin from './Components_for_All_Panels/UserComponents/auths/UserLogin';
import UserRegister from './Components_for_All_Panels/UserComponents/auths/UserRegister';
import UserPostBloodRequest from './Components_for_All_Panels/UserComponents/request_makers/PostBloodRequest';
import UserRequestMaker from './Components_for_All_Panels/UserComponents/request_makers/RequestMaker';
import UserMakeBloodDonation from './Components_for_All_Panels/UserComponents/donors/MakeBloodDonation';
import UserDonor from './Components_for_All_Panels/UserComponents/donors/Donor';
import UserBloodDonationCentre from './Components_for_All_Panels/UserComponents/blood_donation_centres/BloodDonationCentre';
import LabHome from './Panels/Laboratory/LabHome';
import Login from './Temp-Files/Login';
import ViewCenterDonors from './Panels/BloodDonationCentre/ViewCenterDonors';
import MakeBloodDonation from './Components_for_All_Panels/UserComponents/donors/MakeBloodDonation';
import MakeBloodRequest from './Components_for_All_Panels/UserComponents/request_makers/MakeBloodRequest';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegistration from './Components_for_All_Panels/UserComponents/auths/UserRegistration';

import LabProfileSetting from './Panels/Laboratory/LabProfileSetting';
import ReportRequests from './Panels/Laboratory/ReportRequests';
import MyAccount from './Components_for_All_Panels/UserComponents/profile/MyAccount';
import BloodAnalysis from './Components_for_All_Panels/UserComponents/BloodAnalysis';
import JobPost from './Components_for_All_Panels/UserComponents/packages/job_posts/JobPost';
import JobPostDetails from './Components_for_All_Panels/UserComponents/packages/job_posts/JobPostDetails';
import DonorDetails from './Components_for_All_Panels/UserComponents/donors/DonorDetails';

import RequestMakerDetails from './Components_for_All_Panels/UserComponents/request_makers/RequestMakerDetails';
import BloodDonationCentreDetails from './Components_for_All_Panels/UserComponents/blood_donation_centres/BloodDonationCentreDetails';
import Event from './Components_for_All_Panels/UserComponents/packages/events/Event';
import EventDetails from './Components_for_All_Panels/UserComponents/packages/events/EventDetails';
import FAQ from './Components_for_All_Panels/UserComponents/packages/faqs/FAQ';
import FAQDetails from './Components_for_All_Panels/UserComponents/packages/faqs/FAQDetails';
import FinancialDonation from './Components_for_All_Panels/UserComponents/packages/financial_donations/FinancialDonation';
import FinancialDonationDetails from './Components_for_All_Panels/UserComponents/packages/financial_donations/FinancialDonationDetails';
import Sponsor from './Components_for_All_Panels/UserComponents/packages/sponsors/Sponsor';
import SponsorDetails from './Components_for_All_Panels/UserComponents/packages/sponsors/SponsorDetails';

import NewsDetails from './Components_for_All_Panels/UserComponents/packages/news/NewsDetails';
import News from './Components_for_All_Panels/UserComponents/packages/news/News';
import Campaign from './Components_for_All_Panels/UserComponents/packages/campaigns/Campaign';
import CampaignDetails from './Components_for_All_Panels/UserComponents/packages/campaigns/CampaignDetails';
import MakeAppointment from './Components_for_All_Panels/UserComponents/appointments/MakeAppointment';


function App() {
  return (
    <div>
      <Router>
      <ToastContainer />      
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          <Route exact path='/bloodCenter/ProfileSettings' element={<ProfileSettings/>}/>
          <Route exact path='/bloodCenter/BloodStock' element={<BloodStock/>}/>
          <Route exact path='/bloodCenter/addbloodRequest' element={<AddBloodRequest />} />
          <Route exact path='/bloodCenter/userbloodInformation' element={<UserBloodInformation/>}/>
          <Route exact path='/bloodCenter/AppointmentDetails' element={<Appointments/>}/>
          <Route exact path='/bloodCenter/addNewUser' element={<AddNewUser/>}/>
          <Route exact path='/bloodCenter/bloodRequests' element={<BloodRequests/>}/>
          <Route exact path='/bloodCenter/ViewAllDonors' element={<ViewCenterDonors/>}/>
          <Route exact path='/bloodCenter/MyAccount' element={<MyAccountCenter/>}/>
          
          {/* Admin panel Routes */}
          <Route exact path='/adminpanel/HomeScreen' element={<AdminPanelHomeScreen/>}/>

          {/* UserPanel Routes */}
          
          <Route exact path='/userpanel/HomeScreen' element={<UserPanelHomeScreen/>}/>
          <Route exact path='/user/login' element={<UserLogin/>} />
          <Route exact path='/user/registration' element={<UserRegistration/>} />
          <Route exact path='/user/register' element={<UserRegister/>} />
          <Route exact path='/user/post-blood-request' element={<UserPostBloodRequest/>} />
          <Route exact path='/user/make-blood-request' element={<MakeBloodRequest/>} />
          <Route exact path='/user/request-maker' element={<UserRequestMaker/>} />
          <Route exact path='/user/make-blood-donation' element={<UserMakeBloodDonation/>} />
          <Route exact path='/user/donor' element={<UserDonor/>} />
          <Route exact path='/user/my-account' element={<MyAccount/>} />
          <Route exact path='/user/blood-donation-centre' element={<UserBloodDonationCentre/>} />
          <Route exact path='/user/blood-analysis' element={<BloodAnalysis/>} />
          
          <Route exact path='/user/donor-details/:id' element={<DonorDetails/>} />
          <Route exact path='/user/request-maker-details/:id' element={<RequestMakerDetails/>} />
          <Route exact path='/user/centre-details/:centreID' element={<BloodDonationCentreDetails/>} />

          <Route exact path='/user/job-post' element={<JobPost/>} />
          <Route exact path='/user/job-post-details/:id' element={<JobPostDetails/>} />

          <Route exact path='/user/event' element={<Event/>} />
          <Route exact path='/user/event-details/:id' element={<EventDetails/>} />
          
          <Route exact path='/user/faq' element={<FAQ/>} />
          <Route exact path='/user/faq-details/:id' element={<FAQDetails/>} />

          <Route exact path='/user/financial-donation' element={<FinancialDonation/>} />
          <Route exact path='/user/financial-donation-details/:id' element={<FinancialDonationDetails/>} />

          <Route exact path='/user/sponsor' element={<Sponsor/>} />
          <Route exact path='/user/sponsor-details/:id' element={<SponsorDetails/>} />

          <Route exact path='/user/news' element={<News/>} />
          <Route exact path='/user/news-details/:id' element={<NewsDetails/>} />

          <Route exact path='/user/campaign' element={<Campaign/>} />
          <Route exact path='/user/campaign-details/:id' element={<CampaignDetails/>} />

          <Route exact path='/user/make-appointment/:centreID' element={<MakeAppointment/>} />

          {/*Lab Interface Routes */}
          <Route exact path='/lab/home' element={<LabHome/>}/>
          <Route exact path='/lab/profileSettings' element={<LabProfileSetting/>}/>
          <Route exact path='/lab/ReportRequest' element={<ReportRequests/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
