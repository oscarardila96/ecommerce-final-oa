import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases)
  const [totalPurchases, setTotalPurchases] = useState(0);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [])

  useEffect(() => {
    let total = 0;
    purchases.forEach(purchase => purchase.cart.products.forEach(product =>
      total += (product.price * product.productsInCart.quantity))
    )
    setTotalPurchases(total);
  }, [purchases])

  const getTotal = (cart) => {
    let total = 0;
    cart.products.forEach(product => {
      total += product.price * product.productsInCart.quantity;
    })
    return total
  }

  const getDate = (apiDate) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(apiDate)
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <h2 style={{ marginTop: "80px" }}>Purchases</h2>
      {purchases.map(purchase => (
        <div className="purchase" key={purchase.id}>
          <p>Purchase ID: {purchase.id}</p>
          <p>Date created: {getDate(purchase.createdAt)}</p>
          {
            purchase.cart.products.map(product => (
              <>
                <div className="purchaseInfo">
                  <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: "none" }}>
                    <h3>{product.title}</h3>
                  </Link>
                  <p>Quantity: {product.productsInCart.quantity}</p>
                  <p>Unit Price: ${product.price}</p>
                  <p>Total: ${(product.price * product.productsInCart.quantity).toFixed(2)}</p>
                </div>
              </>
            ))}
          <h4>Purchase Total: ${getTotal(purchase.cart)}</h4>
        </div>
      ))
      }
    </>
  );
};

export default Purchases;