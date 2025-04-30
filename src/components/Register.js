import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('http://localhost:5001/api/auth/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, email, password })
});

const data = await response.json();
if (response.ok) {
localStorage.setItem('user', JSON.stringify(data.user));
navigate('/');
} else {
setError(data.message);
}
} catch (err) {
setError('Failed to register');
}
};

return (
<div className="auth-form">
<h2>Register</h2>
{error && <p className="error">{error}</p>}
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button type="submit">Register</button>
</form>
<p>Already have an account? <button onClick={() =>
navigate('/login')}>Login</button></p>
</div>
);
};

export default Register;