import React, { Component } from "react";

const styles = {
  container: {},
  paragraph: {},
  sentence: {},
  word: {},
  character: {}
};

const Character = props => (
  <React.Fragment>
    {props.children.map(word => {
      return word
        .text()
        .split("")
        .map(char => <div>{char}</div>);
    })}{" "}
  </React.Fragment>
);

const Word = props => (
  <React.Fragment>
    {this.props.children.map(elem => (
      <div>
        {props.children.split(" ").map(word => <Character>word</Character>)}
      </div>
    ))}
  </React.Fragment>
);

export default class Splitter extends Component {
  render() {
    return (
      <div style={styles.container}>
        {this.props.children.map(elem => {
          return elem.html(
            elem
              .text()
              .replace(/([^\x00-\x80]|\w)/g, "<div class='letter'>$&</div>")
          );
        })}
      </div>
    );
  }
}
