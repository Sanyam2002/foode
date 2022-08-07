import axios from "axios";
import {ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,}  from './types'

// export function addToCart(_id) {
//     const url = `http://localhost:5000/api/auth/addToCart?productId=${_id}`
//     const request = axios.post(url)
//         .then(response => response.data);

//     return {
//         type: ADD_TO_CART_USER,
//         payload: request
//     }
// }

export function getCartItems(cartItems, userCart) {
    const url2=`http://localhost:5000/api/product/products_by_id?id=${cartItems}&type=array`
    const request = axios.get(url2)
        .then(response => {


            //Make CartDetail inside Redux Store 
            // We need to add quantity data to Product Information that come from Product Collection. 

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}