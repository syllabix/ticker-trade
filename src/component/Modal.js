import React from "react";
import { connect } from "react-redux";

import { getSelectedMatch } from "../selector";

import { ModalActions } from "../state";

import "./Modal.css";

const OverviewCard = ({
  id,
  time,
  quantity,
  price,
  sellOrderId,
  buyOrderId
}) => (
  <div className="overview-card">
    <div>
      <h2>Exchange Match Details</h2>
      <span>#{id}</span>
    </div>
    <div>
      <p>Time of Match:</p>
      <p>{time.toString()}</p>
    </div>
    <p>Price: {price.toFixed(2)}</p>
    <p>Qty: {quantity}</p>
    <p>Sell Order: #{sellOrderId}</p>
    <p>Buy Order: #{buyOrderId}</p>
  </div>
);

const Modal = ({ isOpen, match, close }) => (
  <div onClick={close}>
    {isOpen ? (
      <div className="modal">
        <OverviewCard {...match} />
      </div>
    ) : null}
  </div>
);

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  match: getSelectedMatch(state)
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(ModalActions.hide())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
