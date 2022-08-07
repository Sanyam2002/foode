import React,{useState,useContext} from 'react'
import { Link,useHistory } from "react-router-dom";
import { Navbar } from './Navbar';
import SweetAlertContext from "./context/SweetAlertContext";

export const Login = (props) => {
  const  {questionAlert}  = useContext(SweetAlertContext);


    const [credentials, setCredentials] = useState({ email: "", password: "" ,username:""})
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password , username:credentials.username })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save the Auth Token & Redirect
            localStorage.setItem('token',json.authToken) 
            history.push('/');
            window.location.reload()
        }else{
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
                <div className="containerr">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">FoodE</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                    <div className="text w-100">
                                        <h2>Welcome to login</h2>
                                        <p>Don't have an account?</p>
                                        <Link to="/signin" className="btn btn-white btn-outline-white">Sign Up</Link>
                                    </div>
                                </div>
                                <div className="login-wrap p-4 p-lg-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Log In</h3>
                                        </div>
                                        <div className="w-100">
                                            <p className="social-media d-flex justify-content-end">
                                                <Link to="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></Link>
                                                <Link to="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></Link>
                                            </p>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit} className="signin-form">
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="username">Username</label>
                                            <input type="name" className="form-control" placeholder="Username" required id="username" name="username" onChange={onChange}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="email">Email</label>
                                            <input type="email" className="form-control" placeholder="Email" required id="email" name="email" onChange={onChange}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="password">Password</label>
                                            <input type="password" className="form-control" placeholder="Password" required id="password" name="password" onChange={onChange}/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="form-control btn btn-primary submit px-3">Log In</button>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50 text-left">
                                                <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <Link to="/forgot">Forgot Password?</Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
