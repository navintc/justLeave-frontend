import React, { useEffect, useState, useCallback }  from "react";
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import {setUserID} from "../../redux/slices/userid";
import {setUserName} from "../../redux/slices/username";
import {setUserType} from "../../redux/slices/usertype";
import {HR_MANAGER, EMPLOYEE, UNASSIGNED} from "../../configs/notedowns-config";
import {Link, useNavigate} from 'react-router-dom';
import {USER_SIGNUP} from "../../configs/api-config";

const Signup = (props) => {
    const [leaves, setLeaves] = React.useState(null);
    const [signupReturn, setSignupReturn] = React.useState(null);
    const dispatch = useDispatch()


    //in-function react router links
    const navigate = useNavigate();
    const signInPage = useCallback(() => navigate('/', {replace: true}), [navigate]);


    //changing user type UNASSIGNED to hide navbar content
    dispatch(setUserType(UNASSIGNED));

    const checkUserCredentials = event => {
        // Prevent page from reloading
        event.preventDefault()

        //getting & holding form data
        var nameHolder = event.target.elements.formBasicName.value
        var emailHolder = event.target.elements.formBasicEmail.value
        var pwrdHolder = event.target.elements.formBasicPassword.value

        //Creating a object with email & password to post
        const userRequestData = { name: nameHolder, email: emailHolder, password: pwrdHolder};

        axios.post(USER_SIGNUP, userRequestData)
            .then(response => {
                //saving the response in to a state
                setSignupReturn(response);
                signInPage();
            });
    }

    return (
        <div class={"content-space main-component"}>
            <Container class={"my-auto"}>

                <Row className="justify-content-md-center">
                    <Col xs={3}>
                        <Form  onSubmit={(e ) => checkUserCredentials(e)}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter name" />
                            </Form.Group>
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
                        <p>Have an account? <Link to="/" >Sign in now.</Link></p>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;