import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function generateUUID() {
    return uuidv4();
  }

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            'Name:':name,
            'Password':pass,
            'Phone':phone,
            'Mail':email
        });

        const id = generateUUID();     
        
         // Datos de la solicitud
        const requestData = {
            accountId: id,
            name: name,
            email: email,
            phone: phone,
            externalKey: pass,
            currency: "CUP",
        };

        console.log("Data", requestData);

        //const url = `http://127.0.0.1:8080/1.0/kb/plugins/email-notifications-plugin/accounts/${id}`;
       // const events = ["INVOICE_CREATION", "INVOICE_PAYMENT_SUCCESS"];
        
        //console.log(url)

        const headers = {
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
            "Content-Type": "application/json",
            "X-Killbill-ApiKey": "tesisreact",
            "X-Killbill-ApiSecret": "tesisreact",
            "X-Killbill-CreatedBy": "subscription"
        };
  
        try {
           /* const responseEmail = await fetch(url, {
                method: 'POST',
                headers: headers,
                body:JSON.stringify(events)
            })*/
            //console.log(responseEmail)
            //if(responseEmail.status === 200){
                const response = await fetch("http://localhost:8080/1.0/kb/accounts", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(requestData),
                });
                if (response.status === 201) {
                    console.log("Account created successfully", response.body);
                } else {
                    console.error("Failed to create an account.");
                }
            //}else {
                //console.error("Failed to create an account.");
            //}
            
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
        <div className="auth-form-container">
            <div className="register-form">
            <h2>Register</h2>
        <form  onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input 
                value={name} 
                name="name" 
                onChange={(e) => setName(e.target.value)} 
                type="text"
                id="name" 
                placeholder="full Name" 
            />

            <label htmlFor="phone">Phone</label>
            <input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="phone" 
                id="phone" 
                name="phone" 
            />

            <label htmlFor="email">email</label>
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                placeholder="youremail@gmail.com" 
                id="email" 
                name="email" 
            />

            <label htmlFor="password">password</label>
            <input 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} t
                type="password" 
                placeholder="********" 
                id="password" 
                name="password" 
            />

            <button type="submit">Sign In</button>
        </form>
        <div id="formFooter">
        <button 
            className="link-btn" 
            onClick={() => props.onFormSwitch('login')}
        >
            Already have an account? Login here
        </button>
        </div>
        </div>
    </div>
    )
} 