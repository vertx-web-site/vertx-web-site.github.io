import Button from "../Button"
import { useAnimate } from "framer-motion"
import { useEffect, useRef } from "react"

const URL = "https://www.manning.com/books/vertx-in-action"
const DISPLAY_SECONDS = 7
const TRANSITION_DURATION = 0.2

const Book = () => {
  const quote1 = useRef<HTMLDivElement>(null)
  const quote2 = useRef<HTMLDivElement>(null)
  const quote3 = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let duration = TRANSITION_DURATION
    let quotes = [quote1, quote2, quote3]
    let seq: any[] = []
    for (let i = 0; i < quotes.length + 1; ++i) {
      if (i > 0) {
        seq.push([
          quotes[i % quotes.length].current,
          { opacity: 1 },
          { at: DISPLAY_SECONDS * i - duration, duration },
        ])
      }
      if (i < quotes.length) {
        seq.push([
          quotes[i % quotes.length].current,
          { opacity: 0 },
          { at: DISPLAY_SECONDS * (i + 1) - duration, duration },
        ])
      }
    }
    animate(seq, { repeat: Infinity, delay: duration })
    animate(
      bar.current!!,
      { width: "100%" },
      {
        duration: DISPLAY_SECONDS,
        ease: "linear",
        repeat: Infinity,
      },
    )
  }, [animate])

  return (
    <section className="mx-auto max-w-screen-md" ref={scope}>
      <div className="prose">
        <h3 className="text-center text-3xl">Read about Vert.x</h3>
        <p className="lead text-center">
          <em>Vert.x in Action</em> teaches you how to build responsive,
          resilient, and scalable JVM applications using well-established
          reactive design patterns.
        </p>
      </div>

      <div className="mt-12 flex flex-row gap-10">
        <div className="w-96">
          <a href={URL} target="_blank" rel="noopener noreferrer">
            <img
              src={require("../../assets/book-cover.jpg")}
              width="200"
              alt="Vert.x in Action book cover"
              className="rounded-sm border border-gray-200"
            />
          </a>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="relative border-l-8 border-gray-300 bg-gray-100 px-8 py-5">
            <div className="relative">
              <div ref={quote1}>
                <div className="quote-content">
                  &ldquo;Fantastic introduction into Vert.x written for
                  developers looking to develop services more efficiently in
                  terms of time and resources.&rdquo;
                </div>
                <div className="text-right before:mr-2 before:tracking-[-.1em] before:content-['——_']">
                  Andrew Buttery
                </div>
              </div>

              <div className="absolute inset-0 opacity-0" ref={quote2}>
                <div className="quote-content">
                  &ldquo;A great book to add to your personal library of books
                  that discuss the major architectural challenges of writing
                  messaging frameworks.&rdquo;
                </div>
                <div className="text-right before:mr-2 before:tracking-[-.1em] before:content-['——_']">
                  Earl B. Bingham
                </div>
              </div>

              <div className="absolute inset-0 opacity-0" ref={quote3}>
                <div className="quote-content">
                  &ldquo;Provides not only an excellent introduction to Vert.x,
                  but reactive programming with Java in general.&rdquo;
                </div>
                <div className="text-right before:mr-2 before:tracking-[-.1em] before:content-['——_']">
                  Damian Esteban
                </div>
              </div>
            </div>

            <div
              ref={bar}
              className="absolute bottom-0 left-0 h-1 w-0 bg-gray-400"
            ></div>
          </div>

          <a href={URL} target="_blank" rel="noopener noreferrer">
            <Button primary>Get the book!</Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Book
