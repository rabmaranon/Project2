import React from 'react'
import Button from '../components/Button';
import "../scss/pages/Rules.scss";

function Rules({ history }) {
    return (
        <div id="rules">
            <h1>SET GAME RULES</h1>
            <div className="inner">

                <p>The object of the game is to identify a 'Set' of three cards from 12 cards laid out on the table. Each card has a
            variation of the following four features:</p>
                <ul>
                    <li>COLOR: Each card is red, green, or blue.</li>
                    <li>SYMBOL: Each card contains ovals, squiggles, or diamonds.</li>
                    <li>NUMBER: Each card has one, two, or three symbols.</li>
                    <li>SHADING: Each card is solid, open, or striped.</li>
                </ul>

                <p>A 'Set' consists of three cards in which each feature is EITHER the same on each card OR is different on each card.
            That is to say, any feature in the 'Set' of three cards is either common to all three cards or is different on each card.</p>

                <h3>Examples of sets:</h3>
                <ul>
                    <li>color: different on each card, symbol: the same on each card (Oval), number: the same on each (two),shading: the same on each card (solid)</li>
                    <div className="cards-conatiner">
                        <div className="cardf">
                            <div className="cardImage solid-oval purpleCard"></div>
                            <div className="cardImage solid-oval purpleCard"></div>
                        </div>

                        <div className="cardf">
                            <div className="cardImage solid-oval redCard"></div>
                            <div className="cardImage solid-oval redCard"></div>
                        </div>

                        <div className="cardf">
                            <div className="cardImage solid-oval greenCard"></div>
                            <div className="cardImage solid-oval greenCard"></div>
                        </div>
                    </div>
                    <li>color: different on each card, symbol: different on each card, number: different on each card, shading: different
                on each card</li>
                    <div className="cards-conatiner">
                        <div className="cardf">
                            <div className="cardImage shaded-diamond purpleCard"></div>
                            <div className="cardImage shaded-diamond purpleCard"></div>
                        </div>

                        <div className="cardf">
                            <div className="cardImage solid-oval redCard"></div>

                        </div>

                        <div className="cardf">
                            <div className="cardImage clear-squiggle greenCard"></div>
                            <div className="cardImage clear-squiggle greenCard"></div>
                            <div className="cardImage clear-squiggle greenCard"></div>
                        </div>
                    </div>
                    <li>color: the same on each card (red), symbol: the same on each card (Oval), number: different on each
                card, shading: different on each card</li>

                    <div className="cards-conatiner">
                        <div className="cardf">
                            <div className="cardImage shaded-oval redCard"></div>
                            <div className="cardImage shaded-oval redCard"></div>
                        </div>

                        <div className="cardf">
                            <div className="cardImage solid-oval redCard"></div>

                        </div>

                        <div className="cardf">
                            <div className="cardImage clear-oval redCard"></div>
                            <div className="cardImage clear-oval redCard"></div>
                            <div className="cardImage clear-oval redCard"></div>
                        </div>
                    </div>
                </ul>
                <p>Now, you know the rules of game you can try playing a game.</p>
            </div>

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
