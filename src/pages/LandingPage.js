import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button';
import "../scss/pages/LandingPage.scss";
import { useStateValue } from "../StateProvider";
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';


const locations = [
    {
        label: 'Easy',
        value: 'easy',
    },
    {
        label: 'Medium',
        value: 'medium',
    },
    {
        label: 'Hard',
        value: 'hard',
    }
];






function LandingPage({ location }) {
    const [{ }, dispatch] = useStateValue();

    const [nextSlide, setnextSlide] = useState(false);

    const goToNextSlide = () => {
        setnextSlide(true);
    }

    const selectChange = (e) => {

        dispatch({
            type: "SET_GAME_DIFFICULTY",
            item: e.value,
        });
        localStorage.setItem("gameLevel", e.value);


    }

    useEffect(() => {
        localStorage.setItem("gameLevel", "easy");

        if (location.search == "?slide") {
            goToNextSlide()
        }
    }, [])


    //


    return (
        <div id="landing-page">
            <div className="left" style={{ display: nextSlide ? "none" : "flex" }} >
                <h1>THE SET CARD GAME</h1>

                <div onClick={goToNextSlide}>
                    <Button>LET'S PLAY!</Button>
                </div>
                <p>Don't know how to play?<Link to="/rules">Rules</Link></p>
            </div>

            <div className="right" style={{ opacity: nextSlide ? "1" : "0" }}>
                <h1>CHOOSE A LEVEL</h1>


                <Dropdown
                    id="dr"
                    name="location"
                    title="Easy"
                    list={locations}
                    onChange={selectChange}
                    style={
                        {
                            headerTitle: {
                                color: "red",
                            }
                        }
                    }


                />
                <Link to="/game" className="by">
                    <Button>START</Button>
                </Link>
            </div>
        </div >
    )
}

export default LandingPage
