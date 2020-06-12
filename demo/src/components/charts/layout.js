/** @jsx jsx */
import { ThemeProvider, Container, Styled, jsx } from "theme-ui"
import { roboto } from "@theme-ui/presets"
import { Global } from "@emotion/core"

import Header from "../header"
import image from "../../pages/media/chart.png"

import sidebarVariant from "./waves-variant"
import deepmerge from "deepmerge"

const theme = deepmerge(roboto, {
  colors: {
    negativeBackground: "#121320",
    negativeText: "#fafafa",
  },
  styles: {
    Container: {
      width: ["100%", "500px"],
      marginRight: [0, "40px"],
    },
  },
  root: {
    display: "flex",
  },
})

theme.styles.waves = {
  ...sidebarVariant,
}

theme.breakpoints = ["1120px"]

export default props => (
  <ThemeProvider theme={theme}>
    <Styled.root>
      <Global styles={{ body: { overflowX: "hidden", margin: 0 } }} />
      <Header
        codeUrl="https://github.com/pomber/gatsby-theme-waves/tree/master/demo/src/pages/charts"
        title="Chart Wave"
        image={image}
      />
      <div sx={{ display: "flex" }}>
        <div sx={{ width: ["100%", "60vw"] }}>
          <Container>{props.children}</Container>
        </div>
        <aside
          sx={{ backgroundColor: "negativeBackground", width: [0, "40vw"] }}
        ></aside>
      </div>
    </Styled.root>
  </ThemeProvider>
)
