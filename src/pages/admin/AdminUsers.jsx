import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.service";
import { Container,Row,Card,Col } from "react-bootstrap";
import SingleUserView from "../../components/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";
import { USER_PAGE_SIZE } from "../../services/helper.service";

const AdminUsers =()=>{

    const [userData,setUserData]= useState(undefined)

    const [currentPage,setCurrentPage]=useState(0)

    useEffect(()=>{
        getUsers(currentPage,USER_PAGE_SIZE,'name','asc')
    },[])


    useEffect(()=>{
        if(currentPage>0){
            getUsers(currentPage,USER_PAGE_SIZE,'name','asc')
        }

    },[currentPage])

    const getUsers=(pageNumber,pageSize,sortBy,sortDir)=>{
        getAllUsers(pageNumber,pageSize,sortBy,sortDir)
        .then((data)=>{
            console.log(data)
            if(currentPage==0){
                setUserData({
                    ...data
                })
            }else{
                setUserData({
                    content: [...userData.content,...data.content],
                    lastpage:data.lastPage,
                    pageNumber:data.pageNumber,
                    pageSize:data.pageSize,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages  
                })

            }


        }).catch(error=>{
            console.log(error)
        })
    }

    const loadNextPage =()=>{
        setCurrentPage(currentPage + 1)
    }


    const userView =()=>{
        return (

            <Container>
                <Row>

                    <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h3>User List</h3>
                            <InfiniteScroll
                            dataLength={userData.content.length}
                            next={loadNextPage}
                            hasMore={!userData.lastPage}
                            loader={<h3 className="text-center my-3">Loading...</h3>}
                            endMessage={<p className="text-center py-3 text-muted">All Users loaded</p>}
                            >

{
                                userData.content.map(user=>(
                                    <SingleUserView key={user.userId} user={user} />
                                ))
                            }


                            </InfiniteScroll>

                           
                        </Card.Body>

                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }


    return(
        <>

        {
            userData && userView()
        }

        </>
        
    )
}

export default AdminUsers;