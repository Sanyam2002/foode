import React from 'react'
import { Link } from "react-router-dom";
import { Footer } from './Footer';
import { Navbar } from './Navbar';
export const Checkout = () => {
    return (
        <>
        <Navbar/>
            <div className="checkout-area pt-90 pb-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="checkout-progress-wrap">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{width: "50%" }}aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="checkout-progress-step">
                                    <ul>
                                        <li className="active">
                                            <div className="icon"><i className="fas fa-check"></i></div>
                                            <span>Shipping</span>
                                        </li>
                                        <li>
                                            <div className="icon">2</div>
                                            <span>Order Successful</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="checkout-form-wrap">
                                <form action="#">
                                    <div className="checkout-form-top">
                                        <h5 className="title">Contact information</h5>
                                        <p>Already have an account? <Link to="contact.html">Log in</Link></p>
                                    </div>
                                    <input type="text" placeholder="Email or Mobile Phone Number *" />
                                    <div className="news-and-offers custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="nao" />
                                        <label className="custom-control-label" for="nao">Keep me up to date on news and offers</label>
                                    </div>
                                    <div className="building-info-wrap">
                                        <h5 className="title">Billing Information</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" placeholder="First Name *" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="Last Name *" />
                                            </div>
                                        </div>
                                        <input type="text" placeholder="Country *" />
                                        <input type="text" placeholder="Street Address *" />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" placeholder="City" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="State *" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="Pin Code" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="Landmark" />
                                            </div>
                                        </div>
                                        <textarea name="message" id="message" placeholder="Message"></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="shop-cart-total order-summary-wrap">
                                <h3 className="title">Order Summary</h3>
                                <div className="os-products-item">
                                    <div className="thumb">
                                        <Link to="shop-details.html"><img src={"../img/os-products-thumb.jpg"} alt="" /></Link>
                                    </div>
                                    <div className="content">
                                        <h6 className="title"><Link to="shop-details.html">Orange</Link></h6>
                                        <span className="price">₹50</span>
                                    </div>
                                    <div className="remove">x</div>
                                </div>
                                <div className="shop-cart-widget">
                                    <form action="#">
                                        <ul>
                                            <li className="sub-total"><span>Subtotal</span> ₹ 50.00</li>
                                            <li>
                                                <span>Shipping</span>
                                                <div className="shop-check-wrap">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                        <label className="custom-control-label" for="customCheck1">Free Shipping</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                                        <label className="custom-control-label" for="customCheck2">LOCAL PICKUP: ₹5.00</label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="cart-total-amount"><span>Total Price</span> <span className="amount">₹ 55.00</span></li>
                                        </ul>
                                        <div className="payment-method-info">
                                            <div className="paypal-method-flex">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck5" />
                                                    <label className="custom-control-label" for="customCheck5">Cash on delivery</label>
                                                    <p>Pay with cash upon delivery.</p>
                                                </div>
                                            </div>
                                            <div className="paypal-method-flex">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck6" />
                                                    <label className="custom-control-label" for="customCheck6">Debit/Credit Cards</label>
                                                </div>
                                                <div className="paypal-logo"><img src={"../img/card.png"} alt="" /></div>
                                            </div>
                                        </div>
                                        <div className="payment-terms">
                                            <p>Pay Securely with Visa and get a discount voucher worth ₹1k</p>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck7" />
                                                <label className="custom-control-label" for="customCheck7">I agree to the website terms and conditions</label>
                                            </div>
                                        </div>
                                        <Link to="checkout.html" className="btn">Place order</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
