import React from 'react'
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
// import Dropdown from './Dropdown'
/*aslint-disable react-hook/exhaustive-deps*/


const Graph1 = () => {
    const [endpoint, setEndpoint] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/category/${endpoint}`, {
            headers: { "x-auth-token": process.env.REACT_APP_TOKEN }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                let finalData = [];
                data.forEach(async category => {
                    let tempData = [];
                    tempData.push(category.name);
                    tempData.push(category.transactions.length);
                    tempData.push(category.totalAmountInside);
                    finalData.push(tempData);
                });
                // console.log(finalData);
                setData(finalData);
            });
    }, [endpoint]);

    function handleCategoryChange(event) {
        setEndpoint(event.target.value);
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    const chartData = [['Category Name', 'Total Transactions', 'Total Amount']].concat(data);
    const options = {
        title: 'Total Amount + Total Transactions',

        bars: 'horizontal',
        axes: {
            x: {
                0: {
                    side: 'top',
                }
            }
        },
        bar: { groupWidth: "90%" }
    };
    // console.log(data);
    // console.log(`${process.env.REACT_APP_BASE_URL}api/category`);

    return (
        <div>
            <div>
                Dropdown For You Wish :
                <select value={endpoint} onChange={handleCategoryChange}>
                    <option>Select</option>
                    <option value="">All</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="180">180</option>
                    <option value="360">360</option>
                </select>
            </div>
            <Chart
                chartType="BarChart"
                data={chartData}
                options={options}
                width="100%"
                height="400px"
                legendToggle
            />
        </div>
    )
}

export default Graph1