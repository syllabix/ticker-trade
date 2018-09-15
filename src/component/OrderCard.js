import React, { Component } from "react";

import "./OrderCard.css";

export default class OrderCard extends Component {
  render() {
    const { id, price, type, quantity } = this.props;

    return (
      <div className={"order-card " + type}>
        <span>{id}</span>
        <span>{quantity}</span>
        <span>{price}</span>
      </div>
    );
  }
}
