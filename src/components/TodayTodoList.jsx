import React, { useEffect, useState } from 'react';

const TodayTodoList = () => {
    const [goalsData, setGoalsData] = useState([]);
    const [todayList, setTodayList] = useState([]);

    // Function to load data from localStorage
    const loadData = () => {
        const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
        setGoalsData(storedGoals);

        const storedToday = JSON.parse(localStorage.getItem('todayList') || '[]');
        setTodayList(storedToday);
    };

    useEffect(() => {
        loadData();

        // Listen for manual updates triggered by other components
        window.addEventListener("localStorageUpdated", loadData);

        return () => {
            window.removeEventListener("localStorageUpdated", loadData);
        };
    }, []); // Only run once on component mount

    const saveGoalsToLocalStorage = (goals) => {
        localStorage.setItem('goals', JSON.stringify(goals));
        window.dispatchEvent(new Event("localStorageUpdated"));
    };

    const handleCheckboxChange = (goalId, taskId) => {
        const updatedGoals = goalsData.map(goal =>
            goal.id === goalId
                ? {
                    ...goal,
                    todolist: goal.todolist.map(task =>
                        task.taskId === taskId ? { ...task, done: !task.done } : task
                    )
                }
                : goal
        );
        setGoalsData(updatedGoals);
        saveGoalsToLocalStorage(updatedGoals);
    };

    const tasksForToday = todayList.map(({ goalId, taskId }) => {
        const goal = goalsData.find(g => g.id === goalId);
        const task = goal?.todolist.find(t => t.taskId === taskId);
        return task ? { ...task, goalId, goalTitle: goal.title } : null;
    }).filter(Boolean);

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Today's Tasks</h2>
            {tasksForToday.length === 0 ? (
                <p>No tasks selected for today.</p>
            ) : (
                <ul>
                    {tasksForToday.map(task => (
                        <li key={task.taskId} style={{ marginBottom: "10px" }}>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => handleCheckboxChange(task.goalId, task.taskId)}
                            />
                            <span style={{ marginLeft: "10px" }}>
                                {task.text} <em>({task.goalTitle})</em>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodayTodoList;
