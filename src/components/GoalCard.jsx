import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star } from 'lucide-react'
import AddGoalForm from './AddGoalForm';
import { statusGoals } from '../lib/utils'


const GoalCard = () => {

    const [goals, setGoals] = useState([]);
    const [editingGoal, setEditingGoal] = useState(null);
    

    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
        setGoals(storedGoals);
    }, []);

    const deleteGoal = (goalId) => {
        const updatedGoals = goals.filter(goal => goal.id !== goalId);
        setGoals(updatedGoals);
        localStorage.setItem('goals', JSON.stringify(updatedGoals)); 
    };

    const editGoal = (goalId) =>{
        const goalToEdit = goals.find(goal => goal.id === goalId);
        setEditingGoal(goalToEdit); 
    }

    const calculateProgress = (todolist) => {
        const totalTasks = todolist.length;
        const completedTasks = todolist.filter(task => task.done).length;
        return (completedTasks / totalTasks) * 100;
    };

    const handleGoalUpdate = (updatedGoal) => {
        // Update the goal in the localStorage and state
        const updatedGoals = goals.map(goal =>
            goal.id === updatedGoal.id ? updatedGoal : goal
        );
        setGoals(updatedGoals);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
        setEditingGoal(null); // Close the edit form after updating
    };

    return (
        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5'>
            {goals.map((goal)=>(
                <Card key={goal.id}>

                    <CardHeader>
                        <div className='flex flex-row justify-center items-center gap-5 mb-5'>
                            <CardTitle className='text-4xl font-extrabold underline'>{goal.title}</CardTitle>
                            <Badge variant="default">{statusGoals(goal.todolist)}</Badge>
                        </div>
                        <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className='flex flex-col md:flex-row gap-3 items-center justify-between m-3'>
                            <p>Start Date : {goal.startDate}</p>
                            <p>Target Date : {goal.targetDate}</p>
                        </div>
                        <div className='m-2 border-2 p-4 font-extrabold text-xl'>
                            <p className='flex flex-row flex-nowrap gap-2 items-center'><Star />  Purpose : {goal.purpose}</p>
                        </div>
                        <div className='flex flex-col m-5 gap-3'>
                            <p className='font-bold'>Progress : {`${Math.round(calculateProgress(goal.todolist))}%`}</p>
                            <Progress className='' value={calculateProgress(goal.todolist)} />
                        </div>

                    </CardContent>
                    <CardFooter className='flex flex-col flex-wrap gap-4 justify-center items-center'>
                        <div >
                            <Button link='/todolists'>Check The ToDo List for this Goal</Button>
                            <div className='flex flex-row flex-wrap gap-5 my-4 justify-center'>
                                
                                
                                    <AddGoalForm
                                        goal= {goal}
                                        onGoalUpdate={handleGoalUpdate} // Pass the update handler
                                    />
                                    
                                <Button className='bg-red-500' onClick={() => deleteGoal(goal.id)}>Delete Goal</Button>
                            </div>

                        </div>

                    </CardFooter>
                </Card>
            ))}
            
            
            
        </div>
    )
}

export default GoalCard