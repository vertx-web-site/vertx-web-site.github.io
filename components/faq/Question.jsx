import classNames from "classnames"
import { ChevronRight } from "react-feather"
import { useState } from "react"
import resolvedStyles from "./Question.scss?type=resolve"
import styles from "./Question.scss"

const Question = ({ question, children }) => {
  const [visible, setVisible] = useState()

  function toggle() {
    setVisible(!visible)
  }

  return (
    <section className="faq-question">
      <h3 onClick={toggle}><ChevronRight className={classNames(resolvedStyles.className, "faq-question-chevron", { visible })} />{question}</h3>
      <div className={classNames("faq-question-answer", { visible })}>
        {children}
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Question
