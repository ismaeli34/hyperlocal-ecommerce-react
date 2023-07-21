

import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/category.service";

import {  ListGroup } from "react-bootstrap";
import defaultImage from "../../assets/default_category.png";

import { Link } from "react-router-dom";

const CategoryView=({category,deleteCat,viewCat,updateCat})=>{

    const [categories, setCategories] = useState(null);

    useEffect(()=>{
        loadCategories(0, 10000);


    },[])

    const imageStyle={
        width:"90px",
        height:"90px",
        objectFit:"cover"

    }


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






const    deleteCategory    =(categoryId)=>{
    deleteCat(categoryId)
}


  // if categories is their then show return categories &&

  const categoryView = () => {
    return (
      categories && (
        <>
          <ListGroup variant="flush" className="shadow sticky-top">
            <ListGroup.Item action as={Link} to={'/store'}>
              {/* show default image in all products with onerror event handling as welll */}
              <img
                className="rounded-circle"
                src={defaultImage}
                alt={"All Products"}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                }}
                onError={(event) => {
                  event.currentTarget.setAttribute("src", defaultImage);
                }}
              />
              <span className="ms-2">All Products</span>
            </ListGroup.Item>

            {categories.content.map((cat) => (
              <ListGroup.Item as={Link} to={`/store/${cat.categoryId}/${cat.title}`} action key={cat.categoryId}>
                <img
                  className="rounded-circle"
                  src={cat.coverImage}
                  alt={cat.title}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                  onError={(event) => {
                    event.currentTarget.setAttribute("src", defaultImage);
                  }}
                />
                <span className="ms-2">{cat.title}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )
    );
  };





    return (
      <>
      { categories && categoryView()}
      </>
    )
}

export default CategoryView;