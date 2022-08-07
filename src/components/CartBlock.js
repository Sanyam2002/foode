import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import ImageSlider from "./ImageSlider";
import CartContext from "./context/CartContext";
import Axios from "axios";

export const CartBlock = (props) => {
  const { cart } = props;
  const { deletecart } = useContext(CartContext);
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const url = "http://localhost:5000/api/product/getProducts";
  const getProducts = (variables) => {
    Axios.post(url, variables).then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(response.data.products);
      } else {
        alert("failed to fetch product data");
      }
    });
  };
  return (
    <>
      <tbody>
        {Products.filter((product) => product._id === cart.id).map(
          (product) => (
            <tr>
              <td className="product-thumbnail">
                <ImageSlider images={product.image} />
              </td>
              <td className="product-name">
                <h4>
                  <Link to="/">{product.title}</Link>
                </h4>
              </td>
              <td className="product-price">₹{product.price}</td>
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
          )
        )}
      </tbody>
    </>
  );
};
