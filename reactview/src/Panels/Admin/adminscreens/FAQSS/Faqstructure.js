import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function Faqstructure(props) {
    return (
        <div className="container">
            <div className="headin">
                <h4>{props.title}</h4>
                <p>{props.details}  <button className='btn btn-danger bton'> Delete Question</button></p>

            </div>
        </div>
    )
}
