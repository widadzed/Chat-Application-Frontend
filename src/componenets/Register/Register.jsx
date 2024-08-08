import React, {useState} from 'react'
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'src/services/api/AuthService';

const Register = ({setLoggedIn, setToken, setCurrentUser, setCurrentUsername}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault()
      AuthService.register(username, email, password)
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
    <div id='register-component'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register