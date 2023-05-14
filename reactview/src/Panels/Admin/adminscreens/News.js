import React from 'react';
// import Cards from './Cards';
// import CardData from './CardData';
import NewsCardTemplate from './news/NewsCardTemplate';
import Newsdata from './news/Newsdata';
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { BarChart, CalendarDateFill, Filter, Geo, Grid, HandIndexThumb, Laptop } from 'react-bootstrap-icons';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ncard(val) {
  return (
    <NewsCardTemplate
      imgsrc={val.imgsrcs}
      title={val.title}
      Category={val.Category}
      Posted_on={val.Posted_on}
      details={val.details}
    />
  );

}

export default function News() {
  return (
    <div className="turningred">
      <h1 className="color">
        News Currently Live
      </h1>
      {/* <Grid container spacing={24}>
        <Grid item md={3}>
          {CardData.map(ncard)}
        </Grid>

      </Grid> */}

      <div className="flexes ">
        {Newsdata.map(ncard)}
      </div>
      <h3 className='color marginss'><u>Create a new News Feed </u></h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col">
            <h5 className='rang'>News Title</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <Laptop className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Title">
                <Form.Control type="text" placeholder="Title" />
              </FloatingLabel>
            </InputGroup>
          </div>
          <div className="col settingss">
            <h5 className='rang'>Category</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Filter className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Category">
                <Form.Control type="City" placeholder="Category" />
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
