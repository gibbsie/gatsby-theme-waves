import code from "./media/code.png"
import codeDark from "./media/code-dark.png"
import deck from "./media/deck.png"
import image from "./media/image.png"
import maps from "./media/maps.png"
import chart from "./media/chart.png"
import React from "react"
import { Global } from "@emotion/core"

const shots = [
  ["Code Wave", code],
  ["Code Wave", codeDark],
  ["Deck Wave", deck],
  ["Image Wave", image],
  ["Maps Wave", maps],
  ["Chart Wave", chart],
]

export default () => {
  return (
    <React.Fragment>
      <Global
        styles={{ body: { margin: "100px", transform: "rotate(-15deg)" } }}
      />
      <div style={{ display: "flex", transform: "translateX(300px)" }}>
        <Screenshot shot={shots[2]} />
        <Screenshot shot={shots[5]} />
        <Screenshot shot={shots[0]} />
      </div>
      <div style={{ display: "flex" }}>
        <Screenshot shot={shots[0]} />
        <Screenshot shot={shots[1]} />
        <Screenshot shot={shots[4]} />
      </div>
      <div style={{ display: "flex", transform: "translateX(500px)" }}>
        <Screenshot shot={shots[5]} />
        <Screenshot shot={shots[3]} />
      </div>
    </React.Fragment>
  )
}

function Screenshot({ shot }) {
  const [title, img] = shot
  return (
    <div
      style={{
        position: "relative",
        margin: "20px",
        boxShadow: "0 0 50px 0 rgba(0,0,0,0.3)",
      }}
    >
      <img
        src={img}
        style={{ width: "651px", height: "333px", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))",
          width: "100%",
          color: "#eee",
          fontSize: "1.1rem",
          fontFamily: "Roboto,system-ui,sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: "right",
            paddingRight: "4rem",
            paddingBottom: "1rem",
            paddingTop: "3rem",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}

function FullScreenshot({ shot }) {
  const [title, img] = shot
  return (
    <div style={{ position: "relative" }}>
      <img
        src={img}
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))",
          width: "100%",
          color: "#eee",
          fontSize: "2rem",
          fontFamily: "Roboto,system-ui,sans-serif",
        }}
      >
        <h1
          style={{
            paddingLeft: "4rem",
            paddingBottom: "1rem",
            paddingTop: "4rem",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}
