import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table, Button} from "react-bootstrap";
import {
    LEAVE_APPROVED,
    LEAVE_PENDING,
    LEAVE_REJECTED,
    LEAVE_SHORT,
    LEAVE_SICK,
} from "../../configs/notedowns-config";
import {getAllLeaves, updateLeaveStatus} from "./actions";

const PendingLeaves = (props) => {

    // Axios calls ----------------------------------------------------------------------------
    const [leaves, setLeaves] = useState([]);

    const getLeaves = async () => {
        const res = await getAllLeaves();
        setLeaves(res.data);
    }
    useEffect(() => {
        getLeaves().finally();
    }, []);

    //Change the status to rejected
    const ChangeLeaveStatus = async (leavingUser, status) => {
        //Creating a object with userid & reject status to post
        const userRequestData = {leaveID: leavingUser, statusUpdate: status};
        await updateLeaveStatus(userRequestData);
        await getLeaves();
    }

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
                                            {item.status === LEAVE_PENDING && (
                                                <tr key = {item.id}>
                                                    <td>LX0{item.id}</td>
                                                    <td>UX0{item.userID}</td>
                                                    <td>{item.leaveType === LEAVE_SHORT ? ("Short Leave") : item.leaveType === LEAVE_SICK ? ("Sick Leave") : ("Leave")}</td>
                                                    <td>{item.leaveDate}</td>
                                                    <td>
                                                        <Button variant="success" size="sm" style={{marginRight:"10px"}} onClick={ ()=> ChangeLeaveStatus(item.id, LEAVE_APPROVED) }>Approve</Button>
                                                        <Button variant="danger" size="sm" style={{marginRight:"10px"}} onClick={ ()=> ChangeLeaveStatus(item.id, LEAVE_REJECTED) }>Reject</Button>
                                                    </td>

                                                    {/*<td>{leavesTaken}</td>*/}
                                                    {/*calculate this*/}

                                                </tr>
                                            )}
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