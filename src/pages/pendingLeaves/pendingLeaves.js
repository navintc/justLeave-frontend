import React, {useCallback, useEffect, useState} from "react";
import {Col, Container, Row, Table, Button, Form, FormControl} from "react-bootstrap";
import axios from "axios";
import {GET_ALL_LEAVE_DATA, USER_LOGIN} from "../../configs/api-config";
import {
    LEAVE_APPROVED,
    LEAVE_PENDING,
    LEAVE_REJECTED,
    LEAVE_SHORT,
    LEAVE_FULL_DAY,
    LEAVE_SICK,
    HR_MANAGER, EMPLOYEE
} from "../../configs/notedowns-config";


import {useSelector} from "react-redux";
import {setUserName} from "../../redux/slices/username";
import {setUserID} from "../../redux/slices/userid";
import {setUserType} from "../../redux/slices/usertype";




const PendingLeaves = (props) => {

    // Axios calls ----------------------------------------------------------------------------
    const [leaves, setLeaves] = React.useState(null);
    const [leavesTaken, setLeavesTaken] = React.useState(0);
    const [responseRefresher, setResponseRefresher] = React.useState(0);


    React.useEffect(() => {
        axios.get(GET_ALL_LEAVE_DATA).then((response) => {
            setLeaves(response.data);
        });
    }, []);

    if (!leaves) return null;


    //Change the status to rejected
    const ChangeLeaveStatus = (leavingUser, status) => {
        console.log("Hamme");
        //Creating a object with userid & reject status to post
        const userRequestData = {leaveID: leavingUser, statusUpdate: status};

        axios.patch(GET_ALL_LEAVE_DATA, userRequestData)
            .then(response => {
                setResponseRefresher(response.data);
                console.log(responseRefresher);
                    window.location.reload(false);
            });
    }



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
        <div class="content-space main-component">
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={10}>

                        {/*topic*/}
                        <Row>
                            <div>
                                <h1>Human Resource Dashboard</h1>
                                <p>Pending Leaves</p>
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
                                            {item.status == LEAVE_PENDING ? (
                                                <tr key = {item.id}>
                                                    <td>LX0{item.id}</td>
                                                    <td>UX0{item.userID}</td>
                                                    <td>{item.leaveType == LEAVE_SHORT ? ("Short Leave") : item.leaveType == LEAVE_SICK ? ("Sick Leave") : ("Leave")}</td>
                                                    <td>{item.leaveDate}</td>
                                                    <td>
                                                        <Button variant="success" size="sm" style={{marginRight:"10px"}} onClick={ ()=> ChangeLeaveStatus(item.id, LEAVE_APPROVED) }>Approve</Button>
                                                        <Button variant="danger" size="sm" style={{marginRight:"10px"}} onClick={ ()=> ChangeLeaveStatus(item.id, LEAVE_REJECTED) }>Reject</Button>
                                                    </td>

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

export default PendingLeaves;