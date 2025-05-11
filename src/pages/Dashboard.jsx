import React, { useState, useEffect } from 'react';
import GoalsTable from '../components/GoalsTable';
import TodayTodoList from '../components/TodayTodoList';
import { completedGoals, statusGoals } from '../lib/utils';
import Chart from "chart.js/auto";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale
} from 'chart.js';
import PieChart from '../components/PieChart.jsx';
import { useGoals } from '../GoalsContext.jsx';
import Quote from '../components/Quote.jsx';
// import AppCalendar from '../components/AppCalendar.jsx';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const Dashboard = () => {
    const { goals } = useGoals();
    const [chartData, setChartData] = useState(null);

    const totalGoals = goals.length;
    const completed = goals.filter(goal => completedGoals(goal.todolist)).length;
    const pending = totalGoals - completed;

    const notstarted = goals.filter(goal => statusGoals(goal.todolist) === 'Not Started').length;
    const onGoing = goals.filter(goal => statusGoals(goal.todolist) === 'Ongoing').length;

    useEffect(() => {
        if (goals.length === 0) return;

        setChartData({
            labels: ['Completed', 'Not Started', 'Ongoing'],
            datasets: [
                {
                    label: "Goals",
                    data: [completed, notstarted, onGoing],
                    backgroundColor: [
                        "#3cf536",
                        "#9dbbf5",
                        "#1c62e6"
                    ],
                    borderColor: "black",
                    borderWidth: 0
                }
            ]
        });
    }, [goals, completed, notstarted, onGoing]);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 '>
            <div className='bg-primary-foreground p-4 rounded-lg col-span-4 row-span-10 flex flex-wrap items-center'>
                <div><Quote /></div>
            </div>

            <div className='bg-primary-foreground p-4 rounded-lg col-span-4 sm:col-span-2 md:col-span-1'>
                <h3 className='font-bold'>TOTAL GOALS</h3>
                <div className='m-2 p-2 text-xl lg:text-4xl text-blue-600 flex flex-row justify-center items-center'>
                    {totalGoals}
                </div>
            </div>

            <div className='bg-primary-foreground p-4 rounded-lg col-span-4 sm:col-span-2 md:col-span-1'>
                <h3 className='font-bold'>COMPLETED GOALS</h3>
                <div className='m-2 p-2 text-xl lg:text-4xl text-blue-600 flex flex-row justify-center items-center'>
                    {completed}
                </div>
            </div>

            <div className='bg-primary-foreground p-4 rounded-lg col-span-4 sm:col-span-2 md:col-span-1'>
                <h3 className='font-bold'>REMAINING GOALS</h3>
                <div className='m-2 p-2 text-xl lg:text-4xl text-blue-600 flex flex-row justify-center items-center'>
                    {pending}
                </div>
            </div>

            <div className='bg-primary-foreground p-4 rounded-lg col-span-4 sm:col-span-2 md:col-span-1'>
                <h3 className='font-bold'>UPCOMING TARGET DATE</h3>
                <div className='m-2 p-2 text-xl lg:text-4xl text-blue-600 flex flex-row justify-center items-center'>
                    {goals.length}
                </div>
            </div>
            <div className='bg-primary-foreground p-4 rounded-lg col-span-3'>
                <GoalsTable />
            </div>

            <div className='bg-primary-foreground p-4 rounded-lg col-span-4  md:col-span-1'>
                <h4>Today Todo</h4>
                <TodayTodoList />
            </div>
            <div className='bg-primary-foreground p-4 rounded-lg col-span-4 sm:col-span-2'>
                {chartData ? <PieChart chartData={chartData} /> : <p>Loading chart...</p>}
            </div>

            

            

            
        </div>
    );
}

export default Dashboard;
