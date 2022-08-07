import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { Navbar } from './Navbar';

export const Reset = () => {
    return (
        <>
        <Navbar/>
            <section className="ftco-section">
                <div className="containerr-fp">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">FoodE</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        <div className="wrap d-md-flex justify-content-center">
                            <div className="login-wrap py-4 py-lg-5">
                                <div className="justify-content-center" >
                                    <div>
                                        <h3 className="mb-4" style={{ textAlign: "center" }}>Reset Password</h3>
                                        <p className="mb-4" style={{ textAlign: "center" }}>Enter your new password below, we're just being extra safe</p>
                                    </div>

                                </div>
                                <form action="#" className="signin-form">
                                    <div className="first mb-3 in-fg" style={{borderBottom:"1px solid #ccc"}}>
                                        <input style={{background:"transparent" , borderRadius: "0px", outline: "none", boxShadow: "none", border: "0px"}} type="password" className="form-control in-fg1" id="email" placeholder="New Password"/>
                                        <i class="fas fa-key"></i>
                                    </div>
                                    <div className="first mb-3 in-fg" style={{borderBottom:"1px solid #ccc"}}>
                                        <input style={{background:"transparent" , borderRadius: "0px", outline: "none", boxShadow: "none", border: "0px"}} type="password" className="form-control in-fg1" id="email" placeholder="Confirm Password"/>
                                        <i class="fas fa-key"></i>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary submit px-3">Reset Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
