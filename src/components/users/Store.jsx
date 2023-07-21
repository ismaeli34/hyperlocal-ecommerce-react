import React, { useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { getCategories } from "../../services/category.service";
import { getAllLive, getAllProducts } from "../../services/product.service";
import { toast } from "react-toastify";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/helper.service";
import CategoryView from "./CategoryView";

const Store = () => {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, "addedDate", "desc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, "addedDate", "desc");
    }
  }, [currentPage]);

  //loading next page

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };



  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllLive(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setProducts({ ...data });
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
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading products");
      });
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
          {/*         
        // p.live &&  condition i am using to show the live products from backend
        {
          products.content.map(p=>(
            p.live && <  Col key={p.productId} md={4}>

            {<SingleProductCard product={p}  />}



            
            </Col>

          ))  */}

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



  return ( 
    <Container fluid className="px-5 pt-5">
      <Row>
        <Col md={2}>{
          <CategoryView />

        }</Col>

        <Col md={10}>{productView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;
