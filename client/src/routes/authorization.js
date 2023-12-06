import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/loader";
import Token from "../components/token";

const settings = require("../settings.json");
const serverName = settings.serverData.name;

const Authorization = (props) => {

    const [res, setRes] = useState(undefined);

    useEffect(() => {
        fetch(`${serverName}/auth`, {
            method: "POST",
            headers: {
                'Authorization': Token.value
            }
        }).then(x => x.json()).then(x => setRes(x.res));
    }, [])

    if (props.loginPage === true) {
        if (res === false) { return props.path }
        else if (res === undefined) { return <Loader /> }
        else { return <Navigate to="/boxes" /> }
    } else {
        if (res === false) { return <Navigate to="/" /> }
        else if (res === undefined) { return <Loader /> }
        else { return props.path }
    }

}

export default Authorization