import React from "react";
import { Row, Col } from "react-bootstrap";

const UserPanelFooter = () => {
    return (
        <div className="">
        <Row>
            <Col sm={4}>
                <h6>bookFLIGHT</h6>
                <p>All rights reserved. Copyright © 2022</p>
            </Col>
            <Col sm={3}>
                <h6>FEATURES</h6>
                <p>Search flights</p>
                <p>Book flight</p>
                <p>Cancel flight bookings</p>
                <p>Book flight without Sign-up</p>
                <p>See popular flights</p>
                <p>Provide multiple payment methods</p>
            </Col>
            <Col sm={3}>
                <h6>AFFILIATE</h6>
                <p>What We Offer</p>
                <p>Terms and Conditions</p>
                <p>Apply</p>
            </Col>
            <Col sm={2}>
                <h6>SUPPORT</h6>
                <p>Help Desk</p>
                <p>Site Map</p>
                <p>Contact Us</p>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col sm={12}>
                <h5>© 2021 bookFLIGHT. All Rights Reserved.</h5>
            </Col>
        </Row>
        </div>
    );
};
export default UserPanelFooter;