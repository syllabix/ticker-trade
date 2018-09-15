import React from "react";
import FlipMove from "react-flip-move";

import OrderCard from "./OrderCard";

import "./OrderQueue.css";

const OrderQueue = ({ title, orders, onItemClick }) => (
  <div className="order-queue">
    <h3>{title}</h3>
    <FlipMove enterAnimation={"accordionVertical"}>
      {orders.map((order, idx) => (
        <OrderCard
          key={`${order.id}-${idx}`}
          {...order}
          onClick={onItemClick}
        />
      ))}
    </FlipMove>
  </div>
);

export default OrderQueue;
