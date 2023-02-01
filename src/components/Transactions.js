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
    //on click button funcnality

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
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const styles = {
        width: "100px",
        fontSize: "20px",
        borderRadius: "40px",
        border: "1px solid black",
        color: "white",
        margin: "0.5em 1em",
        padding: "0.25em 1em",
        background: "#c83f49",
    };

    //CATEGORY NAME FETCH RR RHA HAI!

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

    const handleClose = () => {
        setOpen(false);
    };




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
                <button
                    style={styles}
                // onMouseEnter={() => setBgColour("#c83f49")}
                // onMouseLeave={() => setBgColour("#fafafa")}
                >
                    {" "}
                    Add
                </button>
            </Table>
        </div>
    )
}

export default Transactions
