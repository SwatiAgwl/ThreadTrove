import React from 'react'

import DonutChart from 'react-donut-chart';




export const Dashboard = () => {

    const data=[
        {
          label: 'Women',
          value: 50,
        },
        {
            label: 'Men',
            value: 30,
          },
        {
          label: 'Brands',
          value: 10,
        },
        {
            label: 'Others',
            value: 10,
          },
      ]
      const colors= [
        'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', '#673ab7'
      ]
      const innerRadius= 0.50;
      const outerRadius= 0.85;
      const clickToggle= false;
      const selectedOffset= false;
    

       
  return (
    <div>
        <div className='py-2 px-4'>
            <h1  className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
            <div className='flex flex-row gap-11 mb-5'>
            <p>Total Products: 100 </p>
            <p>Today Revenue: ₹50,000</p>
            <p>Total Customers: 200</p>
            </div>

            {/* chart- sales */}
            
            {/* pie chart - women,men,brands,sale */}
            {/* <DonutChart data={data} /> */}
            <div className='bg-white px-8 py-6 pb-3 h-content '>
            <p className='text-xl font-semibold mb-4'>Total Sales: </p>
            <DonutChart data={data} colors={colors} innerRadius={innerRadius} outerRadius={outerRadius}
              clickToggle={clickToggle} selectedOffset={selectedOffset} className='w-full h-60'/>
            </div>

        </div>
    </div>
  )
}

