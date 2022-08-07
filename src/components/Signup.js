import React, { useState,useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Navbar } from './Navbar';
import SweetAlertContext from "./context/SweetAlertContext";

export const Signup = (props) => {
  const  {Register,questionAlert}  = useContext(SweetAlertContext);

    const [credentials, setCredentials] = useState({ email: "", password: "", username: "", confirmpassword: "" })
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = credentials;
        const url = `http://localhost:5000/api/auth/signin`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the Auth Token & Redirect
            localStorage.setItem('token', json.authToken);
            history.push('/');
            Register();
        }
        else {
            questionAlert();
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <Navbar/>
            <section className="ftco-section">
                <div className="containerr-su">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Welcome to FoodE</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                    <div className="text w-100">
                                        <div className="icon"><span className="fas fa-shopping-cart"></span></div>
                                        <h2>Shopping</h2>
                                        <p>Already have an account?</p>
                                        <Link to="/login" className="btn btn-white btn-outline-white">Sign In</Link>
                                    </div>
                                </div>
                                <div className="login-wrap p-4 p-md-5">
                                    <h3 className="mb-4">Hello! <span>Please signup to continue</span></h3>
                                    <form onSubmit={handleSubmit} className="signup-form">
                                        <div className="form-group mb-4">
                                            <label className="label" htmlFor="name">User Name</label>
                                            <input type="name" className="form-control" placeholder="John Wick" minLength={5} required onChange={onChange} id="username" name="username" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="label" htmlFor="email">Email Address</label>
                                            <input type="email" className="form-control" placeholder="johnwick@gmail.com" onChange={onChange} id="email" name="email" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="label" htmlFor="password">Password</label>
                                            <input type="password" className="form-control" placeholder="Password" minLength={5} required onChange={onChange} id="password" name="password" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="label" htmlFor="confirmpassword">Confirm Password</label>
                                            <input type="password" className="form-control" placeholder="Confirm Password" minLength={5} required onChange={onChange} id="confirmpassword" name="confirmpassword" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary rounded submit p-3 signb">Sign Up</button>
                                        </div>
                                    </form>
                                    <div className="w-100 social-wrap">
                                        <p>
                                            <span>or</span>
                                            <span>Signup with</span>
                                        </p>
                                        <p className="social-media d-flex justify-content-center">
                                            <Link to="/signin"
                                                className="social-icon facebook d-flex align-items-center justify-content-center"><span
                                                    className="fa fa-facebook"></span></Link>
                                            <Link to="/signin"
                                                className="social-icon twitter d-flex align-items-center justify-content-center"><span
                                                    className="fa fa-twitter"></span></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
