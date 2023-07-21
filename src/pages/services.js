import Base from "../components/Base"; 
 
 function Services(){
   return(
<Base
title="Services we Provide"
description="In this page we will discuss about the services we provide."
buttonEnabled={true}
buttonLink="/"
buttonType="warning"
buttonText="Home"
>
<div >  
    <h3 className="text-center">This is service component</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, temporibus possimus numquam iure tempora nihil sapiente doloribus quibusdam ex eius debitis saepe illo reprehenderit quod culpa dolorum iste quaerat?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias autem officia asperiores, facere expedita ducimus, explicabo, magnam optio eos nulla sapiente nesciunt facilis. Soluta corporis, totam provident nesciunt sit quam.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus placeat fugiat aut dignissimos voluptatem tempora vero possimus a, eaque ullam quisquam harum dolorem sint atque nesciunt quibusdam nisi consectetur impedit.</p>
    </div>
</Base>
   );
 }

 export default Services;

