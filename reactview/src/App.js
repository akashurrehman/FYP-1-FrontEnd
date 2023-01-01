import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

/* SparQL Query Imports */
import Sparql from './Services/Api/SparqlQuery/sparql';


/* BloodDonationCenterPanel Imports */
import BloodCentreHomeScreen from './Panels/BloodDonationCentre/HomeScreen_BloodDonation';
import Footer from './Components_for_All_Panels/BloodCentre/Footer';
import Header from './Components_for_All_Panels/BloodCentre/Header';
import ProfileSettings from './Panels/BloodDonationCentre/ProfileSettings';
import BloodStock from './Panels/BloodDonationCentre/BloodStock'
import UserBloodInformation from './Panels/BloodDonationCentre/BloodInformation'
import Appointments from './Panels/BloodDonationCentre/Appointments';
import AddNewUser from './Panels/BloodDonationCentre/AddNewUser';
 
/* AdminPanel Imports */
import AdminPanelHomeScreen from './Panels/Admin/screen'
/* UserPanel Imports */
import UserPanelHomeScreen from './Panels/Users/HomePage_UserPanel';

function App() {
  return (
    <div>
      <AdminPanelHomeScreen/>
      <Router>
      <Header/>
        <Routes>
          <Route exact path="/sparql" element={<Sparql />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          {/* Admin panel Routes */}
          <Route exact path='/adminpanel/HomeScreen' element={<AdminPanelHomeScreen/>}/>
    

          {/* UserPanel Routes */}
          <Route exact path='/userpanel/HomeScreen' element={<UserPanelHomeScreen/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
