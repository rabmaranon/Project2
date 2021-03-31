import React from 'react';
import "../scss/components/GameStats.scss";
import CircularProgressbarContiner from "../components/CircleProgressBarConatiner";
import Button from './Button';
import { useStateValue } from "../StateProvider";



function GameStats({ history, location }) {
    const [{ reaminingCards, mistakes, foundSets }] = useStateValue();




    return (
        <div id="gamestats">
            <div>

                <h3>Cards Left:</h3>
                <CircularProgressbarContiner percentage={Math.floor(reaminingCards / 69 * 100)} text={reaminingCards ? reaminingCards : "0"} />
            </div>

            <div>
                <h3>Found Sets:</h3>
                <CircularProgressbarContiner percentage={foundSets} text={foundSets ? foundSets : "0"} />
            </div>


            <div>
                <h3>Mistakes</h3>
                <CircularProgressbarContiner percentage={mistakes} text={mistakes ? mistakes : "0"} />
            </div>

            <div onClick={() => {
                history.push("/?slide");
                window.location.reload()
            }}>
                <Button>Start a new Game</Button>
            </div>

        </div>
    )
}

export default GameStats;
