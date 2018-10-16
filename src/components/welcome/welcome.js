import React, { Component } from "react";
import Splitter from "../splitter/splitter";
import { TimelineMax } from "gsap/all";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    fontSize: "6vh"
  }
};

const splitterStyles = {
  sentence: {
    position: "absolute",
    textAlign: "center",
    padding: "22vw"
  },
  container: {
    position: "absolute",
    textAlign: "center",
    padding: "22vw"
  }
};

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.words = [];
    this.sentences = [];
    this.characters = [];
    this.timeline = new TimelineMax({ repeat: -1, repeatDelay: 1 });
    this.state = {
      rejoin: false
    };
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
      <div
        style={styles.container}
        onClick={() => {
          this.setState({ rejoin: true });
        }}
      >
        <Splitter
          getWords={this.setWords}
          getSentences={this.setSentences}
          getCharacters={this.setCharacters}
          styles={splitterStyles}
          splitIn={["sentences", "words", "characters"]}
          rejoin={this.state.rejoin}
        >
          Hello. I'm a Web Developer... And this page is an example of what I
          can do
        </Splitter>
      </div>
    );
  }
}
