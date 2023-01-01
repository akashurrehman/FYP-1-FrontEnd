import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "../adminscreen.css"

export default function Bloodstocks() {

  const percentage = 66;
  const Aposvalue = 50;
  const Anegvalue = 30;
  const Bposvalue = 70;
  const Bnegvalue = 80;
  const ABposvalue = 90;
  const ABnegvalue = 35;
  const Oposvalue = 95;
  const Onegvalue = 80;

  return (
    <div className="turningred">
      <h1 className="color">Blood Stocks</h1>
      {/* <div className="cup">
      <div className="scup">
          
          <CircularProgressbarWithChildren styles={buildStyles({
            pathColor: "#rgb(0, 183, 255)",
            trailColor: "#000"
          })} value={Aposvalue} className='str' >
            <img style={{ height: "50%", width: "50%", marginTop: 30 }} src={require('../../../pictures/A+.png')} alt="doge" />

            
          </CircularProgressbarWithChildren>
          <h5>{Aposvalue} Left</h5>
        </div>
        <div className="scup">
          
          <CircularProgressbarWithChildren styles={buildStyles({
            pathColor: "#rgb(0, 183, 255)",
            trailColor: "#000"
          })} value={Aposvalue} className='str' >
            <img style={{ height: "50%", width: "50%", marginTop: 30 }} src={require('../../../pictures/A+.png')} alt="doge" />

            
          </CircularProgressbarWithChildren>
          <h5>{Aposvalue} Left</h5>
        </div>
        <div className="scup">
          
          <CircularProgressbarWithChildren styles={buildStyles({
            pathColor: "#rgb(0, 183, 255)",
            trailColor: "#000"
          })} value={Aposvalue} className='str' >
            <img style={{ height: "50%", width: "50%", marginTop: 30 }} src={require('../../../pictures/A+.png')} alt="doge" />

            
          </CircularProgressbarWithChildren>
          <h5>{Aposvalue} Left</h5>
        </div>
       
        <div className="scup">
          
          <CircularProgressbarWithChildren styles={buildStyles({
            pathColor: "#rgb(0, 183, 255)",
            trailColor: "#000"
          })} value={Aposvalue} className='str' >
            <img style={{ height: "50%", width: "50%", marginTop: 30 }} src={require('../../../pictures/A+.png')} alt="doge" />

            
          </CircularProgressbarWithChildren>
          <h5>{Aposvalue} Left</h5>
        </div>
        <div className="scup">
          
          <CircularProgressbarWithChildren styles={buildStyles({
            pathColor: "#rgb(0, 183, 255)",
            trailColor: "#000"
          })} value={Aposvalue} className='str' >
            <img style={{ height: "50%", width: "50%", marginTop: 30 }} src={require('../../../pictures/A+.png')} alt="doge" />

            
          </CircularProgressbarWithChildren>
          <h5>{Aposvalue} Left</h5>
        </div>
       










      </div> */}
      {/* <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
      </div> */}

      <div>
        <h4 className='cup'>A Positive</h4>
        <ProgressBar animated  striped variant="success" now={Aposvalue} label={`${Aposvalue}`} />
        <h4 className='cup' >A Negative</h4>
        <ProgressBar animated striped variant="danger" now={Anegvalue} label={`${Anegvalue}`} />
        <h4 className='cup' >B Positive</h4>
        <ProgressBar animated striped variant="success" now={Bposvalue} label={`${Bposvalue}`} />
        <h4 className='cup' >B Negative</h4>
        <ProgressBar animated striped variant="danger" now={Bnegvalue} label={`${Bnegvalue}`} />
        <h4 className='cup' >AB Positive</h4>
        <ProgressBar animated  className='cup' striped variant="success" now={ABposvalue} label={`${ABposvalue}`} />
        <h4 className='cup' >AB Negative</h4>
        <ProgressBar animated striped variant="danger" now={ABnegvalue} label={`${ABnegvalue}`} />
        <h4 className='cup' >O Positive</h4>
        <ProgressBar animated striped variant="success" now={Oposvalue} label={`${Oposvalue}`} />
        <h4 className='cup' >O Negative</h4>
        <ProgressBar animated striped variant="danger" now={Onegvalue} label={`${Onegvalue}`} />
      </div>
    </div>
  );

}
