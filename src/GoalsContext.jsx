
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const GoalsContext = createContext();

// Custom hook to use the context
export const useGoals = () => {
    return useContext(GoalsContext);
};

// Provider component
export const GoalsProvider = ({ children }) => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
        setGoals(storedGoals);
    }, []);

    // Function to update goals (for adding, editing, etc.)
    const updateGoals = (newGoals) => {
        setGoals(newGoals);
        localStorage.setItem('goals', JSON.stringify(newGoals));
    };

    return (
        <GoalsContext.Provider value={{ goals, updateGoals }}>
            {children}
        </GoalsContext.Provider>
    );
};
