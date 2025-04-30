import React, { useState } from "react";

const TaskForm = () => {
const [title, setTitle] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();
try {
const user = JSON.parse(localStorage.getItem('user'));
const response = await fetch('http://localhost:5001/api/tasks', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
title,
userId: user.id
})
});

if (!response.ok) throw new Error('Failed to add task');

setTitle('');
window.location.href = '/'; // Refresh task list
} catch (err) {
console.error('Error:', err);
}
};

return (
<div className="task-form">
<h2>Add New Task</h2>
<form onSubmit={handleSubmit}>
<input

type="text"
placeholder="Task Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
/>
<button type="submit">Add Task</button>
</form>
</div>
);
};

export default TaskForm;