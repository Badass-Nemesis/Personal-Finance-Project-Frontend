import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
//import Button from 'react-bootstrap/esm/Button';


function Addnewtransaction() {

    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const styles = {
        background: "#9c88ff"
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
                style={styles}
            >
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="standard-basic" label="Standard" variant="standard" />
            </Box>
        </>
    )
}

export default Addnewtransaction;