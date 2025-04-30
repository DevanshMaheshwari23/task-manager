import React, { useState, useEffect } from "react";

const TaskList = () => {
const [tasks, setTasks] = useState([]);

// Fetch tasks from backend
const fetchTasks = async () => {
try {
const user = JSON.parse(localStorage.getItem('user'));
const response = await
fetch(`http://localhost:5001/api/tasks?userId=${user.id}`);

const data = await response.json();
setTasks(data);
} catch (err) {
console.error('Error fetching tasks:', err);
}
};

useEffect(() => {
fetchTasks();
}, []);

// Toggle task completion status
const toggleComplete = async (taskId) => {
try {
const user = JSON.parse(localStorage.getItem('user'));
const response = await
fetch(`http://localhost:5001/api/tasks/${taskId}/complete`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ userId: user.id })

});

if (!response.ok) throw new Error('Failed to update task');

// Refresh the task list
fetchTasks();
} catch (err) {
console.error('Error:', err);
}
};

return (
<div className="task-list">
<h2>Tasks</h2>
{tasks.map((task) => (
<div key={task._id} className="task">
<h3>{task.title}</h3>
<p
onClick={() => toggleComplete(task._id)}
style={{ cursor: 'pointer' }}
>

{task.completed ? "✅ Done" : "❌ Pending"}
</p>
</div>
))}
</div>
);
};

export default TaskList;