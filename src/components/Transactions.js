import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import Slide from '@mui/material/Slide';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import Form from './Form';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Transactions() {
    const [post, setPost] = useState([])
    const [selectedName, setSelectedName] = useState("");
    const [names, setNames] = useState([]);

    //fetching data from api
    useEffect(() => {
        axios.get('http://localhost:5000/api/transactions')
            .then(res => {
                console.log(res)
                setPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    //on click button funcnalityeeeeeeee

    const handleChange = (event) => {
        setSelectedName(event.target.value);
    };


    const handleSubmit = async (objectId) => {
        try {
            const response = await fetch("http://localhost:5000/api/category/pushTransactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: selectedName, transactions: objectId }),
            });
            await response.json();
            //console.log(data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = async (ref) => {
        try {
            const response = await fetch("http://localhost:5000/api/transactions/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ referenceNumber: ref }),
            });
            await response.json();
            //console.log(data);
            //Auto Reload
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    // const styles = {
    //     width: "100px",
    //     fontSize: "20px",
    //     borderRadius: "40px",
    //     border: "1px solid black",
    //     color: "white",
    //     margin: "0.5em 1em",
    //     padding: "0.25em 1em",
    //     background: "#c83f49",
    // };

    //CATEGORY NAME FETCH KRR RHA HAI!

    useEffect(() => {
        axios.get('http://localhost:5000/api/category')
            .then(response => {
                setNames(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    //Narration box handle click

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


    // const [inputValues, setInputValues] = useState({
    //     name: '',
    //     dateAndTime: '',
    //     narration: '',
    //     amount: '',
    //     transactionType: '',
    //     referenceNumber: '',
    //     availableBalance: '',
    //     beneficiaryAccountNumber: '',
    //     beneficiaryName: '',
    //     remitterAccountNumber: '',
    //     remitterName: '',
    // });


    return (
        <div>
            <Table striped bordered hover variant="dark" responsive="sm">
                <tr>
                    <th>Amount</th>
                    <th>Date And Time</th>
                    <th>Reference Number</th>
                    <th>To</th>
                    <th>Transaction Type</th>
                    <th>Categories</th>
                    <th>Delete</th>
                    <th>Details</th>
                </tr>
                {post.map(post => {
                    return (
                        <tbody>
                            <tr>
                                <td>{post.amount}</td>
                                <td>{moment.utc(post.dateAndTime).local().format('YYYY-MM-DD HH:mm:ss')}</td>
                                <td>{post.referenceNumber}</td>
                                <td>{post.beneficiaryName}</td>
                                <td>{post.transactionType}</td>
                                <td>
                                    <div>
                                        {
                                            !post.categoryName.length > 0 ?
                                                <div class="dropdown">
                                                    <button class="dropbtn">Categories</button>
                                                    <div class="dropdown-content">
                                                        <select value={selectedName} onChange={handleChange}>
                                                            {names.map(name => (
                                                                <option key={name.name} value={name.name}>{name.name}</option>
                                                            ))}

                                                        </select>
                                                        <button onClick={() => handleSubmit(post._id)}>Submit</button>
                                                    </div>
                                                </div>
                                                : <td className='tableContent'>{post.categoryName}</td>
                                        }
                                    </div>
                                </td>
                                <td>
                                    <button onClick={() => handleRemove(post.referenceNumber)}><DeleteIcon /></button>
                                </td>
                                <td>
                                    <div>
                                        <Button variant="outlined" onClick={handleClickOpen}>
                                            <ExpandMoreIcon />
                                        </Button>
                                        <Dialog
                                            fullScreen={fullScreen}
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="responsive-dialog-title"
                                        >
                                            <DialogTitle id="responsive-dialog-title">
                                                {"Transaction Details"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    {post.narration}
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} autoFocus>
                                                    OK
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
                {/* <button
                    style={styles}
                // onMouseEnter={() => setBgColour("#c83f49")}
                // onMouseLeave={() => setBgColour("#fafafa")}
                >
                    {" "}
                    Add
                </button> */}
            </Table>
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
                    <Form />
                </div>
            </Dialog>
        </div>
    )
}


export default Transactions;
