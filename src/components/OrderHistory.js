import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import CartContext from "./context/CartContext";
import SweetAlertContext from "./context/SweetAlertContext";
import Spinner from "./Spinner";
import axios from "axios";
import ImageSlider from "./ImageSlider";

export const OrderHistory = () => {
  const [Products, setProducts] = useState([]);
  const { historys } = useContext(CartContext);
  const [loading, setloading] = useState(false)
  const { toggle, addminus } = useContext(SweetAlertContext);
  useEffect(() => {
    addminus();
  });
  useEffect(() => {
    toggle();
  }, []);

  const url = "http://localhost:5000/api/product/getProducts";
  const getProducts = (variables) => {
    axios.post(url, variables).then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(response.data.products);
      } else {
        alert("failed to fetch product data");
      }
    });
  };
  

  useEffect(() => {
    getProducts();
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000);
  }, []);
  return (
    <>
      <Navbar />
        {loading && <Spinner/>}
      <div className="container-fluid-history my-5 d-flex justify-content-center">
        <div className="card card-1">
          <div className="card-header bg-white">
            <div className="media flex-sm-row flex-column-reverse justify-content-between ">
              <div className="col my-auto">
                <h4 className="my-3" style={{ fontWeight: "normal" }}>
                  Your Order History
                </h4>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row justify-content-between mb-3">
              <div className="col-auto">
                <h6 className="color-1 mb-0 change-color mx-3">Orders</h6>
              </div>
              <div className="col-auto "></div>
            </div>
            {historys.map((item) => {
              return (
                <div>
                  {Products.filter((product) => product._id === item.id).map(
                    (product) => (
                      <div className="row card-2 p-20">
                        <div className="col-3 d-none d-lg-block">
                          <div className="sq  ">
                            {" "}
                            <ImageSlider images={product.image} />
                          </div>
                        </div>
                        <div className="col-9">
                          <div className="row justify-content-center">
                            <div className="row my-auto flex-column flex-md-row">
                              <div className="col my-auto text-center">
                                Item: {product.title}
                              </div>
                              <div className="col my-auto text-center">
                                {" "}
                                Quantity : {item.quantity}
                              </div>
                              <div className="col my-auto">
                                {" "}
                                Price: &#8377;{item.price}{" "}
                              </div>
                              <div className="col my-auto">
                                Date : {item.date}
                              </div>
                            </div>
                            <div className="mt-2 d-flex justify-content-center">
                              <Link to={`/product/${product._id}`}>
                                <button className="form-control btn btn-primary submit  ">
                                  Buy Again
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
