import { TextField } from '@mui/material'
import React from 'react'
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { Book, CalendarDateFill, Geo } from 'react-bootstrap-icons'
import Faqdata from './FAQSS/Faqdata'
import Faqstructure from './FAQSS/Faqstructure'
function ncard(val) {
    return (
      <Faqstructure
        title={val.title}
        details={val.details}
      />
    );
  
  }

export default function FAQs() {
    return (
        <div className="turningred">
            <h1 className="color">
                Frequently Asked Questions
            </h1>
            <h3 className='color marginss'><u>Add a New Question</u></h3>
            <div className="container inputcont">
                <div className="row">
                    <div className="col settingss">
                        <h5 className='rang'>Title</h5>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <Book className="Appcolor" size={30} />
                            </InputGroup.Text>
                            <FloatingLabel   controlId="floatingPassword" label="Enter Question Title Here">
                                <Form.Control type="City" placeholder="Enter Question Title Here" />
                            </FloatingLabel>
                        </InputGroup>


                    </div>

                    <h5 className='rang'>Description</h5>
                    <div className="container-fluid">
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                        // defaultValue=""
                        />

                    </div>

                   



                </div>
                <h3 className='color marginss'><u>Already Posted Questions</u></h3>
            </div>

            <div >
        {Faqdata.map(ncard)}
      </div>
        </div>
    )
}
