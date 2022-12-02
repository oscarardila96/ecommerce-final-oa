import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, deleteCartThunk, getCartThunk, updateCartThunk } from '../store/slices/cart.slice';

const SideCart = ({ show, handleClose }) => {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach(product =>
      total += (product.price * product.productsInCart.quantity)
    )
    setTotalPrice(total);
  }, [cart])

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])

  const minusProducts = (product) => {
    const updatedProduct = {
      id: product.id,
      newQuantity: product.productsInCart.quantity - 1
    }
    dispatch(updateCartThunk(updatedProduct))
  }

  const moreProducts = (product) => {
    const updatedProduct = {
      id: product.id,
      newQuantity: product.productsInCart.quantity + 1
    }
    dispatch(updateCartThunk(updatedProduct));
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>e-Commerce | Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.map(item => (
          <div key={item.id}>
            <h2 style={{ color: "#e95420" }}>{item.title}</h2>
            <p><b>Brand:</b> {item.brand}</p>
            <p><b>Unit Price:</b> ${item.price}</p>
            <p style={{ display: "inline-block" }}><b>Quantity:</b> {item.productsInCart.quantity}</p>
            <p><b>Total:</b> ${(Number(item.price) * Number(item.productsInCart.quantity)).toFixed(2)}</p>
            <div className="cartButtonsDel">
              <div className="cartButtons">
                <Button onClick={() => minusProducts(item)}>-</Button>
                <Button onClick={() => moreProducts(item)}>+</Button>
              </div>
              <div className="deleteButton">
                <button onClick={() => dispatch(deleteCartThunk(item.id))}><i className="fa-solid fa-trash-can"></i></button>
              </div>
            </div>
          </div>
        ))}
        <h4><b>Cart Total:</b> ${totalPrice}</h4>
        <Button onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideCart;