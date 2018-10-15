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
  sentence: {
    margin: "auto",
    position: "absolute",
    fontSize: "6vh",
    textAlign: "center",
    padding: "22vw"
  },
  word: {
    fontSize: "6vh"
  }
};

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.words = [];
    this.sentences = [];
    this.characters = [];
    this.timeline = new TimelineMax({ repeat: -1, repeatDelay: 1 });
  }

  setWords = words => (this.words = words);
  setSentences = sentences => (this.sentences = sentences);
  setCharacters = characters => (this.characters = characters);

  componentDidMount() {
    this.timeline
      .from(this.sentences[0], 1, {
        opacity: 0
      })
      .to(this.sentences[0], 1, {
        opacity: 0
      });

    this.timeline
      .from(this.sentences[1], 1, {
        opacity: 0,
        y: 100
      })
      .to(this.sentences[1], 1, {
        opacity: 0,
        x: -100
      });

    this.timeline.staggerFrom(
      this.words.filter(w => w.id.includes("s2")),
      1,
      {
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% top"
      },
      0.2
    );

    this.timeline.staggerTo(
      this.characters.filter(c => c.id.includes("s2")),
      0.5,
      {
        opacity: 0,
        y: -20
      },
      0.1
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <Splitter
          getWords={this.setWords}
          getSentences={this.setSentences}
          getCharacters={this.setCharacters}
          styles={splitterStyles}
          splitIn={["sentences", "words", "characters"]}
        >
          <p>Hello</p>
          <p>I'm a Web Developer... </p>
          <p>And this page is an exaple of what I can do</p>
        </Splitter>
      </div>
    );
  }
}
