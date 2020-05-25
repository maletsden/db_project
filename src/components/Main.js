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
        <Route path="/dashboard">
          <MainComponent />
        </Route>
        <Route path="/">
          <MainComponent />
        </Route>
      </RoterSwitch>

    </div>
  );
}

export default App;
