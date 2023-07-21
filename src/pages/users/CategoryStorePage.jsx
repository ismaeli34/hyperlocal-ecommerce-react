import { useEffect, useState } from "react"
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/helper.service"
import { getProductsOfCategories } from "../../services/product.service"
import { useParams } from "react-router-dom"
import { getCategories } from "../../services/category.service"
import { Row, Container, Col } from "react-bootstrap";
import { Breadcrumb } from "react-bootstrap"
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "../../components/users/SingleProductCard"
import CategoryView from "../../components/users/CategoryView"
import { Link } from "react-router-dom"
// import {Breadcrumb} from 'react-bootstrap/Breadcrumb';


const CategoryStorePage =()=>{

    const {categoryId,categoryTitle}=useParams()
    const [categories, setCategories] = useState(null);
    const [products,setProducts]=useState(null)
    const [currentPage, setCurrentPage] = useState(0);




    useEffect(()=>{
        loadProductsOfCategories(0,STORE_PAGE_PRODUCT_SIZE,'addedDate','desc')

    },[categoryId])


    useEffect(()=>{
      if(currentPage>0){
        loadProductsOfCategories(currentPage,STORE_PAGE_PRODUCT_SIZE,'addedDate','desc')
      }
    },[currentPage])

    const loadCategories = (pageNumber, pageSize) => {
        getCategories(pageNumber, pageSize)
          .then((data) => {
            console.log(data);
            setCategories({ ...data });
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const loadProductsOfCategories =(pageNumber,pageSize,sortBy,sortDir)=>{
        getProductsOfCategories(categoryId,pageNumber,pageSize,sortBy,sortDir)
        .then(data=>{
            console.log(data)
            if (currentPage > 0) {
                // agar second page pe ho
                // agar currentpage 0 se bada hai , toh data append karenge
                setProducts({
                  content: [...products.content, ...data.content],
                  lastPage: data.lastPage,
                  pageNumber: data.pageNumber,
                  pageSize: data.pageSize,
                  totalElements: data.totalElements,
                  totalPages: data.totalPages,
                });
              } else {
                //same data ko put kar denge on else condition
                setProducts({ ...data });
              }
        }).catch(error=>{
            console.log(error)
        })
    }

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1);
      };

      const productView = () => {
        return (
          products && (
            <InfiniteScroll
              dataLength={products.content.length}
              next={loadNextPage}
              hasMore={!products.lastPage}
              loader={
                <h3 className="my-5 text-center">Loading More Products...</h3>
              }
              endMessage={<p className="my-5 text-center">All Products loaded</p>}
            >
              <Container fluid>
    
              <Row>
                {products.content.map((p) => (
                  <Col key={p.productId} md={4}>
                    {<SingleProductCard product={p} />}
                  </Col>
                ))}
              </Row>
              </Container>
            </InfiniteScroll>
          )
        );
      };

    return products &&(
        <>
        <Container fluid className="px-5 pt-5">
            <Row>
              <Container>

              <Breadcrumb className="mx-5">
                  <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                  <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
                  </Breadcrumb>


              </Container>

       
      
                <Col md={2}>
             

              <CategoryView/>   
                
                </Col>
                <Col md={10}>
             

                {products.content.length>0?productView():<h3 className="mt-5 text-center">No items in this category </h3> }
                
                </Col>
            </Row>
        </Container>
        
        
        
        </>
    )
}

export default CategoryStorePage;