import React from 'react';

import {
  Switch as RoterSwitch,
  Route
} from "react-router-dom";

import SingIn from "./SingIn/SingIn";
import MainComponent from "./MainComponent/MainComponent";

function App() {
  return (
    <div className="App">
      <RoterSwitch>
        <Route path="/singin">
          <SingIn />
        </Route>
        <Route path="/client/dashboard">
          <MainComponent />
        </Route>
        <Route path="/client">
          <MainComponent />
        </Route>
        <Route path="/friend/dashboard">
          <MainComponent />
        </Route>
        <Route path="/friend">
          <MainComponent />
        </Route>
        <Route path="/">
          <SingIn />
        </Route>
      </RoterSwitch>

    </div>
  );
}

export default App;
