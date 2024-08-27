"use client"

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

interface YouTubeEmbedProps {
  id: string
  title: string
}

const YouTubeEmbed = ({ id, title }: YouTubeEmbedProps) => {
  return <LiteYouTubeEmbed id={id} title={title} />
}

export default YouTubeEmbed
