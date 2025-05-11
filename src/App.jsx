import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals.jsx';
import Layout from './Layout/layout.jsx';
import TodoLists from './pages/TodoLists.jsx';
import Notes from './pages/Notes.jsx';
import { GoalsProvider } from './GoalsContext';


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='/goals' element={<Goals/>} />
        <Route path='/notes' element={<Notes/>} />
        <Route path='/todolists' element={<TodoLists/>} />
      </Route>
    )
  )


  return (
    <GoalsProvider>
      <RouterProvider router={router} />
    </GoalsProvider>
    
  )
}

export default App