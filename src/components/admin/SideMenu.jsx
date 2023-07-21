import { Badge, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {MdCategory} from 'react-icons/md'
import {MdOutlineCategory} from 'react-icons/md'
import {MdAddBox} from 'react-icons/md'
import {MdViewList} from 'react-icons/md'
import {IoMdCart} from 'react-icons/io'
import {FiUsers} from 'react-icons/fi'
import {ImUsers} from 'react-icons/im'
import {FaHome} from 'react-icons/fa'
import {AiFillDashboard} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import { useContext } from "react";
import UserContext from "../../context/user.context";
const SideMenu = () =>{


    const {logout} = useContext(UserContext);

  

    return(<>

        <ListGroup variant="flush" className="shadow sticky-top" >
            <ListGroup.Item as={NavLink} to="/admin/home" action>
                <FaHome size={20} />
                <span className="ms-2">Home</span>
                </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/add-category" action>
                <MdCategory size={20}/>
                <span className="ms-2"> Add Category</span>
               </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/categories" action>
                <MdOutlineCategory size={20} />
                <span className="ms-2">View Categories</span>
                </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/add-product" action>
                <MdAddBox size={20} />
                <span className="ms-2"> Add Product</span>
               </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/products" action>
                <MdViewList size={20}/>
                <span className="ms-2">View Products</span>
                </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/orders" action>
                <IoMdCart size={20}/>
                <span className="ms-2">Orders</span>
                </ListGroup.Item>
            <ListGroup.Item  className="d-flex justify-content-between align-items-start"  as={NavLink} to="/admin/users" action>
                <div>
                <ImUsers size={20}/>
                <span className="ms-2">Users</span>

                </div>
                
     
                
                
                <Badge bg="danger" pill>
                    New
                </Badge> 
                </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/users/home" action>
                
                <AiFillDashboard size={20}/>
                <span className="ms-2">Dashboard</span>
                </ListGroup.Item>
            <ListGroup.Item onClick={(event)=>{
                logout()
            }}  action>
                <FiLogOut/>
                <span className="ms-2">Logout</span>
                </ListGroup.Item>






        </ListGroup>

    </>)
}

export default SideMenu;