import React from "react";
import FlipMove from "react-flip-move";

import OrderCard from "./OrderCard";

import "./OrderQueue.css";

const OrderQueue = ({ orders }) => (
  <div className="order-queue">
    <FlipMove>
      {orders.map((order, idx) => (
        <OrderCard key={`${order.id}-${idx}`} {...order} />
      ))}
    </FlipMove>
  </div>
);

export default OrderQueue;
