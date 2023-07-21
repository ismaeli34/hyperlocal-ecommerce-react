
import { Row, Col, Container, Table, Card,Form, FormGroup, FormLabel, Pagination } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {MdDelete} from 'react-icons/md'
import {GrFormView} from 'react-icons/gr'
import {BsFillPencilFill} from 'react-icons/bs'
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteProduct } from "../../services/product.service";
import { useState } from 'react';




const SingleProductView =({
    index,
    product,
    uploadProductList,
    openProductViewModal,
    openEditProductModal
})=>{



    const formatDate =(time)=>{
        return new Date(time).toLocaleDateString()
    }

    

    const getBackgroundForProduct =()=>{
      //live + stock ==> green : table-success

      //not live: ==> red: table-danger

      //not stock ==> yellow: table-warn
      if(product.live && product.stock){
        return "table-success"
      }else if(!product.live){
        return "table-danger"
      }else if(!product.stock){
        return "table-warning"
      }else{

      }
    }

    //delete Product

    const deleteProductLocal =(productId)=>{

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
          deleteProduct(productId)
            .then((data) => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              // we will not make an unneccessary call but we will update the categories by filtering
              uploadProductList(productId)
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in deleting category");
            });
        }
      });

    }



    return(

        <tr className={getBackgroundForProduct()}>
        <td className="px-3 small">{index + 1}</td>
        <td className="px-3 small" colSpan={2}>{product.title}</td>
        <td className="px-3 small">{product.quantity}</td>
        <td className="px-3 small"> ₹{product.price}</td>
        <td className="px-3 small"> ₹{product.discountedPrice}</td>
        <td className="px-3 small">{product.live?'True':'False'}</td>
        <td className="px-3 small">{product.stock?'True':'False'}</td>
        <td className="px-3 small">{product.category?product.category.title:''}</td>
        <td className="px-3 small">{formatDate(product.addedDate)}</td>
        <td className="px-3 small table-light">
          <Container className="text-center d-flex">
            {/* delete button */}
          <Button className="mt-2" variant="danger" onClick={(event)=>deleteProductLocal(product.productId)} size="sm" >
            <MdDelete/>
            {/* view button */}
          </Button>
          <Button size="sm"  onClick={(event)=>openProductViewModal(event,product)} className="mt-2 ms-1" variant="warning">
            <GrFormView/>
            {/* update button */}
          </Button>
          <Button size="sm" onClick={(event)=>openEditProductModal(event,product)} className="mt-2 ms-1" variant="dark">
            <BsFillPencilFill/>
          </Button> 
          </Container>
        </td>
      
      </tr>

    )
}
export default SingleProductView;