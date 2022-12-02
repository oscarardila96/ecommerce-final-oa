import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByPrice, filterName, filterProductNameThunk, filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const Home = () => {

  const products = useSelector(state => state.products);
  const [categories, setCategories] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories));
  }, [])

  // .card-img-top {
  //   width: 175px;
  //   height: 175px;
  //   object-fit: contain;
  //   position: relative;
  // }


  return (
    <div>
      <h1 style={{ marginTop: "80px" }}>Home</h1>
      <Row>
        <Col md={3}>
          {/* Categories */}
          <h2>Categories:</h2>
          <ListGroup variant="flush">
            {categories.map(category => (
              <ListGroup.Item key={category.id} onClick={() => dispatch(filterProductsThunk(category.id))} style={{ cursor: "pointer" }}>
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="priceFilter">
            <input
              type="number"
              placeholder='Min. Price'
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder='Max. Price'
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            /><br />
            <Button onClick={() => dispatch(filterByPrice({ minPrice, maxPrice }))} >Filter</Button>
          </div>
        </Col>
        {/* Products */}
        <Col md={9} >
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Filter By Name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={e => setInputSearch(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterName(inputSearch))} >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col key={product.id}>
                <Card>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <Card.Img variant="top" src={product.productImgs[0]} className="img-fluid" style={{ height: "300px", objectFit: "contain" }} />
                    <Card.Body>
                      <div className="productName">
                        <Card.Title>{product.title}</Card.Title>
                      </div>
                      <Card.Text>
                        ${product.price} <br />
                        <div style={{ width: "12px", height: "12px", backgroundColor: product.status === "active" ? "green" : "red", borderRadius: "50%", display: "inline-block" }}></div>{" "}{product.status === "active" ? "Available" : "Unavailable"}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div >
  );
};

export default Home;