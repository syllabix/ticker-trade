import { createSelector } from "reselect";

const bidSelector = state => state.bids;
const askSelector = state => state.asks;
const matchSelector = state => state.matches;

export const getBids = createSelector(bidSelector, bids =>
  bids.sort((a, b) => a.price - b.price).slice(0, 20)
);

export const getAsks = createSelector(askSelector, asks =>
  asks.sort((a, b) => b.price - a.price).slice(0, 20)
);

export const getMatches = createSelector(matchSelector, matches =>
  matches.slice(0, 30)
);
