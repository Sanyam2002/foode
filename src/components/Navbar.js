import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import CartContext from "./context/CartContext";
import SweetAlertContext from "./context/SweetAlertContext";
import profileContext from "./context/profilecontext";
export const Navbar = (props) => {
  const { carts } = useContext(CartContext);
  const { aos } = useContext(SweetAlertContext);
  const { credentials, getAccountDetails } = useContext(profileContext);
  let history = useHistory();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload();
  };
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  const [SearchTerms, setSearchTerms] = useState("");
  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
    aos();
  }, []);
  
  useEffect(() => {
      getAccountDetails()
  }, [])

  const url = "http://localhost:5000/api/product/getProducts";
  const getProducts = (variables) => {
    Axios.post(url, variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
        console.log(response.data.products);
      } else {
        alert("failed to fetch product data");
      }
    });
  };
  const onChangeSearch = (e) => {
    setSearchTerms(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };
  return (
    <>
      <body data-aos-easing="ease" data-aos-duration="1000" data-aos-delay="0">
        <button className="scroll-top scroll-to-target" data-target="html">
          <i className="fas fa-angle-up"></i>
        </button>
        <header>
          <div className="header-search-area">
            <div className="container custom-container">
              <div className="row align-items-center">
                <div className="col-xl-2 d-none d-lg-block">
                  <div className="logo">
                    <Link to="/">
                      <img
                        src={"../img/_Logo.png"}
                        alt="Logo"
                        style={{ height: "50px" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-9">
                  <div className="d-block d-sm-flex align-items-center justify-content-end">
                    <div className="header-search-wrap">
                      <form action="#">
                        <select className="custom-select">
                          <option selected="">All Categories</option>
                          <option>Grocery &amp; Frozen</option>
                          <option>Fresh Fruits</option>
                          <option>Fresh Nuts</option>
                          <option>Bread &amp; Bakery</option>
                          <option>Vegetable</option>
                          <option>Dried Fruits</option>
                          <option>Others Food</option>
                        </select>
                        {location.pathname === "/Fruits" ||
                        location.pathname === "/Vegetables" ||
                        location.pathname === "/dairy" ||
                        location.pathname === "/dry_fruits" ||
                        location.pathname === "/spices" ||
                        location.pathname === "/Snacks" ? (
                          <input
                            type="text"
                            placeholder="Search Product..."
                            value={SearchTerms}
                            onChange={onChangeSearch}
                          />
                        ) : (
                          <input type="text" placeholder="Search Product..." />
                        )}
                      </form>
                    </div>
                    <div className="header-action">
                      <ul>
                        <li className="header-phone">
                          <div className="icon">
                            <i className="fas fa-phone-alt"></i>
                          </div>
                          <Link to="tel:1234566789">
                            <span>Call Us Now</span>+91 9876543219
                          </Link>
                        </li>
                        {!localStorage.getItem("token") ? (
                          <>
                            <li className="header-user">
                              <Link to="/login">
                                <i className="far fa-user"></i>
                              </Link>
                            </li>
                            <li className="header-signin">
                              <Link to="/signin">
                                <i className="fas fa-user-plus"></i>
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="header-user">
                              <Link to="/profilelanding">
                                <i className="far fa-user"></i>
                              </Link>
                            </li>
                            {credentials.email === "admin@gmail.com" ? (
                              <li className="header-user">
                                <Link to="/product/upload">
                                  <i class="fas fa-upload"></i>
                                </Link>
                              </li>
                            ) : (
                              <span></span>
                            )}
                            <li className="header-cart-action">
                              <div className="header-cart-wrap">
                                <Link to="/cartpage">
                                  <i className="fas fa-shopping-basket"></i>
                                </Link>
                                <span className="item-count">
                                  {carts.length}
                                </span>
                              </div>
                            </li>
                            <li className="header-cart-action">
                              <div className="header-logout">
                                <button onClick={handleLogout}>
                                  <i className="fas fa-sign-out-alt"></i>
                                </button>
                              </div>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="sticky-header" className="menu-area">
            <div className="container custom-container">
              <div className="row">
                <div className="col-12">
                  <div className="mobile-nav-toggler">
                    <i className="fas fa-bars"></i>
                  </div>
                  <div className="menu-wrap">
                    <nav className="menu-nav">
                      <div className="logo d-block d-lg-none">
                        <Link to="/">
                          <img
                            src={"../img/_Logo.png"}
                            alt=""
                            style={{ height: "50px" }}
                          />
                        </Link>
                      </div>
                      <div className="header-category d-none d-lg-block">
                        <Link to="/" className="cat-toggle">
                          <i className="fas fa-bars"></i>ALL DEPARTMENT
                          <i className="fas fa-angle-down"></i>
                        </Link>
                        <ul className="category-menu">
                          <li>
                            <Link to="/Fruits">
                              <i className="fas fa-apple-alt"></i> Fresh Fruits
                            </Link>
                          </li>
                          <li>
                            <Link to="/dry_fruits">
                              <i className="fas fa-lemon"></i>Fresh Nuts
                            </Link>
                          </li>
                          <li>
                            <Link to="/Snacks">
                              <i className="fas fa-bread-slice"></i>Snacks &
                              Beverages
                            </Link>
                          </li>
                          <li>
                            <Link to="/Vegetables">
                              <i className="fas fa-carrot"></i> Vegetable
                            </Link>
                          </li>
                          <li>
                            <Link to="/dairy">
                              <i class="fas fa-cheese"></i> Dairy Products
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="navbar-wrap main-menu d-none d-lg-flex">
                        <ul className="navigation">
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/about">About Us</Link>
                          </li>
                          <li>
                            <Link to="/Fruits">Fruits</Link>
                          </li>
                          <li>
                            <Link to="/Vegetables">Vegetables</Link>
                          </li>
                          <li>
                            <Link to="/Snacks">Snacks</Link>
                          </li>
                          
                          <li className="menu-item-has-children">
                            <Link to="#">More</Link>
                            <ul className="submenu">
                              <li>
                            <Link to="/Beverages">Beverages</Link>
                          </li>
                          <li>
                            <Link to="/CookingBaking">Cooking and Baking</Link>
                          </li>
                          <li>
                                <Link to="/orderhistory">Order History</Link>
                              </li>
                            </ul>
                            <div className="dropdown-btn">
                              <span className="fas fa-angle-down"></span>
                            </div>
                          </li>
                          <li>
                            <Link to="/contacts">Contacts</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="header-super-store d-none d-xl-block d-lg-none d-md-block">
                        <div className="dropdown">
                          <button
                            className="receipe"
                            type="button"
                            id="dropdownMenuButton4"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-utensils"></i>
                            <Link to="/receipe">Receipe Store </Link>
                          </button>
                        </div>
                      </div>
                    </nav>
                  </div>
                  <div className="mobile-menu">
                    <nav className="menu-box">
                      <div className="close-btn">
                        <i className="fas fa-times"></i>
                      </div>
                      <div className="nav-logo">
                        <Link to="/">
                          <img src={"../img/_Logo.png"} alt="" title="" />
                        </Link>
                      </div>
                      <div className="menu-outer">
                        <ul className="navigation">
                          <li className="active">
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/about">About Us</Link>
                          </li>
                          <li>
                            <Link to="/Fruits">Fruits</Link>
                          </li>
                          <li>
                            <Link to="/Vegetables">Vegetables</Link>
                          </li>
                          <li>
                            <Link to="/Snacks">Snacks & Beverages</Link>
                          </li>
                          <li>
                            <Link to="/dairy">Dairy Products</Link>
                          </li>
                          <li>
                            <Link to="/dry_fruits">Dry Fruits</Link>
                          </li>
                          <li>
                            <Link to="/spices">Spices</Link>
                          </li>
                          <li className="menu-item-has-children">
                            <Link to="#">Pages</Link>
                          </li>
                          <li>
                            <Link to="/contacts">Contacts</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="social-links">
                        <ul className="clearfix">
                          <li>
                            <Link to="#">
                              <span className="fab fa-twitter"></span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="fab fa-facebook-f"></span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="fab fa-pinterest-p"></span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="fab fa-instagram"></span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="fab fa-youtube"></span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                  <div className="menu-backdrop"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </body>
    </>
  );
};
