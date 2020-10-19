import React, { Component } from "react";

import PropTypes from "prop-types";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.startTime,
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div className="playError">
        {this.props.text ? `${this.props.text} : ${count}` : null}
      </div>
    );
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.myInterval = setInterval(this.updateTimer, 1000);
  };
  updateTimer = () => {
    if (this.state.count === 1) {
      this.props.disableShow();
      clearInterval(this.myInterval);
    } else {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}

Timer.propTypes = {
  startTime: PropTypes.number,
  disableShow: PropTypes.func,
};

export default Timer;
