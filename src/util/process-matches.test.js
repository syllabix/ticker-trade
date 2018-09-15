import MockDate from "mockdate";

import { processMatches } from "./process-matches";

describe("processMatches", () => {
  beforeEach(() => {
    MockDate.set("2018-11-01T08:00:00.000Z");
  });

  afterEach(() => {
    MockDate.reset();
  });

  it("should return expected state when updated by a sell order", () => {
    const state = {
      asks: [{ id: 1001, type: "sell", quantity: 6, price: 480 }],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 }
      ],
      matches: []
    };

    const expected = {
      asks: [{ id: 1001, type: "sell", quantity: 6, price: 480 }],
      bids: [{ id: 1003, type: "buy", quantity: 3, price: 460 }],
      matches: [
        {
          id: "1003.1004",
          buyOrderId: 1003,
          price: 460,
          type: "match",
          quantity: 2,
          sellOrderId: 1004,
          time: new Date()
        },
        {
          id: "1002.1004",
          buyOrderId: 1002,
          price: 465,
          type: "match",
          quantity: 8,
          sellOrderId: 1004,
          time: new Date()
        }
      ]
    };

    const order = { id: 1004, type: "sell", quantity: 10, price: 460 };

    const result = processMatches(order, state);
    expect(result).toEqual(expected);
  });

  it("should return expected state when updated by a buy order", () => {
    const state = {
      asks: [
        { id: 1001, type: "sell", quantity: 6, price: 480 },
        { id: 1004, type: "sell", quantity: 3, price: 490 },
        { id: 1005, type: "sell", quantity: 7, price: 510 },
        { id: 1006, type: "sell", quantity: 7, price: 475 }
      ],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 }
      ],
      matches: []
    };

    const order = { id: 1007, type: "buy", quantity: 10, price: 491 };

    const expected = {
      asks: [
        { id: 1005, type: "sell", quantity: 7, price: 510 },
        { id: 1006, type: "sell", quantity: 6, price: 475 }
      ],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 }
      ],
      matches: [
        {
          id: "1007.1006",
          buyOrderId: 1007,
          price: 483,
          type: "match",
          quantity: 1,
          sellOrderId: 1006,
          time: new Date()
        },
        {
          id: "1007.1001",
          buyOrderId: 1007,
          price: 485.5,
          type: "match",
          quantity: 6,
          sellOrderId: 1001,
          time: new Date()
        },
        {
          id: "1007.1004",
          buyOrderId: 1007,
          price: 490.5,
          type: "match",
          quantity: 3,
          sellOrderId: 1004,
          time: new Date()
        }
      ]
    };

    const result = processMatches(order, state);
    expect(result).toEqual(expected);
  });

  it("should return expected state when updated by a sell order that can be matched by multiple bids when price determines priority", () => {
    const state = {
      asks: [{ id: 1001, type: "sell", quantity: 6, price: 480 }],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 },
        { id: 1004, type: "buy", quantity: 3, price: 490 },
        { id: 1005, type: "buy", quantity: 7, price: 510 },
        { id: 1006, type: "buy", quantity: 7, price: 475 },
        { id: 1007, type: "buy", quantity: 7, price: 512 }
      ],
      matches: []
    };

    const expected = {
      asks: [{ id: 1001, type: "sell", quantity: 6, price: 480 }],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 },
        { id: 1004, type: "buy", quantity: 3, price: 490 },
        { id: 1005, type: "buy", quantity: 7, price: 510 },
        { id: 1006, type: "buy", quantity: 7, price: 475 },
        { id: 1007, type: "buy", quantity: 4, price: 512 }
      ],
      matches: [
        {
          id: "1007.1008",
          buyOrderId: 1007,
          price: 477,
          type: "match",
          quantity: 3,
          sellOrderId: 1008,
          time: new Date()
        }
      ]
    };

    const order = { id: 1008, type: "sell", quantity: 3, price: 442 };

    const result = processMatches(order, state);
    expect(result).toEqual(expected);
  });

  it("should return expected state when updated by an order that can be matched by multiple times with equal pricing so that order age takes priority", () => {
    const state = {
      asks: [{ id: 1001, type: "sell", quantity: 6, price: 480 }],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 },
        { id: 1004, type: "buy", quantity: 3, price: 512 },
        { id: 1005, type: "buy", quantity: 7, price: 510 },
        { id: 1006, type: "buy", quantity: 7, price: 475 },
        { id: 1007, type: "buy", quantity: 3, price: 490 },
        { id: 1008, type: "buy", quantity: 4, price: 512 },
        { id: 1009, type: "buy", quantity: 2, price: 512 }
      ],
      matches: [
        {
          id: "999.1000",
          buyOrderId: 999,
          price: 320,
          type: "match",
          quantity: 2,
          sellOrderId: 1000,
          time: new Date()
        }
      ]
    };

    const order = { id: 1010, type: "sell", quantity: 8, price: 442 };

    const expected = {
      asks: [{ id: 1001, type: "sell", quantity: 6, price: 480 }],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 },
        { id: 1005, type: "buy", quantity: 7, price: 510 },
        { id: 1006, type: "buy", quantity: 7, price: 475 },
        { id: 1007, type: "buy", quantity: 3, price: 490 },
        { id: 1009, type: "buy", quantity: 1, price: 512 }
      ],
      matches: [
        {
          id: "1009.1010",
          buyOrderId: 1009,
          price: 477,
          type: "match",
          quantity: 1,
          sellOrderId: 1010,
          time: new Date()
        },
        {
          id: "1008.1010",
          buyOrderId: 1008,
          price: 477,
          type: "match",
          quantity: 4,
          sellOrderId: 1010,
          time: new Date()
        },
        {
          id: "1004.1010",
          buyOrderId: 1004,
          price: 477,
          type: "match",
          quantity: 3,
          sellOrderId: 1010,
          time: new Date()
        },
        {
          id: "999.1000",
          buyOrderId: 999,
          price: 320,
          type: "match",
          quantity: 2,
          sellOrderId: 1000,
          time: new Date()
        }
      ]
    };

    const result = processMatches(order, state);
    expect(result).toEqual(expected);
  });

  it("should add order to queue when state is empty", () => {
    const state = {
      asks: [],
      bids: [],
      matches: []
    };

    const order = { id: 1010, type: "sell", quantity: 8, price: 442 };

    const expected = {
      asks: [{ id: 1010, type: "sell", quantity: 8, price: 442 }],
      bids: [],
      matches: []
    };

    const result = processMatches(order, state);
    expect(result).toEqual(expected);
  });

  it("should add order to queue when there is remaining quantity after finding matches", () => {
    const state = {
      asks: [
        { id: 1001, type: "sell", quantity: 2, price: 480 },
        { id: 1004, type: "sell", quantity: 3, price: 490 },
        { id: 1005, type: "sell", quantity: 7, price: 510 },
        { id: 1006, type: "sell", quantity: 7, price: 475 }
      ],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 }
      ],
      matches: []
    };

    const order = { id: 1007, type: "buy", quantity: 13, price: 482 };

    const expected = {
      asks: [
        { id: 1004, type: "sell", quantity: 3, price: 490 },
        { id: 1005, type: "sell", quantity: 7, price: 510 }
      ],
      bids: [
        { id: 1002, type: "buy", quantity: 8, price: 470 },
        { id: 1003, type: "buy", quantity: 5, price: 460 },
        { id: 1007, type: "buy", quantity: 4, price: 482 }
      ],
      matches: [
        {
          id: "1007.1006",
          buyOrderId: 1007,
          price: 478.5,
          type: "match",
          quantity: 7,
          sellOrderId: 1006,
          time: new Date()
        },
        {
          id: "1007.1001",
          buyOrderId: 1007,
          price: 481,
          type: "match",
          quantity: 2,
          sellOrderId: 1001,
          time: new Date()
        }
      ]
    };

    const result = processMatches(order, state);
    expect(result).toEqual(expected);
  });
});
