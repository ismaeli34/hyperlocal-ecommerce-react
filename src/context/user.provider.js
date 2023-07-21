import { useContext, useState,useEffect } from "react"
import UserContext from "./user.context"
import { isAdminUser as adminUser} from "../auth/helper.auth";
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, getUserFromLocalStorage, isLoggedIn } from "../auth/helper.auth";
const UserProvider =({children})=>{

    const [isLogin,setIsLogin]=useState(false)
    const [userData,setUserData]=useState(null)
    const [isAdminUser,setIsAdminUser]=useState(false)
    // userData:{
    //     user:{

    //     },
    //     jwtToken:""
    // }

    useEffect(()=>{
        setIsLogin(isLoggedIn());
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    },[])


    //  LOGIN

    const doLogin =(data)=>{
        doLoginLocalStorage(data);
        setIsLogin(true);
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    }

    //  LOGOUT

    const doLogout=()=>{
        doLogoutFromLocalStorage();
        setIsLogin(false);
        setIsAdminUser(adminUser())
        setUserData(null);
    }




    return(
        <UserContext.Provider 
        value={{
            userData:userData,
            //you can remove setUserData
            setUserData:setUserData,
            isLogin:isLogin,
            isAdminUser:isAdminUser,
             //you can remove setIsLogin

            setIsLogin:setIsLogin,
            login:doLogin,
            logout:doLogout
            }}>
            {children}
        </UserContext.Provider>
    );

};

export default UserProvider;