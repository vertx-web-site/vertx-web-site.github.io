import "./CodeExamples.scss";
import Java from "./CodeExamplesJava.mdx";

export default () => (
  <div className="code-examples">
    <div className="code-examples-tabs">
      <div className="code-examples-tab active">Java</div>
      <div className="code-examples-tab">Kotlin</div>
      <div className="code-examples-tab">Groovy</div>
    </div>
    <div className="code-examples-content">
      <Java />
    </div>
  </div>
);
