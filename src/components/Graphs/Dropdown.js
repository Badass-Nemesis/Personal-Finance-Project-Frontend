import React, { useEffect, useState } from 'react'

const Dropdown = () => {
    const [graph1 , setGraph1] = useState(null);
    const handleCategoryChange = (event) => {
        setGraph1(event.target.value);
    };

    useEffect(() => {
        
            fetch(`http://localhost:5000/api/category/${graph1}`)
            .then((response) => response.json())
            .then((graph1) =>{
                //
            })
            .catch((error) => {
                //
            });
        
    },[setGraph1])
    return (

        <div>
            <select value={graph1} onChange={handleCategoryChange}>
                <option value="">Category</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="180">180</option>
                <option value="360">360</option>
            </select>
        </div>
    )
}

export default Dropdown
