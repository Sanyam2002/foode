import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import axios from "axios";
import CartContext from "./context/CartContext";
import Spinner from "./Spinner";
import profileContext from "./context/profilecontext";
import SweetAlertContext from "./context/SweetAlertContext";
export const OrderSummary = () => {
  // const [Products, setProducts] = useState([]);
  const { profiles } = useContext(profileContext);
  const { historys } = useContext(CartContext);
  const [loading, setloading] = useState(false)
  const [Total, setTotal] = useState(0);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const orderno = Math.floor(Math.random() * 10000000 + 1);
  const  {toggle, addminus}  = useContext(SweetAlertContext);
  useEffect(() => {
    addminus();
    calculateTotal();
  });
  useEffect(() => {
    toggle();
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000);
  },[]);
  
  

  
  const calculateTotal = () => {
    let total = 0;

    historys
      .filter((newp) => newp.time > (Date.now() -  240000))
      .map((items) => {
        total += parseInt(items.price, 10) * items.quantity;
      });
    setTotal(total);
  };
  return (
    <>
      <Navbar />
      {loading && <Spinner/>}
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="summary-card">
              <div className="summary-invoice p-5">
                {profiles.map((profile) => {
                  return (
                    <div>
                      <h5>Your order Confirmed!</h5>{" "}
                      <span className="font-weight-bold d-block mt-4">
                        Hello, {profile.firstname}
                      </span>{" "}
                      <span>
                        You order has been confirmed and will be shipped in next
                        two days!
                      </span>
                    </div>
                  );
                })}
                <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div className="py-2">
                            {" "}
                            <span className="d-block text-muted">
                              Order Date
                            </span>{" "}
                            <span>{today.toDateString()}</span>{" "}
                          </div>
                        </td>
                        <td>
                          <div className="py-2">
                            {" "}
                            <span className="d-block text-muted">
                              Order No
                            </span>{" "}
                            <span>MT{orderno}</span>{" "}
                          </div>
                        </td>
                        <td>
                          <div className="py-2">
                            {" "}
                            <span className="d-block text-muted">
                              Payment
                            </span>{" "}
                            <span>
                              <img
                                src="https://img.icons8.com/color/48/000000/mastercard.png"
                                width="20"
                              />
                            </span>{" "}
                          </div>
                        </td>
                        {profiles.map((profile) => {
                          return (
                            <td>
                              <div className="py-2">
                                {" "}
                                <span className="d-block text-muted">
                                  Shiping Address
                                </span>{" "}
                                <span>
                                  {profile.address},{profile.city},
                                  {profile.state},{profile.pincode}
                                </span>{" "}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
                {historys.filter((newp) => newp.time > (Date.now() -  240000))
                  .map((item) => {
                    return (
                      <div className="product border-bottom table-responsive">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td width="20%">
                                {" "}
                                <img
                                  src={`http://localhost:5000/${item.image}`}
                                  style={{ width: "60%", maxHeight: "80px" }}
                                  width="70"
                                />{" "}
                              </td>
                              <td width="60%">
                                {" "}
                                <span className="font-weight-bold">
                                  {item.title}
                                </span>
                                <div className="product-qty">
                                  {" "}
                                  <span className="d-block">
                                    Quantity:{item.date}
                                  </span>{" "}
                                </div>
                              </td>
                              <td width="20%">
                                <div className="text-right">
                                  {" "}
                                  <span className="font-weight-bold">
                                    ₹{item.price}
                                  </span>{" "}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                <div className="row d-flex justify-content-end">
                  <div className="col-md-5">
                    <table className="table table-borderless">
                      <tbody className="totals">
                        <tr>
                          <td>
                            <div className="text-left">
                              {" "}
                              <span className="text-muted">Subtotal</span>{" "}
                            </div>
                          </td>
                          <td>
                            <div className="text-right">
                              {" "}
                              <span>₹{Total}</span>{" "}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="text-left">
                              {" "}
                              <span className="text-muted">
                                Shipping Fee
                              </span>{" "}
                            </div>
                          </td>
                          <td>
                            <div className="text-right">
                              {" "}
                              <span>₹22</span>{" "}
                            </div>
                          </td>
                        </tr>
                        <tr className="border-top border-bottom">
                          <td>
                            <div className="text-left">
                              {" "}
                              <span className="font-weight-bold">
                              ₹{Total}
                              </span>{" "}
                            </div>
                          </td>
                          <td>
                            <div className="text-right">
                              {" "}
                              <span className="font-weight-bold">
                                ₹ {Total + 22}
                              </span>{" "}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p>
                  We will be sending shipping confirmation email when the item
                  shipped successfully!
                </p>
                <p className="font-weight-bold mb-0">
                  Thanks for shopping with us!
                </p>{" "}
                <span>Foode Team</span>
              </div>
              <div className="d-flex justify-content-between summary-footer p-3">
                {" "}
                <span>
                  Need Help? visit our{" "}
                  <Link to="/orderhistory"> help center</Link>
                </span>{" "}
                <span>{today.toDateString()}</span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
