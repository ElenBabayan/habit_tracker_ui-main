import './App.css';
import React, {useState} from "react";
import HabitUnit from "./HabitUnit";
import ResponsiveDialog from "../../views/material-kit/dialog/ResponsiveDialog";
import {useDispatch, useSelector} from "react-redux";
import useHabit from "../../hooks/useHabit";
import {ADD_HABIT} from "../../contexts/HabitContext";
import {TextField} from "@mui/material";


const MainWrap = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [mode, setMode] = useState('view');
    const [state, setState] = useState(
        {
            habitName:'New Habit Name',
            description: 'New Description',
            date: new Date()
        });

    const handleChange = (event) => {
        event.persist();
        setState({...state, [event.target.name]: event.target.value});
    };
    const toggleMode = () => {
         setMode(mode === 'view' ? 'edit' : 'view');
    };

    const {habitList, addHabit } = useHabit();
    console.log(habitList, 'asdfjkasdl')
    const saveDialog = (data) => {
        const {habitName, description, date} = data;
        addHabit({
            name: habitName,
            description: description,
            color: 'blue'
        })
        setShowDialog(false)
    }


    const editHabit = () => {
        console.log(habitName, description);
    }

    function handleClickOpen() {
        setShowDialog(true);
    }

    function handleClose() {
        setShowDialog(false);
    }

    const showHabitDetails = (data) => {
        let card = document.getElementById("habit-card-1");
        let cardSide = document.getElementById("habit-card-side");
        let cardTitle = document.getElementById("habit-card-title");
        let description = document.getElementById("habit-card-description");
        let currentStreak = document.getElementById("habit-card-current-streak");
        let longestStreak = document.getElementById("habit-card-longest-streak");
        let overlay = document.getElementById("habit-overlay");

        //set card colour and title
        cardTitle.innerHTML = data.name;
        description.innerHTML = data.description;

        currentStreak.innerHTML = data.currentStreak || '999';
        longestStreak.innerHTML = data.longestStreak || '1111';

        cardSide.className = "habit-card-side " + (data.color || 'blue');

        //animate the card opening
        overlay.style.display = "flex";
        card.style.transform = "scale(1)";

        card.style.transform = "scale(0)";
        overlay.style.opacity = "1";
        setTimeout(function () {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
        }, 150);
    }

    const hideHabitCard = () => {
        let card = document.getElementById("habit-card-1");
        let overlay = document.getElementById("habit-overlay");
        overlay.style.opacity = "0";
        setTimeout(function () {
            card.style.opacity = "0";
            card.style.transform = "scale(0.8)";
        }, 5);
        setTimeout(function () {
            overlay.style.display = "none";
        }, 300);
        card.style.transform = "scale(1)";
        setMode('view');
    }

    const {
        habitName,
        description,
    } = state;

    return (
        <div>
            <ResponsiveDialog open={showDialog} onSave={saveDialog} handleClose={handleClose}/>
            <div id="habit-overlay" className="habit-overlay">
                <div id="habit-card-1" className="habit-card">
                    <div id="habit-card-side" className="habit-card-side"></div>
                    <div className="habit-card-info">
          <span id="plus1" className="plus-sign" onClick={hideHabitCard}>
            X
          </span>
                        {mode === 'edit' ? (
                            <TextField
                                type="text"
                                name="habitName"
                                id={description}
                                value={habitName}
                                style={{ marginBottom: '10px' }}
                                onChange={handleChange}
                            />
                        ) : (
                            <h2 id="habit-card-title">THIS IS A HABIT</h2>
                        )}
                        {mode === 'edit' ? (
                            <TextField
                                id="habit-card-description"
                                name="description"
                                value={description}
                                style={{ marginBottom: '10px' }}
                                onChange={handleChange}
                            ></TextField>
                        ) : (
                            <span id="habit-card-description" style={{ marginBottom: '10px' }}>
              This is the description
            </span>
                        )}
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            Current streak:{' '}
                            <span style={{ marginLeft: 'auto', paddingRight: '20px' }}>
              <strong id={'habit-card-current-streak'}>20 days</strong>
            </span>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            Longest streak:{' '}
                            <span style={{ marginLeft: 'auto', paddingRight: '20px' }}>
              <strong id={'habit-card-longest-streak'}>weekly</strong>
            </span>
                        </div>
                        <div className="habit-buttons-container">
                            {mode === 'view' ? (
                                <ul
                                    style={{
                                        display: 'flex',
                                        padding: 0,
                                        justifyContent: 'space-around',
                                        width: '100%',
                                    }}
                                >
                                    <li onClick={toggleMode}>EDIT</li>
                                    <li>DELETE</li>
                                </ul>
                            ) : (
                                <ul
                                    style={{
                                        display: 'flex',
                                        padding: 0,
                                        justifyContent: 'space-around',
                                        width: '100%',
                                    }}
                                >
                                    <li onClick={editHabit}>SAVE</li>
                                    <li onClick={toggleMode}>CANCEL</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div id="dark-overlay-habit" className="dark-overlay"></div>
            </div>
            <div className="main-wrap">
                <div className="heading">
                    <h1 style={{margin: '0.1em 0 0.2em 0'}}>MY HABITS</h1>
                    <h6 id="dateString"
                        className="subheading">{`TODAY'S DATE IS ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</h6>
                </div>
                <div className="btn-wrap" style={{flexDirection: 'row'}}>
                    <div id="addBtn" className="add-habit-button" tabIndex="0" onClick={handleClickOpen}>
                        <span>ADD HABIT</span>
                    </div>
                </div>
                {
                    (habitList || []).map((it, index) => (
                        <HabitUnit key={index} {...it} actionButton={showHabitDetails}/>))
                }
            </div>
        </div>
    );
}
export default MainWrap;