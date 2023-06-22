import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';


const StripeCheckout =({products, setReload=f=>f,reload=undefined}) => {
  
  const [data, setData] = useState({
    loading: false,
    success: false,
    error:"",
    address: ""
  });
  
  const token = isAuthenticated && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
      let amount = 0;
      products.map(p => {
        amount = amount+p.price
      })
      return amount;
  };

  const makePayment = (token) =>{
    const body = {
      token,
      products,

    }
    const headers = {
      "Content-Type": "application/json"

    }
    return fetch(`${API}/stripepayment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response =>{
      console.log(response)
    }).catch(err=>console.log(err))
  }

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
      stripeKey=""
      token={makePayment} 
      amount={getFinalPrice() *100}   
      name ="Buy Tshirts"
      shippingAddress
      billingAddress
      >
       
      <button className='btn btn-success'>Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
     <Link to="/signin">
        <button className='btn btn-warning'>Sign In</button>

     </Link>
    )
  }

  return (
    <div>
      <h3 className='text-white'>StripeCheckout {getFinalPrice()}</h3>
        {showStripeButton()}
    </div>
  )
};

export default StripeCheckout;
