import Base from "../components/Base";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user.service";
import UserContext from "../context/user.context";

const Login = () => {
  const redirect = useNavigate();

  const userContext = useContext(UserContext);

  //to handle email and password
  let [data, setData] = useState({
    email: "",
    password: "",
  });

  //to handle error
  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null,
  });

  //for loading spinner
  let [loading, setLoading] = useState(false);

  const clearData = () => {
    setData({
      email: "",
      password: "",
    });

    setErrorData({
      errorData: null,
      isError: false,
    });
  };

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

 const handleReset =()=>{

  setData({
    email: "",
    password: "",
  });

  setErrorData({
    errorData: null,
    isError: false,
  });

  setLoading(false);



 }

  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("email is required");
      return;
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("password is required");
      return;
    }
    setLoading(true);
    //  LOGIN API
    loginUser(data)
      .then((userData) => {
        //success handler
        console.log(userData);
        toast.success("User Login Successfully !!");
        clearData();
        //redirect to dashboard page:
        // 1.normal : normal user ke dashboard per le jana hai.

        // /users/profile
        // /users/home
        // userContext.setIsLogin(true);
        // userContext.setUserData(userData);

        //it will call user.provider login method which has doLogin method as well  login:doLogin,
        userContext.login(userData);
        redirect("/users/home");
        // 2.admin : admin user dashboard pe le jana hai
      })
      .catch((error) => {
        //error handler
        console.log(error);
        toast.error(error.response.data.message);
        setErrorData({
          isError: true,
          errorData: error,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginForm = () => {
    return (
      <div>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Card
                className="my-3 border-0 shadow"
                style={{ position: "relative", top: -60 }}
              >
                <Card.Body>
                  {/* {JSON.stringify(userContext)} */}

                  <Container className="text-center mb-3">
                    <img src="/assets/online-shop.png" width={50} height={50} />
                  </Container>
                  <h3 className="text-center text-uppercase">Login Here</h3>

                  <Alert
                    onClose={() =>
                      setErrorData({
                        isError: false,
                        errorData: null,
                      })
                    }
                    dismissible
                    variant="danger"
                    show={errorData.isError}
                  >
                    {errorData.errorData?.response?.data?.message}
                  </Alert>

                  <Form noValidate onSubmit={submitForm}>
                    {/* Email login field */}

                    <Form.Group className="mb-3">
                      <Form.Label>Enter Email </Form.Label>
                      <Form.Control
                        value={data.email}
                        onChange={(event) => handleChange(event, "email")}
                        type="email"
                        placeholder="Enter here"
                      ></Form.Control>
                    </Form.Group>

                    {/* password login field */}

                    <Form.Group className="mb-3">
                      <Form.Label>Enter Password</Form.Label>
                      <Form.Control
                        value={data.password}
                        onChange={(event) => handleChange(event, "password")}
                        type="password"
                        placeholder="Enter here"
                      ></Form.Control>
                    </Form.Group>

                    <Container className="text-center">
                      {/* <p>Forget Password <a href="/forget">Click Here</a></p> */}
                      <p>
                        If not registered !{" "}
                        <NavLink to="/register">Click Here</NavLink>
                      </p>

                      <Button
                        type="submit"
                        className="text-uppercase"
                        variant="success"
                        disabled={loading}
                      >
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                          hidden={!loading}
                        />

                        <span hidden={!loading}>wait..</span>

                        <span hidden={loading}>Login</span>
                      </Button>
                      <Button onClick={handleReset} className="ms-2  text-uppercase" variant="danger">
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <Base title="Hyperlocal E-commerce / Login" description={null}>
      {loginForm()}
    </Base>
  );
};

export default Login;
