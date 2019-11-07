import React, { Component } from "react";

const style = {
  container: {
    width: "100vw",
    height: "100vh"
  }
};

export default class Section extends Component {
  sectionRef = React.createRef();

  componentDidMount = () => {
    window.addEventListener("resize", this.setHeight);
    this.setHeight();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight);
  }

  setHeight = () => {
    if (this.sectionRef && this.sectionRef.current.clientHeight)
      this.props.setSectionHeight(this.sectionRef.current.clientHeight);
  };

  render() {
    return (
      <div
        ref={this.sectionRef}
        style={{
          ...style.container,
          backgroundColor: this.props.backgroundColor
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
