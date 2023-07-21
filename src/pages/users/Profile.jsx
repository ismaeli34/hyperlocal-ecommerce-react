import { useContext, useEffect, useState } from "react";
import UserProfileView from "../../components/users/UserProfileView";
import { Container, Row, Col, Spinner, InputGroup } from "react-bootstrap";
import UserContext from "../../context/user.context";
import { getUser, updateUser, updateUserProfilePicture } from "../../services/user.service";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Card,Table } from 'react-bootstrap'
import { Form } from "react-bootstrap";
import defaultImage from '../../assets/default.jpeg'


const Profile = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  // state for handle image


  const [image,setImage]=useState({
    placeholder:defaultImage
  })



  const { userId } = useParams();

  const [updateLoading,setUpdateLoading]=useState(false);
  //    modals state

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModal = () => {
    console.log("showing modal")
    
    setShow(true)
};

  useEffect(() => {
    // console.log("data from url userId"+userId)

    // if(userContext.userData){
    //     getUserDataFromServer()

    // }

    getUserDataFromServer();
  }, []);

  const getUserDataFromServer = () => {
    //api call
    //    const userId= userContext.userData.user.userId
    getUser(userId)
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("Error in loading user information from server !!");
      });
  };

  const updateFieldHandler=(event,  property)=>{
    setUser({
        ...user,
        [property]:event.target.value
    })
  }

  //update user data by calling api
  const updateUserData =()=>{
    console.log('updating user data');
    if(user.name===undefined || user.name.trim()===''){
      toast.error("username required !")
      return
    }
    //  ...rest of the field
    setUpdateLoading(true)
      updateUser(user).then(updatedUser=>{
        console.log(updatedUser);
        toast.success("User detail updated !!");
        //update image

        if(image.file==null){
          setUpdateLoading(false)
          return
        }

        updateUserProfilePicture(image.file,user.userId).then(data=>{
          console.log(data)
          toast.success(data.message)
          handleClose()
        })
        .catch(error=>{
          console.log(error)
          toast.error("Image not uploaded")
        }).finally(()=>{
          setUpdateLoading(false)
        })

        // handleClose()
      }).
      catch(error=>{
        console.log(error)
        // if(error.response.status == 400){
        //   toast.error(error.response.data.name);
        // }
        toast.error("not updated !! Error");
      })
      
  }

  //function for image change
  const handleProfileImageChange=(event)=>{

    const localFile = event.target.files[0];
    console.log(event.target.files[0]);
    if(event.target.files[0].type==='image/png' || event.target.files[0].type==='image/jpeg'){
      //preview show
      const reader = new FileReader()
      reader.onload=(e)=>{
       setImage({
        placeholder:e.target.result,
        file:event.target.files[0]
       })
       console.log(e.target.result);
      }
      reader.readAsDataURL(event.target.files[0])

    }else{
      toast.error("Invalid file")
      setImage({
        ...image,
        placeholder:undefined
      })
    }
  }


  //clear the image

  const clearImage =(event)=>{
    setImage({
      placeholder:defaultImage,
      file:null
    })
  }



  //update view

  const updateViewModal = () => {
    return (
      <div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>


          <Card style={{
                }}>
                    <Card.Body>
                    <Table className='' responsive hover borderless>
                    <tbody>

                      <tr>
                        <td>Profile Image</td>
                        <td>
                          {/* image tag for preview */}
                          <Container className="text-center mb-3">
                          <img style={{objectFit:'cover'}} height={100} width={100} src={image.placeholder} alt="" />
                          </Container>

                        <InputGroup>
                        <Form.Control type='file' onChange={handleProfileImageChange} placeholder="Select File" />
                        <Button onClick={clearImage} variant="outline-danger">Clear</Button>
                        </InputGroup>
                          <p className="mt-3 text-muted">Select square size picture for better UI</p>
                        </td>
                      </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                <Form.Control  type="text" value={user.name}
                                onChange={(event)=>updateFieldHandler(event,'name')}
                            
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>

                        <tr>
                            <td>New Password</td>
                            <td>
                                <Form.Control placeholder="Enter new Password"  type="password" value={user.password}
                                onChange={(event)=>updateFieldHandler(event,'password')}
                                />
                                <p>Leave the field blank for same password</p>
                                </td>
                        </tr>

                        <tr>
                            <td>Gender</td>
                            <td>{user.gender}</td>
                        </tr>

                        <tr>
                            <td>About</td>
                            <td>
                                <Form.Control placeholder="Enter about"
                                onChange={(event)=>updateFieldHandler(event,'about')}
                                as={'textarea'} value={user.about} rows={8} />
                            </td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{user.roles.map(role=><div key={role.roleId}>{role.roleName}</div>)}</td>
                        </tr>
                    </tbody>
                </Table>


                    </Card.Body>
                </Card>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserData}>

              <Spinner
              animation="border"
              size="sm"
              className="me-2"
              hidden={!updateLoading}
              />
              <span hidden={!updateLoading} >Updating</span>

              <span hidden={updateLoading} >Save Changes</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Container className="mt-2">
        <Row>
          <Col>
            {/* {userContext.userData.user.userId} */}
            {user ? (
                <>
              <UserProfileView
                user={
                  //     {
                  //     name:"Ronney Ismael",
                  //     email:"ronney@gmail.com",
                  //     gender:"Male",
                  //     about:"Software Developer",
                  //     roles:[{

                  //         "roleId":1,
                  //         "roleName":"Role_Normal"
                  //     },
                  //     {
                  //         "roleId":2,
                  //         "roleName":"Role_Admin"
                  //     }

                  // ]

                  // }
                  user
                }

                handleShowModal ={handleShowModal}
              />
                            {updateViewModal()}

              </>
            ) : (
              <Alert>
                <h3 className="text-center">User not loaded in server</h3>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
