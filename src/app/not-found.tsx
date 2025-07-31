import { Metadata } from "next";

const schema = {
  title: "Room 404",
  description: "Where are you?",
  favicon: "./favicon.ico",
}

export const metadata: Metadata = {
  title: schema.title,
  description: schema.description,

  icons: {
    icon: schema.favicon,
    apple: schema.favicon,
  },

  openGraph: {
    title: schema.title,
    description: schema.description,
    images: schema.favicon,
  },

}

export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>Welp. That's too bad.</h2>
      <p>Err: Not Found</p>
    </>
  )
}