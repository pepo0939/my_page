import React, { Component } from "react";

const styles = {
  navBar: {
    position: "fixed",
    backgroundColor: "lightgray",
    margin: 0,
    top: "50%",
    transform: "translate(0, -50%)"
  }
};

export default class NavBar extends Component {
  render() {
    return (
      <div style={styles.navBar}>
        <div>
          <span>Intro</span>
        </div>
      </div>
    );
  }
}
