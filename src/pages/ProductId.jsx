import React, { useEffect } from 'react';
import { Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductId = () => {

  const { id } = useParams();
  const productsList = useSelector(state => state.products);

  const productItem = productsList.find(product => product.id === Number(id));
  const relatedProducts = productsList.filter(product =>
    product.category.id === productItem.category.id && product.id !== productItem.id)

  console.log(relatedProducts)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <div>
      <h3>{productItem?.title}</h3>
      <Row>
        <Col lg={9}>
          <img className="img-fluid" src={productItem?.productImgs[0]} style={{ height: "350px", marginBottom: "50px" }} />
          <p>{productItem?.description}</p>
        </Col>
        <Col lg={3}>
          <h3>Related Products: </h3>
          <ListGroup>
            {relatedProducts.map(product => (
              <Link to={`/product/${product.id}`}>
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