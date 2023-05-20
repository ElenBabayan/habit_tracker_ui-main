import {DatePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import {Span} from "app/components/Typography";
import React, {useEffect, useState} from "react";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const SimpleForm = (props) => {
    const {onSave, onClose} = props;
    const [state, setState] = useState({date: new Date()});

    const handleSubmit = (event) => {
        console.log(state, 'a');
        onSave(state)
    };

    const handleChange = (event) => {
        event.persist();
        setState({...state, [event.target.name]: event.target.value});
    };

    const handleDateChange = (date) => setState({...state, date});

    const {
        habitName,
        description,
        date,
    } = state;

    return (
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={6}>
                <Grid item>
                    <TextField
                        type="text"
                        name="habitName"
                        id="standard-basic"
                        value={habitName || ""}
                        onChange={handleChange}
                        errorMessages={["this field is required"]}
                        label="Habit Name"
                        validators={["required", "minStringLength: 2", "maxStringLength: 22"]}
                    />

                    <TextField
                        type="text"
                        name="description"
                        label="Description"
                        onChange={handleChange}
                        value={description || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={date}
                            onChange={handleDateChange}
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    label="Date picker"
                                    id="mui-pickers-date"
                                    sx={{mb: 2, width: "100%"}}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" autoFocus type="submit">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </ValidatorForm>
    );
};

export default SimpleForm;
