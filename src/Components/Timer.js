import React, { useState, useEffect } from "react";

import { Progress } from "semantic-ui-react";

import PropTypes from "prop-types";

/**
 * Renders a timer with given countdown
 * @param {*} props 
 */
const Timer = (props) => {
  const [count, setcount] = useState(props.startTime);
  let myInterval = null;

  const updateTimer = () => {
    setcount((count) => count - 1);
  };

  const startTimer = () => {
    myInterval = setInterval(updateTimer, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      clearInterval(myInterval);
      if (props.disableShow) props.disableShow();
      setcount(props.startTime);
    }
  }, [count]);

  return (
    <div>
      {props.progress && (
        <Progress
          percent={(count * 100) / props.startTime}
          inverted
          color="grey"
          attached="top"
        />
      )}
      <div className="playError">
        {props.text ? `${props.text} : ${count}` : null}
      </div>
    </div>
  );
};

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
  disableShow: PropTypes.func,
};

export default Timer;
