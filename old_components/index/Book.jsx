import styles from "./Book.scss"
import Button from "../Button"

const URL = "https://www.manning.com/books/vertx-in-action"

const Book = () => (
  <div className="book">
    <hr/>
    <div className="container">
      <div className="book-section">
        <h3>Read about Vert.x</h3>
        <p className="book-subtitle"><em>Vert.x in Action</em> teaches you how to build responsive,
        resilient, and scalable JVM applications with Vert.x using
        well-established reactive design patterns.</p>
        <div className="book-main">
          <div className="book-left">
            <a href={URL} target="_blank" rel="noopener noreferrer">
              <img src={require("../../assets/book-cover.jpg")} width="200"
                alt="Vert.x in Action book cover" />
            </a>
          </div>
          <div className="book-right">
            <div className="quote-container">
              <div className="quote">
                <div className="quote-content">
                  &ldquo;Fantastic introduction into Vert.x written for developers
                  looking to develop services more efficiently in terms of time
                  and resources.&rdquo;
                </div>
                <div className="quote-name">
                  Andrew Buttery
                </div>
              </div>
              <div className="quote">
                <div className="quote-content">
                  &ldquo;A great book to add to your personal library of books
                  that discuss the major architectural challenges of writing
                  messaging frameworks.&rdquo;
                </div>
                <div className="quote-name">
                  Earl B. Bingham
                </div>
              </div>
              <div className="quote">
                <div className="quote-content">
                  &ldquo;Provides not only an excellent introduction to Vert.x,
                  but reactive programming with Java in general.&rdquo;
                </div>
                <div className="quote-name">
                  Damian Esteban
                </div>
              </div>
              <div className="progress">
                <div className="bar"></div>
              </div>
            </div>
            <a href={URL} target="_blank" rel="noopener noreferrer">
              <Button primary>Get the book!</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{styles}</style>
  </div>
)

export default Book
