{/* <div style={{borderRadius:'10% 30% 50% 70%',backgroundColor:'#f9f2f1',marginBottom:'0%'}}>
            <div style={{marginTop:'0%',marginBottom:'0%',paddingTop:'1%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row style={{width:'43%'}}>
                        <InputGroup className="mb-1">
                            <Form.Control
                                placeholder="Search Blood Donations"
                                aria-label="Search Blood Donations"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2"><Search className="m-1 IconColor" size={20} /></InputGroup.Text>
                        </InputGroup>
                    </Row>
                </Container>
            </div>


            <div style={{marginTop:'1%',marginBottom:'1%',paddingBottom:'3%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row>
                        <p className='d-flex'>
                            <div className='TextCursive' style={{margin:'5px',paddingRight:'2px'}}>Filter by:</div>

                            <DropdownButton
                                id="dropdown-autoclose-false dropdown-menu-align-end"
                                variant="flat" align="end"
                                title={filterBlood}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {bloodArray.map((blood)=>(
                                        
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={blood} 
                                            onClick={() => {setFilterBlood(blood)}}
                                        >
                                            <Form.Check 
                                                type='checkbox'
                                                id='default-check'
                                                label={`${blood}`}
                                            />
                                        </Nav.Link>
                                    ),)}
                                    
                                    <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button>
                                </div>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-autoclose-false"
                                variant="flat"
                                title={filterCity}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {cityArray.map((city)=>(
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={city} 
                                            onClick={() => {setFilterCity(city)}}
                                        >
                                            <Form.Check 
                                                type='checkbox'
                                                id='default-check'
                                                label={`${city}`}
                                            />
                                        </Nav.Link>
                                    ),)}
                                    
                                    <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button>
                                </div>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-autoclose-false"
                                variant="flat"
                                title={filterDate}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {dateArray.map((date)=>(
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={date} 
                                            onClick={() => {setFilterDate(date)}}
                                        >
                                            <Form.Check 
                                                type='checkbox'
                                                id='default-check'
                                                label={`${date}`}
                                            />
                                        </Nav.Link>
                                    ),)}
                                    
                                    <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button>
                                </div>
                            </DropdownButton>

                            <div style={{paddingLeft:'5px'}}>
                                <Button className='' variant="flat" onClick={()=>{setFilterCity('City',setFilterBlood('Blood Group'),setFilterDate('Request Makers'))}}><Trash className="IcomColor" size={20} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </div> */}