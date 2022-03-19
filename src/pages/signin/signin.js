import React, { useEffect, useState }  from "react";
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import {setUserID} from "../../redux/slices/userid";
import {setUserName} from "../../redux/slices/username";
import {setUserType} from "../../redux/slices/usertype";

const baseURL = "http://127.0.0.1:8000/api/leaves/";

const Signin = (props) => {
    const [leaves, setLeaves] = React.useState(null);
    const [loginReturn, setLoginReturn] = React.useState(null);
    const dispatch = useDispatch()
    // dispatch(setUserID("hm"));
    const userid = useSelector((state) => state.userid.value)

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setLeaves(response.data);
        });

    }, []);


    // {
    //     "data": {
    //         "id": 1,
    //         "userID": "SX0001",
    //         "name": "Bileka Karunarathne",
    //         "email": "bileka@bileka.com",
    //         "email_verified_at": null,
    //         "userType": 0,
    //         "created_at": null,
    //         "updated_at": null
    //     }
    // }


    if (!leaves) return null;
    console.log(leaves);

    const checkUserCredentials = () => {
        const userRequestData = { email: "bileka@bileka.com", password: "password"} ;
        axios.post('http://127.0.0.1:8000/api/login', userRequestData)
            .then(response => {
                setLoginReturn(response);

                console.log("loginReturn2  ", loginReturn.data);
                console.log("loginReturn2  ", loginReturn.data.data.userType);
                //let k = loginReturn.data.map(contentData => Object.keys(contentData.name));
                dispatch(setUserName(loginReturn.data.data.name));
                dispatch(setUserID(loginReturn.data.data.userID));
                dispatch(setUserType(loginReturn.data.data.userType));


            });

        dispatch(setUserID("Amor amor sagor"))
    }

    return (
        <div class={"content-space main-component"}>
            <Container class={"my-auto"}>
                {userid}
                <Row className="justify-content-md-center">
                    <Col xs={3}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" onClick={() => checkUserCredentials()}>
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