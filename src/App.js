import React, { Component } from "react";
import createBrowserHistory from "history/createBrowserHistory";
// import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// import { routes } from "./constant";
import store from "./store";

import Backdrop from "./component/Backdrop";
import MarketExchange from "./component/MarketExchange";
import Logo from "./component/Logo";
import Modal from "./component/Modal";

import "./App.css";

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Backdrop>
          <Modal />
          <div className="container">
            <Logo />
            <MarketExchange />
          </div>
        </Backdrop>
      </Provider>
    );
  }
}

export default App;
