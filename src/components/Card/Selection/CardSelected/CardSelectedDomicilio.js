import React, { useState } from "react";
import PropTypes from "prop-types";

import "./cardselected.css";
import { itemsDomicilio } from "./data";
import { v4 as uuidv4 } from 'uuid';

function generateUUID() {
    return uuidv4();
  }

function CardSelectedDomicilio({name,price,index,data,datacomp}){
    console.log('index',index)
    console.log('CardSelectedDomicilio Data',data)
    console.log('CardSelectedDomicilio',datacomp)

    const matchingItem = itemsDomicilio.find(item => item.prettyName === name );
    
    console.log(matchingItem)

    const subscribeService = async () => {
        //e.preventDefault();

        const bundleId = generateUUID();
        const subscriptionId = generateUUID();
        const id = localStorage.getItem('userID');

        // Obtener la fecha 
        const fecha = new Date();
        const fechaFormateada = fecha.toISOString();
        console.log(fechaFormateada);

        //Datos de la Data
        if (data && data[index] && datacomp) {
            // Datos de la Data
            const productName = data[index].name;
            console.log('ProductName', productName);
      
            const typevalue = data[index].type; // Asumo que hay un campo llamado 'type' en tus datos
            console.log('ProductType', typevalue);

            const billing = data[index].plans[0].billingPeriod;
            console.log (billing);

            const plan = data[index].plans[0].name;
            console.log(plan);

            let chargeThroughDate = new Date();
            chargeThroughDate.setMonth(fecha.getMonth() + 1);
            const formattedDate = chargeThroughDate.toISOString().split('T')[0];
            console.log(formattedDate);

            let eventId = uuidv4();
            console.log('eventID', eventId)

            let datacompnew =datacomp;
            console.log(datacompnew);

            let effectDate = datacompnew.effectiveDate;
            console.log(effectDate);

            let namemod = name + '-evergreen';
            console.log( namemod);
            
             //Datos de la solicitud
            const requestData = {
                accountId: id,
                bundleId: bundleId,
                externalKey: bundleId,
                subscription: [
                    {
                        accountId: id,
                        bundleId: bundleId,
                        bundleExternalKey: bundleId,
                        subscriptionId: subscriptionId,
                        externalKey: subscriptionId,
                        startDate: fechaFormateada,
                        productName: name,
                        productCategory: typevalue,
                        billingPeriod: billing,
                        phaseType: "EVERGREEN",
                        priceList: typevalue,
                        planName: plan,
                        state: "ACTIVE",
                        sourceType: "NATIVE",
                        chargeThroughDate: chargeThroughDate,
                        billlingStartDate: fechaFormateada,                    
                        billingCycleDayLocal: 10,
                        quantity: 1,
                        events:[
                            {
                                eventId: eventId,
                                billingPeriod: billing,
                                effectiveDate: fechaFormateada,
                                catalogEffectiveDate: effectDate,
                                plan: plan,
                                product: name,
                                priceList: typevalue,
                                eventType: "START_ENTITLEMENT",
                                serviceName: "entitlement-service",
                                serviceStateName: "ENT_STARTED",
                                phase: namemod,
                            }                        
                        ]
                    }
                ]
            }

            console.log('requestData',requestData)
            const jsonData = JSON.stringify(requestData);
            console.log(jsonData)

            const headers = {
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
                "Content-Type": "application/json",
                "X-Killbill-ApiKey": "tesisreact",
                "X-Killbill-ApiSecret": "tesisreact",
                "X-Killbill-CreatedBy": "subscription"
            };

            try{
                const response = await fetch("http://localhost:8080/1.0/kb/subscription", {
                method: "POST",
                headers: headers,
                body: jsonData,
                });
                if (response.status === 201) {
                    console.log("Account created successfully", response.body);
                } else {
                    console.error("Failed to create an account.");
                }
            }catch (error){
                console.error("An error ocurred:", error)
            }

          } else {
            console.error('No hay datos en la posición index');
          }

       
    }

    return(
        <>
            <div className="card" onClick={subscribeService}> 
                {matchingItem && (
                    <>
                        <h3 className="card-title">{matchingItem.velocity}</h3>
                        <div className="divider"></div>
                        <p >  
                            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                {matchingItem.prettyName}
                            </span>  
                        </p>
                        <p > 
                            Frecuencia 
                            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                {matchingItem.frecuencia}
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

CardSelectedDomicilio.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
};
export default CardSelectedDomicilio;