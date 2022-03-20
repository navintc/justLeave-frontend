import React, { useEffect, useState }  from "react";
import {Col, Container, Row, Table, Button, Form, FormControl} from "react-bootstrap";
import axios from "axios";
import {GET_ALL_LEAVE_DATA} from "../../configs/api-config";
import {LEAVE_APPROVED, LEAVE_SHORT, LEAVE_FULL_DAY, LEAVE_SICK} from "../../configs/notedowns-config";

const ApprovedLeaves = (props) => {

    // Axios calls ----------------------------------------------------------------------------
    const [leaves, setLeaves] = useState(null);
    const [leavesTaken, setLeavesTaken] = useState(0);

    useEffect(() => {
        axios.get(GET_ALL_LEAVE_DATA).then((response) => {
            setLeaves(response.data);
        });
    }, []);

    if (!leaves) return null;

    return(
        <div class={"content-space main-component"}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={10}>

                        {/*topic*/}
                        <Row>
                            <div>
                                <h1>Human Resource Dashboard</h1>
                                <p>Approved Leaves</p>
                            </div>
                        </Row>

                        {/*table*/}
                        <Row class={"content-space"}>
                            <div>
                                <Table responsive="sm">
                                    <thead>
                                    <tr>
                                        <th>Leave ID</th>
                                        <th>User ID</th>
                                        <th>Leave Type</th>
                                        <th>Leave Date</th>
                                        {/*<th>Leaves Taken</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {leaves.map((item, index)=>
                                        <>
                                            {/*{leavesTakenCalculator()}*/}
                                        {item.status == LEAVE_APPROVED ? (
                                        <tr key = {item.id}>
                                            <td>LX0{item.id}</td>
                                            <td>UX0{item.userID}</td>
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
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ApprovedLeaves;