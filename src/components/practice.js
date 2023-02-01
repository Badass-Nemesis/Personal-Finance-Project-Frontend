<div class="navbar">
    <a>Home</a>
    <a>News</a>
    <div class="dropdown">
        <button class="dropbtn">Dropdown
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
    </div>
</div>



///time and date

import moment from 'moment';

const localTime = moment.utc(post.dateAndTime).local().format('YYYY-MM-DD HH:mm:ss');

<div>{localTime}</div>

//fetching data on button clicing

import { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://reqres.in/api/users', {
                headers: {
                    Accept: 'application/json',
                },
            });

            console.log('data is: ', JSON.stringify(data, null, 4));

            setData(data);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(data);

    return (
        <div>
            {err && <h2>{err}</h2>}

            <button onClick={handleClick}>Fetch data</button>

            {isLoading && <h2>Loading...</h2>}

            {data.data.map(person => {
                return (
                    <div key={person.id}>
                        <h2>{person.email}</h2>
                        <h2>{person.first_name}</h2>
                        <h2>{person.last_name}</h2>
                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default App;

//In React, you can call an API in response to a button click by using a function that triggers the API
//  call and passing that function as a callback to the button's onClick event. Here's an example 
//  using the fetch API:

import React, { useState } from 'react';

function MyComponent() {
    const [post, setPost] = useState(null);

    async function handleClick() {
        const response = await fetch('http://localhost:5000/api/transactions/categoryName');
        const json = await response.json();
        setPost(json);
    }

    return (
        <div>
            <button onClick={handleClick}>A</button>
            {JSON.stringify(post)}
        </div>
    );
}

// To send data to an API using React, you can make a HTTP request using a library such as fetch, axios, or jquery. 
// Here's an example using the fetch API:

import React, { useState } from 'react';

function MyComponent() {
    const [post, setPost] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('https://api.example.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post })
        });
        const json = await response.json();
        console.log(json);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={post} onChange={event => setPost(event.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
}


//Category

const [selectedName, setSelectedName] = useState({selectedName:[]});

const handleChange = (event) => {
    setSelectedName(event.target.value);
};

const handleSubmit = async () => {
    try {
        const response = await fetch("https://your-api-endpoint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: selectedName, objectId: "123" }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

//

<ExpandMoreIcon />