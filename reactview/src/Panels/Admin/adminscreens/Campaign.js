import React from 'react';
import Cards from './Cards';
import CardData from './CardData';
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { CalendarDateFill, Geo, Grid } from 'react-bootstrap-icons';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ncard(val) {
  return (
    <Cards
      imgsrc={val.imgsrcs}
      title={val.title}
      date={val.date}
      location={val.location}
      details={val.details}
    />
  );

}

export default function Campaign() {
  return (
    <div className="turningred">
      <h1 className="color">
        Campaigns Currently Live
      </h1>
      {/* <Grid container spacing={24}>
        <Grid item md={3}>
          {CardData.map(ncard)}
        </Grid>

      </Grid> */}

      <div className="flexes ">
        {CardData.map(ncard)}
      </div>
      <h3 className='color marginss'><u>Create a New Campaign </u></h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col">
            <h5 className='rang'>Select Date</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <CalendarDateFill className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Date">
                <Form.Control type="date" placeholder="mm/dd/yyyy" />
              </FloatingLabel>
            </InputGroup>
          </div>
          <div className="col settingss">
            <h5 className='rang'>Location</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Geo className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Location">
                <Form.Control type="City" placeholder="Password" />
              </FloatingLabel>
            </InputGroup>
          </div>

          <h5 className='rang'>Description</h5>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            // defaultValue=""
          />
        </div>
      </div>




    </div>
  )
}
