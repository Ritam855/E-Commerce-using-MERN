import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const Card = ({ product, addToCart = true, removeFromCart = false, setReload =f=>f,reload=undefined}) => {
  const navigate = useNavigate();
  const [direct, setDirect] = useState(false);

  const cardTitle = product ? product.name : 'A photo from pexels';
  const cardDescription = product ? product.description : 'Default description';
  const cardPrice = product ? product.price : 'Default';

  const handleAddToCart = () => {
    addItemToCart(product, () => setDirect(true));
  };

  const showAddToCart = addToCart && (
    <button onClick={handleAddToCart} className="btn btn-block btn-outline-success mt-2 mb-2">
      Add to Cart
    </button>
  );

  const showRemoveFromCart = removeFromCart && (
    <button
      onClick={() => {
        removeItemFromCart(product._id);
        setReload(!reload);
        
      }}
      className="btn btn-block btn-outline-danger mt-2 mb-2"
    >
      Remove from cart
    </button>
  );

  if (direct) {
    navigate('/cart'); // Redirect to /cart route
    return null; // Return null to avoid rendering the rest of the component
  }

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">{cardDescription}</p>
        <p className="btn btn-success rounded btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart}</div>
          <div className="col-12">{showRemoveFromCart}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

