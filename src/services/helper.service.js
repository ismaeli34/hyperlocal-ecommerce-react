export const BASE_URL=`http://localhost:8080`;

export const PRODUCT_PAGE_SIZE=`5`;

export const ADMIN_ORDER_PAGE_SIZE =`10`

export const USER_PAGE_SIZE = `10`

export const STORE_PAGE_PRODUCT_SIZE =`9`

export const PAYMENT_STATUS =`NOT PAID`

export const ORDER_STATUS = `PENDING`

// export const getCategoryImageUrl=(categoryId)=>{
//     return `${BASE_URL}/categories/image/${categoryId}`
// }


export const getProductImageUrl =(productId)=>{
    return `${BASE_URL}/products/image/${productId}`
}

export const getUserImageUrl =(userId)=>{
    return `${BASE_URL}/users/image/${userId}`
}

export const formatDate=(timeInLongs)=>{

    if(!timeInLongs) {
        return null
    }


    // var options ={
    //     weekday:"long",
    //     year:"numeric",
    //     month:"long",
    //     day:"numeric"
    // }

    // const options = {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit'
    //   };

    const date= new Date(timeInLongs);
    // return date.toLocaleDateString("en-US",options)
    return date.toLocaleString();
}