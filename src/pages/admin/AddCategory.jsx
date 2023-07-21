import { Card,Container,Form, Spinner } from "react-bootstrap";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import {  toast } from 'react-toastify';
import { addCategory } from "../../services/category.service";



const AddCategory =()=>{
    const [category,setCategory]=useState({
        title:'',
        description:'',
        coverImage:''
    })

    const [loading,setLoading]=useState(false)

    const handleFieldChange=(event,property)=>{
        event.preventDefault()
        setCategory({
            ...category,
            [property]:event.target.value
        })

    }

    const clearForm=(event)=>{
        event.preventDefault();
        setCategory({
            title:'',
            description:'',
            coverImage:''
        })
    }

    const handleFormSubmit =(event)=>{
        event.preventDefault()
        console.log(category)
        if(category.title === undefined || category.title.trim()===''){
            toast.error("category title required")
            return
        }
        if(category.description === undefined || category.description.trim()===''){
            toast.error("category description required")
            return
        }
        if(category.coverImage === undefined || category.coverImage.trim()===''){
            toast.error("category cover image is required")
            return
        }

        // call server api to add category

        setLoading(true)

        addCategory(category)
        .then((data)=>{
            toast.success("Category added ")
            console.log(data)
            setCategory({
                title:'',
                description:'',
                coverImage:''
            })
        }).catch(error=>{
            console.log(error);
            console.log("Error in adding category");
        }).finally(()=>{
            setLoading(false)
        })

    }


    return(
        <Container fluid>
            <Card className="border border-0 shadow">

                <Card.Body>
                    <h5>Add Category</h5>
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup className="mt-3">
                          <Form.Label>Category Title</Form.Label>  
                            <Form.Control
                            onChange={(event)=>handleFieldChange(event,'title')}
                            value={category.title}
                            placeholder="Enter Here" type="text"/>
                        </FormGroup>

                        <FormGroup className="mt-3">
                          <Form.Label>Category Description</Form.Label>  
                            <Form.Control
                            onChange={(event)=>handleFieldChange(event,'description')}
                            value={category.description}
                            rows={6} placeholder="Enter Description" as={'textarea'}/>
                        </FormGroup>

                        <FormGroup className="mt-3">
                          <Form.Label>Category Cover Image Url</Form.Label>  
                            <Form.Control 
                            onChange={(event)=>handleFieldChange(event,'coverImage')}
                            value={category.coverImage}
                            placeholder="Enter Here" type="text"/>
                        </FormGroup>

                        <Container className="text-center mt-3">
                            <Button type="submit" variant="success" size="sm">
                                <Spinner  hidden={!loading} variant={'border'} size={'sm'} className="me-2"/>
                                <span hidden={!loading}>Please wait...</span>
                                <span hidden={loading}> Add Category</span>
                               </Button>
                            <Button onClick={clearForm} className="ms-2" variant="danger"  size="sm">Clear</Button>
                        </Container>

                    </Form>
                </Card.Body>
            </Card>


        </Container>
        
    )
}

export default AddCategory;