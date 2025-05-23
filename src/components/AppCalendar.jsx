import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"

const AppCalendar = () => {
    const [date, setDate] = useState(new Date())

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
        />
    )
}

export default AppCalendar;