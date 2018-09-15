const BUY_ORDER_TYPE = "buy";
const SELL_ORDER_TYPE = "sell";

const defaultState = {
  asks: [],
  bids: [],
  matches: []
};

const calculatePrice = (price1, price2) => {
  return (price1 + price2) / 2;
};

export const processMatches = (order, state = defaultState) => {
  let curMatchIdx = -1;
  let curMatchPrice = Number.MIN_SAFE_INTEGER;
  let curMatchId = Number.MAX_SAFE_INTEGER;

  const hasPriority = (price, matchedOrder) => {
    return (
      price > curMatchPrice ||
      (price === curMatchPrice && matchedOrder.id < curMatchId)
    );
  };

  const setCurrentMatch = (newOrder, matchedOrder, matchedOrderIdx) => {
    let price = calculatePrice(newOrder.price, matchedOrder.price);
    if (hasPriority(price, matchedOrder)) {
      curMatchPrice = price;
      curMatchId = matchedOrder.id;
      curMatchIdx = matchedOrderIdx;
    }
  };

  const updateState = (type, matchedOrder) => {
    let qtyInMatch;
    let qtyUpdate = matchedOrder.quantity - order.quantity;

    if (qtyUpdate > 0) {
      qtyInMatch = order.quantity;
      order.quantity = 0;
      matchedOrder.quantity = qtyUpdate;
    } else {
      qtyInMatch = matchedOrder.quantity;
      order.quantity = Math.abs(qtyUpdate);
      state[type].splice(curMatchIdx, 1);
    }

    const sellOrderId =
      order.type === SELL_ORDER_TYPE ? order.id : matchedOrder.id;
    const buyOrderId =
      order.type === BUY_ORDER_TYPE ? order.id : matchedOrder.id;

    let match = {
      time: new Date(),
      quantity: qtyInMatch,
      pricePerUnit: curMatchPrice,
      sellOrderId,
      buyOrderId
    };

    state.matches.unshift(match);
  };

  switch (order.type) {
    case BUY_ORDER_TYPE:
      state.asks.forEach((ask, idx) => {
        if (order.price >= ask.price) {
          setCurrentMatch(order, ask, idx);
        }
      });

      if (curMatchIdx >= 0) {
        let ask = state.asks[curMatchIdx];
        updateState("asks", ask);
      }
      break;

    case SELL_ORDER_TYPE:
      state.bids.forEach((bid, idx) => {
        if (order.price <= bid.price) {
          setCurrentMatch(order, bid, idx);
        }
      });

      if (curMatchIdx >= 0) {
        let bid = state.bids[curMatchIdx];
        updateState("bids", bid);
      }
      break;

    default:
      break;
  }

  if (order.quantity === 0) {
    return state;
  }

  if (curMatchIdx < 0) {
    const key = order.type === SELL_ORDER_TYPE ? "asks" : "bids";
    state[key].push(order);
    return state;
  }

  return processMatches(order, state);
};
