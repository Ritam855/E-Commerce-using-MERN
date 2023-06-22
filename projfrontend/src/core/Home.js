import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row mb-5">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-5">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}