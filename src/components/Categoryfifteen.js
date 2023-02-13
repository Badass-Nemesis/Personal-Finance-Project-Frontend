import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'

export default function SimpleAccordion() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/Category/15')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>

            {data.map(item => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{item.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {/* <div key={item.id}>
                                <h2>{item.name}</h2>
                                <p>{item.totalAmountInside}</p>
                            </div> */}
                            <Table striped bordered hover variant="dark" responsive="sm">
                                <tr>
                                    <th>Name</th>
                                    <th>Total Amount</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.totalAmountInside}</td>
                                    </tr>
                                </tbody>

                            </Table>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}