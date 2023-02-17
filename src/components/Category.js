import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Categoryform from './Categoryform';
import auth from '../Auth';
import withAuth from '../WithAuth';


function SimpleAccordion() {

    const [endpoint, setEndpoint] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/category/${endpoint}`, {
            headers: { "x-auth-token": auth.getToken() }
        })
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [endpoint]);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleRemove = async (nam, ref) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}api/category/deleteTransaction`,
            {
                headers: { "x-auth-token": auth.getToken() },
                data: {
                    name: nam,
                    transactions: ref
                }
            });
        // console.log(res)
        window.location.reload();
    };


    const handleRemoveCategory = async (nam) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}api/category/deleteCategory`,
            {
                headers: { "x-auth-token": auth.getToken() },
                data: {
                    name: nam
                }
            });
        // console.log(res)
        window.location.reload();
    };

    function handleCategoryChange(event) {
        setEndpoint(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Add transaction Page

    const handleClose = () => {
        setOpen(false);
    };

    const [drawer, setDrawer] = React.useState(false);

    const handleClickOpenDrawer = () => {
        setDrawer(true);
    };

    const handleCloseDrawer = () => {
        setDrawer(false);
    };


    return (
        <div>
            <div>
                Select days :
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
                            <td style={{ paddingLeft: '1400px' }}>
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
            <div className='fixedbutton'>
                <Button variant="outlined" onClick={handleClickOpenDrawer}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Button>
            </div>
            <Dialog
                fullScreen
                open={drawer}
                onClose={handleCloseDrawer}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDrawer}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add New Transaction
                        </Typography>

                    </Toolbar>
                </AppBar>
                <div className='drawer'>
                    <Categoryform />
                    {/* <Form /> */}
                </div>
            </Dialog>
        </div >

    );
}

export default withAuth(SimpleAccordion);