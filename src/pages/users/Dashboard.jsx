import { Navigate, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/user.context";
import { useContext } from "react";
import { Card,Row,Col,Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { isLoggedIn } from "../../auth/helper.auth";

const Dashboard=()=>{
    const userContext = useContext(UserContext);
    const redirect = useNavigate();
    const dashboardView =()=>{
        return (
            <div>
            {/* <h2>This is User Dashboard</h2> */}
            {/* nested */}
            <Outlet/>
        </div>
        )
    }
    // NOT logged in view
    const notLoggedInView =()=>{
        return (
            <Container>
                <Row>
                    <Col md={{span:8,offset:2}}>
                    <Card className="border-0 shadow my-3">
                        <Card.Body className="text-center">
                            <h3>You are not logged in</h3>
                            <p>Please do login to view the page</p>
                            <Button as={NavLink} to="/login" variant="success">Login Now</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

return(

    //ternary operator
    (isLoggedIn()) ? dashboardView() : <Navigate to="/login"/>
);
}


export default Dashboard;