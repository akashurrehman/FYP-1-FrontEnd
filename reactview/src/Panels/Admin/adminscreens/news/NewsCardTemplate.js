import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function NewsCardTemplate(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={props.imgsrc} />
                        <Card.Body>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Text>
                             <h7 className='red'>  Category: </h7>{props.Category}
                            </Card.Text>
                            <Card.Text>
                            <h7 className='red'>  Posted On: </h7> {props.Posted_on}
                            </Card.Text>
                            <Card.Text>
                                {props.details}
                            </Card.Text>
                            <Button variant="danger">Delete News</Button>
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </div>
    )
}
