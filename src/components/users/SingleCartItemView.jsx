import React from 'react'
import { Row,Card,Col,Container } from 'react-bootstrap'
import { useContext } from "react";
import CartContext from "../../context/CartContext";

import { getProductImageUrl } from '../../services/helper.service'
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';

const SingleCartItemView = ({item}) => {

  const {cart,setCart,addItem,removeItem,clearCart}=   useContext(CartContext)


  return (
  <Card className='shadow-sm mb-3'>
<Card.Body>

  <Row>
  <Col md={1} className="d-flex align-items-center  ">

  <Container>

    <img 
    style={{
      width:'50px',
      height:'50px',
      objectFit:'contain'
    }}
    src={getProductImageUrl(item.product.productId)  } alt=""
    />
  </Container>
  
  </Col>
  <Col md={9} >
  <h5>{item.product.title}</h5>
  <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, natus.</p>

  <Row>

  <Col>
  <p ><b><span >Quantity</span></b> {item.quantity} </p>
  </Col>

  <Col>
  <p ><b><span>Price</span></b> € {item.product.discountedPrice} </p>
  </Col>

  <Col>
  <p ><b><span>Total price</span></b> € {item.totalPrice} </p>
  </Col>


  </Row>
  
  </Col>
  <Col md={2} className="d-flex align-items-center justify-content-center ">

    <div className='w-100'>
    <div className='d-grid'>
      <Button  onClick={event=>{
        removeItem(item.cartItemId)
      }} variant="dark" size="sm">Remove</Button>
      </div>

      <Row className='p-3'>
        <Col className='d-grid'>
      <Button onClick={event=>{
        const decreasedQuantity = item.quantity -1
        if(decreasedQuantity >0){
          addItem(decreasedQuantity,item.product.productId,()=>{
            toast.info("Quantity Updated")
          })
        }else{
          toast.info("Quantity cannot be less than one ")
        }
      }} variant="danger" size="sm">-</Button>

        </Col>
        <Col className='d-grid'>
        <Button
        onClick={event=>{
          const increasedQuantity = item.quantity + 1
            addItem(increasedQuantity,item.product.productId,()=>{
              toast.success("Quantity Updated")

            })
        }}
        variant="success" size="sm">+</Button>
        </Col>
      </Row>

      <div >
      </div>

      </div>
  </Col>
 
  </Row>


</Card.Body>

  </Card>

  )
}

export default SingleCartItemView