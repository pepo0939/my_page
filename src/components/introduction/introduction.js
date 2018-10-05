import React, { Component } from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    paddingLeft: "30vw",
    paddingRight: "30vw"
  }
};

export default class Introduction extends Component {
  displayName = "Introduction";
  render() {
    return (
      <div style={styles.container}>
        <p>About</p>
        <p>
          I'm Franco Luciano Rossi an Program Engineer, Web Developer, Gamer and
          Martial Art Teacher. This page was created to present myself and
          showcase my abilities as a Web Developer. This page will contain
          diferent sections with examples and test. Enjoy...
        </p>
      </div>
    );
  }
}
