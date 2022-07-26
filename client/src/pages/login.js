import { useState, useContext, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { StateContext, DispatchContext } from "../context/GlobalContext";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
} from "../context/constants/userConstants";
import axios from "axios";
import Loading from "../components/Loading";

function Login({ history, location }) {
    const state = useContext(StateContext);
    const { user } = state;
    const dispatch = useContext(DispatchContext);
    const fromPath = useRef(location.state?.from ? location.state.from : "/");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        dispatch({ type: USER_LOGIN_REQUEST });
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/users/login", {
              email,
              password,
            });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...data, auth: true } });
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userId", data._id);
        } catch (e) {

            dispatch({ type: USER_LOGIN_FAIL, payload: e });
            setError(
                e.response?.data?.message ||
                "Something went wrong please check email/password and try again"
            );
        }
    };

    useEffect(() => {
        if (user && user.auth) {
            history.push(fromPath.current);
        }
    }, [history, user]);

    return (
        <Layout hideFooter="true" hideNav="false">
            {user.loading ? (
                <Loading />
            ) : (
                <div className="FormContainer_login">
                    <form className="Form_login">
                        <h2>Login</h2>
                        {location.state?.message && (
                            <div className="Message_login">{location.state?.message}</div>
                        )}
                        {error && <div className="Alert_login">{error}</div>}
                        <label className="InputGroup_login" htmlFor="email">
                            Email:
                            <input className="Input_login"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className="InputGroup_login" htmlFor="password">
                            Password:
                            <input className="Input_login"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <div className="ButtonContainer_login">
                            <button className="Button_addhome Input_addhome" onClick={handleSubmit}>Login</button>
                            <Link to = "/" className="Button_link Input_addhome" style={{textAlign:"center"}}>Cancel</Link>
                        </div>
                        <div style={{ textAlign: "center", paddingTop: "1rem" }}>
                            <span>
                                forgot password or <Link to="/register">register</Link>
                            </span>
                        </div>
                    </form>
                </div>
            )}
        </Layout>
    );
}

export default Login;
