import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
//Styles 
import './PaymentMethodForm.css'; 

function generateUUID() {
    return uuidv4();
  }


export const PaymentMethodForm = () => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedDefault, setSelectedDefault] = useState(false);

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleSelectedDefaultMethod = (event ) => {
        setSelectedDefault(true)
    }

    const handleAddPayment = async () => {
        const id = generateUUID();

        const dataToSend = {
            paymentMethodId: id,
            accountId: "e48005a8-5b48-4ab4-813b-e49ce5daf3e3",
            isDefault: selectedDefault,
            pluginName: "__EXTERNAL_PAYMENT__",
            pluginInfo: {
                isDefaultPaymentMethod: true,
            },
        };

        console.log(dataToSend);
        const requestString = new URLSearchParams("e48005a8-5b48-4ab4-813b-e49ce5daf3e3").toString();

        const headers = {
            'accept': 'application/json',
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
            "Content-Type": "application/json",
            "X-Killbill-ApiKey": "tesisreact",
            "X-Killbill-ApiSecret": "tesisreact",
            "X-Killbill-CreatedBy": "subscription",  
        };

        const url = `http://localhost:8080/1.0/kb/accounts/e48005a8-5b48-4ab4-813b-e49ce5daf3e3/paymentMethods`;
        console.log(url)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(dataToSend),
            });
  
            if (response.ok) {
                console.log("PymentMethods add");
                const responseData = await response.json();
            } else {
                console.error("Failed to add pymentMethod.");
            }
        } catch (error) {
        console.error("An error occurred:", error);
      }
    };

  return (
    <div>
      <h2>Método de Pago</h2>
            <form>
                <div className="divider"></div>
                <h4 className = "payment-method-title">
                    Seleccione el método de pago
                </h4>
                
                <div className= "payment-method-select">
                    <label>
                        <input
                            type="radio"
                            value="__EXTERNAL_PAYMENT__"
                            checked={selectedPaymentMethod === '__EXTERNAL_PAYMENT__'}
                            onChange={handlePaymentMethodChange}
                        />
                            Stripe
                    </label>
                    <br />

                    <label>
                        <input
                            type="radio"
                            value="efectivo"
                            checked={selectedPaymentMethod === 'efectivo'}
                            onChange={handlePaymentMethodChange}
                            disabled
                        />
                            Transfermóvil (deshabilitado)
                    </label>
                    <br />

                    <label>
                        <input
                            type="radio"
                            value="transferencia"
                            checked={selectedPaymentMethod === 'transferencia'}
                            onChange={handlePaymentMethodChange}
                            disabled
                        />
                            Enzona(deshabilitado)
                    </label>
                </div>

                <button 
                    className="submit-button" 
                    type="submit"
                    onClick={handleAddPayment}
                >
                    <FontAwesomeIcon icon={faCheck} />
                    Añadir
                </button>
            </form>  

            {selectedPaymentMethod && (
                <div>
                    <div className="divider"></div>
                    <h4 className = "payment-method-title">
                        Seleccione la forma de uso
                    </h4>
                    
                    <label>
                        <input 
                            className='payment-method-select'
                            type="radio" 
                            name="option" 
                            value="useDefault"
                            onChange={handleSelectedDefaultMethod} 
                        />
                            Usar por defecto
                    </label>
                    <br/>
                    <label>
                        <input 
                            className='payment-method-select'
                            type="radio" 
                            name="option" 
                            value="notUseDefault" 
                        />
                            No usar por defecto
                    </label>  
                </div>
            )}
    </div>
    )
}