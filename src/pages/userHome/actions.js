import axios from "axios";
import {ADD_NEW_LEAVE, GET_ALL_LEAVE_DATA} from "../../configs/api-config";

export const getAllLeaveData = async () => {
    try {
        return await axios.get(GET_ALL_LEAVE_DATA);
    }
    catch(e) {
        console.log(e);
    }
}

export const requestNewLeave = async (userLeaveData) => {
    try {
        return await axios.post(ADD_NEW_LEAVE, userLeaveData);
    }
    catch(e){
        console.log(e);
    }
}

//calculations
export const remLeaves = async (leaves) => {
    console.log("-------------------------------------------------------------", leaves);
    return 69;
}

export const takLeaves = async () => {
    return 69;
}

export const sicLeaves = async () => {
    return 69;
}

export const shoLeaves = async () => {
    return 69;
}