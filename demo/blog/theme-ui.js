import deepmerge from "deepmerge"
import blogTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/index"
import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index"
// import { nightOwl } from "code-surfer/dist/standalone.esm"

export default deepmerge.all([
  blogTheme,
  wavesTheme,
  {
    breakpoints: ["1000px"],
    colors: {
      primary: "rebeccapurple",
      modes: { dark: { background: "#1e1e1e" } },
    },
  },
  // nightOwl,
])
