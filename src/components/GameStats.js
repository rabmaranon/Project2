import React from 'react';
import "../scss/components/GameStats.scss";
import CircularProgressbarContiner from "../components/CircleProgressBarConatiner";
import Button from './Button';
import { useStateValue } from "../StateProvider";
import { Link } from 'react-router-dom';



function GameStats({ history, location }) {
    const [{ reaminingCards, mistakes, foundSets }] = useStateValue();




    return (
        <div id="gamestats">
            <div>

                <h3>Cards in Deck</h3>
                <CircularProgressbarContiner percentage={Math.floor(reaminingCards / 81 * 100)} text={reaminingCards ? reaminingCards : "0"} />
            </div>

            <div>
                <h3><center>Sets Found</center></h3>
                <CircularProgressbarContiner percentage={foundSets} text={foundSets ? foundSets : "0"} />
            </div>


            <div>
                <h3><center>Attempts </center></h3>
                <CircularProgressbarContiner percentage={mistakes} text={mistakes ? mistakes : "0"} />
            </div>

            <div id="drawcards" className="b">
                <Button color="#D93F87">Draw 3 Cards</Button>
            </div>

            <div onClick={() => {

                window.location.reload()
            }} className="b">
                <Button color="#FB0144">Reset Game</Button>
            </div>

            <Link to="/" className="b" >
                <Button color="#2B1A3E">Main Menu</Button></Link>

        </div>
    )
}

export default GameStats;
