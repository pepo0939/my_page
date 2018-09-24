import React, { Component } from "react";

const style = {
  container: {
    background: "lightblue",
    width: "100vw",
    height: "100vh"
  }
};

export default class Section extends Component {
  render() {
    return <div style={style.container}>{this.props.children}</div>;
  }
}
