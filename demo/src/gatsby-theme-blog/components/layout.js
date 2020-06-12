import Layout from "gatsby-theme-blog/src/components/layout"
import React from "react"
import theme from "../../../blog/theme-ui"
import { ThemeProvider, ColorMode } from "theme-ui"

import Header from "../../components/header"
import image from "../../pages/media/code.png"

export default props => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <Header
      codeUrl="https://github.com/pomber/gatsby-theme-waves/tree/master/demo/blog/posts"
      title="Code Wave"
      image={image}
    />
    <Layout {...props} />
  </ThemeProvider>
)
