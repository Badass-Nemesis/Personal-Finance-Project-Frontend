import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';


function Transactions() {
    const [post, setPost] = useState([])
    const [selectedName, setSelectedName] = useState("");


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
                                                            <option value="">Select a name</option>
                                                            <option value="shopping">shopping</option>
                                                            <option value="electronic">electronic</option>
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
