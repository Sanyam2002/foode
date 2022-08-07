
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import ImageSlider from "./ImageSlider";
import SweetAlertContext from "./context/SweetAlertContext";
import RecommendContext from "./context/RecommendContext";
import Spinner from "./Spinner";


export const Home = (props) => {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  // const [Limit, setLimit] = useState(8);
  const [loading, setloading] = useState(false)
  const [PostSize, setPostSize] = useState(0);
  const [Deli, setDeli] = useState({
    delivery: 1,
  });
  const [SearchTerms, setSearchTerms] = useState("");
  const  {toggle,addminus,timer,aos}  = useContext(SweetAlertContext);
  const { getData } = useContext(RecommendContext);

  useEffect(() => {
    const variables = {
      // limit: Limit,
      deli : Deli
    };
    getProducts(variables);
    toggle();
    timer();
    aos();
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000);
  }, []);
  useEffect(() => {
    addminus();
    
  },)

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
        props.showAlert("failed to fetch product data","Danger")
      }
    });
  };
  return (
    <>
    {loading && <Spinner/>}
      <Navbar />
      <div>
        <main>
          <section
            className="slider-area"
            data-background={{
              backgroundImage: `url('../img/slider_area_bg.jpg)`,
            }}
            style={{ backgroundImage: `url('../img/slider_area_bg.jpg)` }}
          >
            <div className="container custom-container">
              <div className="row">
                <div className="col-7">
                  <div className="slider-active slick-initialized slick-slider slick-dotted">
                    <div className="slick-list draggable">
                      <div
                        className="slick-track"
                        style={{ opacity: 1, width: "2439px" }}
                      >
                        <div
                          className="single-slider slider-bg slick-slide slick-current slick-active "
                          data-background={"../img/slider_bg01.jpg"}
                          style={{
                            backgroundImage: "url('../img/slider_bg01.jpg')",
                            width: "813px",
                          }}
                          data-slick-index="0"
                          aria-hidden="false"
                          tabIndex="0"
                          role="tabpanel"
                          id="slick-slide20"
                          ia-describedby="slick-slide-control20"
                        >
                          <div className="slider-content">
                            <h5
                              className="sub-title"
                              data-aos="fade-right"
                              data-aos-delay="200"
                            >
                              top deal !
                            </h5>
                            <h2
                              className="title"
                              data-aos="fade-left"
                              data-aos-delay="400"
                            >
                              organic food
                            </h2>
                            <p
                              data-aos="fade-right"
                              data-aos-delay="600"
                              className=""
                            >
                              Get up to 50% OFF Today Only
                            </p>
                            <Link
                              to="/category"
                              className="btn rounded-btn"
                              data-aos="fade-left"
                              data-aos-delay="600"
                              tabIndex="0"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                        <div
                          className="single-slider slider-bg slick-slide "
                          data-background={"../img/slider_bg.jpg"}
                          data-slick-index="1"
                          aria-hidden="true"
                          tabIndex="-1"
                          role="tabpanel"
                          id="slick-slide21"
                          aria-describedby="slick-slide-control21"
                        >
                          <div className="slider-content">
                            <h5
                              className="sub-title"
                              data-aos="fade-Up"
                              data-aos-delay=".2s"
                            >
                              Real simple !
                            </h5>
                            <h2
                              className="title"
                              data-aos="fadeInUp"
                              data-aos-delay=".4s"
                            >
                              Time Grocery
                            </h2>
                            <p data-aos="fadeInUp" data-aos-delay=".6s">
                              Get up to 50% OFF Today Only
                            </p>
                            <Link
                              to="/category"
                              className="btn rounded-btn"
                              data-aos="fadeInUp"
                              data-aos-delay=".8s"
                              tabIndex="-1"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                        <div
                          className="single-slider slider-bg slick-slide"
                          data-background={"..img/slider_bg.jpg"}
                          data-slick-index="2"
                          aria-hidden="true"
                          tabIndex="-1"
                          role="tabpanel"
                          id="slick-slide22"
                          aria-describedby="slick-slide-control22"
                        >
                          <div className="slider-content">
                            <h5
                              className="sub-title"
                              data-aos="fadeInUp"
                              data-aos-delay=".2s"
                            >
                              top deal !
                            </h5>
                            <h2
                              className="title"
                              data-aos="fadeInUp"
                              data-aos-delay=".4s"
                            >
                              organic food
                            </h2>
                            <p data-aos="fadeInUp" data-aos-delay=".6s">
                              Get up to 50% OFF Today Only
                            </p>
                            <Link
                              to="/category"
                              className="btn rounded-btn"
                              data-aos="fadeInUp"
                              data-aos-delay=".8s"
                              tabIndex="-1"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="slick-dots" role="tablist">
                      <li className="slick-active" role="presentation">
                        <button
                          type="button"
                          role="tab"
                          id="slick-slide-control20"
                          aria-controls="slick-slide20"
                          aria-label="1 of 3"
                          tabIndex="0"
                          aria-selected="true"
                        >
                          1
                        </button>
                      </li>
                      <li role="presentation">
                        <button
                          type="button"
                          role="tab"
                          id="slick-slide-control21"
                          aria-controls="slick-slide21"
                          aria-label="2 of 3"
                          tabIndex="-1"
                        >
                          2
                        </button>
                      </li>
                      <li role="presentation">
                        <button
                          type="button"
                          role="tab"
                          id="slick-slide-control22"
                          aria-controls="slick-slide22"
                          aria-label="3 of 3"
                          tabIndex="-1"
                        >
                          3
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-3">
                  <div className="slider-banner-img mb-20">
                    <Link to="/Vegetables">
                      <img src={"../img/slider_banner01.jpg"} alt="" />
                    </Link>
                  </div>
                  <div className="slider-banner-img">
                    <Link to="/Fruits">
                      <img src={"../img/slider_banner02.jpg"} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-3">
                  <div className="slider-banner-img">
                    <a href="#best">
                      <img src={"../img/slider_banner03.jpg"} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="discount-area pt-80">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-4 col-lg-6 col-md-8">
                  <div className="discount-item mb-20">
                    <div className="discount-thumb">
                      <img src={"../img/discount_img01.jpg"} alt="" />
                    </div>
                    <div className="discount-content">
                      <span>healthy food</span>
                      <h4 className="title">
                        <Link to="/category">100 organic UP TO 35%</Link>
                      </h4>
                      <Link to="/category" className="btn">
                        shop now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-8">
                  <div className="discount-item mb-20">
                    <div className="discount-thumb">
                      <img src={"../img/discount_img02.jpg"} alt="" />
                    </div>
                    <div className="discount-content">
                      <span>healthy food</span>
                      <h4 className="title">
                        <Link to="/category">Hygienically Packed</Link>
                      </h4>
                      <Link to="/category" className="btn">
                        shop now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-8">
                  <div className="discount-item style-two mb-20">
                    <div className="discount-thumb">
                      <img src={"../img/discount_img03.jpg"} alt="" />
                    </div>
                    <div className="discount-content">
                      <span>healthy food</span>
                      <h4 className="title">
                        <Link to="/category">baby favorite UP TO 15%</Link>
                      </h4>
                      <Link to="/category" className="btn">
                        shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="best-deal-area pt-60 pb-80 clock">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-9">
                  <div className="best-deal-top-wrap">
                    <div className="bd-section-title">
                      <h3 className="title">
                        Best Deals <span>of this Week!</span>
                      </h3>
                      <p>Great Offers and Deals. Claim Now</p>
                    </div>
                    <div id="clockdiv">
                      <div className="time-count">
                        <span className="days"></span>
                      </div>
                      <div className="time-count">
                        <span className="hours"></span>
                      </div>
                      <div className="time-count">
                        <span className="minutes"></span>
                      </div>
                      <div>
                        <span className="seconds"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row best-deal-active slick-initialized slick-slider">
                <div className="slick-list draggable">
                  <div
                    className="slick-track"
                    style={{
                      opacity: 1,
                      width: "1320px",
                      transform: "translate3d(0px, 0px, 0px)",
                    }}
                  >
                    <div
                      className="col-xl-3 slick-slide slick-current slick-active"
                      data-slick-index="0"
                      aria-hidden="false"
                      style={{ width: "264px" }}
                      tabIndex="0"
                    >
                      <div className="best-deal-item">
                        <div className="best-deal-thumb">
                          <Link to="/productdetail" tabIndex="0">
                            <img
                              src={"../img/best_deal_product01.png"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="best-deal-content">
                          <div className="main-content">
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <h4 className="title">
                              <Link to="/productdetail" tabIndex="0">
                                Chilly
                              </Link>
                            </h4>
                            <p>₹90/ kg</p>
                          </div>
                          <div className="icon">
                            <Link to="/productdetail" tabIndex="0">
                              +
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-3 slick-slide slick-active"
                      data-slick-index="1"
                      aria-hidden="false"
                      style={{ width: "264px" }}
                      tabIndex="0"
                    >
                      <div className="best-deal-item">
                        <div className="best-deal-thumb">
                          <Link to="/productdetail" tabIndex="0">
                            <img
                              src={"../img/best_deal_product02.png"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="best-deal-content">
                          <div className="main-content">
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <h4 className="title">
                              <Link to="/productdetail" tabIndex="0">
                                Fresh Nuts
                              </Link>
                            </h4>
                            <p>₹150/ kg</p>
                          </div>
                          <div className="icon">
                            <Link to="/productdetail" tabIndex="0">
                              +
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-3 slick-slide slick-active"
                      data-slick-index="2"
                      aria-hidden="false"
                      style={{ width: "264px" }}
                      tabIndex="0"
                    >
                      <div className="best-deal-item">
                        <div className="best-deal-thumb">
                          <Link to="/productdetail" tabIndex="0">
                            <img
                              src={"../img/best_deal_product03.png"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="best-deal-content">
                          <div className="main-content">
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <h4 className="title">
                              <Link to="/productdetail" tabIndex="0">
                                Butter
                              </Link>
                            </h4>
                            <p>₹225</p>
                          </div>
                          <div className="icon">
                            <Link to="/productdetail" tabIndex="0">
                              +
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-3 slick-slide slick-active"
                      data-slick-index="3"
                      aria-hidden="false"
                      style={{ width: "264px" }}
                      tabIndex="0"
                    >
                      <div className="best-deal-item">
                        <div className="best-deal-thumb">
                          <Link to="/productdetail" tabIndex="0">
                            <img
                              src={"../img/best_deal_product04.png"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="best-deal-content">
                          <div className="main-content">
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <h4 className="title">
                              <Link to="/productdetail" tabIndex="0">
                                Orange
                              </Link>
                            </h4>
                            <p>₹55/ kg</p>
                          </div>
                          <div className="icon">
                            <Link to="/productdetail" tabIndex="0">
                              +
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-3 slick-slide slick-active"
                      data-slick-index="4"
                      aria-hidden="false"
                      style={{ width: "264px" }}
                      tabIndex="0"
                    >
                      <div className="best-deal-item">
                        <div className="best-deal-thumb">
                          <Link to="/productdetail" tabIndex="0">
                            <img
                              src={"../img/best_deal_product05.png"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="best-deal-content">
                          <div className="main-content">
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <h4 className="title">
                              <Link to="/productdetail" tabIndex="0">
                                Potato
                              </Link>
                            </h4>
                            <p>₹30 kg</p>
                          </div>
                          <div className="icon">
                            <Link to="/productdetail" tabIndex="0">
                              +
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="special-products-area gray-bg pt-75 pb-60" id="best">
            <div className="container">
              <div className="row align-items-end mb-50">
                <div className="col-md-8 col-sm-9">
                  <div className="section-title">
                    <span className="sub-title">Awesome Shop</span>
                    <h2 className="title">Our Special Products</h2>
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="section-btn text-left text-md-right">
                    <Link to="/category" className="btn">
                      View All
                    </Link>
                  </div>
                </div>
              </div>
              <div className="special-products-wrap">
                <div className="row">
                  <div className="col-3 d-none d-lg-block">
                    <div className="special-products-add">
                      <div className="sp-add-thumb">
                        <img src={"../img/special_products_add.jpg"} alt="" />
                      </div>
                      <div className="sp-add-content">
                        <span className="sub-title">healthy food</span>
                        <h4 className="title">
                          Favorite <b>Product</b>
                        </h4>
                        <p>Super Offer TO 4 0% OFF</p>
                        <Link to="/category" className="btn rounded-btn">
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="row justify-content-center">
                    {Products.filter((product) => product.delivery === 1).slice(0, 8).map((product) => (
                        <div className="col-xl-3 col-md-4 col-sm-6">
                          <div className="sp-product-item mb-20">
                            <div className="sp-product-thumb">
                              <span className="batch">New</span>
                              <Link to={`/product/${product.title}`} onClick={() => { getData(product.title) }}>
                                <ImageSlider images={product.image} />
                              </Link>
                            </div>
                            <div className="sp-product-content">
                              <div className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                              <h6 className="title">
                              <Link to={`/product/${product.title}`} onClick={() => { getData(product.title) }}>{product.title}</Link>
                              </h6>
                              {product.countInStock >= 20 ? (
                                <div>
                                  <br />
                                  <span className="product-status">
                                    IN Stock
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span
                                    className="product-status"
                                    style={{ color: "red" }}
                                  >
                                    Hurry! Only Few Left
                                  </span>
                                  <span className="product-status">
                                    In Stock: {product.countInStock}
                                  </span>
                                </div>
                              )}
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="coupon-area gray-bg pb-80">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="coupon-bg">
                    <div className="coupon-title">
                      <span>Use coupon Code</span>
                      <h3 className="title">Get ₹1k Discount Code</h3>
                    </div>
                    <div className="coupon-code-wrap">
                      <h5 className="code">foodE143</h5>
                      <img src={"../img/coupon_code.png"} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="best-sellers-area pt-75">
            <div className="container">
              <div className="row align-items-end mb-50">
                <div className="col-md-8 col-sm-9">
                  <div className="section-title">
                    <span className="sub-title">Best Sellers</span>
                    <h2 className="title">Best Offers View</h2>
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="section-btn text-left text-md-right">
                    <Link to="/category" className="btn">
                      View All
                    </Link>
                  </div>
                </div>
              </div>
              <div className="best-sellers-products">
                <div className="row justify-content-center">
                  <div className="col-3">
                    <div className="sp-product-item mb-20">
                      <div className="sp-product-thumb">
                        <span className="batch">New</span>
                        <Link to="/productdetail">
                          <img src={"../img/sp_products09.png"} alt="" />
                        </Link>
                      </div>
                      <div className="sp-product-content">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h6 className="title">
                          <Link to="/productdetail">range</Link>
                        </h6>
                        <span className="product-status">IN Stock</span>
                        <div className="sp-cart-wrap">
                          <form action="#">
                            <div className="cart-plus-minus">
                              <input type="text" value="1" />
                              <div className="dec qtybutton">-</div>
                              <div className="inc qtybutton">+</div>
                            </div>
                          </form>
                        </div>
                        <p>₹40 - 1 kg</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="sp-product-item mb-20">
                      <div className="sp-product-thumb">
                        <span className="batch discount">15%</span>
                        <Link to="/productdetail">
                          <img src={"../img/sp_products02.png"} alt="" />
                        </Link>
                      </div>
                      <div className="sp-product-content">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h6 className="title">
                          <Link to="/productdetail">Ice cream</Link>
                        </h6>
                        <span className="product-status">IN Stock</span>
                        <div className="sp-cart-wrap">
                          <form action="#">
                            <div className="cart-plus-minus">
                              <input type="text" value="1" />
                              <div className="dec qtybutton">-</div>
                              <div className="inc qtybutton">+</div>
                            </div>
                          </form>
                        </div>
                        <p>₹99</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="sp-product-item mb-20">
                      <div className="sp-product-thumb">
                        <span className="batch discount">20%</span>
                        <Link to="/productdetail">
                          <img src={"../img/sp_products03.png"} alt="" />
                        </Link>
                      </div>
                      <div className="sp-product-content">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h6 className="title">
                          <Link to="/productdetail">Walnuts</Link>
                        </h6>
                        <span className="product-status">IN Stock</span>
                        <div className="sp-cart-wrap">
                          <form action="#">
                            <div className="cart-plus-minus">
                              <input type="text" value="1" />
                              <div className="dec qtybutton">-</div>
                              <div className="inc qtybutton">+</div>
                            </div>
                          </form>
                        </div>
                        <p>₹150- 1 kg</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="sp-product-item mb-20">
                      <div className="sp-product-thumb">
                        <span className="batch">new</span>
                        <Link to="/productdetail">
                          <img src={"../img/sp_products04.png"} alt="" />
                        </Link>
                      </div>
                      <div className="sp-product-content">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h6 className="title">
                          <Link to="/productdetail">Wafers</Link>
                        </h6>
                        <span className="product-status">IN Stock</span>
                        <div className="sp-cart-wrap">
                          <form action="#">
                            <div className="cart-plus-minus">
                              <input type="text" value="1" />
                              <div className="dec qtybutton">-</div>
                              <div className="inc qtybutton">+</div>
                            </div>
                          </form>
                        </div>
                        <p>₹20/ pack </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="sp-product-item mb-20">
                      <div className="sp-product-thumb">
                        <span className="batch discount">25%</span>
                        <Link to="/productdetail">
                          <img src={"../img/sp_products05.png"} alt="" />
                        </Link>
                      </div>
                      <div className="sp-product-content">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h6 className="title">
                          <Link to="/productdetail">Black Grapes</Link>
                        </h6>
                        <span className="product-status">IN Stock</span>
                        <div className="sp-cart-wrap">
                          <form action="#">
                            <div className="cart-plus-minus">
                              <input type="text" value="1" />
                              <div className="dec qtybutton">-</div>
                              <div className="inc qtybutton">+</div>
                            </div>
                          </form>
                        </div>
                        <p>₹75 - 1 kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="discount-style-two pt-60 pb-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="discount-item-two">
                    <div className="discount-thumb">
                      <img src={"../img/s_discount_img01.jpg"} alt="" />
                    </div>
                    <div className="discount-content">
                      <span>healthy food</span>
                      <h4 className="title">
                        <Link to="/category">organic farm for FoodE</Link>
                      </h4>
                      <p>Super Offer TO 50% OFF</p>
                      <Link to="/category" className="btn rounded-btn">
                        shop now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="discount-item-two">
                    <div className="discount-thumb">
                      <img src={"../img/s_discount_img02.jpg"} alt="" />
                    </div>
                    <div className="discount-content">
                      <span>healthy food</span>
                      <h4 className="title">
                        <Link to="/category">BABY FAVORITE UP TO 15%</Link>
                      </h4>
                      <p>Super Offer TO 50% OFF</p>
                      <Link to="/category" className="btn rounded-btn">
                        shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
