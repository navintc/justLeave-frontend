import axios from "axios";
import {GET_ALL_LEAVE_DATA} from "../../configs/api-config";

export const updateLeaveStatus = async (userRequestData) => {
    try {
        //return await axios.get(GET_ALL_LEAVE_DATA);
        return await axios.patch(GET_ALL_LEAVE_DATA, userRequestData)

    }
    catch(e) {
        console.log(e);
    }
}

export const getAllLeaves = async () => {
    try{
        return await axios.get(GET_ALL_LEAVE_DATA);
    }
    catch(e) {
        console.log(e);
    }
}