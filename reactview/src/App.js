import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

/* SparQL Query Imports */
import Sparql from './Services/Api/SparqlQuery/sparql';


/* BloodDonationCenterPanel Imports */
import BloodCentreHomeScreen from './Panels/BloodDonationCentre/HomeScreen_BloodDonation';


/* AdminPanel Imports */


/* UserPanel Imports */
import UserPanelHomeScreen from './Panels/Users/HomePage_UserPanel';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/sparql" element={<Sparql />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          

          {/* UserPanel Routes */}
          <Route exact path='/user/HomeScreen' element={<UserPanelHomeScreen/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
