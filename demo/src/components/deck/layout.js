import React from "react"
import { roboto } from "@theme-ui/presets"
import Header from "../header"
import deepmerge from "deepmerge"
import { ThemeProvider, Styled, Container } from "theme-ui"
import variants from "./waves-variant"
import { Global } from "@emotion/core"
import image from "../../pages/media/deck.png"

const theme = deepmerge(roboto, {
  styles: {
    Container: {
      width: ["100%", "700px"],
    },
    waves: variants,
  },
})

theme.breakpoints = ["900px"]

export default props => (
  <ThemeProvider theme={theme}>
    <Global styles={{ body: { overflowX: "hidden" } }} />
    <Styled.root>
      <Header
        codeUrl="https://github.com/pomber/gatsby-theme-waves/tree/master/demo/src/pages/deck"
        title="Deck Wave"
        image={image}
      />
      <Container>{props.children}</Container>
    </Styled.root>
  </ThemeProvider>
)
