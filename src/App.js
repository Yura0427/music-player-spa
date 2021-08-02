import "./App.css";
import { BrowserRouter  as Router, Switch, Route } from "react-router-dom";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Tracks from "./components/Tracks";
import Create from "./components/Create";
import Player from "./components/Player";
import TrackDetals from "./components/TrackDetals";

function App() {
  return (
    <Router>
      <div style={{marginTop:70,}}>
        <Navbar />
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/tracks" component={Tracks} />
          <Route exact path="/tracks/:_id" component={TrackDetals} />
          <Route exact path="/create" component={Create} />
        </Switch>
        <Player />

      </div>
    </Router>
  );
}

export default App;
