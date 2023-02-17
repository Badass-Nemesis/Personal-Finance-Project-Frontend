import React from 'react';
import Graph1 from './Graphs/Graph1';
import Graph2 from './Graphs/Graph2';
import Graph3 from './Graphs/Graph3';
import withAuth from '../WithAuth';
import '../App.css';
import Chatbot from './Chatbot/Chatbot';
// import Button from './Chatbot/Button';
import Topseven from './Topseven';


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
        <div className='heading'>
        <h2>Recent Transactions</h2>

        </div>
        <div>
            <Topseven />
        </div>
        <div className='fixedbutton'>
            {/* <Button /> */}
            <Chatbot />
        </div>
    </>
    )
}

export default withAuth(Home);
