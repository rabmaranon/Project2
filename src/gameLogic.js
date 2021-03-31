import _ from "underscore";
import $ from "jquery";
import { toast } from "react-toastify";



// To create cards variations for SET game
function Card(id, properties) {

    this.id = id;
    let shadeIndex;

    if (localStorage.getItem('gameLevel') == 'easy') {
        shadeIndex = 2;
    } else {
        shadeIndex = Math.floor(id % 9 / 3);// shade will change every 3 cards
    }

    this.attr = {
        color: properties.colors[Math.floor(id % 81 / 27)], // color will change every 27 cards
        number: properties.numbers[Math.floor(id % 27 / 9)], // number will change every 9 cards
        shade: properties.shades[shadeIndex],
        shape: properties.shapes[Math.floor(id % 3)]
    };


}


// to play sounds per game event
function audio(id) {
    var audio = document.getElementById(id);
    audio.play();
}

// reset selected cards after Check button
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




function Game() {

    this.deck = "empty";
    this.activeCards = "none";
    this.solutions = "none";
    this.possibleSets = 0;

    //constructor of all cards
    this.createDeck = function () {

        var cards = _.range(1, 82);
        cards = _.shuffle(cards);

        var properties = {
            colors: ["green", "purple", "red"],
            numbers: [1, 2, 3],
            shades: ['clear', 'shaded', 'solid'],
            shapes: ['diamond', 'oval', 'squiggle']
        };
        this.deck = _.map(cards, function (id) {
            return new Card(id, properties);
        });
    };
    // select 12 cards from the deck and display them on gameboard solution

    let cardDiv, iconDiv;
    this.deal = function () {

        this.activeCards = this.deck.splice(0, 12);
        var gameboard = document.getElementById("gameboard");
        gameboard.innerHTML = "";

        for (var i = 0; i < this.activeCards.length; i++) {

            cardDiv = document.createElement("div");
            cardDiv.id = this.activeCards[i].id;
            cardDiv.className = "card th";
            gameboard.appendChild(cardDiv);

            for (var j = 0; j < this.activeCards[i].attr.number; j++) {
                iconDiv = document.createElement("div");
                iconDiv.className = "cardImage " + this.activeCards[i].attr.shade + "-" + this.activeCards[i].attr.shape + " " + this.activeCards[i].attr.color + "Card"; // producing class names that describe the card image
                cardDiv.appendChild(iconDiv);
            }
        }
    };


    this.drwaThreeCard = () => {
        if (this.deck.length > 11) {
            this.activeCards = [...this.deck.splice(0, 3), ...this.activeCards]


            this.showCardsInDeck();
            this.displayCards();
            this.solve();

        } else {
            toast.error("No card Left behind");
        }


    }
    // display card on gameboard
    this.displayCards = function () {

        var gameboard = document.getElementById("gameboard");
        gameboard.innerHTML = "";

        for (var i = 0; i < this.activeCards.length; i++) {
            cardDiv = document.createElement("div");
            cardDiv.id = this.activeCards[i].id;
            cardDiv.className = "card th";
            gameboard.appendChild(cardDiv);

            for (var j = 0; j < this.activeCards[i].attr.number; j++) {
                iconDiv = document.createElement("div");
                iconDiv.className = "cardImage " + this.activeCards[i].attr.shade + "-" + this.activeCards[i].attr.shape + " " + this.activeCards[i].attr.color + "Card"; // producing class names that describe the card image
                cardDiv.appendChild(iconDiv);
            }
        }
    };


    // Find all possible solutions for selected 12 cards
    this.solve = function () {

        var threeCardSet = [],
            attributes,
            matchCounter,
            solutions = [];

        var counter = 0;
        var numCards = this.activeCards.length;
        for (var card1 = 0; card1 < numCards - 2; card1++) {

            for (var card2 = card1 + 1; card2 < numCards - 1; card2++) {


                for (var card3 = card2 + 1; card3 < numCards; card3++) {


                    threeCardSet = [this.activeCards[card1], this.activeCards[card2], this.activeCards[card3]];

                    matchCounter = 0;
                    // iterate through atteributes of each card attribute
                    for (let attribute in threeCardSet[0].attr) {
                        attributes = [];
                        for (let card in threeCardSet) {

                            attributes.push(threeCardSet[card].attr[attribute]);
                            counter++;

                        }
                        // check for same or different attributes between 3 cards
                        if (!(((attributes[0] == attributes[1]) && (attributes[1] == attributes[2])) ||
                            ((attributes[0] != attributes[1]) && (attributes[1] != attributes[2]) && (attributes[0] != attributes[2]))
                        )) {

                            break;
                        } else {
                            matchCounter++;
                        }

                    }
                    if (matchCounter == 4) {
                        solutions.push(threeCardSet);
                        break;
                    }
                }
            }
        }

        this.solutions = solutions;
        this.possibleSets = solutions.length;
    };


    // display hint solutions with ready SETs  card
    this.showSolutions = function () {




    };


    // check if selected cards are in one of solution sets
    this.checkSet = function (arrayOfCards) {

        for (var j = 0; j < this.solutions.length; j++) {

            var solutionSet = _.pluck(this.solutions[j], 'id');

            var result = _.isEqual(_.sortBy(arrayOfCards), _.sortBy(solutionSet));
            if (result) {
                this.solutions.splice(j, 1);
                this.swapCards(arrayOfCards);
                this.showCardsInDeck();
                this.displayCards();
                this.solve();
                //this.removeCards(arrayOfCards);

                return this.applause();

            }
        }
        return this.failure();
    };


    this.swapCards = function (arr) {


        var newArr = [];
        if (this.deck.length >= 3) {
            for (i = 0; i < 3; ++i) {
                newArr.push(this.deck.splice(0, 1)[0]);
            }
        }

        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < 12; ++j) {

                if (this.activeCards[j].id === arr[i]) {
                    this.activeCards[j] = newArr[i];
                }
            }
        }


    };

    // remove three selected cards if SET complete
    this.removeCards = function (arr) {
        for (var i = 0; i < arr.length; ++i) {
            var id = arr[i];
            for (var j = 0; j < this.activeCards.length; j++) {
                var obj = this.activeCards[j];
                if (obj.id == id) {
                    this.activeCards.splice(j, 1);
                    j = this.activeCards.length; // to skip unnecessary iterations
                }
            }
        }

        $('.card').remove();
    };

    // sets of procedures when selected cards made SET
    this.applause = function () {

        if (this.possibleSets > 0) {
            audio('applause');
            this.possibleSets--;
            this.counterPossibleSets();

        } else if (this.possibleSets === 0 && this.deck.length === 0) {
            audio('end');
            alert("All possible Sets already found!");

        }
        return true;
    };


    // sets of procedures when selected cards didn't make a SET
    this.failure = function () {
        audio('failure');
        toast.error("Not a set, try again!");
        return false;
    };

    // display possible solutions after each deck release
    this.counterPossibleSets = function () {
        // $('#availableSets').html("<p><strong>Possible sets: " + this.solutions.length + "</strong></p>");

    };

    // display counter of cards left in deck
    this.showCardsInDeck = function () {

        // $('#cardsInDeck').html('<b>Cards in Deck left: </b>' + this.deck.length);
    };


    this.createDeck();


}



export default Game;