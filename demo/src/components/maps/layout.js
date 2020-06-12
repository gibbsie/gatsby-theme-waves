import React from "react"
import { ThemeProvider, Styled } from "theme-ui"
import { roboto } from "@theme-ui/presets"
import { Global } from "@emotion/core"

import Header from "../header"
import image from "../../pages/media/maps.png"

import sidebarVariant from "./waves-variant"
import deepmerge from "deepmerge"

const theme = deepmerge(roboto, {
  colors: {
    background: "#121320",
    text: "#fafafa",
    primary: "salmon",
  },
  styles: {
    Container: {
      width: ["100%", "500px"],
      marginRight: [0, "40px"],
    },
    root: {
      // display: "flex",
      // background: "#121320",
      color: "#fafafa",
    },
  },
})

theme.styles.waves = {
  ...sidebarVariant,
}

theme.breakpoints = ["900px"]

export default props => (
  <ThemeProvider theme={theme}>
    <Global styles={{ body: { overfowX: "hidden", background: "#121320" } }} />
    <Styled.root>
      <Header
        codeUrl="https://github.com/pomber/gatsby-theme-waves/tree/master/demo/src/pages/maps"
        title="Maps Wave"
        image={image}
      />
      {props.children}
    </Styled.root>
  </ThemeProvider>
)
