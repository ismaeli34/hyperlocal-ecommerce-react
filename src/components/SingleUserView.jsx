import { Card } from "react-bootstrap";
import { Container,Row,Col } from "react-bootstrap";
import { getUserImageUrl } from "../services/helper.service";
import defaultImage from "../assets/default.jpeg"
import {Badge} from "react-bootstrap";
import { Link } from "react-router-dom";



const SingleUserView =({user})=>{
    return (
        <>
        <Card className="mt-3 border border-0 shadow-sm">
            <Card.Body>

                <Row>
                    <Col md={2} className="d-flex align-items-center">
                    <img style={{
                        width:"120px",
                        height:"120px",
                        objectFit:"cover"
                        
                    }} className="rounded-circle" src={user.imageName? getUserImageUrl(user.userId):defaultImage} alt="" 
                    
                    onError={(event)=>{
                        console.log("error")
                        event.currentTarget.setAttribute("src",defaultImage)
                    }}
                    /> 
                    </Col>

                    <Col md={10} className="ps-5">

                    <Link to={'/users/profile/'+user.userId}> <h5>{user.name}</h5></Link>
                   
                <p className="text-muted">{user.about}</p>
                <p>{user.email}</p>
                {user.roles.map(role=>{
                    return(
                        <Badge bg={role.roleName==='ROLE_ADMIN'?'danger':'success'} key={role.roleId} pill className="mx-2">{role.roleName}</Badge>
                    )
                })}
                    
                    </Col>
                </Row>
                
            </Card.Body>
        </Card>
        </>
    )
}

export default SingleUserView;