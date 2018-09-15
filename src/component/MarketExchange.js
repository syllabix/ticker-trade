import React from "react";
import { connect } from "react-redux";

import OrderQueue from "./OrderQueue";

import { getBids, getAsks, getMatches } from "../selector";

import "./MarketExchange.css";

const MarketExchange = ({ bids, asks, matches }) => (
  <div className="market-exchange">
    <OrderQueue orders={bids} />
    <OrderQueue orders={asks} />
    <OrderQueue orders={matches} />
  </div>
);

const mapStateToProps = state => ({
  bids: getBids(state),
  asks: getAsks(state),
  matches: getMatches(state)
});

export default connect(mapStateToProps)(MarketExchange);
