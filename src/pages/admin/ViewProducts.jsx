import { useEffect,useState } from "react";
import { Row, Col, Container, Table, Card,Form, FormGroup, FormLabel, Pagination } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { addProductImage, getAllProducts, searchProduct, updateProduct, updateProductCategory } from "../../services/product.service";
import {  toast } from 'react-toastify';
import SingleProductView from "../../components/admin/SingleProductView";
import { PRODUCT_PAGE_SIZE, getProductImageUrl } from "../../services/helper.service";
import Modal from "react-bootstrap/Modal";
import defaultImage from '../../assets/default.jpeg'
import ShowHtml from "../../components/ShowHtml";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { InputGroup } from "react-bootstrap";

import { getCategories } from "../../services/category.service";




const ViewProducts = () => {

  const [products,setProducts]=useState(undefined)
  // view product state variables

  const [show, setShow] = useState(false);
  const closeProductViewModal = () => setShow(false);
  const [currentProduct,setCurrentProduct]=useState(undefined)

  const editorRef = useRef()

  const [categories,setCategories] = useState(undefined)
  const [imageUpdate,setImageUpdate] = useState({
    image:undefined,
    imagePreview:undefined
  })
  const [categoryChangeId,setCategoryChangeId]= useState('')

  const [searchQuery,setSearchQuery]=useState('')

  const [previousProducts,setPreviousProducts]=useState(undefined)



  useEffect(()=>{
    getCategories(0,1000)
    .then(data=>{
      setCategories({...data})
      console.log(data)
    }).catch(error=>{
      console.log(error)
    })
  },[])


  const openProductViewModal = (event,product) => {
    console.log(product)
    setCurrentProduct(product)
    setShow(true)};

  useEffect(()=>{

    getProducts(0,PRODUCT_PAGE_SIZE,'addedDate','desc')
  },[])

  // edit product state variables

  const [showEditModal, setShowEditModal] = useState(false);

  const closeEditProductModal =(event,product)=>{
    setShowEditModal(false)
  }


  const openEditProductModal =(event,product)=>{
    setCurrentProduct(product)
    setShowEditModal(true)

  }

  //handle update form submit

  const handleUpdateFormSubmit =(event)=>{
    event.preventDefault()
    console.log(currentProduct)
    if(currentProduct.title ===''){
      toast.error("title required")
      return
    }

    // form submit api call

    updateProduct(currentProduct,currentProduct.productId)
    .then(data=>{
      console.log(data)

      //update image also.

      toast.success("Detail updated",{
        position:"top-right"
      })
      if(imageUpdate.image && imageUpdate.imagePreview){

        addProductImage(imageUpdate.image,currentProduct.productId)
        .then(imageData=>{
          console.log(imageData)
          setCurrentProduct({
            ...currentProduct,
            productImageName:imageData.imageName
          })
          toast.success("image uploaded",{
            position:"top-right"
          })

          setImageUpdate({
            image:undefined,
            imagePreview:undefined
          })
  
        }).catch(
          error=>{
            console.log(error)
            toast.error("Error in update",{
              position:"top-right"
            })
          }
        )
        
      }

      //category Update

      if(categoryChangeId ==='none' || categoryChangeId === currentProduct?.category?.categoryId){

      }else{
        updateProductCategory(categoryChangeId,currentProduct.productId)
        .then(catData=>{
          console.log(catData)
          toast.success("Category Updated",{
            position:"top-right"
          })
          setCurrentProduct({
            ...currentProduct,
            category:catData.category
          })

          const newArray = products.content.map(p=>{
            if(p.productId ===currentProduct.productId)
            return catData
            
            return p
          })
    
          setProducts({
            ...products,
            content: newArray
          })
        
        }).catch(error=>{
          console.log(error)
        })
      }

      
  

      const newArray = products.content.map(p=>{
        if(p.productId ===currentProduct.productId)
        return data
        
        return p
      })

      setProducts({
        ...products,
        content: newArray
      })
    })





  }


  const getProducts =(pageNumber=0,pageSize=10,sortBy='addedDate',sortDir='asc')=>{
    //from product service
    getAllProducts(pageNumber,pageSize,sortBy,sortDir).then(data=>{
      console.log(data)
      setProducts({
        ...data
      })
    }).catch(error=>{
      console.log(error)
      toast.error("error in loading products")
    })
  }

  const uploadProductList=(productId)=>{

  const newArray= products.content.filter(p=>p.productId!=productId)
  setProducts({
    ...products,
    content:newArray
  })

  }

  //
  const handleUpdateFileChange = (event) => {
    const localFile = event.target.files[0];
    console.log(event.target.files[0]);
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUpdate({
          imagePreview: e.target.result,
          image: event.target.files[0],
        });
        console.log(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid file");
      setImageUpdate({
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  const searchProducts =()=>{
    if(searchQuery ===undefined || searchQuery.trim()===''){
      return
    }

    // call  server api to search
    searchProduct(searchQuery)
    .then(data=>{
      if(data.content.length<=0){
        toast.info("no result found")
      }
      setPreviousProducts(products)
      setProducts(data)
    }).catch(
      error=>{
        console.log(error)
        toast.error("Error in searching the products",{
          position:"top-right"
        })
      }
    )
    
  }

  //product vuew
  const productsView=()=>{
    return(

      <Card>

      <Card.Body>
        <h5 className="mb-2">View Products</h5>

        <FormGroup className="mb-2">
          <FormLabel>Search Products</FormLabel>
          <InputGroup>
          <Form.Control
            onChange={(event) => {
              if (event.target.value === '') {

                  if (previousProducts) {
                      setProducts(previousProducts)
                  }

              }

              setSearchQuery(event.target.value)
          }}

          value={searchQuery}
          placeholder="Search here" type="text"/>
          <Button onClick={searchProducts} variant="primary">Search</Button>

          </InputGroup>
        </FormGroup>
      <Table
        className="text-center"
        size="sm"
        responsive
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th className="px-3 small">#SN</th>
            <th className="px-3 small" colSpan={2}>Title</th>
            <th className="px-3 small">Quantity</th>
            <th className="px-3 small">Price</th>
            <th className="px-3 small">Discounted</th>
            <th className="px-3 small">Live</th>
            <th className="px-3 small">Stock</th>
            <th className="px-3 small">Category</th>
            <th className="px-3 small">Date</th>
            <th className="px-3 small">Action</th>
          </tr>
        </thead>
        <tbody>
       
       {
        products.content.map((product,index)=>(
          <SingleProductView key={index} index={index} product={product} 
          uploadProductList={uploadProductList}
           openProductViewModal={openProductViewModal}
           openEditProductModal={openEditProductModal}
           />
        ))
       }

         
        </tbody>
      </Table>
      <Container className="text-center d-flex justify-content-end" >
        <div>
        <Pagination size="md"   >


{/* 0 to totalpages - 1 */}

<Pagination.First onClick={(event)=>{
  getProducts(0,PRODUCT_PAGE_SIZE,'addedDate','desc')
}} />

<Pagination.Prev onClick={(event)=>{
  if((products.pageNumber-1)<0)
  return
  getProducts(products.pageNumber-1,PRODUCT_PAGE_SIZE,'addedDate','desc')
}}/>

{/* [0,1,2,pages-1] */}


{
 [...Array(products.totalPages)].map((ob,index)=>index).map(item=>
  {
   return products.pageNumber==item ?   <Pagination.Item active key={item} >{item + 1}</Pagination.Item> :   <Pagination.Item onClick={(event=>{
    getProducts(item,PRODUCT_PAGE_SIZE,'addedDate','desc')
   })} key={item} >{item + 1}</Pagination.Item>
  }

 )
}

<Pagination.Next onClick={(event)=>{
  if(products.lastPage)
    return
  getProducts(products.pageNumber+1,PRODUCT_PAGE_SIZE,'addedDate','desc')
}}/>


<Pagination.Last onClick={(event)=>{
  getProducts(products.totalPages-1,PRODUCT_PAGE_SIZE,'addedDate','desc')
}}/>

        </Pagination>


        </div>
     

      </Container>

      </Card.Body>
    </Card>
      
    )
  }

      // view product modal

  const viewProductModalView=()=>{
    // if their is currentProduct than only modal will work
        return currentProduct && (
          <>
    
          <Modal size="xl" animation={false} show={show} onHide={closeProductViewModal}>
            <Modal.Header closeButton>
              <Modal.Title>{currentProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Card className="shadow">

                <Card.Body>

                            {/* product image */}
                <Container className="text-center py-3">
                  <img style={{
                    height:"300px"
                  }} src={currentProduct.productImageName ? getProductImageUrl(currentProduct.productId):defaultImage} alt="" />
                </Container>

                {/* information table */}

                <Table striped bordered responsive className="text-center">
                  <thead>
                    <tr>
                      <th>Information</th>
                      <th>Value</th>
                    </tr>
              
                  </thead>

                  <tbody>
                  <tr>
                      <td>Product Id</td>
                      <td>{currentProduct.productId}</td>

                    </tr>

                    <tr>
                      <td>Quantity</td>
                      <td>{currentProduct.quantity}</td>

                    </tr>

                    <tr>
                      <td>Price</td>
                      <td> ₹ {currentProduct.price}</td>

                    </tr>

                    <tr>
                      <td>Discounted Price</td>
                      <td> ₹ {currentProduct.discountedPrice}</td>
                    </tr>

                    <tr className={currentProduct.live?'':'table-danger'}>
                      <td>Live</td>
                      <td>{currentProduct.live ?'TRUE':'FALSE'}</td>

                    </tr>

                    <tr className={currentProduct.stock?'':'table-danger'}>
                      <td>Stock</td>
                      <td>{currentProduct.stock ?'IN STOCK':'OUT OF STOCK'}</td>

                    </tr>

                    <tr>
                      <td>Category</td>
                      <td>{currentProduct.category?.title}</td>

                    </tr>
                  </tbody>

                </Table>



              {/* description */}
              <div className="p-3 border border-1">

                <ShowHtml htmlText={currentProduct.description}/>

      
          
              </div>




                </Card.Body>
              </Card>
      

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeProductViewModal}>
                Close
              </Button>
              <Button variant="primary" onClick={closeProductViewModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        );
  
      }


  const editProductModalView =()=>{

    // if it has currentProduct value then show

        return currentProduct && (

          <>

          <Modal size="xl" animation={false} show={showEditModal} onHide={closeEditProductModal}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form onSubmit={handleUpdateFormSubmit} >

              {JSON.stringify(currentProduct)}
              {/* product title */}
              <FormGroup className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  value={currentProduct.title}
                  onChange={event=> setCurrentProduct({
                    ...currentProduct,
                    title: event.target.value
                  })}
             
                  placeholder="Enter here"
                ></Form.Control>
              </FormGroup>

              {/* product description */}
              <FormGroup className="mt-3">
                <Form.Label>Product Description</Form.Label>
             

                <Editor
                apiKey="mi93rccbl5m0delb2bydztehuw5nymmur0mpwgxkf1c7a4fe"
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                  height: 380,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}

                value={currentProduct.description}
                onEditorChange={event=>setCurrentProduct({
                  ...currentProduct,
                  description: editorRef.current.getContent()
                })}

             

                />
              </FormGroup>

              <Row>
                <Col>
                  {/* price */}
                  <FormGroup className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    value={currentProduct.price}
                    onChange={event=> setCurrentProduct({
                      ...currentProduct,
                      price: event.target.value
                    })}

                      placeholder="Enter here"
                      type="number"
                    ></Form.Control>
                  </FormGroup>
                </Col>

                <Col>
                  {/* discounted price */}
                  <FormGroup className="mt-3">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control
                    value={currentProduct.discountedPrice}
                    onChange={event=> setCurrentProduct({
                      ...currentProduct,
                      discountedPrice: event.target.value
                    })}
                      placeholder="Enter here"
                      type="number"
                   

        
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>

              {/* product quantity */}

              <FormGroup className="mt-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                   value={currentProduct.quantity}
                     onChange={event=> setCurrentProduct({
                    ...currentProduct,
                    quantity: event.target.value
                  })}

                  placeholder="Enter here"
                  type="number"
                ></Form.Control>
              </FormGroup>

              <Row className="mt-3 px-1">
                <Col>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={currentProduct.live}
                    onChange={event=> setCurrentProduct({
                      ...currentProduct,
                      live: !currentProduct.live
                    })}
                    label={"Live"}
                  />
                </Col>
                <Col>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={currentProduct.stock }
                    onChange={event=> setCurrentProduct({
                      ...currentProduct,
                      stock: !currentProduct.stock
                    })}
                    label={"Stock"}
                  />
                </Col>
              </Row> 

              {/* product images */}

              <FormGroup className="mt-3">
                <Container
                  className="text-center py-4 border border-2"
                >
                  <p className="text-muted">Image Preview</p>
                  <img
                  src={imageUpdate.imagePreview? imageUpdate.imagePreview : getProductImageUrl(currentProduct.productId) }
                    className="img-fluid"
                    style={{ height: "200px" }}
                    alt=""
                  />
                </Container>
                <Form.Label>Select Product Image</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={"file"}
                    onChange={(event)=> handleUpdateFileChange(event)}
                  />
                  <Button
                  onClick={event=>{
                    setImageUpdate
                    ({
                      imagePreview: undefined,
                      image:undefined
                    })
                  }}
                    variant="warning"
                  >
                    Clear
                  </Button>
                </InputGroup>
              </FormGroup>

              {JSON.stringify(categoryChangeId)}

              <FormGroup className="mt-3">
                <Form.Label>Select Category</Form.Label>
                
                <Form.Select onChange={(event)=>{
                  setCategoryChangeId(event.target.value)
                }} >

                <option value="none">None</option>
                {
                  categories && categories.content.map(cat=>{
                    return(
                      <option selected={cat.categoryId ===currentProduct?.category?.categoryId} value={cat.categoryId} key={cat.categoryId}>{cat.title}</option>
                    )
                  })
                }

        
                </Form.Select>
              </FormGroup>

              <Container className="mt-3 text-center">
                <Button type="submit" variant="success" size="sm">
                  Update Product
                </Button>
               
              </Container>
            </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeEditProductModal}>
                Close
              </Button>
             
            </Modal.Footer>
          </Modal>
        </>
        );
       
      }


  return (
    <>
      <Container fluid>
        <Row>
          <Col>
          {
            products ? productsView() :''
          }
       
        
          </Col>
        </Row>
      </Container>

      {
        viewProductModalView()
      }

      {
        editProductModalView()
      }
   
    </>
  );
};

export default ViewProducts;
