import React,{useEffect,useState} from 'react'
import { Route, Link, withRouter,useHistory } from 'react-router-dom';
import Spinner from "./Spinner";
function ProductInfo(props) {
    const [Product, setProduct] = useState({})
    const [loading, setloading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        setProduct(props.detail)
        console.log(history.location.pathname)
        console.log(props.detail)
    }, [props.detail,[history.location.pathname]])

    const handleaddtocart =()=>{
        props.addToCart(props.detail._id)
    }
    useEffect(() => {
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }, []);
    return (
      <>
      {loading && <Spinner />}
        <div>
              <div className="shop-details-content">
                <h4 className="title">{Product.title}</h4>
                <div className="shop-details-meta">
                  <ul>
                    <li className="shop-details-review">
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <span>Review</span>
                    </li>
                    <li>
                      ID : <span>{Product._id}</span>
                    </li>
                  </ul>
                </div>
                <div className="shop-details-price">
                  <h2 className="price">₹{Product.price}</h2>
                  {
                        Product.countInStock >= 20 ?
                            <span className="product-status" style={{color:'#4eb92d' , paddingLeft:'10px' , fontWeight:'700'}}>IN Stock</span>
                            :
                            <span>
                                {
                                    Product.countInStock == 0 ?
                                    <span className="product-status" style={{color:'red' , paddingLeft:'10px' , fontWeight:'700'}}> Sold Out </span> :
                                    <span className="product-status" style={{ color: 'red',paddingLeft:'10px' , fontWeight:'700' }}>Hurry! Only Few Left</span>
                                }
                            </span>
                            
                    }
                </div>
                <p>{Product.description}</p>
                <div className="shop-details-list">
                  <ul>
                    <li>
                      Expiry Date : <span>Nov 19.2022</span>
                    </li>
                  </ul>
                </div>
                <div className="shop-perched-info">
                {!localStorage.getItem('token')?
                                   <Link to="/login" className="btn" >Add to cart</Link> :
                                   <div>
                                       {
                                           Product.countInStock == 0 ?
                                           <Link to="#" className="btn disabled" >Add to cart</Link>:
                                           <Link to="/cartpage" className="btn" onClick={handleaddtocart} >Add to cart</Link>
           
                                       }
                                   </div>
                                }
                </div>
                <div className="shop-details-bottom">
                  <h5 className="title">
                    <Link to="/">
                      <i className="far fa-heart"></i> Add To Wishlist
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            </>
    )

}

export default withRouter(ProductInfo)
