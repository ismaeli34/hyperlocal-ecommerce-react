import { Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/helper.auth";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/user.context";
import { Row,Col,Container } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";
const AdminDashboard = () => {

  const userContext = useContext(UserContext)

    const dashboardView =()=>{
        return(
            <div>
            <Container fluid className="px-5 py-5">

              <Row>
                <Col  md={{
                  span:2,
                }}>
                <SideMenu/>
                </Col>
                <Col  md={10} >
                 <Outlet />

                </Col>
              </Row>

            </Container>
          </div>
        )
    }


  return ( 
    (isAdminUser())? dashboardView(): <Navigate to="/user/home"     />
  )
};
export default AdminDashboard; 