import React from 'react'
import { Card } from 'react-bootstrap';
import {Button,Container} from 'react-bootstrap';
import {Row,Col,Table} from 'react-bootstrap';
import { formatDate } from '../services/helper.service';
import { Link } from 'react-router-dom';

const SingleOrderView=({
    order,
    openViewOrderModal,
    openEditOrderModal
})=> {
  return (
   <Card className="border border-0 shadow-sm mb-3">

    <Card.Body>
        <Row>

            <Col>
            <b>Order Id: </b>
            {order.orderId}
            </Col>

    

            <Col>
            <b>Ordered By: </b>
            <Link to={`/users/profile/${order.user.userId}`}>{order.user.name}</Link>
            
            </Col>
            
        </Row>

        <Row className='mt-3'>

            <Col>
            <Table bordered striped responsive>

                <tbody>


                      <tr >
                        <td>Billing Name</td>
                        <td className='fw-bold'>{order.billingName}</td>


                    </tr>

                    <tr >
                        <td>Billing Phone</td>
                        <td className='fw-bold'>{order.billingPhone}</td>


                    </tr>

                    <tr className={order.paymentStatus==='NOTPAID'?'table-danger':'table-success'}>
                        <td> Payment Status</td>
                        <td className='fw-bold'>{order.paymentStatus}</td>


                    </tr>

                    <tr>
                        <td>Order Status</td>
                        <td className='fw-bold'>{order.orderStatus}</td>


                    </tr>

                    <tr>
                        <td>Order Date</td>
                        <td className='fw-bold'>{formatDate(order.orderedDate)}</td>


                    </tr>
                     <tr>
                        <td>Order Items</td>
                        <td>{order.orderItems.length}</td>


                    </tr>
                </tbody>
            </Table>
            </Col>
        </Row>

        <Container className="text-center">

          { openEditOrderModal &&  <Button onClick={(event)=>openEditOrderModal(event,order)} className='me-2' variant="danger" size="sm">Update</Button>}

          {( !openEditOrderModal &&  order.paymentStatus=='NOTPAID') && <Button onClick={(event)=> {}} className='me-2' variant="success" size="sm">Pay to complete Order</Button>}


            <Button onClick={(event)=>{
                openViewOrderModal(event,order)
            }} size="sm" variant="info"> Order Details</Button>
        </Container>
    </Card.Body>
   </Card>
  )
}
export default SingleOrderView;
