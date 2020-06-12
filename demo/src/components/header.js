/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import { Link } from "gatsby"
import { Helmet } from "react-helmet"

export default ({ codeUrl, title, image }) => (
  <Styled.div
    sx={{
      borderBottom: "1px solid",
      borderColor: "primary",
      paddingBottom: 1,
      paddingLeft: 3,
    }}
  >
    <Helmet>
      <title>Gatsby Theme Waves: {title}</title>
      <meta
        name="description"
        content="Bring scrollytelling to your mdx. Animate code, images, charts, maps and more as you scroll."
      />

      <meta name="image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`Gatsby Theme Waves: ${title}`} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="pomber" />
    </Helmet>
    <Link to="/" sx={{ color: "primary" }}>
      All Demos
    </Link>
    <Styled.a sx={{ paddingLeft: 3 }} href={codeUrl}>
      View Code
    </Styled.a>
  </Styled.div>
)
