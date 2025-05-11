import React from 'react'
import { Pie } from 'react-chartjs-2';

const PieChart = ({chartData}) => {
    return (
        <div className="chart-container h-auto w-[450px]">
            <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Status of Goals"
                        }
                    }
                }}
            />
        </div>
    );
}


export default PieChart