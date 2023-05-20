import '../App.css';
import React, { useState } from "react";

const MyHabits = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleHidePopup = () => {
        setShowPopup(false);
    };

    return (
        <div id="habit-overlay" className="habit-overlay">
            <div id="habit-card-1" className="habit-card">
                <div id="habit-card-side" className="habit-card-side">
                    {/* <h1>JOURNAL</h1> */}
                </div>
                <div className="habit-card-info">
                    <h2 id="habit-card-title">THIS IS A HABIT</h2>
                    <span style={{ marginBottom: '10px' }}>This is the description</span>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        Current streak:{' '}
                        <span style={{ marginLeft: 'auto', paddingRight: '20px' }}>
							<strong>20 days</strong>
						</span>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        Longest streak:{' '}
                        <span style={{ marginLeft: 'auto', paddingRight: '20px' }}>
							<strong>weekly</strong>
						</span>
                    </div>
                    <div className="habit-buttons-container">
                        <ul
                            style={{
                                display: 'flex',
                                padding: 0,
                                justifyContent: 'space-around',
                                width: '100%'
                            }}
                        >
                            <li>CHANGE</li>
                            <li>DELETE</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="dark-overlay-habit" className="dark-overlay"></div>
        </div>
    );
}

export default MyHabits;