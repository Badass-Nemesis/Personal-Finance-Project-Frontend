import React from 'react'
import Graph1 from './Graphs/Graph1'
import Graph2 from './Graphs/Graph2'
import Graph3 from './Graphs/Graph3'

import '../App.css';


const Home = () => {
    return (<>
        <div className='graph1'>
            <Graph1 />
        </div>
        <div className='graph2'>
            <Graph2 />
        </div>
        <div className='graph3'>
            <Graph3 />
        </div>
    </>
    )
}

export default Home
