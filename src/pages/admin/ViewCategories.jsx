import CategoryView from "../../components/users/CategoryView";
import { useEffect, useState } from "react";
import { deleteCategory, getCategories, updateCategory } from "../../services/category.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Container, FormGroup, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategories = () => {
  // content is basically coming from json and it is written
  const [categories, setCategories] = useState({
    content: [],
  });

  const imageStyle={
    width:"100%",
    height:"250px",
    objectFit:"contain"

}

const updateimageStyle={
  width:"100%",
  height:"150px",
  objectFit:"contain"

}
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [currentPage,setCurrentPage]= useState(0)

  // for view

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for update

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  //initial page load
  useEffect(() => {
    setLoading(true)
    getCategories(0,6)
    .then((data) => {
      console.log(data);
      setCategories(data);
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error in loading categories from server !!");
    })
    .finally(() => {
      setLoading(false);
    });
   
  }, []);


  const getCategoriesLocal=()=>{

   
  }

  //delete categoryMain Function
  //child to parent

  const deleteCategoryMain = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // call api
        deleteCategory(categoryId)
          .then((data) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");

            // we will not make an unneccessary call but we will update the categories by filtering
            const newArray = categories.content.filter((c) => {
              return c.categoryId != categoryId;
            });

            setCategories({
              ...categories,
              content: newArray,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in deleting category");
          });
      }
    });
  };

  //handle view button of category

  const handleView = (category) => {
    setSelectedCategory(category);
    handleShow();
  };

  //handle update of category

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    handleShowUpdate()
  };


  //  load next page function

  const loadNextPage =()=>{
    console.log("loading next page")
    setCurrentPage(currentPage+1)
  }

    //current page load

  useEffect(()=>{
    if(currentPage>0){
      getCategories(currentPage,6)
      .then((data) => {
        console.log(data);
        setCategories({
          content: [...categories.content,...data.content],
          lastpage:data.lastPage,
          pageNumber:data.pageNumber,
          pageSize:data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages  
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories from server !!");
      })
      .finally(() => {
        setLoading(false);
      });

    }

  },[currentPage])





  //update category to server
  const updateCategoryClicked =(event)=>{
    event.preventDefault()
    if(selectedCategory.title == undefined || selectedCategory.title.trim()===''){
      toast.error("Title required")
      return
    }

    if(selectedCategory.description == undefined || selectedCategory.description.trim()===''){
      toast.error("description required")
      return
    }

    updateCategory(selectedCategory).then(data=>{
      console.log(data)
      toast.success("Category updated")
    const newCategories=  categories.content.map(cat=>{
        if(cat.categoryId===selectedCategory.categoryId){
          cat.title = data.title
          cat.description = data.description
          cat.coverImage = data.coverImage
          
        }
        return cat
      })
      setCategories({
        ...categories,
        content:newCategories
      })
      handleCloseUpdate()
    })
    .catch(error=>{
      console.log(error)
      toast.error("Error in updating category")
    })

  }

  //modal view: view and update
  const modalView = () => {
    return (
      <>
        <Modal animation={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
      
          <Modal.Body>
          <Container>
              <img style={imageStyle} src={selectedCategory.coverImage}/>
            </Container>
            
            {selectedCategory.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
         
          </Modal.Footer>
        </Modal>
      </>
    );
  };


//  update modal
  const modalUpdate = () => {
    return (
      <>
        <Modal animation={false} show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
          
            <Modal.Title>Update Category</Modal.Title>
          </Modal.Header>
      
          <Modal.Body>
        <Form>
          <FormGroup>
            <Form.Label>Category Title</Form.Label>
            <Form.Control type="text" value={selectedCategory.title}
            onChange={(event)=>setSelectedCategory({
              ...selectedCategory,
              title:event.target.value
            })}
            placeholder="Enter here" />

          </FormGroup>

          <FormGroup className="mt-3">
          <Form.Label>Category Description</Form.Label>
            <Form.Control as={'textarea'}  
            onChange={(event)=>setSelectedCategory
            ({
              ...selectedCategory,
              description:event.target.value
            })}
            placeholder="Enter here" value={selectedCategory.description}   />
          </FormGroup>

          <FormGroup >
            <Container className="py-3">
            {/* <Image src={selectedCategory.coverImage} rounded /> */}

              <img style={updateimageStyle}

          
              className="img-fluid"  src={selectedCategory?.coverImage}/>


            </Container>
            <Form.Label>Category Image Url</Form.Label>
            <Form.Control placeholder="Enter here" 
             value={selectedCategory?.coverImage}
                onChange={(event)=>setSelectedCategory({
                  ...selectedCategory,
                  coverImage:event.target.value
                })}
            />

            
          </FormGroup>




        </Form>

        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="primary" onClick={updateCategoryClicked}>
            Save Changes
          </Button>
         
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  //    If categories length is greater than 0 then show data otherwise show no categories in database

  return (
    <div>
      {/* loader */}
      <Container hidden={!loading} className="text-center p-3">
        <Spinner />
        <div className="text-center">
          <h3>Loading....</h3>
        </div>
      </Container>
      {categories.content.length > 0 ? (
        <>

        <InfiniteScroll
        dataLength={categories.content.length}
        next={loadNextPage}
        hasMore={!categories.lastPage}
        loader={<h2 className="p-2 text-center">Loading...</h2>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        >

          {
          categories.content.map((category) => {
            return (
              <CategoryView
                viewCat={handleView}
                updateCat={handleUpdate}
                deleteCat={deleteCategoryMain}
                category={category}
                key={category.categoryId}
              />
            );
          })

          }
          </InfiniteScroll>
        </>
      ) : (
        <h5 className="text-center">No Categories in database</h5>
      )}

      {selectedCategory ? modalView() : ""}
      {selectedCategory ? modalUpdate():  ""}
    </div>
  );
};
export default ViewCategories;
