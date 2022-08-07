import React from 'react'
import { Link } from "react-router-dom";
export const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-wrap">
                    <div className="container first_class">
                        <div className="row" id="footer-row">
                            <div className="col-md-4 col-sm-6">
                                <h3>BE THE FIRST TO KNOW</h3>
                                <p>Get all the latest information on  FoodE Services, Events, Receipes and Discounts. Sign up for our newsletter today.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <form className="newsletter">
                                    <input type="text" placeholder="Email Address" />
                                </form>

                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="col-md-12">
                                    <div className="standard_social_links">
                                        <div>
                                            <li className="round-btn btn-facebook"><Link to="/"><i className="fab fa-facebook"></i></Link>

                                            </li>
                                            <li className="round-btn btn-linkedin"><Link to="/"><i className="fab fa-linkedin-in"></i></Link>

                                            </li>
                                            <li className="round-btn btn-twitter"><Link to="/"><i className="fab fa-twitter" aria-hidden="true"></i></Link>

                                            </li>
                                            <li className="round-btn btn-instagram"><Link to="/"><i className="fab fa-instagram" aria-hidden="true"></i></Link>

                                            </li>
                                            <li className="round-btn btn-whatsapp"><Link to="/"><i className="fab fa-whatsapp" aria-hidden="true"></i></Link>

                                            </li>
                                            <li className="round-btn btn-envelop"><Link to="/"><i className="fa fa-envelope" aria-hidden="true"></i></Link>

                                            </li>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-12"><h3 style={{textAlign: 'right'}}>Stay Connected</h3></div>
                            </div>
                        </div>
                    </div>
                    <div className="second_class">
                        <div className="container second_class_bdr">
                            <div className="row">
                                <div className="col-md-4 col-sm-6">

                                    <div className="footer-logo"><img src={'../img/_Logo.png'} alt="logo" style={{ height: '50px' }} />
                                    </div>
                                    <p>Your one-stop career platform to find Jobs, Internships, Professional Trainings, Projects, and Volunteering Opportunities.</p>
                                </div>
                                <div className="col-md-2 col-sm-6">
                                    <h3>Quick  LInks</h3>
                                    <ul className="footer-links">
                                        <li><Link to="/">Home</Link>
                                        </li>
                                        <li><Link to="/">About us</Link>
                                        </li>
                                        <li><Link to="/">Triedge Partners</Link>
                                        </li>
                                        <li><Link to="/">Contact Us</Link>
                                        </li>
                                        <li><Link to="/" target="_blank">Terms &amp; Conditions</Link>
                                        </li>
                                        <li><Link to="/" target="_blank">Privacy Policy</Link>
                                        </li>
                                        <li><Link to="/">Sitemap</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <h3>OUR SERVICES</h3>
                                    <ul className="footer-category">
                                        <li><Link to="/">Fresher Jobs</Link>
                                        </li>
                                        <li><Link to="/">InternEdge - Internships &amp; Projects </Link>
                                        </li>
                                        <li><Link to="/">Resume Edge - Resume Writing Services</Link>
                                        </li>
                                        <li><Link to="/">Readers Galleria - Curated Library</Link>
                                        </li>
                                        <li><Link to="/">FoodE - Campus Ambassadors</Link>
                                        </li>
                                    </ul>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <h3>triedge Events</h3>
                                    <ul className="footer-links">
                                        <li><Link to="/">FoodE Events</Link>
                                        </li>

                                        <li><Link to="/">Jobs &amp; Internship Fair 2019</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="container-fluid">
                            <div className="copyright"> Copyright 2021 | All Rights Reserved by FoodE</div>
                        </div>

                    </div>
                </div>

            </footer>
        </>
    )
}
