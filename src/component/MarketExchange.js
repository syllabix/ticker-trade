import React from "react";
import { connect } from "react-redux";

import OrderQueue from "./OrderQueue";

import { ModalActions } from "../state";

import { getBids, getAsks, getMatches } from "../selector";

import "./MarketExchange.css";

const MarketExchange = ({ bids, asks, matches, onMatchItemClick }) => (
  <div className="market-exchange">
    <OrderQueue title={"buy orders"} orders={bids} />
    <OrderQueue title={"sell orders"} orders={asks} />
    <OrderQueue
      title={"matches"}
      orders={matches}
      onItemClick={onMatchItemClick}
    />
  </div>
);

const mapStateToProps = state => ({
  bids: getBids(state),
  asks: getAsks(state),
  matches: getMatches(state)
});

const mapDispatchToProps = dispatch => ({
  onMatchItemClick: data => {
    dispatch(ModalActions.display(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketExchange);
