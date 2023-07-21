import { Container, Row, Col, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Base from "../components/Base";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { registerUser } from "../services/user.service";
import {  toast } from 'react-toastify';

const Register = () => {

  let [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    about:'',
    gender:''
  })

//handle change

const handleChange=(event,property)=>{
setData({
  ...data,
  [property]:event.target.value
})
}

const [errorData,setErrorData] = useState({
  isError:false,
  errorData:null
})

const [loading,setLoading]=useState(false)

const clearData = () =>{  

  setData({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    about:'',
    gender:''
  })

  setErrorData({
    errorData:null,
    isError:false
  })
}

const submitForm=(event)=>{
  event.preventDefault();
  console.log(data);

  //validate client sides

  if(data.name === undefined || data.name.trim()===''){
    toast.error("name is required")
    return
  }


  if(data.email === undefined || data.email.trim()===''){
    toast.error("Email is required")
    return
  }

  //basics checks

  if(data.password === undefined || data.password.trim()===''){
    toast.error("Password is required")
    return;
  }

  if(data.confirmPassword === undefined || data.confirmPassword.trim()===''){
    toast.error("Confirm password is required")
    return
  }

  if(data.password !== data.confirmPassword){
    toast.error("Password and confirm Password did not match");
    return
  }
  setLoading(true);

  registerUser(data)
    .then(userData=>{
      //success handler
      console.log(userData)
      toast.success("User created Successfully !!")
      clearData();
    })
    .catch(error=>{

      //error handler
      console.log(error)
      setErrorData({
        isError:true,
        errorData:error
      })



      toast.error("Error while creating user ! Try again")


    })
    .finally(()=>{
      setLoading(false);

    })




}
  const registerForm = () => {
    return (
      <Container>
        {/* single row has 12 grids */}

        <Row>

          <Col sm={{ span: 8, offset: 2 }}>
            <Card className="my-3 border-0 shadow p-4"
            style={{
              position:'relative',
              top:-60
            
            
            }}
            >
              <Card.Body>

               <Container className="text-center mb-3">
               <img
              src="/assets/online-shop.png"
              width={50}

              height={50}
            />
               </Container> 
        
                <h3 className="mb-4 text-center text-uppercase">Store Sign up here</h3>

                {/* {JSON.stringify(data)} */}


                <Form noValidate onSubmit={submitForm}>
                  {/* name */}
                  <Form.Group md="6" controlId="formName">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control
                      onChange={(event)=>handleChange(event,'name')}
               
                      value={data.name}
                      type="text"
                      placeholder="Enter name"
                      required
                      isInvalid={errorData.errorData?.response?.data?.name}
                    />

                    <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>
                  </Form.Group>

                  {/* email field */}

                  <Form.Group md="6" controlId="formEmail">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      onChange={(event)=>handleChange(event,'email')}
                      value={data.email}
                      isInvalid={errorData.errorData?.response?.data?.email}
                      required
                    />

                    <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>
                  </Form.Group>

                  {/* password field */}
                  <Form.Group className="mb-3" md="6" controlId="formPassword">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control
                      onChange={(event)=>handleChange(event,'password')}
                      value={data.password}
                      type="password"
                      isInvalid={errorData.errorData?.response?.data?.password}
                      placeholder="Enter New Password"
                      required
                    />

                    <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>
                  </Form.Group>

                {/* confirm password field */}


                  <Form.Group className="mb-3" md="6" controlId="formConfirmPassword">
                    <Form.Label>Re enter your password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(event)=>handleChange(event,'confirmPassword')}
                      value={data.confirmPassword}
                      placeholder="Re enter  Password"
                      required
                    />
                  </Form.Group>

                  <div>

                    {/* Gender field */}

                  <Form.Group className="mb-3">
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check
                  value={'male'}
                  checked={data.gender=='male'}
                  onChange={(event)=>handleChange(event,'gender')}
                  inline name="gender" type={"radio"} label="Male" id={`gender`} />
                  <Form.Check
                  onChange={(event)=>handleChange(event,'gender')}
                  checked={data.gender=='female'}
                  value={'female'}
                  inline name="gender" type={"radio"} label="Female" id={`gender`} />
                  </Form.Group>
                  </div>

                  {/* About Field */}
                  <Form.Group className="mb-3">

                  <Form.Label>Write About</Form.Label>
                  <Form.Control rows="6" 
                  value={data.about}
                  isInvalid={errorData.errorData?.response?.data?.about}
                  onChange={(event)=>handleChange(event,'about')}
                  as="textarea" placeholder="Write here" />
                  <Form.Control.Feedback type="invalid" >{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>
                  </Form.Group>

                  <Container>
                    <p>Already Registered !  <a href="/login" >Login</a>       </p>
                  </Container>

                  <Container className="text-center">

                  <Button type="submit" className="text-uppercase" disabled={loading} variant="success">

                    <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                    hidden={!loading}
                    
                    />

                    <span hidden={!loading}>wait..</span>
                    <span hidden={loading}>Register</span>

                    
                  
                    
                    
                    </Button>
                  <Button onClick={clearData}  className="ms-2 text-uppercase" variant="danger">Reset</Button>

                  </Container>


                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base
      title="Hyperlocal E-commerce / Sign up"
      description="Fill the form correctly to register with us. By Registering with us you can use services that we provide"
    >
      {registerForm()}
    </Base>
  );
};

export default Register;
