// all functions calling api related to ORDER

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { privateAxios } from "./axios.service"

//get orders

export const getAllOrders = async (pageNumber,pageSize,sortBy,sortDir)=>{
let result=  await  privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
return result.data;
}


//update orders
export const updateOrder = async (order,orderId)=>{
const result=    await privateAxios.put(`/orders/${orderId}`,order);
return result.data;
}

//create orders

export const createOrder = async (orderDetail)=>{
  const result= await privateAxios.post(`/orders`,orderDetail);
  return result.data;
};

//get orders of users

export const getOrdersOfUser= async (userId)=>{
  const result= await privateAxios.get(`/orders/users/${userId}`);
  return result.data;
}

