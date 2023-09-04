import React from 'react'
import { BarChart, ResponsiveContainer, Bar, Tooltip } from 'recharts'
import './barChartBox.css'

const BarChartBox = (props) => {
  return (
    <div className='barChartBox'>
      <h1 className='title'>{props.title}</h1>
      <div className='chart'>
        <ResponsiveContainer width='99%' height={150}>
          <BarChart data={props.chartData}>
          <Tooltip
            contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
            labelStyle={{ display: "none" }}
            cursor={{fill:"none"}}/>
            <Bar dataKey={props.dataKey} fill={props.color}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartBox