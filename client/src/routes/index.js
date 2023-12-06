import { useState } from 'react';
import "../css/my-login.css";
import "../css/main.css";
import "../login-page-files/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle'
import "../js/my-login"
import Token from '../components/token';
const settings = require("../settings.json");
const serverName = settings.serverData.name;

const LoginPage = () => {

    document.body.classList.add("my-login-page");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("none");

    const login = async (event) => {
        setAlert("none");
        event.preventDefault();
        const res = await fetch(serverName + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': Token.value
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const json = await res.json()
        if (json.token === false) { event.target.classList.remove("was-validated"); setAlert("block"); return false }
        Token.value = json.token;
        window.open("/boxes", "_self");
    }

        return (
            <section className="h-100">
                <div className="container h-100">
                    <div className="row align-items-center justify-content-center h-100">
                        <div className="card-wrapper">
                            <div className="card fat">
                                <div className="card-body">
                                    <form method="POST" onSubmit={login} action="/boxes" className="my-login-validation" noValidate>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input id="username" type="text" className="form-control" name="username" required
                                                autoFocus value={username} onChange={(ev) => { setUsername(ev.target.value) }} />
                                            <div className="invalid-feedback">
                                                Username is invalid
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password
                                            </label>
                                            <input id="password" type="password" className="form-control" name="password" required
                                                data-eye value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="custom-checkbox custom-control">
                                                <input type="checkbox" name="remember" id="remember"
                                                    className="custom-control-input" />
                                                <label htmlFor="remember" className="custom-control-label">Remember Me</label>
                                            </div>
                                        </div>

                                        <div className="form-group m-0">
                                            <button type="submit" className="btn btn-primary btn-block">
                                                Login
                                            </button>
                                        </div>
                                        <div className="alert alert-danger mt-2 text-center" style={{display: alert}} role="alert" id="badLogin">
                                            Invalid username or password!
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ position: "fixed", bottom: 0, right: "20px", backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,.05)", borderRadius: "3px 3px 0 0", fontSize: "12px", padding: "5px 10px" }}>Login page by <a href="https://twitter.com/mhdnauvalazhar">@mhdnauvalazhar</a> &nbsp;&bull;&nbsp; <a href="https://www.buymeacoffee.com/mhdnauvalazhar">Buy me a Coffee</a></div>
            </section>
        );
}

export default LoginPage;