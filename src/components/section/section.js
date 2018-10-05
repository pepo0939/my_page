import React, { Component } from "react";

const style = {
  container: {
    width: "100vw",
    height: "100vh",
    borderBottom: "2px solid black"
  }
};

export default class Section extends Component {
  sectionRef = React.createRef();

  componentDidMount() {
    const setHeight = () => {
      this.props.setSectionHeight(this.sectionRef.clientHeight);
    };
    window.addEventListener("resize", setHeight);
    setHeight();
  }

  render() {
    return (
      <div ref={ref => (this.sectionRef = ref)} style={style.container}>
        {this.props.children}
      </div>
    );
  }
}
