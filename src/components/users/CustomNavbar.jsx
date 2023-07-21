import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from "react";
import UserContext from '../../context/user.context';
import CartContext from '../../context/CartContext';

const CustomNavbar=()=>{

  const userContext = useContext(UserContext);
  const {cart,setCart}=useContext(CartContext);

  //CODE FOR LOGOUT
  const doLogout=()=>{
   userContext.logout();
  }

    return(
        <Navbar className='bg-navbar-color ' collapseOnSelect expand="lg"  variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
            
        <img
              src="/assets/online-shop.png"
              width={30}
              height={30}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />

            <span className='ms-2'> Hyperlocal E-commerce</span>
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to ="/service">Features</Nav.Link>
            {/* <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Branded Phones </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              Smart Tv
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                More
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact us</Nav.Link>


          </Nav>
          <Nav>
          <Nav.Link as={NavLink} to="/store">Store</Nav.Link>

          <Nav.Link as={NavLink} to="/cart">Cart{userContext.isLogin && cart && '('+cart.items.length + ')'} </Nav.Link>

          {/* Use TERNARY OPERATOR */}

          {
            (userContext.isLogin)?(
            <>
            ({userContext.isAdminUser && (
              <>
              <Nav.Link as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
              </>
            )})

              <Nav.Link as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`} >{userContext.userData?.user?.email}</Nav.Link>
              <Nav.Link as={NavLink} to="/users/orders">Orders</Nav.Link>
              <Nav.Link onClick={doLogout}>Log out</Nav.Link>
              </>
            ):(
              <>
              <Nav.Link as={NavLink} to="/login" >Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>
              </>
            )
          }
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );

}

export default CustomNavbar;