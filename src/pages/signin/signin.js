import React, { useEffect, useState }  from "react";
import axios from "axios";


const baseURL = "http://127.0.0.1:8000/api/leaves/";

const Signin = (props) => {
    const [leaves, setLeaves] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setLeaves(response.data);
        });
    }, []);

    if (!leaves) return null;
    console.log(leaves);

    return (
        <div>
            {leaves.map((item, index)=>
                <div key={item.leaveID}>
                    <h1>{item.leaveID}</h1>
                </div>
            )}


        </div>
    );
}

export default Signin;