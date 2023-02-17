import React, { useEffect, useState } from 'react';
import axios from 'axios';
import auth from '../Auth';
import Table from 'react-bootstrap/Table'
import moment from 'moment';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import withAuth from '../WithAuth';


function App() {
    // const [data, setData] = useState([]);

    const [selectedName, setSelectedName] = useState("");

    const [open, setOpen] = React.useState(false);

    const [post, setPost] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSelectedName(event.target.value);
    };

    const [names, setNames] = useState([]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/transactions`, { 'headers': { 'x-auth-token': auth.getToken() } })
            .then(response => {
                setPost(response.data.slice(0, 7));
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`${process.env.REACT_APP_BASE_URL}api/category`, { 'headers': { 'x-auth-token': auth.getToken() } })
            .then(response => {
                setNames(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {/* {post.map((item, index) => (
                <p key={index}>{item.name}</p>
            ))
            } */}
            <Table striped bordered hover variant="dark" responsive="sm">
                <tr>
                    <th>Amount</th>
                    <th>Date And Time</th>
                    <th>Reference Number</th>
                    <th>To</th>
                    <th>Transaction Type</th>
                    <th>Categories</th>
                    {/* <th>Delete</th> */}
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
                                                            <option>Select Category</option>
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
                                {/* <td>
                                    <button onClick={() => handleRemove(post.referenceNumber)}><DeleteIcon /></button>
                                </td> */}
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
        </div>
    );
}

export default withAuth(App);
