import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import auth from '../Auth';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState('');

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleClickAdvice = async () => {
            setOpen(true);
            try {
                await axios.get(`${process.env.REACT_APP_BASE_URL}api/chatadvice/ask`,{
                    headers: { 'x-auth-token': auth.getToken() }
                })
                .then(response => {
                    setData(response.data);
                })
            }
            catch(error){
            }
        };
        handleClickAdvice();
    })

    return (
        <div>
            <Button variant="outlined" onClick={handleClickAdvice}>
                Advice
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {data}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        ThankYou
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
