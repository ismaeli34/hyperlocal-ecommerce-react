import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios";

function Index(){

    function showSucessToast(){
        toast.success("This is success message !!",{
            position:"bottom-center"
        })
    }


    const getDataFromServer=()=>{

        toast.info("Getting data from server !")
        axios.get("http://localhost:8080/users").then((response)=>{
            console.log(response.data)
            toast.success("request done")
        }).catch((error)=>{
            console.log("error");
            toast.error("something went wrong") 
        })
    };

    return(
        <div>
            <Base 
            title="Shop what you need"
            description="Welcome to Trending Store.We provide best items as you need."
            buttonEnabled={true}
            buttonText="Start Shoping "
            buttonType="success"
            >
            <h1>Working on Home Page</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia quos odio non culpa, eos quam repellendus aspernatur suscipit magni incidunt qui aperiam temporibus, tempora ut laudantium esse totam labore explicabo facilis nam voluptas blanditiis alias? Culpa consequatur corrupti reiciendis repellendus repellat iure tempore reprehenderit, mollitia adipisci rem possimus deleniti labore?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad ab optio aspernatur dicta corporis ea, eius odio culpa quas consequuntur expedita fugit beatae amet facere aperiam natus ipsam error dolore similique soluta? Tempore numquam, ullam blanditiis quisquam nesciunt quasi quam, placeat dolores temporibus vero ducimus, accusamus ex officia commodi?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In temporibus magni quaerat suscipit quae hic soluta voluptate asperiores, ipsum maiores facere voluptatibus. Exercitationem ullam numquam eius eaque rem delectus reiciendis, beatae illum nemo, excepturi magnam neque, aliquam sed explicabo itaque consequuntur quibusdam tempora placeat at nisi distinctio asperiores sint id.</p>
            
            
            <Button variant="success" onClick={showSucessToast}>Toastify Success</Button>

            <Button variant="primary" onClick={getDataFromServer}>Get data from Fake API</Button>
            </Base>
        </div>
    )
}

export default Index;