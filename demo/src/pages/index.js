/** @jsx jsx */
import { Main, Styled, Container, Header, jsx, ThemeProvider } from "theme-ui"
import { roboto } from "@theme-ui/presets"
import { Global } from "@emotion/core"
import codeWebm from "./media/code.webm"
import codeMp4 from "./media/code.mp4"
import chartsWebm from "./media/charts.webm"
import chartsMp4 from "./media/charts.mp4"
import imagesWebm from "./media/images.webm"
import imagesMp4 from "./media/images.mp4"
import mapsWebm from "./media/maps.webm"
import mapsMp4 from "./media/maps.mp4"
import deckWebm from "./media/deck.webm"
import deckMp4 from "./media/deck.mp4"
import image from "./media/home.jpg"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

const demos = [
  {
    title: "Code Wave",
    link: "/blog/post",
    webmSrc: codeWebm,
    mp4Src: codeMp4,
  },
  {
    title: "Maps Wave",
    webmSrc: mapsWebm,
    mp4Src: mapsMp4,
    link: "/maps",
  },
  {
    title: "Deck Wave",
    webmSrc: deckWebm,
    mp4Src: deckMp4,
    link: "/deck",
  },
  {
    title: "Image Wave",
    webmSrc: imagesWebm,
    mp4Src: imagesMp4,
    link: "/images",
  },
  {
    title: "Chart Wave",
    webmSrc: chartsWebm,
    mp4Src: chartsMp4,
    link: "/charts",
  },
]

const theme = {
  ...roboto,
  breakpoints: ["900px"],
}

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Gatsby Theme Waves Demos</title>
        <meta
          name="description"
          content="Bring scrollytelling to your mdx. Animate code, images, charts, maps and more as you scroll."
        />
        <meta name="image" content={image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Gatsby Theme Waves Demos`} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:creator" content="pomber" />
      </Helmet>
      <Global
        styles={{ body: { background: "linear-gradient(#f1f1f1, #ddd)" } }}
      />
      <Main>
        <Header
          sx={{
            maxWidth: "868px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Styled.h1
            sx={{ fontSize: [3, 4], margin: 0, color: "rgba(20,20,20,0.8)" }}
          >
            Gatsby Theme Waves
          </Styled.h1>
          <Styled.a
            href="https://github.com/pomber/gatsby-theme-waves"
            sx={{ color: "rgba(20,20,20,0.8)", fontSize: [1, 3] }}
          >
            GitHub
          </Styled.a>
        </Header>
        <Container
          sx={{ padding: ["56px 0 0 0", "120px 0"], maxWidth: "868px" }}
        >
          <div
            sx={{
              display: "grid",
              gridTemplateColumns: ["100%", "384px 384px"],
              gridGap: ["40px", "100px"],
              justifyItems: "center",
            }}
          >
            {demos.map((demo, i) => (
              <Demo key={i} {...demo} big={i === 0} />
            ))}
          </div>
        </Container>
      </Main>
    </ThemeProvider>
  )
}

function Demo({ title, webmSrc, mp4Src, link, big }) {
  const height = big ? 350 : 240
  const width = big ? 560 : 384
  return (
    <div
      sx={{
        gridColumnStart: big && ["span 1", "span 2"],
      }}
    >
      <Styled.a href={link}>
        <div
          sx={{
            position: "relative",
            borderRadius: "3px",
            height: [240, height],
            width: [384, width],
            maxWidth: "80vw",
            maxHeight: "calc(80vw * 350 / 560)",
            boxShadow: "0 20px 50px 0 rgba(0,0,0,0.3)",
            overflow: "hidden",
            transition: "all .3s",
            ":hover": {
              boxShadow: "0 20px 50px 2px rgba(0,0,0,0.3)",
              transform: "translateY(-0.5%)",
            },
          }}
        >
          <video autoPlay loop muted playsInline width="100%" height="100%">
            <source src={webmSrc} type="video/webm" />
            <source src={mp4Src} type="video/mp4" />
          </video>

          <div
            sx={{
              position: "absolute",
              bottom: 0,
              background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7) 85%)",
              width: "100%",
            }}
          >
            <Styled.h2
              sx={{
                paddingLeft: "1em",
                color: "#ddd",
                marginTop: "0.8em",
                marginBottom: "1em",
                fontSize: [2, big ? 4 : 3],
              }}
            >
              {title}
            </Styled.h2>
          </div>
        </div>
      </Styled.a>
    </div>
  )
}
