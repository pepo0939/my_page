import React, { Component } from "react";
import Splitter from "../splitter/splitter";
import { TimelineMax } from "gsap/all";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column"
  }
};

const splitterStyles = {
  word: {
    position: "absolute",
    margin: "auto",
    fontSize: "6vh"
  }
};

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.words = [];
    this.tl = new TimelineMax({ repeat: -1, repeatDelay: 1 });
  }

  setWords = words => (this.words = words);

  componentDidMount() {
    this.words.forEach(word => {
      this.tl.from(word, 1, {
        opacity: 0
      }).to(word, 1, {
        opacity: 0
      });
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <Splitter
          getWords={this.setWords}
          styles={splitterStyles}
          splitIn={["words"]}
        >
          <p>Hello</p>
          <p>
            I'm a Web Developer... And this page is an exaple of what I can do
          </p>
        </Splitter>
      </div>
    );
  }
}
