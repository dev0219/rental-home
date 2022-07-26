import { useState, useContext, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import validator from 'validator'
import { StateContext, DispatchContext } from "../context/GlobalContext";
import { Link } from 'react-router-dom';
import {
    USER_REGSITER_FAIL,
    USER_REGSITER_SUCCESS,
    USER_REGSITER_REQUEST,
} from "../context/constants/userConstants";
import axios from "axios";
import Loading from "../components/Loading";

function Login({ history, location }) {
    const state = useContext(StateContext);
    const { user } = state;
    const dispatch = useContext(DispatchContext);
    const fromPath = useRef(location.state ? location.state.from.pathname : "/");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("Realtor");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
            setError("Please fill the input filed")
            return;
        } if (!validator.isEmail(email)) {
            setError("Invalid email type")
            return;
        } if (!validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setError('Please ensure strong password.')
            return;
        } if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        dispatch({ type: USER_REGSITER_REQUEST });
        try {
            const { } = await axios.post("/api/users/", {
                name,
                email,
                userType,
                password,
              });
              dispatch({
                type: USER_REGSITER_SUCCESS,
                payload: {},
              });
              history.push({
                pathname: "/login",
                state: { message: "Registration successful, please login to continue" },
              });
        } catch (e) {
            alert("catch");
            dispatch({ type: USER_REGSITER_FAIL, payload: e.response });
            setError(e.response?.data?.message);
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
    }
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
                    <form className="Form_login" onSubmit={onSubmit}>
                        <h2>Register</h2>
                        {error && <div className="Alert_login">{error}</div>}
                        <label className="InputGroup_login">
                            Name:
                            <input className="Input_login"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className="InputGroup_login">
                            Email:
                            <input className="Input_login"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className="InputGroup_login">
                            User-Type:
                            <select className="Input_login" style={{cursor:"pointer"}}
                                name="userType"
                                value={userType}
                                onChange={(e) => { setUserType(e.target.value);}}
                            >
                                <option value="Realtor">Realtor</option>
                                <option value="Customer">Customer</option>
                            </select>
                        </label>
                        <label className="InputGroup_login">
                            Password:
                            <input className="Input_login"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label className="InputGroup_login">
                            Confirm Password:
                            <input className="Input_login"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        <div className="ButtonContainer_login">
                            <button className="Button_addhome Input_addhome" onClick={handleSubmit}>Register</button>
                            <Link to="/login" className="Button_link Input_addhome">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </Layout>
    );
}

export default Login;
