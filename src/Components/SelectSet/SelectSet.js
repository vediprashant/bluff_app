import React from "react";

import PropTypes from "prop-types";

import "./selectSet.css";

/**
 * Displays a set of ranks for user to choose
 * Only displays when table is empty
 * @param {*} props 
 */
const SelectSet = (props) => {
  return (
    <div className="setSelection">
      <h1 className="heading1">Choose Set</h1>
      <div>
        <button
          className="ui mini button"
          onClick={(event) => props.selectSet(event)}
        >
          2
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          3
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          4
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          5
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          6
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          7
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          8
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          9
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          10
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          J
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          Q
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          K
        </button>
        <button className="ui mini button" onClick={props.selectSet}>
          A
        </button>
      </div>
    </div>
  );
};

SelectSet.propTypes = {
  selectSet: PropTypes.func.isRequired,
};

export default SelectSet;
