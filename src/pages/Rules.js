import React from 'react'
import Button from '../components/Button';
import "../scss/pages/Rules.scss";

function Rules({ history }) {
    return (
        <div id="rules">
            <h1>SET GAME RULES</h1>

            <p>The SET card game is all about finding three acrd from displaed 12 card that form an set. A set consists of three cards satisfying all of these conditions:</p>
            <ul>
                <li>They all have the same number or have three different numbers.</li>
                <li>They all have the same shape or have three different shapes.</li>
                <li>They all have the same shading or have three different shadings.</li>
                <li>They all have the same color or have three different colors.</li>
            </ul>

            <p>The rules of Set are summarized by: If you can sort a group of three cards into "two of ____ and one of ____", then it is not a set.</p>
            <p>For example, these three cards form a set:</p>
            <ul>
                <li>One red striped diamond</li>
                <li>Two red solid diamonds</li>
                <li>Three red open diamonds</li>
            </ul>
            <p>Now, you know the rules of game you can try playing a game.</p>

            <div onClick={() => {
                history.push("/?slide");
                window.location.reload();
            }}
                className="btnf">
                <Button>Start a New Game</Button>
            </div>
        </div>
    )
}

export default Rules
