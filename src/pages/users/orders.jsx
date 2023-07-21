import { useContext, useEffect, useState } from "react";
import { getOrdersOfUser } from "../../services/order.service";
import UserContext from "../../context/user.context";
import { toast } from "react-toastify";
import { Row, Col, Modal, Button,Table } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "react-bootstrap";
import SingleOrderView from "../../components/SingleOrderView";

import { Badge, Container, Form, ListGroupItem } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { formatDate } from "../../services/helper.service";
import { ADMIN_ORDER_PAGE_SIZE, getProductImageUrl } from "../../services/helper.service";
import { Alert } from "react-bootstrap";



const Order =()=>{
   const {userData,isLogin} = useContext(UserContext);
   const [orders,setOrders]=useState([]);
   const [selectedOrder,setSelectedOrder]= useState(null)
   const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   useEffect(()=>{
    if(isLogin){
        loadOrderOfUsers()
    }
   },[isLogin])


   const loadOrderOfUsers = async ()=>{
    try{
   const result=  await getOrdersOfUser(userData.user.userId)
   console.log(result)
   setOrders(result)

    }catch(error){
        console.log(error);
        toast.error("Error in Loading orders");
    }
    }

    const openViewOrderModal = (event, order) => {
      console.log("view ordered button clicked");
      console.log(event);
      console.log(order);
      //sending all copies of order
      setSelectedOrder({ ...order });
      handleShow(true);
    };



    const viewOrderModal = () => {
        return (
          selectedOrder && (
            <>
              <Modal size="lg" animation={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-center">
                  <h3>Order details</h3>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
    
                  <Row>
                    <Col>
                      <b>Order Id: </b>
                      {selectedOrder.orderId}
                    </Col>
    
                    <Col>
                      <b>Billing Name: </b>
                      {selectedOrder.billingName}
                    </Col>
                  </Row>
    
    
            <Row className='mt-3'>
    
    <Col>
    <Table bordered striped responsive>
    
        <tbody>
            <tr >
                <td>Billing Phone</td>
                <td className='fw-bold'>{selectedOrder.billingPhone}</td>
            </tr>
    
            <tr className={selectedOrder.paymentStatus==='NOTPAID'?'table-danger':'table-success'}>
                <td> Payment Status</td>
                <td className='fw-bold'>{selectedOrder.paymentStatus}</td>
    
    
            </tr>
    
            <tr>
                <td>Order Status</td>
                <td className='fw-bold'>{selectedOrder.orderStatus}</td>
            </tr>
    
            <tr>
                <td>Order Date</td>
                
                <td className='fw-bold'>{formatDate(selectedOrder.orderedDate)}</td>
    
    
            </tr>
             <tr>
                <td>Order Items</td>
                <td>{selectedOrder.orderItems.length}</td>
            </tr>
    
            <tr>
                <td>Billing Address</td>
                <td>{selectedOrder.billingAddress}</td>
            </tr>
    
            <tr>
                <td>Billing Phone Number</td>
                <td>{selectedOrder.billingPhone}</td>
            </tr>
    
            <tr>
                <td>Delivered Date</td>
                <td className="fw-bold">{selectedOrder.deliveredDate ? formatDate(selectedOrder.deliveredDate):''}</td>
            </tr>
    
            <tr>
                <td>Ordered Amount</td>
                <td className="fw-bold"> ₹ {selectedOrder.orderAmount}</td>
            </tr>
        </tbody>
    </Table>
    
    <Card className="border border-0 shadow-sm">
      <Card.Body>
        <h3>Order Items</h3>
    
        <ListGroup>
          {
            selectedOrder.orderItems.map((item)=>(
              <ListGroup.Item actio key={item.orderItemId}>
                <Row>
                <Col md={2} className="d-flex align-items-center">
                  <img 
                  style={{
                    width:'40px'
                  }}
                  src={getProductImageUrl(item.product.productId)} alt="" />
                
                </Col>
    
                  <Col md={10}>
                  <h5>{item.product.title}</h5>
                  <Badge pill>Quantity: {item.quantity}</Badge>
                  <Badge bg="success" pill className="ms-2">Amount: ₹ {item.totalPrice}</Badge>
    
    
                  </Col>
                  <p className="text-center mt-2">Product Id: {item.product.productId}</p>
                </Row>
    
                </ListGroup.Item>
            ))
          }
          </ListGroup>
      </Card.Body>
    </Card>
    </Col>
    </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                 
                </Modal.Footer>
              </Modal>
            </>
          )
        );
      };

    const ordersView = () => {
        return (
          <Card className="shadow-sm mt-3">
            <Card.Header className="text-center">
              <h4 className="my-4">Your Previous Orders </h4>
            </Card.Header>
    
            <Card.Body>
    

    
            {
              orders.map((o) => {
              return (
                <SingleOrderView
                  key={o.orderId}
                  order={o}
                  // just pass the reference openViewOrderModal
                  openViewOrderModal={openViewOrderModal}
                //   openEditOrderModal={openEditOrderModal}
                />
              );
            })}

            {
              orders.length<=0 &&    <Alert className="border border-0 text-center" variant="danger">
              <h3>No items in your Order </h3>
            </Alert>
            }
    
 
    
          
            </Card.Body>
          </Card>
        );
      };

    return(
        <>

        <Container>


        <Row>

<Col md={{
span:10,
offset:1
}
  
}>
{ordersView()}
{viewOrderModal()}

</Col>
</Row>


        </Container>


        
        </>
    

    )
}

export default Order;