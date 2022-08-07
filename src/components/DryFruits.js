import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import ImageSlider from "./ImageSlider";
import { CheckBox } from "./CheckBox";
import { Navbar } from "./Navbar";
import Spinner from "./Spinner";
import SweetAlertContext from "./context/SweetAlertContext";
import RecommendContext from "./context/RecommendContext";


export const DryFruits = () => {
  const [Products, setProducts] = useState([]);
  const [PostSize, setPostSize] = useState(0);
  const [Deli, setDeli] = useState({
    delivery: [],
  });
  const [SearchTerms, setSearchTerms] = useState("");
  const { toggle, addminus } = useContext(SweetAlertContext);
const { getData } = useContext(RecommendContext);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    addminus();
  });

  useEffect(() => {
    getProducts();
    toggle();
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  const url = "http://localhost:5000/api/product/getProducts";
  const getProducts = (variables) => {
    Axios.post(url, variables).then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
        setPostSize(response.data.postSize);
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
  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      deli: Deli,
      searchTerm: newSearchTerm,
    };
    setSearchTerms(newSearchTerm);
    getProducts(variables);
  };
  return (
    <>
      {loading && <Spinner />}
      <Navbar refreshFunction={updateSearchTerms} />
      <section className="shop--area pt-90 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-3 order-2 order-lg-0">
              <aside className="shop-sidebar">
                <div className="widget shop-widget">
                  <div className="shop-widget-title">
                    <h6 className="title">Product Categories</h6>
                  </div>
                  <div className="shop-cat-list">
                    <ul>
                      <li>
                        <Link to="product.html">
                          Fruits <span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Vegetables <span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Spices <span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Dairy <span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Package Food<span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Snacks &amp; Beverages <span>+</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="widget shop-widget">
                  <div className="shop-widget-title">
                    <h6 className="title">Filter By Price</h6>
                  </div>
                  <CheckBox
                    handledelivery={(deli) => handledelivery(deli, "delivery")}
                  />
                </div>
                <div className="widget shop-widget">
                  <div className="shop-widget-title">
                    <h6 className="title">NEW PRODUCT</h6>
                  </div>
                  <div className="sidebar-product-list">
                    <ul>
                      <li>
                        <div className="sidebar-product-thumb">
                          <Link to="shop-details.html">
                            <img src={"../img/sidebar_product03.jpg"} alt="" />
                          </Link>
                        </div>
                        <div className="sidebar-product-content">
                          <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                          <h5>
                            <Link to="shop-details.html">Walnuts</Link>
                          </h5>
                          <span>₹39.00</span>
                        </div>
                      </li>
                      <li>
                        <div className="sidebar-product-thumb">
                          <Link to="shop-details.html">
                            <img src={"../img/sidebar_product02.jpg"} alt="" />
                          </Link>
                        </div>
                        <div className="sidebar-product-content">
                          <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                          <h5>
                            <Link to="shop-details.html">Dannon Max</Link>
                          </h5>
                          <span>₹29.00</span>
                        </div>
                      </li>
                      <li>
                        <div className="sidebar-product-thumb">
                          <Link to="shop-details.html">
                            <img src={"../img/sidebar_product03.jpg"} alt="" />
                          </Link>
                        </div>
                        <div className="sidebar-product-content">
                          <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                          <h5>
                            <Link to="shop-details.html">Cashew</Link>
                          </h5>
                          <span>₹35.00</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="widget shop-widget">
                  <div className="shop-widget-title">
                    <h6 className="title">BRANDS</h6>
                  </div>
                  <div className="shop-cat-list">
                    <ul>
                      <li>
                        <Link to="product.html">
                          Basmati <span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Amul <span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Balaji <span>+</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="product.html">
                          Mother Dairy <span>+</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="widget">
                  <div className="shop-widget-banner text-center">
                    <Link to="product.html">
                      <img src="img/product_1.png" alt="" />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
            <div className="col-9">
              <div className="shop-discount-area">
                <div className="discount-content shop-discount-content">
                  <span>Healthy food</span>
                  <h4 className="title">
                    <Link to="product.html">Organic farm for FoodE</Link>
                  </h4>
                  <p>Super Offer TO 40% OFF</p>
                  <Link to="product.html" className="btn rounded-btn">
                    Shop now
                  </Link>
                </div>
              </div>
              <div className="shop-top-meta mb-30">
                <div className="row">
                  <div className="col-md-6 col-sm-7">
                    <div className="shop-top-left">
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="fas fa-bars"></i> FILTER
                          </Link>
                        </li>
                        <li>Showing 1–12 of 50 results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shop-products-wrap">
              <div className="row d-flex">
                  {Products.filter((product) => product.category === "6").map(
                    (product) => (
                      <div className="col-xl-3 col-md-4 col-sm-6">
                        {
                          <div className="sp-product-item">
                            <Link to={`/product/${product.title}`} onClick={() => { getData(product.title) }}>
                              {" "}
                              <ImageSlider images={product.image} />
                            </Link>
                            <div className="sp-product-content">
                              <div className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                              <h6 className="title">
                                <Link to={`/product/${product.title}`} onClick={() => { getData(product.title) }} >
                                  {product.title}
                                </Link>
                              </h6>
                                {
                                  product.countInStock >= 20 ?
                                    <div>
                                      <br />
                                      <span className="product-status">IN Stock</span>
                                    </div> :
                                    <div>
                                      {
                                        product.countInStock == 0 ?
                                          <div>
                                            <br />
                                            <span className="product-status" style={{ color: 'red' }}>Sold Out</span>
                                          </div> :
                                          <div>
                                            <span className="product-status" style={{ color: 'red' }}>Hurry! Only Few Left</span>
                                            <span className="product-status" >In Stock: {product.countInStock}</span>
                                          </div>
                                      }
                                    </div>
                                }
                              <div className="sp-cart-wrap">
                                <form action="#">
                                  <div className="cart-plus-minus">
                                    <input type="text" value="1" />
                                    <div className="dec qtybutton">-</div>
                                    <div className="inc qtybutton">+</div>
                                  </div>
                                </form>
                              </div>
                              <p>₹{product.price}</p>
                            </div>
                          </div>
                        }
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
