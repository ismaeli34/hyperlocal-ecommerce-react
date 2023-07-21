import { useContext } from "react";
import UserContext from "../../context/user.context";

const Home =()=>{

    const userContext = useContext(UserContext);

    return(
        <div>
            {console.log(userContext)}
        <p>This is user dashboard page !</p>
        {JSON.stringify(userContext)}
        <h1>Welcome {userContext.userData?.user?.name}</h1>
        <h1>user is logged in {userContext.isLogin + ''}</h1>
        </div>
    )
}

export default Home;