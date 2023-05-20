import './App.css'
import React, {useEffect, useState} from "react";
import {randomColor} from "../../utils/utils";
import useHabit from "../../hooks/useHabit";

const HabitUnit = (props) => {
    const {id, name, description, color, actionButton, progress} = props;
    const [currentProgress, setCurrentProgress] = useState(20);
    const [hide, setHide] = useState(false);
    const {addProgress} = useHabit();

    const plus = () => {
        let currentProgress = currentProgress + 20;
        if (currentProgress >= 100) currentProgress = 100;
        setCurrentProgress(currentProgress);
        addProgress(id)
    }
    const defaultColor = color || 'blue';

    useEffect(() => {
        if (progress && progress.length > 0) {
            const last = progress[progress.length - 1];
            const {updateDate} = last;
            const today = new Date();
            if (
                today.getFullYear() === new Date(updateDate).getFullYear() &&
                today.getMonth() === new Date(updateDate).getMonth() &&
                today.getDate() === new Date(updateDate).getDate()
            ) {
                setHide(true);
            } else {
                setHide(false);
            }
        }
    }, [progress])

    return (
        <div className={`btn ${defaultColor}`} tabIndex="0">
            <div className="btn-info-container" onClick={() => actionButton({name, description, defaultColor})}>
                <span className="btn-title">{name}</span>
                <span className="btn-subtitle">{description}</span>
                <span className="bar-container">
					<span id="bar1" className={`bar-progress ${defaultColor}`}
                          style={{width: currentProgress + '%'}}></span>
				</span>
            </div>
            {!hide && (<span id="plus1" className="plus-sign" onClick={plus}>+</span>)}
        </div>
    );
}

export default HabitUnit;