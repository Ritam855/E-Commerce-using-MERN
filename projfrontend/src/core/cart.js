import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const  Cart =()=>{
  const [products,SetProducts] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
      SetProducts(loadCart)
  }, [reload]);
  
  
  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product,index)=>(
          <Card 
          key={index}
          product={product}
          removeFromCart={true}
          addToCart={false}
          setReload={setReload}
          reload={reload}
          />
        ))
        }
      </div>
    )
  };



  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row mb-5 ">
        <div className="col-6 mb-5">{loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout
            products={products}
            setReload={setReload}
          />

        </div>
      </div>
    </Base>
  );
};

export default Cart;