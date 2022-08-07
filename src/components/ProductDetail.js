import React, { useEffect, useState, useContext } from "react";
import { Footer } from "./Footer";
import Axios from "axios";
import { Navbar } from "./Navbar";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import CartContext from "./context/CartContext";
import Spinner from "./Spinner";
import SweetAlertContext from "./context/SweetAlertContext";
import RecommendContext from "./context/RecommendContext";
import ImageSlider from "./ImageSlider";
import { Route, Link, withRouter,useParams } from 'react-router-dom';

export const ProductDetail = (props) => {
  const { toggle, addminus, cart } = useContext(SweetAlertContext);
  const { profileData, getData } = useContext(RecommendContext);
  const [loading, setloading] = useState(false);
  const [Products, setProducts] = useState([]);

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

  const { productId } = useParams();
  const [Product, setProduct] = useState([]);
  const { addToCart } = useContext(CartContext);

  const url = `http://localhost:5000/api/product/products_by_id?id=${productId}&type=single`;

  useEffect(() => {
    Axios.get(url).then((response) => {
      setProduct(response.data[0]);
    });
  });

  const url1 = "http://localhost:5000/api/product/getProducts";
  const getProducts = (variables) => {
    Axios.post(url1, variables).then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        alert("failed to fetch product data");
      }
    });
  };

  const addtocarthandler = (productId) => {
    addToCart(productId);
    cart();
  };
  // const abc = (producttitle) => {
  //   getData(producttitle)
  // };

  var number  = [0 ,1,  2 , 3, 4]

  return (
    <>
      <Navbar />
      {loading && <Spinner />}
      <section className="shop-details-area pt-90 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <ProductImage detail={Product} />
            </div>
            <div className="col-lg-5">
              <ProductInfo addToCart={addtocarthandler} detail={Product} />
            </div>
          </div>
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </section>

      <section className="best-sellers-area pt-85 pb-70">
        <div className="container">
          <div className="row align-items-end mb-40">
            <div className="col-md-8 col-sm-9">
              <div className="section-title">
                <span className="sub-title">Related Products</span>
                <h2 className="title">From this Collection</h2>
              </div>
            </div>
            <div className="col-md-4 col-sm-3">
              <div className="section-btn text-left text-md-right"></div>
            </div>
          </div>
          <div className="best-sellers-products">
              <div className="row justify-content-center">
                            {Products.length === 0 ?
                                <div>
                                    <h2>No Products To Display</h2>
                                </div> :
                                number.map((num)=>(
                                    Products.filter(product => product.title === Object.values(profileData.value)[num]).map((product) => (
                                        <div className="col-3">
                                            <div className="sp-product-item mb-20">
                                              {
                                                <div className="sp-product-item">
                                                <Link to={`/product/${product.title}`} onClick={()=>{getData(product.title)}}> <ImageSlider images={product.image} /></Link>
                                                <div className="sp-product-content">
                                                    <div className="rating">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <h6 className="title"><Link to={`/product/${product.title}`} onClick={()=>{getData(product.title)}}>{product.title}</Link></h6>
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
                                                </div>
                                            </div>
                                              }
                                            </div>
                                                    
                                            
                                        </div>
                                    ))                                                                    
                                ))     
                            }                                             
                        </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
