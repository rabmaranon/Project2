import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button';
import "../scss/pages/LandingPage.scss";
import { useStateValue } from "../StateProvider";


function LandingPage({ location }) {
    const [{ }, dispatch] = useStateValue();

    const [nextSlide, setnextSlide] = useState(false);

    const goToNextSlide = () => {
        setnextSlide(true);
    }

    const selectChange = (e) => {
        dispatch({
            type: "SET_GAME_DIFFICULTY",
            item: e.target.value,
        });
        localStorage.setItem("gameLevel", e.target.value);
        console.log(e.target.value);

    }

    useEffect(() => {
        localStorage.setItem("gameLevel", "easy");

        if (location.search == "?slide") {
            goToNextSlide()
        }
    }, [])
    return (
        <div id="landing-page">
            <div className="left" style={{ display: nextSlide ? "none" : "flex" }} >
                <h1>SET CARDS GAME</h1>

                <div onClick={goToNextSlide}>
                    <Button>START NEW GAME</Button>
                </div>
                <p>Don't know how to play?<Link to="/rules">Rules</Link></p>
            </div>

            <div className="right" style={{ opacity: nextSlide ? "1" : "0" }}>
                <h1>Select Difficulty Level To Play</h1>
                <select id="selectDif" onChange={selectChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>

                </select>
                <Link to="/game">
                    <Button>Play Now!</Button>
                </Link>
            </div>
        </div >
    )
}

export default LandingPage
