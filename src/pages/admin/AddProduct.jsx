import { useEffect, useState } from "react";
import React, { useRef } from 'react';
import { Form, FormGroup, InputGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import defaultImage from "../../assets/default.jpeg";
import { addProductImage, createProductInCategory, createProductWithoutCategory } from "../../services/product.service";
import { json } from "react-router-dom";
import { getCategories } from "../../services/category.service";
import { Editor } from '@tinymce/tinymce-react';

const AddProduct = () => {



  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagePreview: undefined,
  });

  const [categories,setCategories]=useState(undefined)
  const [selectedCategoryId,setSelectedCategoryId] = useState("none")

  //for rich text editor

  const editorRef = useRef()

    useEffect(()=>{

      getCategories(0,1000).then(data=>{
        console.log(data)
        setCategories(data)

      }).catch((error)=>{
        console.log(error)
        toast.error("error in loading categories")
      })

    },[])




  const handleFileChange = (event) => {
    const localFile = event.target.files[0];
    console.log(event.target.files[0]);
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (e) => {
        setProduct({
          ...product,
          imagePreview: e.target.result,
          image: event.target.files[0],
        });
        console.log(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid file");
      setProduct({
        ...product,
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  const clearForm=()=>{

    editorRef.current.setContent('')

    setProduct({
      title: '',
      description: '',
      price: 0,
      discountedPrice: 0,
      quantity: 1,
      live: false,
      stock: true,
      image: undefined,
      imagePreview: undefined
  })
  }

  //submitaddproductform
  const submitAddProductForm =(event)=>{
    event.preventDefault();
    console.log(product)
    if(product.title === undefined || product.title.trim()===''){
        toast.error("title is required")
        return;
    }

    if(product.description === undefined || product.description.trim()===''){
        toast.error("description is required")
        return
    }

    if(product.price <=0){
        toast.error("Invalid price")
        return
    }

    if(product.discountedPrice<=0 || product.discountedPrice>=product.price ){
        toast.error("Invalid discounted price")
        return;

    }
    // validate others TODO

    //CREATE PRODUCT WITHOUT CATEGORY
    if(selectedCategoryId==='none'){
      createProductWithoutCategory(product)
      .then(data=>{
          console.log(data);
          //image upload
          toast.success("Product is created !")

          if(!product.image){
            clearForm()
            return
          }
  
          addProductImage(product.image,data.productId)
          .then(data=>{
            console.log(data)
            toast.success("Image Uploaded")
            clearForm()
  
          }).catch(error=>{
            console.log(error)
            toast.error("Error in uploading image")
          })
         
      }).catch(error=>{
          console.log(error)
          toast.error("Error in creating product ! check product details")
  
      })

    }
    //CREATE PRODUCT WITHIN CATEGORY
    else{
      createProductInCategory(product,selectedCategoryId)
      .then(data=>{
        toast.success("Product is created !")
        console.log(data);
        //image upload
        if(!product.image){
          clearForm()
          return
        }

        addProductImage(product.image,data.productId)
        .then(data=>{
          console.log(data)
          toast.success("Image Uploaded")
          clearForm()       
        }).catch(error=>{
          console.log(error)
          toast.error("Error in uploading image")
        })
       
    }).catch(error=>{
        console.log(error)
        toast.error("Error in creating product ! check product details")

    })


    }








  }

  const formView = () => {
    return (
      <>
      {/* {JSON.stringify(product)} */}
        <Card className="border shadow-sm ">
          <Card.Body>
            {/* {JSON.stringify(product)} */}
            <h5>Add Product here</h5>
            <Form onSubmit={submitAddProductForm}>
              {/* product title */}
              <FormGroup className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  value={product.title}
                  type="text"
                  onChange={(event)=>setProduct({
                    ...product,
                    title: event.target.value
                  })}
                  placeholder="Enter here"
                ></Form.Control>
              </FormGroup>

              {/* product description */}
              <FormGroup className="mt-3">
                <Form.Label>Product Description</Form.Label>
                {/* <Form.Control
                value={product.description}
                  as={"textarea"}
                  rows={6}
                  onChange={(event)=>setProduct({
                    ...product,
                    description:event.target.value
                  })}
                  placeholder="Enter here"
                ></Form.Control> */}

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
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={()=>setProduct({
                  ...product,
                  description:editorRef.current.getContent()
                })}

                />
              </FormGroup>

              <Row>
                <Col>
                  {/* price */}
                  <FormGroup className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    value={product.price}
                    onChange={(event)=>setProduct({
                        ...product,
                        price:  event.target.value
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
                    value={product.discountedPrice}

                      placeholder="Enter here"
                      type="number"
                    onChange={(event)=>{
                        if(event.target.value > product.price){
                            toast.error("Invalid Discount value !")
                            return
                        }
                        setProduct({
                            ...product,
                            discountedPrice: event.target.value
                        })

                    }}

        
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>

              {/* product quantity */}

              <FormGroup className="mt-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                    value={product.quantity}
                    onChange={(event)=>{
                    setProduct({
                        ...product,
                        quantity:event.target.value

                                        })
                                    }}

                  placeholder="Enter here"
                  type="number"
                ></Form.Control>
              </FormGroup>

              <Row className="mt-3 px-1">
                <Col>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={product.live}
                    onChange={(event)=>{
                        setProduct({
                            ...product,
                            live: !product.live
                            })
                    }}
                    label={"Live"}
                  />
                </Col>
                <Col>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={product.stock}
                    onChange={(event)=>{
                        setProduct({
                            ...product,
                            stock: !product.stock
                            })
                    }}
                    label={"Stock"}
                  />
                </Col>
              </Row>

              {/* product images */}

              <FormGroup className="mt-3">
                <Container
                  hidden={!product.imagePreview}
                  className="text-center py-4 border border-2"
                >
                  <p className="text-muted">Image Preview</p>
                  <img
                    className="img-fluid"
                    style={{ height: "200px" }}
                    src={product.imagePreview}
                    alt=""
                  />
                </Container>
                <Form.Label>Select Product Image</Form.Label>
                <InputGroup>
                  <Form.Control
                    onChange={(event) => handleFileChange(event)}
                    type={"file"}
                  />
                  <Button
                    onClick={(event) =>
                      setProduct({
                        ...product,
                        imagePreview: undefined,
                        image: undefined,
                      })
                    }
                    variant="warning"
                  >
                    Clear
                  </Button>
                </InputGroup>
              </FormGroup>


              <FormGroup className="mt-3">
                <Form.Label>Select Category</Form.Label>
                <Form.Select  onChange={(event)=>setSelectedCategoryId(event.target.value)}>
                  <option value="none">None</option>
            {
              (categories)?<>
              {
                categories.content.map(cat=><option key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>)
              }
              </>:''
            }
                </Form.Select>
              </FormGroup>

              <Container className="mt-3 text-center">
                <Button type="submit" variant="success" size="sm">
                  Add Product
                </Button>
                <Button onClick={clearForm} variant="danger" className=" ms-2" size="sm">
                  Clear data
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};

export default AddProduct;
