import React, { useEffect, useContext, useState } from "react";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import ImageSlider from "./ImageSlider";
import CartContext from "./context/CartContext";
import { useHistory } from "react-router";
import { CheckBox } from "./CheckBox";
import Spinner from "./Spinner";
import axios from "axios";
import { useDispatch } from "react-redux";
import SweetAlertContext from "./context/SweetAlertContext";

export const CartPage = (props) => {
  const {deletecart,carts,addHistory,addHistory2,dec} = useContext(CartContext);
  const [Total, setTotal] = useState(0);
  const [Products, setProducts] = useState([]);
  const [PostSize, setPostSize] = useState(0);
  const [Deli, setDeli] = useState({ Category: [] });
  const dispatch = useDispatch();
  
  const [payment, setpayment] = useState(false);
  const [orderId, setorderId] = useState("");
  const [paymenId, setpaymenId] = useState("");
  const [signature, setsignature] = useState(" ");
  const { payment1,toggle, addminus} = useContext(SweetAlertContext);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    getProducts();
    toggle();
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000);
  }, []);
  

  useEffect(() => {
    calculateTotal();
    addminus();
  });

  useEffect(() => {
    if (payment === true) {
      carts.map((cart) => {
        {
          Products.filter((product) => product._id === cart.id).map(
            (product) => {
              addHistory(cart.id, cart.quantity, product.title, product.price,product.image[0]);
              addHistory2(cart.id);
              dec(product._id)
              console.log(product._id)
            }
          );
        }
      });
      history.push("/ordersummary");
      payment1();
    }
  },);
  let history = useHistory();

  const calculateTotal = () => {
    let total = 0;
    carts.map((cart) => {
      {
        Products.filter((product) => product._id === cart.id).map((product) => {
          total += parseInt(product.price, 10) * cart.quantity;
        });
      }
    });
    setTotal(total);
  };


  const url = "http://localhost:5000/api/product/getProducts";
  const getProducts = (variables) => {
    axios.post(url, variables).then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
        setPostSize(response.data.postSize);
        console.log(response.data.products);
      } else {
        alert("failed to fetch product data");
      }
    });
  };
  const showDeliResults = (deli) => {
    const variables = {
      deli: deli,
    };
    getProducts(variables);
  };
  const handledelivery = (deli, delicat) => {
    console.log(deli);
    const newDeli = { ...Deli };
    newDeli[delicat] = deli;

    showDeliResults(newDeli);

    setDeli(newDeli);
  };

  const buynow = async (Total) => {
    const url = `http://localhost:5000/api/auth/orders/razorpay/${Total}`;
    const res = await axios.get(url);
    console.log(res);
    carts.map((cart) => {
      {
        Products.filter((product) => product._id === cart.id).map((product) => {
          const options = {
            key: "rzp_test_Ms7ssj3y2mS9KN", // Enter the Key ID generated from the Dashboard
            amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: res.data.currency,
            name: "FoodE",
            description: res.data.notes,
            image: "../img/_Logo.png",
            order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
            handler: function (response) {
              setorderId(response.razorpay_order_id);
              setpaymenId(response.razorpay_payment_id);
              setsignature(response.razorpay_signature);
              setpayment(true);
            },
          };
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
          rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
        });
      }
    });
  };
  return (
    <>
    {loading && <Spinner/>}
      <Navbar />
      <div className="cart-area pt-90 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="cart-wrapper">
                <div className="table-responsive">
                {carts.length === 0 ?
                                            <div>
                                                <h4>Your Cart is Empty</h4>
                                            </div> :
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th className="product-thumbnail"></th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">QUANTITY</th>
                        <th className="product-subtotal">SUBTOTAL</th>
                        <th className="product-delete"></th>
                      </tr>
                    </thead>
                    {carts.map((cart) => {
                      return (
                        <tbody>
                          {Products.filter(
                            (product) => product._id === cart.id
                          ).map((product) => (
                            <tr>
                              <td className="product-thumbnail">
                                <ImageSlider images={product.image} />
                              </td>
                              <td className="product-name">
                                <h4>
                                  {" "}
                                  <Link to="#">{product.title}</Link>
                                </h4>
                              </td>
                              <td className="product-price">
                                ₹{product.price}
                              </td>
                              <td className="product-quantity">
                                <div className="cart--plus--minus">
                                  <form action="#" className="num-block">
                                    <input
                                      type="text"
                                      className="in-num"
                                      value={cart.quantity}
                                      readonly=""
                                    />
                                    <div className="qtybutton-box">
                                      <span className="plus">
                                        <i className="fas fa-angle-up"></i>
                                      </span>
                                      <span className="minus dis">
                                        <i className="fas fa-angle-down"></i>
                                      </span>
                                    </div>
                                  </form>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                <span>₹{product.price}</span>
                              </td>
                              <td className="product-delete">
                                <i
                                  className="far fa-trash-alt"
                                  onClick={() => {
                                    deletecart(cart.id);
                                  }}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      );
                    })}
                  </table>
}</div>
              </div>
              <div className="shop-cart-bottom">
                <div className="cart-coupon">
                  <form action="#">
                    <input type="text" placeholder="Enter Coupon Code..." />
                    <button className="btn">Apply Coupon</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-12">
              <div className="filter">
                <CheckBox
                  handledelivery={(deli) => handledelivery(deli, "category")}
                />
              </div>

              <div className="shop-cart-total">
                <h3 className="title">Cart Totals</h3>
                <div className="shop-cart-widget">
                  <form action="#">
                    <ul>
                      <li className="sub-total">
                        <span>Subtotal</span>₹{Total}
                      </li>
                      <li>
                        <span>Shipping</span>
                        <div className="shop-check-wrap">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              Shipping Fee : ₹22.00
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck2"
                            >
                              LOCAL PICKUP: ₹0
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className="cart-total-amount">
                        <span>Total Price</span>{" "}
                        <span className="amount">₹{Total + 22}</span>
                      </li>
                    </ul>
                    <Link
                      to="#"
                      className="btn"
                      onClick={() => {
                        buynow(Total);
                      }}
                    >
                      PROCEED TO CHECKOUT
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
