import React, { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'src/services/api/AuthService';

const Login = ({setLoggedIn, setToken, setCurrentUser, setCurrentUsername}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        AuthService.login(email, password)
        .then(response => {
            if (response.success) {
                setLoggedIn(true);
                setToken(response.token)
                setCurrentUser(response.id)
                setCurrentUsername(response.username)
                navigate('/chat');
            }
        })
    }
    return (
        <div id='login-component'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login