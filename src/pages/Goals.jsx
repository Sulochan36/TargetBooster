import React from 'react'
import GoalCard from '../components/GoalCard'
import AddGoalForm from '../components/AddGoalForm'

const Goals = () => {
  console.log(localStorage.getItem('goals'));
  return (
    <div>
      <h2 className='text-4xl flex justify-center items-center' >GOALS</h2>
      <AddGoalForm/>
      <div>
        
        
        <GoalCard/>
      </div>
    </div>
  )
}

export default Goals