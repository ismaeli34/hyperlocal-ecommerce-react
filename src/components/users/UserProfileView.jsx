import React, { useContext } from 'react'
import { Card,Table } from 'react-bootstrap'
import { Container,Button } from "react-bootstrap";
import { BASE_URL } from '../../services/helper.service';
import profileImage from "./../../assets/default.jpeg"
import UserContext from '../../context/user.context';
import defaultImage from "./../../assets/default.jpeg";



const UserProfileView =({user=null,handleShowModal})=> {

 const {userData,isLogin}=   useContext(UserContext)


    const profileStyle={
        height:"120px",
        width:"120px",
        borderRadius:"50%",
        objectFit:"contain"
    }

  return (
   <>

   {
    // if user has then show the card &&
    (user && (
        <Card className='m-3 border-0 shadow text-center'> 
        <Card.Body>
            <Container className='text-center my-3'>
           
                {/* <img style={profileStyle} src="/assets/online-shop.png" alt="Profile image" /> */}
                <img style={profileStyle} src={user?.imageName ? BASE_URL+'/users/image/'+user.userId+ '?'+new Date().getTime() : profileImage} alt="Profile image" 
                onError={(event)=>{
                    console.log("error")
                    event.currentTarget.setAttribute("src",defaultImage)
                }}
                />
                {/* <img style={profileStyle} src={profileImage} alt="Profile image" /> */}
            </Container>
            <h3 className="text-center text-uppercase fw-bold">{(user.name)} </h3>
            <div className="mt-3">

                <Card style={{
                }}>
                    <Card.Body>
                    <Table className='' responsive hover borderless>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>

                        <tr>
                            <td>Gender</td>
                            <td>{user.gender}</td>
                        </tr>

                        <tr>
                            <td>About</td>
                            <td>{user.about}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{user.roles.map(role=><div key={role.roleId}>{role.roleName}</div>)}</td>
                        </tr>
                    </tbody>
                </Table>


                    </Card.Body>
                </Card>

               
            </div>

            {
                // check if the user is logged in and if the userid is equal to id present in context

                
                (isLogin && userData.user.userId===user.userId)?(
                    <Container className='text-center mt-3'>
                    <Button variant="success" size="lg" className='text-uppercase' onClick={handleShowModal}>Update</Button>
                    <Button variant="warning" size="lg" className='text-uppercase ms-2'>Orders</Button>
                </Container>

                ):''
            }

        </Card.Body>
       </Card>
    ))

   }

   </>
  )
}

export default UserProfileView