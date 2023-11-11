import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { PaymentMethodForm } from "../../components/NavBar/Forms/PaymentMethodForm/PymentMethodForm";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(
            email,
            pass
        );

        const requestData = {
            externalKey: pass,
            accountWithBalance: false,
            accountWithBalanceAndCBA: false,
            audit: "NONE",
        }

        console.log("Data", requestData);
        const requestString = new URLSearchParams(requestData).toString();

        const headers = {
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
            "Content-Type": "application/json",
            "X-Killbill-ApiKey": "tesisreact",
            "X-Killbill-ApiSecret": "tesisreact",
            "X-Killbill-CreatedBy": "subscription", 
        };

        const url = `http://localhost:8080/1.0/kb/accounts?${requestString}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: headers,
                //body: JSON.stringify(requestData),
            });
  
            if (response.ok) {
                console.log("Account loaded successfully");
                const responseData = await response.json();
                console.log("Account:", responseData);
                console.log('Acount Mail:', responseData.email)

                console.log('localStorage', responseData.accountId, responseData.externalKey);

                localStorage.setItem('userID', responseData.accountId);
                localStorage.setItem('userPass', responseData.externalKey)

                if (email === responseData.email){
                    setRedirectToHome(true);
                }
            } else {
                console.error("Failed to load account.");
            }
        } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    if (redirectToHome) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="auth-form-container">
                        
            <div className="login-form">
            <h2>Login</h2>
            <form  onSubmit={handleSubmit}>

                <label htmlFor="email">email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="youremail@gmail.com" 
                    id="email" name="email" 
                />

                <label htmlFor="password">password</label>
                <input 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" placeholder="********" 
                    id="password" 
                    name="password" 
                />

                <button type="submit">Log In</button>
            </form>

            <div id="formFooter">
            <button 
                className="link-btn" 
                onClick={() => props.onFormSwitch('register')}
            >
                Don't have an account? Register here
            </button>
            </div>
            </div>
        </div>
    )
}