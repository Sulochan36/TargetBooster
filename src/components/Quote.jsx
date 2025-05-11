import React, { useEffect, useState } from 'react';

const Quote = () => {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        fetch('/quotes.json')
            .then((res) => res.json())
            .then((data) => {
                const randomIndex = Math.floor(Math.random() * data.quotes.length);
                setQuote(data.quotes[randomIndex]);
            })
            .catch((err) => console.error('Error fetching quotes:', err));
    }, []);

    if (!quote) return <div>Loading...</div>;

    return (
        <div className='sm:2xl md:text-4xl m-2 text-left font-bold '>
            <p className='text-green-500'>"{quote}"</p>
            
        </div>
    );
};

export default Quote;
