import { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { Button, Container } from "react-bootstrap";
import {Row,Col,Card} from "react-bootstrap";
import SingleCartItemView from "../../components/users/SingleCartItemView";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import UserContext from "../../context/user.context";
import { createOrder } from "../../services/order.service";
import { ORDER_STATUS, PAYMENT_STATUS } from "../../services/helper.service";

function Cart(){

    const [orderedPlacedClicked,setOrderPlacedClicked]=useState(false);
    const {cart,setCart,addItem,removeItem,clearCart}=   useContext(CartContext)
    const {userData, isLogin}=useContext(UserContext)



    const [orderDetails,setOrderDetails]=useState({

        billingAddress: '',
        billingName: '',
        billingPhone: '',
        cartId: '',
        orderStatus:'' ,
        paymentStatus:'' ,
        userId: ''
    });

  



//create Order

 const handleOrderCreation =async ()=>{

    if(orderDetails.billingName.trim()===''){
        toast.info("Billing name required",{
            position:"bottom-right"

        })
        return;
    }

    if(orderDetails.billingPhone.trim()===''){
        toast.info("Billing Phone required",{
            position:"bottom-right"
        })
        return;
    }

    if(orderDetails.billingAddress.trim()===''){
        toast.info("billing address required",{
            position:'bottom-right'
        })
        return;
    }

    // set required other details
    orderDetails.cartId =cart.cartId;
    orderDetails.orderStatus = ORDER_STATUS;
    orderDetails.paymentStatus= PAYMENT_STATUS;
    orderDetails.userId = userData.user.userId;
    console.log(orderDetails)
 
    try{
      const result= await createOrder(orderDetails);
      console.log(result);
      toast.success("Order Created !! proceeding for payment")
      setCart({
        ...cart,
        items:[]
      })
    }catch(error){
        console.log(error)
        toast.error("Error in creating error ! Try again");
    }

};


 


 const getTotalCartAmount =  ()=>{
    let amount =0;
    cart.items.forEach((item)=>{
        amount += item.totalPrice
    });

    return amount;
 }

const orderFormView =()=>{
    return (
        <Form>
            {/* {JSON.stringify(orderDetails)} */}
            {/* billing name */}
            <Form.Group className="mt-3">
                <Form.Label>Billing Name</Form.Label>
                <Form.Control value={orderDetails.billingName} 
                onChange={event=>{
                    setOrderDetails({
                        ...orderDetails,
                       billingName:event.target.value 
                    });
                }}
                type="text" placeholder="Enter here" />
            </Form.Group>


            <Form.Group className="mt-3">
                <Form.Label>Billing Phone</Form.Label>
                <Form.Control 
                value={orderDetails.billingPhone}
                onChange={event=>{
                    setOrderDetails({
                        ...orderDetails,
                        billingPhone:event.target.value
                    })
                }}
                type="number" placeholder="Enter here" />
            </Form.Group>


            <Form.Group className="mt-3">
                <Form.Label>Billing Address</Form.Label>
                <Form.Control 
                value={orderDetails.billingAddress}
                onChange={event=>{
                    setOrderDetails({
                        ...orderDetails,
                        billingAddress:event.target.value
                    })
                }}
                rows={6} as={'textarea'}  placeholder="Enter here" />
            </Form.Group>

            <Container className="mt-3 text-center">

                <Button onClick={event=>{
                    handleOrderCreation()
                }} size="sm" variant="success">Create Order & Proceed to Pay</Button>
            </Container>


        </Form>
    )
}


 const cardView =()=>{
    return (

        <>
        <Card className="mt-5 shadow-sm">
        <Card.Body>
            <Row className="px-5">
                <Col>
                <h3>Cart</h3>
                </Col>

                <Col className="text-end">
                <h3>{cart.items.length}</h3>
                </Col>
            </Row>

            <Row>
                <Col>
                {
                    cart.items.map((item)=>(
                        <SingleCartItemView key={item.cartId}  item={item} />
                    ))
                }
                </Col>
            </Row>
            <Container className="px-5">
                <h3 className="text-end px-5">Total Amount : € {getTotalCartAmount()}</h3>
            </Container>

            <Container className="text-center">
                { !orderedPlacedClicked &&
                (<Button onClick={event=> setOrderPlacedClicked(true)} variant="primary" size="lg">Place Order</Button>)

                }

            </Container>

        </Card.Body>
        </Card>
        </>
    )
 }

    return <div className="">

        <Container fluid={orderedPlacedClicked} className="px-5">
            <Row>
                <Col md={orderedPlacedClicked?8:12} className="animation">
                {cart && (cart.items.length>0?(cardView()):( <Alert 
                variant="danger"
                className="mt-3 shadow-sm text-center" 
                >
                    <h3>No Items in the Cart</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, accusantium?</p>
                    <Button as={Link} to="/store">Start adding product in Cart</Button>
                </Alert>) )}

                {!cart && (
                        <Alert 
                variant="info"
                className="mt-3 shadow-sm text-center" 
                >
                    <h3>You are not logged in</h3>
                    <p>In order to access your card do login first</p>
                    <Button variant="success" as={Link} to="/login">Login</Button>
                </Alert>

                    )
                }
                
                </Col>

                {
                    orderedPlacedClicked && <Col md={4}>
                    <h3>This is Order Form</h3>
                    <Card className="mt-3 shadow-sm">
                        <Card.Body>
                        <h4>Fill the form to fill complete order</h4>
                        {orderFormView()}
                        </Card.Body>
                        </Card>

                    </Col>
                }
            </Row>
        </Container>

    </div>

}

export default Cart;