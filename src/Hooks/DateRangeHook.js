import React, { useEffect, useState } from 'react'

export default function DateRangeHook() {


    const dt = new Date()

    const [date, setDate] = useState([
        new Date(`${dt.getFullYear()}-01-01`),
        new Date(dt.toISOString()),
    ]);


    const [range, setRange] = useState(null)

    // useEffect(() => {

    //     if (date[0] && date[1]) {
    //       // console.log('Date Range', date)
    //       setRange(date)
    //     }

    //   }, [date])

    const handleDateChange = (date) => {
        if (date[0] && date[1]) {
            console.log('Date Range', date)
            setDate(date)
        }
    }


    return { date, handleDateChange }
}
