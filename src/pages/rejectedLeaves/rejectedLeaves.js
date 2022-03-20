import React, { useEffect, useState }  from "react";
import {Col, Container, Row, Table, Button, Form, FormControl} from "react-bootstrap";
import axios from "axios";
import {GET_ALL_LEAVE_DATA} from "../../configs/api-config";
import {LEAVE_APPROVED, LEAVE_REJECTED, LEAVE_SHORT, LEAVE_FULL_DAY, LEAVE_SICK} from "../../configs/notedowns-config";


const baseURL = GET_ALL_LEAVE_DATA;


const RejectedLeaves = (props) => {

    // Axios calls ----------------------------------------------------------------------------
    const [leaves, setLeaves] = React.useState(null);
    const [leavesTaken, setLeavesTaken] = React.useState(0);




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
                                <h1>Human Resource Dashboard</h1>
                                <p>Rejected Leaves</p>
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
                                            {item.status == LEAVE_REJECTED ? (
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

export default RejectedLeaves;