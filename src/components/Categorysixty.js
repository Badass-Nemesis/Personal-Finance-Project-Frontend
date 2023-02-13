import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';

export default function SimpleAccordion() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/Category/60')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);


    const handleRemove = async (nam, ref) => {

        // console.log(nam)
        const data = {
            name: nam,
            transactions: ref
        };
        // console.log(data);
        await axios.delete('http://localhost:5000/api/category/deleteTransaction', { data });
        // console.log(res)
        window.location.reload()
    };


    const handleRemoveCategory = async (nam) => {

        // console.log(nam)
        const data = {
            name: nam
        };
        // console.log(data);
        await axios.delete('http://localhost:5000/api/category/deleteCategory', { data });
        // console.log(res)
        window.location.reload()
    };



    return (
        <div>

            {data.map(item => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <tr >
                            <td >
                                <Typography>{item.name}</Typography>
                            </td>
                            <td style={{paddingLeft:'1400px'}}>
                                <Typography>
                                <button onClick={() => handleRemoveCategory(item.name)}><DeleteIcon /></button>
                                    </Typography>
                            </td>

                        </tr>
                        
                        
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {/* <div key={item.id}>
                                <h2>{item.name}</h2>
                                <p>{item.totalAmountInside}</p>
                            </div> */}
                            <Table striped bordered hover variant="dark" responsive="sm">
                                <tr>
                                    <th>Amount</th>
                                    <th>Date And Time</th>
                                    <th>Reference Number</th>
                                    <th>To</th>
                                    <th>From</th>
                                    <th>Available Balance</th>
                                    <th>Delete</th>
                                </tr>
                                {item.transactions.map(transaction => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{transaction.amount}</td>
                                                <td>{moment.utc(transaction.dateAndTime).local().format('YYYY-MM-DD HH:mm:ss')}</td>
                                                <td>{transaction.referenceNumber}</td>
                                                <td>{transaction.beneficiaryName}</td>
                                                <td>{transaction.remitterName}</td>
                                                <td>{transaction.availableBalance}</td>
                                                <td><button onClick={() => handleRemove(item.name, transaction._id)}><DeleteIcon /></button></td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </Table>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))
            }
        </div >
    );
}