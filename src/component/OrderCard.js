import React, { Component } from "react";

import "./OrderCard.css";

export default class OrderCard extends Component {
  onClick = evt => {
    evt.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  };

  render() {
    const { id, price, type, quantity, onClick } = this.props;
    const clickable = onClick ? "clickable" : "static";
    return (
      <div className={`order-card ${type} ${clickable}`} onClick={this.onClick}>
        <div>
          <span>
            <b>#</b> {id}
          </span>
          <hr />
          <span>
            <b>qty:</b> {quantity}
          </span>
        </div>
        <div className="price">{price.toFixed(2)}</div>
      </div>
    );
  }
}
