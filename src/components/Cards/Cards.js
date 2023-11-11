import React from "react";
import Card from "../Card/Card";
import "./cards.css"

import image1 from "../../assets/nautahogar/nauta.jpg";
import image2 from "../../assets/serviciodomicilio/domicilio.jpg"


function Cards({data}) {
  console.log("Data Cards",data)

  const imageSource = [image1,image2]
  
  return (
    <div className="scrollable-container">
      <div className="CardContainer card-container">
        {data.map((item, index) => (
          <div className="col-md-4" key={index}>
            <Card
              name={index}
              imageSource={imageSource[index]} // Puedes personalizar la fuente de imagen según el elemento actual
              data={item.products}
              datacomp={data}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;