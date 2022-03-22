import React, { useEffect, useState }  from "react";
import {Col, Container, Row, Table, Button, Form} from "react-bootstrap";
import {
    LEAVE_APPROVED,
    LEAVE_SHORT,

    LEAVE_SICK,
    LEAVE_REJECTED,
} from "../../configs/notedowns-config";
import {useSelector} from "react-redux";
import {getAllLeaveData, remLeaves, requestNewLeave, takLeaves, sicLeaves, shoLeaves} from "./actions";

const UserHome = ({state}) => {

    const [leaves, setLeaves] = useState([]);
    const [leaveAdded, setLeaveAdded] = useState();

    const [remainingLeaves, setRemainingLeaves] = useState();
    const [takenLeaves, setTakenLeaves] = useState();
    const [sickLeaves, setSickLeaves] = useState();
    const [shortLeaves, setShortLeaves] = useState();

    const username = useSelector((state) => state.username.value)
    const userid = useSelector((state) => state.userid.value)

    const getAllLeaves = async () => {
        const res = await getAllLeaveData();
        if (res && res.data)  {
            setLeaves(res.data);

            let k;
            let approvedCount =0;
            let sickCount = 0;
            let shortCount = 0;
            for (k in leaves){

                //remaining Counter
                if (leaves[k].status == LEAVE_APPROVED && leaves[k].userID == userid && leaves[k].leaveType !== LEAVE_SICK && leaves[k].leaveType !== LEAVE_SHORT){
                    console.log("userid:", leaves[k].userID);
                    approvedCount +=1;
                }

                //sick Counter
                if (leaves[k].status == LEAVE_APPROVED && leaves[k].userID == userid && leaves[k].leaveType == LEAVE_SICK){
                    sickCount += 1;
                }

                //short Counter
                if (leaves[k].status == LEAVE_APPROVED && leaves[k].userID == userid && leaves[k].leaveType == LEAVE_SHORT){
                    shortCount += 1;
                }
            }
            let remCount = 30 - approvedCount;
            setRemainingLeaves(remCount);
            setTakenLeaves(approvedCount);
            setSickLeaves(sickCount);
            setShortLeaves(shortCount);
            // setRemainingLeaves(await remLeaves(leaves));
        }
        else{
            setLeaves([]);
        }
    }

    useEffect(() => {
        getAllLeaves().finally();

    }, []);

    const requestLeave = async (event) => {
        // Prevent page from reloading
        event.preventDefault();

        const leaveType = event.target.elements.formLeaveType.value;
        const leaveDate = event.target.elements.formLeaveDate.value;

        if (!leaveType || !leaveDate){
            // TODO: check validation
            console.log("Invalid input data");
            return null;
        }

        //Creating a object with email & password to post
        const userLeaveData = { userID: userid, leaveType: leaveType, leaveDate: leaveDate};

        // Axios calls -----------------------------------------------------------------
        await requestNewLeave(userLeaveData);
        await getAllLeaves();
    }

    return(
        <div class={"content-space main-component"}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={10}>

                        {/*topic*/}
                        <Row>
                            <div>
                                <h1>{username}</h1>
                                <p>Welcome back Hero!</p>
                            </div>
                        </Row>

                        <Row className="justify-content-md-center block-example border border-dark">
                            <Col className="text-center">
                                <h1>{remainingLeaves}</h1>
                                <p>Remaining Leaves</p>
                            </Col>

                            <Col className="text-center">
                                <h1>{takenLeaves}</h1>
                                <p>Taken Leaves</p>
                            </Col>

                            <Col className="text-center">
                                <h1>{sickLeaves}</h1>
                                <p>Sick Days Taken</p>
                            </Col>

                            <Col className="text-center">
                                <h1>{shortLeaves}</h1>
                                <p>Short Leaves</p>
                            </Col>

                        </Row>

                        <div className={"content-space"}/>

                        {/*second boxes*/}
                        <Row className="justify-content-md-center">

                            {/*request leaves*/}
                            <Col >
                                <div className={"block-example border border-dark"}>
                                    <Row className="justify-content-md-center">

                                        <Col xs={6} md={10}>
                                            <div className={"content-space"}/>
                                            <p>Leave Type</p>
                                            <Form onSubmit={(e ) => requestLeave(e)}>
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
                                                        {leaveAdded && "Leave Requested Successfully"}
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
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {leaves.map((item)=> (
                                                <>
                                                    {item.userID == userid && (
                                                        <tr key = {item.id}>
                                                            <td>LX0{item.id}</td>
                                                            <td>{item.leaveType == LEAVE_SHORT ? ("Short Leave") : item.leaveType == LEAVE_SICK ? ("Sick Leave") : ("Leave")}</td>
                                                            <td>{item.leaveDate}</td>
                                                            <td>{item.status == LEAVE_APPROVED ? ("Approved") : item.status == LEAVE_REJECTED ? ("Rejected") : ("Pending")}</td>

                                                        </tr>
                                                    )}
                                                </>)
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



