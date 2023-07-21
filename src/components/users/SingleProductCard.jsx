import React from 'react'
import { Card,Row,Col,Container, Badge } from 'react-bootstrap'
import { getProductImageUrl } from '../../services/helper.service'
import {Button} from 'react-bootstrap'
import defaultImage from "../../assets/no-image.jpeg";
import { Link } from 'react-router-dom';

const SingleProductCard=({product})=> {
  return (

   <Card className='m-1 shadow-sm'>
    <Card.Body>
        <Container className='text-center'>

            <img style={{
                      width:"250px",
                      height:"250px",
                      objectFit:"contain",
                      marginBottom:"20px"
                    }} src={getProductImageUrl(product.productId)} alt="" 
                    
                    onError={event=>{
                      event.currentTarget.setAttribute('src',defaultImage);
                    }}
                    />
        </Container>
        <h6><b>{product.title}</b></h6>
        <p className='text-muted'>Short description: <span>Lorem ipsum dolor sit, amet consectetur?</span></p>
       <Badge pill bg='dark'>{product.category?.title} </Badge>
       <Badge className='ms-2' pill bg={product.stock ? 'success':'danger'}>{product.stock ?'In Stock':'Out of Stock'}</Badge>

        <b><span className='h6 text-muted'><s>€ {product.price}</s> </span></b>
        <b><span className='h6 '>€ {product.discountedPrice}</span></b>

        <Container className='d-grid mt-4'>
            <Button as={Link} to={`/store/products/${product.productId}`} variant="success" size={'sm'}>View Product</Button>
            </Container>
    </Card.Body>
    </Card>
  )
}

export default SingleProductCard