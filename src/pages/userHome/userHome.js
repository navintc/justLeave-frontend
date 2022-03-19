import React, { useEffect, useState }  from "react";
import {Col, Container, Row, Table, Button, Form, FormControl, Dropdown} from "react-bootstrap";
import axios from "axios";
import {GET_ALL_LEAVE_DATA} from "../../configs/api-config";
import {LEAVE_APPROVED, LEAVE_SHORT, LEAVE_FULLDAY, LEAVE_SICK} from "../../configs/notedowns-config";
import {useSelector} from "react-redux";


const baseURL = GET_ALL_LEAVE_DATA;



const UserHome = (props) => {

    // Axios calls ----------------------------------------------------------------------------
    const [leaves, setLeaves] = React.useState(null);
    const [leavesTaken, setLeavesTaken] = React.useState(0);
    const userid = useSelector((state) => state.username.value)




    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setLeaves(response.data);
        });
    }, []);

    if (!leaves) return null;


    // const leavesTakenCalculator = () => {
    //     let k = 0;
    //     for (let item of leaves){
    //         if (item.status == LEAVE_APPROVED){
    //             k+=1;
    //         };
    //     };
    //     setLeavesTaken(k);
    // };


    // Axios calls ----------------------------------------------------------------------------

    return(
        <div class={"content-space main-component"}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={10}>

                        {/*topic*/}
                        <Row>
                            <div>
                                <h1>{userid}</h1>
                                <p>Welcome back Hero!</p>
                            </div>
                        </Row>

                        <Row className="justify-content-md-center block-example border border-dark">
                            <Col className="text-center">

                                <h1>6</h1>
                                <p>Remaining Leaves</p>
                            </Col>

                            <Col className="text-center">
                                <h1>6</h1>
                                <p>Taken Leaves</p>
                            </Col>

                            <Col className="text-center">
                                <h1>6</h1>
                                <p>Sick Days Taken</p>
                            </Col>

                            <Col className="text-center">
                                <h1>6</h1>
                                <p>Short Leaves</p>
                            </Col>

                        </Row>


                        <div className={"content-space"}></div>

                        {/*second boxes*/}
                        <Row className="justify-content-md-center">

                            {/*request leaves*/}
                            <Col >
                                <div className={"block-example border border-dark"}>
                                    <Row className="justify-content-md-center">

                                        <Col xs={6} md={10}>
                                            <div className={"content-space"}></div>
                                            <p>Leave Type</p>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formLeaveType">
                                                    <Form.Select aria-label="Default select">
                                                        <option>Select Leave Type</option>
                                                        <option value="0">Short Leave</option>
                                                        <option value="1">Sick Leave</option>
                                                        <option value="2">Full Day Leave</option>
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formLeaveDate">
                                                    <Form.Label>Leave Date</Form.Label>
                                                    <Form.Control type="date" placeholder="Enter date" />
                                                    <Form.Text className="text-muted">
                                                        Please note that there's high chance of requests getting declined if they are not requested before 3 days.
                                                    </Form.Text>
                                                </Form.Group>

                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Form>
                                            <div className={"content-space"}></div>

                                        </Col>
                                    </Row>
                                </div>
                            </Col>




                            {/*leave status*/}
                            <Col className="text-center">
                                <div className={"block-example border border-dark"}>
                                    <div>
                                        <Table responsive="sm">
                                            <thead>
                                            <tr>
                                                <th>Leave ID</th>
                                                <th>Leave Type</th>
                                                <th>Leave Date</th>
                                                <th>Status</th>
                                                {/*<th>Leaves Taken</th>*/}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {leaves.map((item, index)=>
                                                <>
                                                    {/*{leavesTakenCalculator()}*/}
                                                    {item.status == LEAVE_APPROVED ? (
                                                        <tr key = {item.id}>
                                                            <td>{item.leaveID}</td>
                                                            <td>{item.userID}</td>
                                                            <td>{item.leaveType == LEAVE_SHORT ? ("Short Leave") : item.leaveType == LEAVE_SICK ? ("Sick Leave") : ("Leave")}</td>
                                                            <td>{item.leaveDate}</td>

                                                            {/*<td>{leavesTaken}</td>*/}
                                                            {/*calculate this*/}

                                                        </tr>
                                                    ) : null}
                                                </>
                                            )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>

                        </Row>

                        {/*table*/}
                        <Row class={"content-space"}>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserHome;