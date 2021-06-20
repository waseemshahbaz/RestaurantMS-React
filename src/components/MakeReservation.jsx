import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet";
import { httpClient } from 'react-http-client';

import "../component_styles/MakeReservation.css";
import logo from "../component_styles/logo.png";

class MakeReservation extends Component {
  state = {
    dashboardClicked: false,
    number: "",
    dateAndTime: "",
    seats: "",
  };
  componentDidUnmount() {
    window.location.reload();
  }
  handleDashboardClicked = () => {
    this.setState({ dashboardClicked: true });
  };
  handleNumberChange = (event) => {
    this.setState({
      number: event.target.value,
    });
  };
  handleDateAndTimeChange = (event) => {
    this.setState({
      dateAndTime: event.target.value,
    });
  };
  handleSeatsChange = (event) => {
    this.setState({
      seats: event.target.value,
    });
  };


  
  async createReservationinDB(obj) {
    const httpHandler = require('react-http-client');

    const postResponse = await httpHandler.post(
      // url
      'http://localhost:3001/api/createReservationinDB',
      // body
      obj

    );

    console.log(postResponse);

    setTimeout(() => {
      this.setState({ dashboardClicked: true });
    }, 3000);

  };



  makeReservation = () => {
    if (
      this.state.seats !== "" &&
      this.state.number !== "" &&
      this.state.dateAndTime !== ""
    ) {
      //Create a reservation in db using contact number, date and time, and number of seats
      const obj = { seats: this.state.seats, number: this.state.number, dateAndTime: this.state.dateAndTime };
      console.log(obj);

      this.createReservationinDB(obj);


    } else {
      alert("Fill all fields");
    }
  };
  render() {
    if (this.state.dashboardClicked) {
      return <Redirect to="/CustomerDashboard" />;
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Make Reservation | Hikari Sushi</title>
        </Helmet>
        <body>
          <div className="OrderOnlineMenuBar">
            <img class="logo" src={logo} alt="logo" />
            <a onClick={this.handleDashboardClicked}>Dashboard</a>
          </div>
          <div className="OrderOnlineBodycontainer">
            <div className="OrderOnlineMiddle">
              <p>Reservation</p>

              <div className="ContactNumber">
                <label>Contact Number </label>
                <input
                  name="contact_number"
                  value={this.state.number}
                  onChange={this.handleNumberChange}
                />
              </div>
              <div className="DateAndTime">
                <label>Date and Time </label>
                <input
                  name="date_and_time"
                  value={this.state.dateAndTime}
                  onChange={this.handleDateAndTimeChange}
                />
              </div>
              <div className="seats">
                <label>Number of Seats </label>
                <input
                  name="contact_number"
                  value={this.state.seats}
                  onChange={this.handleSeatsChange}
                />
              </div>
              <button
                className="OrderOnlineButton"
                onClick={this.makeReservation}>
                Request
              </button>
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

export default MakeReservation;
