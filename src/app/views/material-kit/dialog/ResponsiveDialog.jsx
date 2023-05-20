import {Box, Grid, TextareaAutosize, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/system';
import React, {useState} from 'react';
import SimpleForm from "../forms/SimpleForm";

export default function ResponsiveDialog(props) {
    const {open, onSave, handleClose} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [state, setState] = useState({date: new Date()});

    const handleChange = (event) => {
        event.persist();
        setState({...state, [event.target.name]: event.target.value});
    }

    const handleSave = (data) => {
        onSave(data);
        handleClose();
    }

    return (
        <Box>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Add Habit</DialogTitle>
                <DialogContent>
                    <SimpleForm onSave={handleSave} onClose={handleClose}/>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </Box>
    );
}
