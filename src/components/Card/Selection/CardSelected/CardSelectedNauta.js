import React, { useState } from "react";
import PropTypes from "prop-types";

import "./cardselected.css";
import { itemsNauta } from "./data";

function CardSelectedNauta({name,price,index}){
    console.log('index',index)

    const matchingItem = itemsNauta.find(item => item.prettyName === name );
    
    console.log(matchingItem)

    const miFuncion = () => {
        alert('El div ha sido clicado');
    };

    return(
        <>
            <div className="card" onClick={miFuncion}> 
                {matchingItem && (
                    <>
                        <h3 className="card-title">{matchingItem.velocity}</h3>
                        <div className="divider"></div>
                        <p > 
                            Tiempo de navegación  
                            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                {matchingItem.time}
                            </span>
                            
                        </p>
                        <p>
                            Cuota Mensual
                            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                {price} CUP
                            </span>
                        </p>
                    </>
                )}            
                   
            </div>
        </>
    );

}

CardSelectedNauta.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

export default CardSelectedNauta;