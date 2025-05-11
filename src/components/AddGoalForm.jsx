import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Define the form schema with todolist as an array of objects containing text and done state
const formSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    startDate: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    targetDate: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    description: z.string().min(1, 'Description is required'),
    purpose: z.string().min(1, 'Purpose is required'),
    todolist: z.array(z.object({
        taskId:z.string(),
        text: z.string().min(1, 'Activity text is required'),
        done: z.boolean(),
    })).min(1, 'At least one activity is required'), // Activities validation
});

const AddGoalForm = ({ goal, onGoalUpdate }) => {
    const [activityText, setActivityText] = useState('');
    const activityInputRef = useRef(null); // Create a reference for the activity input

    // Use react-hook-form for form handling
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: goal || {
            title: '',
            startDate: '',
            targetDate: '',
            description: '',
            purpose: '',
            todolist: [], // Initialize todolist as an empty array
        },
    });

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: 'todolist', // Todolist field name in form
    });

    const handleCheckboxChange = (index) => {
        const updatedTodolist = [...form.getValues('todolist')];
        updatedTodolist[index].done = !updatedTodolist[index].done;
        form.setValue('todolist', updatedTodolist);
    };

    const handleActivityChange = (e, index) => {
        const updatedTodolist = [...form.getValues('todolist')];
        updatedTodolist[index].text = e.target.value;
        form.setValue('todolist', updatedTodolist);
    };

    const handleActivitySubmit = () => {
        const newTask = {
            taskId: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,  // Generate a unique taskId
            text: activityText,
            done: false,
        };
        append(newTask);
        setActivityText('');
        activityInputRef.current.focus(); // Retain focus on the input after adding the activity
    };

    const onSubmit = (values) => {

        if (goal) {
            // If editing, update the existing goal
            const updatedGoal = {
                ...goal,
                ...values,
                status: goal.status, // Keep the same status as before
            };
            onGoalUpdate(updatedGoal); // Pass the updated goal to parent
        } 
        
        else {
            const newGoal = {
                id: `goal-${Date.now()}`,
                title: values.title,
                startDate: values.startDate,
                targetDate: values.targetDate,
                description: values.description,
                purpose: values.purpose,
                status: 'Ongoing',
                todolist: values.todolist,
                activity: [],
            };

            const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
            existingGoals.push(newGoal);
            localStorage.setItem('goals', JSON.stringify(existingGoals));

            form.reset();
        }
        
    };

    return (
        <Dialog className='max-h-[560px] overflow-y-scroll'>
            
            <DialogTrigger asChild>
                <Button variant="outline">
                    {goal ? 'Edit Goal' :'Add Goal'}
                    
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:min-w-4xl my-4 max-h-[90vh] overflow-y-auto border-4 flex flex-col gap-4 p-6">

                
                    <h2 className='text-3xl font-bold'>Add Goal</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col flex-wrap justify-center">
                    {/* Goal Title */}
                    <div className='flex items-center gap-x-8 '>
                        <label htmlFor="title">Goal Title</label>
                        <input className='border-2 p-2 rounded-2xl w-xl' type="text" id="title" {...form.register('title')} />
                    </div>


                    <div className='flex flex-col md:flex-row flex-wrap gap-10 justify-between items-center '>
                        {/* Start Date */}
                        <div className='flex items-center gap-x-8'>
                            <label htmlFor="startDate">Start Date</label>
                            <input className='border-2 p-2 rounded-2xl text-primary' type="date" id="startDate" {...form.register('startDate')} />
                        </div>
                        {/* Target Date */}
                        <div className='flex items-center gap-x-8'>
                            <label htmlFor="targetDate">Target Date</label>
                            <input className='border-2 p-2 rounded-2xl text-primary' type="date" id="targetDate" {...form.register('targetDate')} />
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className='flex items-center gap-x-8'>
                        <label htmlFor="description">Description</label>
                        <textarea cols={80} rows={7} className='border-2' id="description" {...form.register('description')} />
                    </div>
                    {/* Purpose */}
                    <div className='flex items-center gap-x-8'>
                        <label htmlFor="purpose">Purpose</label>
                        <textarea cols={80} rows={4} className='border-2' id="purpose" {...form.register('purpose')} />
                    </div>
                    {/* Todolist (Activities) */}
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="todolist">Todolist</label>
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-2">
                                <input
                                    className='border-2'
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <input
                                    className='border-2 p-2 rounded-2xl'
                                    type="text"
                                    placeholder="Add activity"
                                    value={item.text}
                                    onChange={(e) => handleActivityChange(e, index)}
                                />
                                <Button type="button" onClick={() => remove(index)} className='bg-red-600 text-white cursor-pointer'>
                                    X
                                </Button>
                            </div>
                        ))}
                        <div className="flex items-center space-x-2">
                            <input
                                className='border-2 p-2 rounded-2xl text-primary'
                                ref={activityInputRef}
                                type="text"
                                placeholder="Add new activity"
                                value={activityText}
                                onChange={(e) => setActivityText(e.target.value)}
                            />
                            <Button className='bg-green-700 text-black cursor-pointer' type="button" onClick={handleActivitySubmit}>
                                Add Activity
                            </Button>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <Button className='bg-green-500 text-black font-bold cursor-pointer ' type="submit">{goal ? 'Update Goal' : 'Add Goal'}</Button>
                </form>
                
            </DialogContent>
        </Dialog>
    );
};

export default AddGoalForm;
