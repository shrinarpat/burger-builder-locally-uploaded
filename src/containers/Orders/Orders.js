import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/spinner";
import * as actions from "../../store/actions/index";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}
	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map((order) => {
				return (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={+order.price}
					/>
				);
			});
		}
		return <div>{orders}</div>;
	}
}

const mapStateToProps = (state) => ({
	orders: state.order.orders,
	loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
	onFetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
