import { useEffect } from "react";
import { useState } from "react";
import { getAllOrders, updateOrder } from "../../services/order.service";
import { ADMIN_ORDER_PAGE_SIZE, getProductImageUrl } from "../../services/helper.service";
import { Badge, Container, Form, ListGroupItem } from "react-bootstrap";
import { Row, Col, Modal, Button,Table } from "react-bootstrap";
import { Card } from "react-bootstrap";
import SingleOrderView from "../../components/SingleOrderView";
import { formatDate } from "../../services/helper.service";
import { ListGroup } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";


const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined);

  // const [fakeOrders, setFakeOrders] = useState([1, 2, 3, 4, 5, 6, 7]);

  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage,setCurrentPage]= useState(0)
  // const [selectedOrderUpdate,setSelectedOrderUpdate]= useState()''

  const [updateShow,setUpdateShow]=useState(false)
  const handleUpdateClose = ()=> setUpdateShow(false);
  const handleUpdateShow =()=> setUpdateShow(true); 

  useEffect(() => {
    //single time on load

    getOrdersLocally();
  }, []);


  useEffect(()=>{
    if(currentPage>0){
      getOrdersLocally()
    }
  },[currentPage])




  const openViewOrderModal = (event, order) => {
    console.log("view ordered button clicked");
    console.log(event);
    console.log(order);
    //sending all copies of order
    setSelectedOrder({ ...order });
    handleShow(true);
  };

  const openEditOrderModal =(event,order)=>{

    handleUpdateShow(true)
    setSelectedOrder({...order})

    console.log("hi open modal")
  }



  //get orders
  const getOrdersLocally = async () => {
    try {
      const data = await getAllOrders(
        currentPage,
        ADMIN_ORDER_PAGE_SIZE,
        "orderedDate",
        "desc"
      );
      if(currentPage==0){
        setOrdersData(data);

      }else{
        setOrdersData({
          content:[...ordersData.content,...data.content],
             lastpage:data.lastPage,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages  
,        })
      }
      console.log(data);

    } catch (e) {
      console.log("error");
      console.log(e);
    }
  };

  //view order modal

  const handleOrderUpdate =async (event)=>{
    event.preventDefault();
    console.log(selectedOrder)


    if(selectedOrder.billingName.trim()===''){
      toast.error("Name Required !!")
      return;
    }

    try{
    const data= await updateOrder(selectedOrder,selectedOrder.orderId)
    toast.success("Order details updated",{
      position:"top-right"
    })

const newList=  ordersData.content.map(item=>{
      if(item.orderId===selectedOrder.orderId){
        return data
      }else{
        return item
      }
    })

    setOrdersData({
      ...ordersData,
      content: newList

    })

    }catch(error){
      console.log(error)
      toast.error("Order not updated")

    }

  }

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

  //update order modal

  const updateOrderModal =()=>{
    return selectedOrder && (
      <>
    

      <Modal size={'lg'} show={updateShow} onHide={handleUpdateClose}>
        <Modal.Header  closeButton>
          <Container className="text-center">
          <Modal.Title >Update Orders</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>

          <Card>
            <Card.Body>

          <Form onSubmit={handleOrderUpdate}>

<Form.Group>
  {/* billing name */}
  <Form.Label>Billing Name</Form.Label>
  <Form.Control 
  value={selectedOrder.billingName}
  onChange={
    (event)=>{
      setSelectedOrder({
        ...selectedOrder,
        billingName:event.target.value
      })
    }
  
  }
  
  type="text"/>
</Form.Group>

<Form.Group>
  {/* billing phone */}
  <Form.Label>Billing Phone</Form.Label>
  <Form.Control 
  value={selectedOrder.billingPhone}
  onChange={
    (event)=>{
      setSelectedOrder({
        ...selectedOrder,
        billingPhone:event.target.value
      })
    }
  
  }
  
  type="text"/>
</Form.Group>


<Form.Group>
  {/* billing address */}
  <Form.Label>Billing Address</Form.Label>
  <Form.Control
  value={selectedOrder.billingAddress}
  as ={'textarea'} type="text"
  rows={6}
  onChange={
    (event)=>{
      setSelectedOrder({
        ...selectedOrder,
        billingAddress:event.target.value
      })
    }
  
  }
  
  type="text"/>
</Form.Group>

{/* payment status */}

<Form.Group className="mt-3">
  <Form.Label>Payment Status</Form.Label>
  <Form.Select
  value={selectedOrder.paymentStatus}
  onChange={(event)=>{
    setSelectedOrder({
      ...selectedOrder,
      paymentStatus:event.target.value

    }
    )
  }}>
    <option value=""  disabled>Choose a payment status</option>
    <option selected={selectedOrder.paymentStatus==='NOTPAID'} value="NOTPAID">NOT PAID</option>
    <option Selected={selectedOrder.paymentStatus==='PAID'} value="PAID">PAID</option>

  </Form.Select>
</Form.Group>

{/* {selectedOrder.orderStatus} */}


{/* order status */}
<Form.Group className="mt-3">
  <Form.Label>Order Status</Form.Label>
  <Form.Select
  value={selectedOrder.orderStatus}
  onChange={(event)=>{
    setSelectedOrder({
      ...selectedOrder,
      orderStatus:event.target.value
    })
  }}>
    <option value="" disabled>Choose a payment status</option>
    <option value="PENDING">PENDING</option>
    <option value="DISPATCHED">DISPATCHED</option>
    <option value="ONWAY">ONWAY</option>
    <option value="DELIVERED">DELIVERED</option>
  </Form.Select>
</Form.Group>
{/* ordered delivered date */}

<Form.Group className="mt-3">
  <Form.Label>Select Date</Form.Label>
  <Form.Control
  onChange={event=>{
    setSelectedOrder({
      ...selectedOrder,
      deliveredDate: event.target.value
    })
  }}
  />
  <p className="text-muted">Format: YYYY-MM-DD</p>
</Form.Group>

<Container>

<Button type="submit" variant="primary" onClick={handleUpdateClose}>
Save Changes
</Button>
</Container>

</Form>
            </Card.Body>
          </Card>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      
      </>
    )
  }


  //  load next page function

  const loadNextPage =()=>{
    console.log("loading next page")
    setCurrentPage(currentPage+1)
  }

  const ordersView = () => {
    return (
      <Card className="shadow-sm">
        <Card.Header className="text-center">
          <h4 className="my-4">All Orders is here</h4>
        </Card.Header>

        <Card.Body>

        <InfiniteScroll
        dataLength={ordersData.content.length}
        next={loadNextPage}
        hasMore={!ordersData.lastPage}
        loader={<h2 className="p-2 text-center">Loading...</h2>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>

        {
          ordersData.content.map((o) => {
          return (
            <SingleOrderView
              key={o.orderId}
              order={o}
              // just pass the reference openViewOrderModal
              openViewOrderModal={openViewOrderModal}
              openEditOrderModal={openEditOrderModal}
            />
          );
        })}

        ></InfiniteScroll>

      
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <h3>Orders page</h3>
      {/* {JSON.stringify(ordersData)} */}

      <Container>
        <Row>
          {/* if orderData has data then show view */}

          <Col>
            {ordersData && ordersView()}
            {viewOrderModal()}
            {updateOrderModal()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminOrders;
