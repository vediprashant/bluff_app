import React from "react";

import PropTypes from "prop-types";

import "./selectSet.css";

const SelectSet = (props) => {
  return (
    <div class="setSelection">
      <h1 className="heading1">Choose Set</h1>
      <div>
        <button
          class="ui mini button"
          onClick={(event) => props.selectSet(event)}
        >
          2
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          3
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          4
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          5
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          6
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          7
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          8
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          9
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          10
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          J
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          Q
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
          K
        </button>
        <button class="ui mini button" onClick={props.selectSet}>
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
