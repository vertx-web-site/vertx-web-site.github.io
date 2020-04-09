import * as React from "react";
import fetch from "isomorphic-unfetch";

class StarterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      metadata: {}
    };
  }

  componentDidMount() {
    fetch("https://start.vertx.io/metadata")
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                metadata: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
  }

  render() {
    const {error, isLoaded, metadata} = this.state;

    if (error) {
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading…</div>;
    } else {
      return (
          <div>
            <div>
              <span>Version: </span> {metadata.vertxVersions.map(version => (
                <span> {version} </span>
            ))}
            </div>
          </div>
      );
    }
  }
}

export default StarterForm;
