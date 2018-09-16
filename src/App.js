import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store";

import Backdrop from "./component/Backdrop";
import MarketExchange from "./component/MarketExchange";
import Logo from "./component/Logo";
import Modal from "./component/Modal";
import ErrorNotification from "./component/ErrorNotification";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Backdrop>
          <Modal />
          <ErrorNotification />
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
