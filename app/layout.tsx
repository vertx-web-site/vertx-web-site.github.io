import "./code.css"
import "./main.css"
import "./themes.css"
import ClientTooltipProvider from "@/components/ClientTooltipProvider"
import clsx from "clsx"
import { Metadata } from "next"
import { Roboto } from "next/font/google"
import localFont from "next/font/local"

const roboto = Roboto({
  weight: ["300", "400", "500"],
  // might remove italic if necessary (i.e. if page size becomes too large),
  // browser-generated italic looks OK too
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap", // force "swap" even in production mode
  variable: "--font-roboto",
})

const dejaVuFont = localFont({
  src: "../node_modules/@fontsource/dejavu-mono/files/dejavu-mono-latin-400-normal.woff2",
  display: "swap",
  variable: "--font-dejavu",
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: "Eclipse Vert.x",
    template: "%s | Eclipse Vert.x",
  },
  description: "Vert.x | Reactive applications on the JVM",
  robots: "index,follow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(`${roboto.variable} ${dejaVuFont.variable}`)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage["vertx-theme"] === "dark" || ((!("vertx-theme" in localStorage) || localStorage["vertx-theme"] === "system") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark")
                } else {
                  document.documentElement.classList.remove("dark")
                }
              } catch (_) {}
            `,
          }}
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.__NEXT_ROUTER_BASEPATH}/favicons/favicon-16x16.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.__NEXT_ROUTER_BASEPATH}/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href={`${process.env.__NEXT_ROUTER_BASEPATH}/favicons/favicon-48x48.png`}
        />
      </head>
      <body>
        <ClientTooltipProvider>{children}</ClientTooltipProvider>
      </body>
    </html>
  )
}
