import React, { Component, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/product.service";
import { useState } from "react";
import { Row, Container, Col, Card, Badge, Button } from "react-bootstrap";
import ShowHtml from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/helper.service";
import defaultImage from "../../assets/no-image.jpeg";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import CartContext from "../../context/CartContext";

function ProductView() {

  const {cart,addItem}= useContext(CartContext)

  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    loadProduct(productId);
  }, []);

  const loadProduct = (productId) => {
    getProduct(productId)
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  };

  const handleAddItem =(productId,quantity)=>{

    addItem(quantity,productId,()=>{
      toast.success("Product is added to cart")
    })
  }

  const productView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="mt-4 border-0 shadow-sm">
              <Card.Body>
                <Container className="my-4">
                  <Row>
                    <Col>
                      <img
                        style={{
                          width: "400px",
                        }}
                        src={getProductImageUrl(product.productId)}
                        alt=""
                        onError={(event)=>{
                            event.currentTarget.setAttribute('src',defaultImage)
                        }}
                      />
                    </Col>

                    <Col>
                      <h6>
                        <b>{product.title}</b>
                      </h6>
                      <p className="text-muted">
                        Short description:{" "}
                        <span>Lorem ipsum dolor sit, amet consectetur?</span>
                      </p>
                      <Badge pill bg="dark">
                        {product.category?.title}{" "}
                      </Badge>
                      <Badge
                        className="ms-2"
                        pill
                        bg={product.stock ? "success" : "danger"}
                      >
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </Badge>

                      <b>
                        <span className="h6 text-muted">
                          <s>€ {product.price}</s>{" "}
                        </span>
                      </b>
                      <b>
                        <span className="h6 ">€ {product.discountedPrice}</span>
                      </b>

                      <Container className="d-grid mt-4">
                        <Button onClick={event=>handleAddItem(product.productId,1)} variant="warning" size={"sm"}>
                          Add to Card
                        </Button>
                        <Button as={Link} to="/store" className="mt-2" variant="danger" size={"sm"}>
                          Go to Store
                        </Button>
                      </Container>
                    </Col>
                  </Row>
                </Container>

                <div>
                  <ShowHtml htmlText={product.description} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    //agar product hai toh productview call karna
    product && productView()
  );
}

export default ProductView;
