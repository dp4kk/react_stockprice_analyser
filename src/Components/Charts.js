import React from 'react'
import {Line} from 'react-chartjs-2'
import '../App.css'
const Charts = (props) => {
    const {date,low,high,open,close}=props
    const data = {
      labels:date,
      datasets: [
        {
          label: "low price",
          data: low,
          backgroundColor: "rgba(255, 115, 106, 0.2)",
          borderColor: "rgba(255, 115, 106, 0.5)",
          pointBackgroundColor: "rgba(112, 115, 106, 0.5)",
          pointBorderColor: "rgba(112, 115, 106, 0.5)",
        },
        {
          label: "high price",
          data: high,
          backgroundColor: "rgba(50, 255, 53, 0.2)",
          borderColor: "rgba(50,255,53,0.5)",
        },
        {
          label: "opening price",
          data: open,
          backgroundColor: "rgba(255, 52, 53, 0.2)",
          borderColor: "rgba(255, 52, 53, 0.5)",
        },
        {
          label: "closing price",
          data: close,
          backgroundColor: "rgba(50, 50, 255, 0.2)",
          borderColor: "rgba(50, 50, 255, 0.5)",
        },
      ],
    };
    const options={
        title:{
            display:true,
            text:`Line chart for Stock Prices($) ` 
        }
    }
    return (
        <div className='App'>
        <div className='chart'>
        <Line data={data} options={options}/>
        </div>
        </div>
    )
}

export default Charts
