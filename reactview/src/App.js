import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Sparql from './Services/Api/SparqlQuery/sparql';
import BloodCentreHomeScreen from './Panels/BloodDonationCentre/HomeScreen_BloodDonation';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/sparql" element={<Sparql />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
