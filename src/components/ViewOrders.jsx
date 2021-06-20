import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/ViewOrders.css";
import logo from "../component_styles/logo.png";

class ViewOrders extends Component {
  state = {
    dashboardClicked: false,
    selectedValue: null,
    orders: [
      {
        order:
          "Shrimp Nigri (2 Piece) | 600 \n Sashimi Platter (12 Piece) | 2500",
      },
      { order: "Salmon Maki (2 Piece) | 500 \n Tuna Maki (2 Pieces) | 500" },
    ],
  };
  componentDidUnmount() {
    window.location.reload();
  }
  handleDashboardClicked = () => {
    this.setState({ dashboardClicked: true });
  };
  selectValue = (event) => {
    this.setState({
      selectedValue: event.target.value,
    });
  };
  sendOutOrder = () => {
    //The first entry in the order table in db with order string equal to this.state.selectedValue needs to be removed from the table (as it has been sent and is no longer an active order).
    this.setState({ dashboardClicked: true });
  };
  render() {
    if (this.state.dashboardClicked) {
      return <Redirect to="/AdminDashboard" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>View Orders | Hikari Sushi</title>
        </Helmet>
        <body>
          <div className="ViewOrder_menu_bar">
            <img className="logo" src={logo} alt="logo" />
            <a onClick={this.handleDashboardClicked}>Dashboard</a>
          </div>
          <div className="ViewOrder_bodycontainer">
            <div className="ViewOrder_left">
              <p>Select Order</p>

              <select
                className="ViewOrder_select_items"
                onChange={this.selectValue}
                value={this.state.selectedValue}
                multiple>
                {this.state.orders
                  ? this.state.orders.map((orderEntry) => (
                      <option value={orderEntry.order}>Order</option>
                    ))
                  : () => {}}
              </select>
            </div>
            <div className="ViewOrder_right">
              <p>Order:</p>
              <div className="ViewOrder_items">
                <p>{this.state.selectedValue}</p>
              </div>
              <div className="ViewOrder_bottom_right">
                <button
                  className="ViewOrder_button"
                  onClick={this.sendOutOrder}>
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="footer">
            <p>Hikari Sushi Copyright 2021 | Contact Us: 090078601</p>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default ViewOrders;
