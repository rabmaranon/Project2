import './App.css';
import { Switch, Route } from "react-router-dom";
import Game from './pages/Game';
import { useStateValue } from "./StateProvider";

// importing game sounds
import clickAudio from "./audio/click.wav";
import applauseAudio from "./audio/applause.wav";
import faliureAudio from "./audio/failure.wav";
import endAudio from "./audio/end.wav";
import suffleAudio from "./audio/shuffle_cards.wav";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameStats from './components/GameStats';
import LandingPage from './pages/LandingPage';
import Rules from './pages/Rules';




function App() {
  const [{ }, dispatch] = useStateValue();
  const [{ }] = useStateValue();


  return (
    <div className="app">
      <ToastContainer
        position="top-center"
      />


      {/* Routes*/}

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/rules" component={Rules} />
        <div id="main-game-conatiner">
          <Route exact path="/game" component={Game} />
          <Route exact path="/game" component={GameStats} />
        </div>

      </Switch>


      {/*Game Sounds */}
      <audio id="click" src={clickAudio}></audio>
      <audio id="applause" src={applauseAudio}></audio>
      <audio id="failure" src={faliureAudio}></audio>
      <audio id="end" src={endAudio} ></audio>
      <audio id="shuffle_cards" src={suffleAudio}></audio>
    </div>
  );
}

export default App;
