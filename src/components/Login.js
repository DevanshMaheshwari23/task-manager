import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('http://localhost:5001/api/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
});

const data = await response.json();
if (response.ok) {
localStorage.setItem('user', JSON.stringify(data.user));
window.location.href = '/';
} else {
setError(data.message);
}
} catch (err) {
setError('Failed to login');
}
};

return (
<div className="auth-form">
<h2>Login</h2>
{error && <p className="error">{error}</p>}
<form onSubmit={handleSubmit}>
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
<button type="submit">Login</button>
</form>
<p>Don't have an account? <button onClick={() =>
navigate('/register')}>Register</button></p>
</div>
);
};

export default Login;