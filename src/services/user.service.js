import { publicAxios } from "./axios.service"
import { privateAxios } from "./axios.service";
//USER RELATED APIS
//REGISTER NEW USER
//we need userdata so we are passing 

export const registerUser=(userData)=>{
   return publicAxios.post("/users",userData)
    .then((response)=>response.data);
};

//LOGIN USER
//we should pass userdata.
export const loginUser =(loginData)=>{
    return publicAxios.post("/auth/login",loginData)
                .then((response)=>response.data)
}


export const getUser=(userId)=>{

    return publicAxios.get(`/users/${userId}`).then((response)=>response.data);

} 

//update user

export const updateUser=(user)=>{
    return privateAxios.put(`/users/${user.userId}`,user).then((response)=>response.data);
}


//update user profile pic

export const updateUserProfilePicture=(file,userId)=>{

    if(file==null){
        return;
    }

    const data = new FormData()
    data.append("userImage",file)
    return privateAxios.post(`/users/image/${userId}`,data)
    .then(response=>response.data);

}
// get all users

export const getAllUsers =(pageNumber,pageSize,sortBy,sortDir)=>{
    return privateAxios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((res)=>res.data)
};