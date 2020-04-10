import * as React from "react";
import fetch from "isomorphic-unfetch";
import Button from "../Button";
import {Minus, Plus} from "react-feather";

class StarterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      metadata: {},
      isAdvanced: false
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

  radioButtons(values) {
    return values.map(value => (
        <span key={value}> {value} </span>
    ));
  }

  toggleAdvanced() {
    this.setState({isAdvanced: !this.state.isAdvanced});
  }

  render() {
    const {error, isLoaded, metadata, isAdvanced} = this.state;

    if (error) {
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading…</div>;
    } else {
      return (
          <div>
            <div>
              <div><span>Version</span></div>
              <div>{this.radioButtons(metadata.vertxVersions)}</div>
            </div>
            <div>
              <div><span>Language</span></div>
              <div>{this.radioButtons(metadata.languages)}</div>
            </div>
            <div>
              <div><span>Build</span></div>
              <div>{this.radioButtons(metadata.buildTools)}</div>
            </div>
            <div>
              <div><span>Group Id</span></div>
              <div><input type="text" defaultValue={metadata.defaults.groupId}/></div>
            </div>
            <div>
              <div><span>Artifact Id</span></div>
              <div><input type="text" defaultValue={metadata.defaults.artifactId}/></div>
            </div>
            <div>
              <div><span>Dependencies</span></div>
              <div>&nbsp;</div>
            </div>
            <div>
              <a onClick={this.toggleAdvanced.bind(this)}><span>Advanced options {isAdvanced ? <Minus/> :
                  <Plus/>}</span></a>
            </div>
            <div hidden={!isAdvanced}>
              <hr/>
              <div>
                <div><span>Package</span></div>
                <div><input type="text"/></div>
              </div>
              <div>
                <div><span>JDK Version</span></div>
                <div>{this.radioButtons(metadata.jdkVersions)}</div>
              </div>
              <hr/>
            </div>
            <div>
              <a><Button primary>Generate project</Button></a>
            </div>
          </div>
      );
    }
  }
}

export default StarterForm;
