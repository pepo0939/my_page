import React, { Component } from "react";
import Splitter from "../splitter/splitter";
import { TimelineMax } from "gsap/all";
import PLAYER_CONTROL_STATUS from "../../helpers/playerControlStatus";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    fontSize: "6vh"
  },
  constrolSet: {
    position: "absolute",
    bottom: 0,
    right: 0
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
      rejoin: false,
      words: [],
      sentences: [],
      characters: []
    };
  }

  setDivisionRefs = ({ words, sentences, characters }) =>
    this.setState({ words, sentences, characters });

  static getDerivedStateFromProps(props, state) {
    if (props.playerStatus === PLAYER_CONTROL_STATUS.PLAYING) {
      if (state.rejoin === true) {
        return { rejoin: false };
      }
    }
    if (props.playerStatus === PLAYER_CONTROL_STATUS.STOPED) {
      return { rejoin: true };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.areEquals(prevState.sentences, this.state.sentences) &&
      !this.areEquals(prevState.words, this.state.words) &&
      !this.areEquals(prevState.characters, this.state.characters)
    )
      this.generateTimeline();

    if (this.props.playerStatus === PLAYER_CONTROL_STATUS.PLAYING) {
      this.timeline.play();
    }

    if (this.props.playerStatus === PLAYER_CONTROL_STATUS.PAUSED) {
      this.timeline.pause();
    }
  }

  areEquals = (listA, listB) => {
    if (listA.length !== listB.length) return false;
    return !listA.some((elem, index) => elem !== listB[index]);
  };

  generateTimeline = () => {
    this.timeline = new TimelineMax({ repeat: -1, repeatDelay: 1 });
    if (this.state.sentences[0])
      this.timeline
        .from(this.state.sentences[0], 1, {
          opacity: 0
        })
        .to(this.state.sentences[0], 1, {
          opacity: 0
        });
    if (this.state.sentences[1])
      this.timeline
        .from(this.state.sentences[1], 1, {
          opacity: 0,
          y: 100
        })
        .to(this.state.sentences[1], 1, {
          opacity: 0,
          x: -100
        });
    if (this.state.words)
      this.timeline.staggerFrom(
        this.state.words.filter(w => w.id.includes("s2")),
        1,
        {
          opacity: 0,
          rotationX: -90,
          transformOrigin: "50% top"
        },
        0.2
      );
    if (this.state.characters)
      this.timeline.staggerTo(
        this.state.characters.filter(c => c.id.includes("s2")),
        0.5,
        {
          opacity: 0,
          y: -20
        },
        0.1
      );
  };

  render() {
    return (
      <div style={styles.container}>
        <Splitter
          getDivisionRefs={this.setDivisionRefs}
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
