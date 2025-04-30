import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
const user = JSON.parse(localStorage.getItem('user'));

return (
<nav className="navbar">
<h1>Task Manager</h1>
<div className="links">
{user ? (
<>
<Link to="/">Home</Link>
<Link to="/add">Add Task</Link>
<button onClick={() => {
localStorage.removeItem('user');
window.location.reload();
}}>Logout</button>
</>
) : (
<>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
</>
)}
</div>
</nav>
);
};

export default Navbar;