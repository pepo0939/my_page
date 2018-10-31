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
    const setHeight = () => {
      if (this.sectionRef && this.sectionRef.clientHeight)
        this.props.setSectionHeight(this.sectionRef.clientHeight);
    };
    window.addEventListener("resize", setHeight);
    setHeight();
  };

  render() {
    return (
      <div ref={ref => (this.sectionRef = ref)} style={style.container}>
        {this.props.children}
      </div>
    );
  }
}
