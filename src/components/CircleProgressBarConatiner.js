import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function CircleProgressBarConatiner({ percentage, text }) {
    return (
        <div className="progress-circle">
            <CircularProgressbar value={percentage} text={text} styles={buildStyles({



                pathColor: `#d93f87`,
                textColor: "#fff",

            })}
            />
        </div>
    )
}

export default CircleProgressBarConatiner
