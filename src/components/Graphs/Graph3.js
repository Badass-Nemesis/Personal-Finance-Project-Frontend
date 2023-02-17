import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment';
import auth from '../../Auth';
import withAuth from '../../WithAuth';

function App() {
    const [catName, setCatName] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/category/1`, {
            headers: { "x-auth-token": auth.getToken() }
        })
            .then(response => response.json())
            .then(data => {
                let finalCatNames = [];
                finalCatNames.push("categories");
                data.forEach(async category => {
                    finalCatNames.push(category.name);
                });
                // console.log(finalCatNames);
                setCatName(finalCatNames);
            });


        let currMonth = moment().month();
        fetch(`${process.env.REACT_APP_BASE_URL}api/category/get/threemonths`, {
            headers: { "x-auth-token": auth.getToken() }
        })
            .then(response => response.json())
            .then(data => {
                let finalData = [];

                data.forEach(async tempTempData => {
                    let tempFinal = [];
                    tempFinal.push(moment().month(currMonth).format('MMMM'));
                    if (currMonth === 0) {
                        currMonth = 11;
                    } else {
                        currMonth--;
                    }

                    tempTempData.forEach(async category => {
                        tempFinal.push(category.totalAmountInside);
                    });

                    // tempFinal.push('');
                    finalData.push(tempFinal);
                })
                // console.log(finalData);
                setData(finalData);
            });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    let graph3 = [];
    graph3.push(catName);
    const chartData = graph3.concat(data);
    // console.log(chartData)
    const options = {
        title: "Total Amount in Category Monthwise",
        chartArea: { width: "50%" },
        isStacked: true,
        hAxis: {
            title: "Total Amounts",
            minValue: 0,
        },
        vAxis: {
            title: "Months",
        },
    }; return (
        <Chart
            chartType="BarChart"
            data={chartData}
            options={options}
            width="100%"
            height="400px"
            legendToggle
        />
    );
}

export default withAuth(App);