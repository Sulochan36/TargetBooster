import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import TodayTodoList from './TodayTodoList';

const TodoListCard = () => {
    // State to manage goals and their todolist data
    const [goalsData, setGoalsData] = useState([]);
    const [editingLabel, setEditingLabel] = useState(null);
    const [todayList, setTodayList] = useState([]);


    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
        setGoalsData(storedGoals);

        const storedToday = JSON.parse(localStorage.getItem('todayList') || '[]');
        setTodayList(storedToday);
    }, []);

    const saveGoalsToLocalStorage = (goals) => {
        localStorage.setItem('goals', JSON.stringify(goals));
        window.dispatchEvent(new Event("localStorageUpdated")); 
    };


    // Handle checkbox change (toggling done state)
    const handleCheckboxChange = (goalId, taskId) => {
        setGoalsData(prevData => {
            const updatedGoals = prevData.map(goal =>
                goal.id === goalId
                    ? {
                        ...goal,
                        todolist: goal.todolist.map(task =>
                            task.taskId === taskId
                                ? { ...task, done: !task.done } // Toggle the 'done' status
                                : task
                        )
                    }
                    : goal
            );
            saveGoalsToLocalStorage(updatedGoals); // Save the updated goals to localStorage
            return updatedGoals; // Return the updated state
        });
    };

 
    const handleLabelChange = (event, goalId, taskId) => {
        const newLabel = event.target.value;
        setGoalsData(prevData => {
            const updatedGoals = prevData.map(goal =>
                goal.id === goalId
                    ? {
                        ...goal,
                        todolist: goal.todolist.map(task =>
                            task.taskId === taskId ? { ...task, text: newLabel } : task
                        )
                    }
                    : goal
            );
            saveGoalsToLocalStorage(updatedGoals); // Save the updated goals to localStorage
            return updatedGoals; // Return the updated state
        });
    };
    // Start editing a label
    const startEditing = (goalId, taskId) => {
        setEditingLabel({ goalId, taskId });
    };

    // Stop editing label when input loses focus
    const stopEditing = () => {
        setEditingLabel(null);
    };

    const toggleTaskInTodayList = (goalId, taskId) => {
        setTodayList(prev => {
            const exists = prev.some(t => t.goalId === goalId && t.taskId === taskId);
            const updated = exists
                ? prev.filter(t => !(t.goalId === goalId && t.taskId === taskId))
                : [...prev, { goalId, taskId }];
            localStorage.setItem('todayList', JSON.stringify(updated));
            window.dispatchEvent(new Event("localStorageUpdated"));
            return updated;
        });
    };


    return (
        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5'>
            <TodayTodoList/>
            {goalsData.map(goal => (
                <Card key={goal.id}>
                    <CardHeader>
                        <CardTitle className='text-3xl underline'>{goal.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            {goal.todolist.map(task => (
                                <li key={task.taskId} style={{ marginBottom: "10px" }}>
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={() => handleCheckboxChange(goal.id, task.taskId)} // Ensure only the correct checkbox is toggled
                                    />
                                    {editingLabel?.goalId === goal.id && editingLabel?.taskId === task.taskId ? (
                                        <input
                                            type="text"
                                            value={task.text}
                                            onChange={(e) => handleLabelChange(e, goal.id, task.taskId)}
                                            onBlur={stopEditing}
                                            autoFocus
                                            style={{ margin: "10px" }}
                                        />
                                    ) : (
                                        <label
                                            htmlFor={task.taskId}
                                            onClick={() => startEditing(goal.id, task.taskId)}
                                            style={{ cursor: "pointer", margin: "10px" }}
                                        >
                                            {task.text}
                                        </label>
                                        
                                    )}

                                    <button className=' p-2 text-[12px] rounded-3xl underline hover:cursor-pointer hover:text-blue-500' onClick={() => toggleTaskInTodayList(goal.id, task.taskId)}>
                                        {todayList.some(t => t.goalId === goal.id && t.taskId === task.taskId) ? 'X Remove from Today' : '+ Add to Today'}
                                    </button>

                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {/* <p>Card Footer</p> */}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default TodoListCard;
