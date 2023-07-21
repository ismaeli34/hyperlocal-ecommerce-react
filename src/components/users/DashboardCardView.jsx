import { Container, Row, Col, Card } from "react-bootstrap";


const DashboardCardView=({
    icon,text,number
})=>{



    return(


            <Card className="shadow-sm">
        
                <Card.Body className="text-center">
                    {icon}
                    {/* <BsBorderStyle size={60}/> */}
        
                <h3 className="mt-3">{text}</h3>
                <h3 className="text-muted mt-3">({number} +)</h3>
        
                </Card.Body>
              
        
        
            </Card>
        
        
    

        

    )


}

export default DashboardCardView;