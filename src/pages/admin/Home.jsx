import { Container, Row, Col, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {MdProductionQuantityLimits} from "react-icons/md"
import {MdOutlineCategory} from "react-icons/md"
import {BsBorderStyle} from "react-icons/bs"
import {FaUserSecret} from "react-icons/fa"
import DashboardCardView from "../../components/users/DashboardCardView";


const AdminHome = () => {
  return (
    <Container>
      <Row>
        <Col
          md={{
            span: 6,
            offset:3
          }}
        >
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h3 className="text-center ">Welcome to Admin Dashboard</h3>
              <p className="text-muted">
                Customize dashboard for admin,to add categories, to view
                categories, to add products, to view products and much more
              </p>
              {/* <p>Start Managing Products</p> */}
              <Container className="d-grid gap-3">
                <Button as={Link} to={"/admin/categories"} variant="danger">
                  Start Managing Categories
                </Button>
                <Button as={Link} to={"/admin/products"} variant="warning">
                  Start Managing Products
                </Button>
                <Button as={Link} to={"/admin/users"} variant="success">
                  Start Managing Users
                </Button>
                <Button as={Link} to={"/admin/orders"} variant="dark">
                  Start Managing Orders
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      <Row className="mt-5">

        <Col md={6}>
    {/* I made a component DashboardCardView  and now I am sending data such as icon,text and number in props */}

          <DashboardCardView 
          icon={<MdProductionQuantityLimits size={60} />}
          text={'Number of Products'}
          number={230}
          
          />
{/* 
            <Card className="shadow-sm">

                <Card.Body className="text-center">
                    <MdProductionQuantityLimits size={60}/>

                <h3 className="mt-3">Number of Products</h3>
                <h3 className="text-muted mt-3">(2345)</h3>

                </Card.Body>
              


            </Card> */}
        
        </Col>

        <Col md={6}>

    {/* I made a component DashboardCardView  and now I am sending data such as icon,text and number in props */}

    <DashboardCardView 
    icon={<MdOutlineCategory  size={60}/>}
    text={'Number of categories'}
    number={234}
    
    />


            {/* <Card className="shadow-sm">

                <Card.Body className="text-center">
            <MdOutlineCategory size={60}/>
                <h3 className="mt-3">Number of Categories</h3>
                <h3 className="text-muted mt-3">(2345)</h3>
                </Card.Body>
            </Card> */}
        
        </Col>

        </Row>


<Row className="mt-5">

<Col md={6}>

    <DashboardCardView 
    icon={<BsBorderStyle size={60}/>}
    text={'Number of Orders'}
    number={2344}
    />

</Col>

<Col md={6}>
    {/* <Card className="shadow-sm">

        <Card.Body className="text-center">
      <FaUserSecret size={60}/>
        <h3 className="mt-3">Number of Users</h3>
        <h3 className="text-muted mt-3">(30)</h3>
        </Card.Body>
    </Card> */}

    {/* I made a component DashboardCardView  and now I am sending data in props */}


    <DashboardCardView 
    icon={<FaUserSecret size={60}/>}
    text={'Number of Users'}
    number={50}
    />

</Col>

</Row>
    </Container>
  );
};

export default AdminHome;
