/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

export default class Counter extends React.Component {
  state = {
    count: 0,
  }

  inc = () => {
    this.setState(state => ({ count: state.count + 1 }))
  }

  dec = () => {
    this.setState(state => ({ count: state.count - 1 }))
  }

  render() {
    return (
      <div
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          sx={{
            appearance: "none",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "bold",
            borderRadius: "4px",
            border: "none",
            width: "2em",
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px magenta",
            },
            m: 0,
            px: 3,
            py: 2,
            color: "background",
            bg: "text",
            ml: "auto",
          }}
          onClick={this.dec}
        >
          -
        </button>
        <div sx={{ mx: 3 }}>{this.state.count}</div>
        <button
          sx={{
            appearance: "none",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "bold",
            borderRadius: "4px",
            border: "none",
            width: "2em",
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px magenta",
            },
            m: 0,
            px: 3,
            py: 2,
            color: "background",
            bg: "text",
            mr: "auto",
          }}
          onClick={this.inc}
        >
          +
        </button>
      </div>
    )
  }
}
