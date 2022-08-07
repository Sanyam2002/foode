import CartContext from "./CartContext";
import React, { useState } from "react";

const fromlocalstorage = JSON.parse(localStorage.getItem("cart") || "[]");
const localstorage = JSON.parse(localStorage.getItem("history") || "[]");
function CartState(props) {
  const host = "http://localhost:5000";
  const [carts, setcarts] = useState(fromlocalstorage);
  const [historys, sethistorys] = useState(localstorage);
  //add tp cart
  const addToCart = async (productId) => {
    const url2 = `http://localhost:5000/api/auth/addToCart?productId=${productId}`;
    const response = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const note = await response.json();
    setcarts(carts.concat(note));
    window.localStorage.setItem("cart", JSON.stringify(note));
  };

  const gethistory = async () => {
    //api calls
    const response = await fetch(
      `http://localhost:5000/api/auth/fetchallhistory`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    sethistorys(json);
  };

  const deletecart = async (id) => {
    //api call
    const response = await fetch(
      `http://localhost:5000/api/auth/deletecart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    console.log("deleting profile with id" + id);
    const newprofiles = carts.filter((profile) => {
      return profile.id !== id;
    });
    setcarts(newprofiles);
    var items = JSON.parse(localStorage["cart"]);
    for ( var i = 0; i < items.length; i++)
      if (items[i].id == id) items.splice(i, 1);
    localStorage["cart"] = JSON.stringify(items);
  };
  const addHistory = async (id, quantity, title, price, image) => {
    //api call
    const response = await fetch(
      `http://localhost:5000/api/auth/successbuy/${id}/${quantity}/${title}/${price}?image=${image}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    sethistorys(json);
    window.localStorage.setItem("history", JSON.stringify(json));
  };

  const addHistory2 = async (id) => {
    //api call
    const response = await fetch(
      `http://localhost:5000/api/auth/successbuy2/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    window.localStorage.removeItem("cart");
    //   setcarts(newprofiles);
  };

  const dec = async(id)=>{
    const response = await fetch(
      `http://localhost:5000/api/auth/countinstock/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
  }

  return (
    <CartContext.Provider
      value={{
        carts,
        setcarts,
        addToCart,
        gethistory,
        deletecart,
        addHistory,
        addHistory2,
        historys,
        dec
      }}
    >
      {props.children};
    </CartContext.Provider>
  );
}

export default CartState;
