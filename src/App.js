import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from
'react-router-dom';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const AppContent = () => {
const navigate = useNavigate();
const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

useEffect(() => {
if (!user && !['/login', '/register'].includes(window.location.pathname)) {
navigate('/login');
}
}, [navigate, user]);

return (
<div className="App">
<Navbar />
<Routes>
<Route path="/login" element={<Login setUser={setUser} />} />
<Route path="/register" element={<Register setUser={setUser} />} />
<Route path="/" element={user ? <TaskList /> : <Navigate to="/login" />}
/>
<Route path="/add" element={user ? <TaskForm /> : <Navigate to="/login"
/>} />
</Routes>
</div>
);
};

function App() {
return (
<Router>
<AppContent />
</Router>
);
}
export default App;