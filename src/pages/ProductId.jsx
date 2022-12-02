import React, { useEffect, useState } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { postCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';


const ProductId = () => {

  const { id } = useParams();
  const productsList = useSelector(state => state.products);

  const productItem = productsList.find(product => product.id === Number(id));
  const relatedProducts = productsList.filter(product =>
    product.category.id === productItem.category.id && product.id !== productItem.id)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  useEffect(() => {

  }, [])

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const product = {
      id: productItem.id,
      quantity
    }
    dispatch(postCartThunk(product))
  }

  return (
    <div>
      <h3>{productItem?.title}</h3>
      <Row>
        <Col lg={9}>
          <img className="img-fluid" src={productItem?.productImgs[0]} style={{ height: "300px", marginBottom: "20px" }} />
          <p>{productItem?.description}</p>
          <div className="buttons">
            <div style={{ marginRight: "50px" }}>
              <Button onClick={() => setQuantity(quantity - 1)}>-</Button>
              <input style={{ maxWidth: "50px" }} type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
              <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
            </div>
            <Button onClick={addToCart}>Add to Cart</Button>
          </div>
        </Col>
        <Col lg={3}>
          <h3>Related Products: </h3>
          <ListGroup>
            {relatedProducts.map(product => (
              <Link style={{ textDecoration: "none" }} to={`/product/${product.id}`} key={product.id}>
                <ListGroup.Item key={product.id}>
                  <img src={product.productImgs[2]} alt="" className="img-fluid" />
                  <p>{product.title}</p>
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div >
  );
};

export default ProductId;