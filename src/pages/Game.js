import React, { useEffect, useState } from 'react'

import GameLogic from "../gameLogic";
import $ from "jquery";
import "../scss/pages/GameBoard.scss"
import Button from '../components/Button';
import { toast } from 'react-toastify';
import { useStateValue } from "../StateProvider";

function Game() {
    const [showFireworks, setshowFireworks] = useState(false);

    const [{ }, dispatch] = useStateValue();

    function audio(id) {
        var audio = document.getElementById(id);
        audio.play();
    }

    function cleanSelect(array) {
        if (array.length > 0) {
            $.each(array, function (index, value) {
                var el = document.getElementById(value);
                el.classList.remove("selected");

            });
        }
    }
    // change Hint div with ready solutions of SET game
    function show_hide(target_id, button_id) {
        var e = document.getElementById(target_id);
        var btn = document.getElementById(button_id)

        if (e.style.display == 'block') {
            e.style.display = 'none';
            btn.value = "Show Solutions"
        } else {
            e.style.display = 'block';
            btn.value = "Hide Solutions"
        }
    }

    useEffect(() => {
        var game = new GameLogic();


        //audio('shuffle_cards');

        //call game's some functions location
        game.deal();
        game.solve();
        game.counterPossibleSets();
        game.showCardsInDeck();
        game.showSolutions();

        var attempCounts = 0,
            errorCounts = 0;

        var selectedCards = [];
        var found = -1;


        // function to handle on click of cards attemptsCircle
        $('div').on('click', '.card', function (event) {

            event.stopPropagation();

            audio('click');

            $(this).toggleClass("selected");

            found = $.inArray(parseInt(this.id), selectedCards);
            var id = this.id;

            //selected card already clicked
            if (found >= 0 && selectedCards.length > 0) {
                $("#" + id).removeClass("selected");
                selectedCards.splice(found, 1);

            } else {
                // Card was not selected before, add it.

                if (selectedCards.length < 2) {
                    selectedCards.push(parseInt(this.id));
                } else {
                    // $(this).toggleClass("selected");

                    // toast.error('Three cards already selected!');
                    selectedCards.push(parseInt(this.id));

                    /// three card has beeen selected now checking for set

                    if (game.solutions.length == 0) {
                        audio('end');
                        toast.info("No Card lef to find");

                    } else {


                        var result = game.checkSet(selectedCards);

                        if (result) {
                            var solutionBoard = document.getElementById('solutions');
                            solutionBoard.innerHTML = "";
                            game.showSolutions();
                            game.counterPossibleSets();
                            selectedCards = [];
                            attempCounts++;
                            // attemptsCircle.update(attempCounts, 100);
                            dispatch({
                                type: "SET_FOUND_SETS",
                                item: attempCounts,
                            });
                            setshowFireworks(true);

                            setTimeout(() => {
                                setshowFireworks(false);
                            }, 1200)

                        } else {
                            errorCounts++;
                            // errorsCircle.update(errorCounts, 100);
                            dispatch({
                                type: "SET_MISTAKES",
                                item: errorCounts,
                            });

                        }
                        setTimeout(() => {
                            cleanSelect(selectedCards);
                            selectedCards = [];

                        }, 500)

                    }
                    // cardsCircle.update(game.deck.length, 100);
                    dispatch({
                        type: "SET_REMAINING_CARDS",
                        item: game.deck.length,
                    });



                }

            }
        });






        return () => {
        }
    }, [])
    return (
        <div id="game-right">

            <div id="gameboard">

            </div>


            {/* <input id="cheatMode" class="button small expand radius info" type="button" onclick={show_hide('solutions', 'cheatMode')} value="Show solutions"></input> */}
            <div id="solutions" class="panel text-center">
            </div>
            <div className="pyro" style={{ display: showFireworks ? "block" : "none" }}>
                <div className="before"></div>
                <div className="after"></div>
            </div>
        </div>
    )
}

export default Game
