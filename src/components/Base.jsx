import { Container,Button } from "react-bootstrap";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const Base =({
    title="Page title",
    description="Welcome to dynamic store",
    buttonEnabled=false,
    buttonText="Shop Now",
    buttonType="primary", 
    buttonLink="/",
    children})=>{
    let styleContainer ={
        height:"200px"
    }
    return (
        <div>
            <Container className="bg-dark p-5 text-white text-center  d-flex justify-content-center align-items-center" fluid style={styleContainer}>
          <div>

          <h3 className="text-center">{title}</h3>
            <p className="text-center">{description && description}</p>
            {buttonEnabled && <Button as={NavLink} to="/" variant={buttonType}>{buttonText}</Button>}
          </div>
           
            {/* <a as={NavLink} to="/"  href={buttonLink} className={`btn btn-${buttonType}`}>{buttonText}</a> */}
            </Container>
            {children}
            <Footer/>
        </div>

    )
}


export default Base;

