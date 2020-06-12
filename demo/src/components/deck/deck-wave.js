/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import BarScroller from "gatsby-theme-waves/src/components/bar-scroller"
import Wave from "gatsby-theme-waves/src/components/wave"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Embed } from "./embed"

function toColumns(items, columnCount) {
  const columns = Array(columnCount)
    .fill()
    .map(() => [])

  columns[0].push(null)
  columns[1].push(React.createElement("div", {}, []))
  items.forEach((item, i) => {
    const isHr = item.props.mdxType === "hr"
    if (isHr) {
      columns[0].push(null)
      columns[1].push(React.createElement("div", {}, []))
    } else {
      const step = columns[0].length - 1
      columns[1][step].props.children.push(item)
    }
  })

  return columns
}

function DeckWave(props) {
  const childrenToColumns = children => {
    const items = React.Children.map(children, child => [child])
    const columnCount = 2
    const columns = toColumns(items, columnCount)
    return columns
  }

  const { allDeck } = useStaticQuery(graphql`
    query Hey {
      allDeck {
        nodes {
          slug
          body
        }
      }
    }
  `)
  const deck = allDeck.nodes.find(deck => deck.slug === props.deck)

  return (
    <Wave
      columnComponents={[DeckSticker, BarScroller]}
      childrenToStepColumns={childrenToColumns}
      {...props}
      deck={deck}
    />
  )
}

function DeckSticker({ deck, progress, currentStep, variant }) {
  const prevIndex = Math.floor(progress)
  const nextIndex = prevIndex + 1

  return (
    <div sx={{ variant: `styles.waves.${variant}.StickerContainer` }}>
      <div sx={{ variant: `styles.waves.${variant}.Sticker` }}>
        <div
          style={{ transform: `translateY(${(prevIndex - progress) * 50}%)` }}
        >
          <Embed
            src={MDXRenderer}
            children={deck.body}
            slide={prevIndex + 1}
            key={prevIndex}
            zoom={0.6}
          />
          <Embed
            src={MDXRenderer}
            children={deck.body}
            slide={nextIndex + 1}
            key={nextIndex}
            zoom={0.6}
          />
        </div>
      </div>
    </div>
  )
}

export default DeckWave
