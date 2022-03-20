import React, { useEffect, useState, useCallback }  from "react";
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import {setUserID} from "../../redux/slices/userid";
import {setUserName} from "../../redux/slices/username";
import {setUserType} from "../../redux/slices/usertype";
import {HR_MANAGER, EMPLOYEE} from "../../configs/notedowns-config";
import {useNavigate} from 'react-router-dom';
import {USER_LOGIN} from "../../configs/api-config";

const Signin = (props) => {
    const [leaves, setLeaves] = React.useState(null);
    const [loginReturn, setLoginReturn] = React.useState(null);
    const dispatch = useDispatch()


    //in-function react router links
    const navigate = useNavigate();
    const HRLink = useCallback(() => navigate('/pendingleaves', {replace: true}), [navigate]);
    const EmployeeLink = useCallback(() => navigate('/userhome', {replace: true}), [navigate]);

    const checkUserCredentials = event => {
        // Prevent page from reloading
        event.preventDefault()

        //getting & holding form data
        var emailHolder = event.target.elements.formBasicEmail.value
        var pwrdHolder = event.target.elements.formBasicPassword.value

        //Creating a object with email & password to post
        const userRequestData = { email: emailHolder, password: pwrdHolder};

        axios.post(USER_LOGIN, userRequestData)
            .then(response => {

                //saving the response in to a state
                setLoginReturn(response);

                //saving data into react redux slices
                dispatch(setUserName(loginReturn.data.data.name));
                dispatch(setUserID(loginReturn.data.data.id));
                dispatch(setUserType(loginReturn.data.data.userType));

                //checking the user type and redirecting to the pages
                if (loginReturn.data.data.userType == HR_MANAGER){
                    HRLink();
                } else if (loginReturn.data.data.userType == EMPLOYEE) {
                    EmployeeLink();
                }
            });
    }

    return (
        <div class={"content-space main-component"}>
            <Container class={"my-auto"}>

                <Row className="justify-content-md-center">
                    <Col xs={3}>
                        <Form  onSubmit={(e ) => checkUserCredentials(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signin;