import React from 'react'
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import auth from '../../Auth';
import withAuth from '../../WithAuth';

const Graph2 = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/category`, {
            headers: { "x-auth-token": auth.getToken() }
        })
            .then(response => response.json())
            .then(data => {
                let finalData = [];

                data.forEach(async category => {
                    let tempData = [];
                    tempData.push(category.name);
                    tempData.push(category.totalAmountInside);
                    finalData.push(tempData);
                });
                // console.log(finalData);
                setData(finalData);
            });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const chartData = [['Category Name', 'Total Amount']].concat(data);
    const options = {

        title: 'Total Amount present in category',

        bars: 'horizontal',
        is3D: true,
        axes: {
            x: {
                0: {
                    side: 'top'
                }
            }
        },
        bar: { groupWidth: "90%" }
    };

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={chartData}
                options={options}
                width="100%"
                height="400px"
                legendToggle

            />
        </div>
    )
}

export default withAuth(Graph2);