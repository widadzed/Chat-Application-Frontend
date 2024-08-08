import React, { useState } from 'react'
import './Auth.scss'
import { Login, Register } from 'src/componenets';


const Auth = ({setLoggedIn, setToken, setCurrentUser, setCurrentUsername}) => {
    const [operation, setOperation] = useState('login');
    return (
        <div id='auth-page'>
            <div id='auth-container'>
                {operation === "login" 
                ? <Login setLoggedIn={setLoggedIn} setToken={setToken} setCurrentUser={setCurrentUser} setCurrentUsername={setCurrentUsername}/> 
                : <Register setLoggedIn={setLoggedIn} setToken={setToken} setCurrentUser={setCurrentUser} setCurrentUsername={setCurrentUsername}/>}
                {
                    operation === "login"
                    ?
                    <p>Don't have an account ? <span onClick={() => setOperation("register")}>register</span></p>
                    :
                    <p>Already have an account ? <span onClick={() => setOperation("login")}>login</span></p>
                }
            </div>
        </div>
    )
}

export default Auth