import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

/* SparQL Query Imports */
import Sparql from './Services/Api/SparqlQuery/sparql';


/* BloodDonationCenterPanel Imports */
import BloodCentreHomeScreen from './Panels/BloodDonationCentre/HomeScreen_BloodDonation';


/* AdminPanel Imports */
import AdminPanelHomeScreen from './Panels/Admin/screen'
/* UserPanel Imports */
import UserPanelHomeScreen from './Panels/Users/HomePage_UserPanel';


function App() {
  return (
    <div>
      <AdminPanelHomeScreen/>
      <Router>
        <Routes>
          <Route exact path="/sparql" element={<Sparql />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          {/* Admin panel Routes */}
          <Route exact path='/adminpanel/HomeScreen' element={<AdminPanelHomeScreen/>}/>
    

          {/* UserPanel Routes */}
          <Route exact path='/userpanel/HomeScreen' element={<UserPanelHomeScreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
