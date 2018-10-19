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

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.areEquals(prevState.sentences, this.state.sentences) &&
      !this.areEquals(prevState.words, this.state.words) &&
      !this.areEquals(prevState.characters, this.state.characters)
    )
      this.generateTimeline();
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

  handlePlayPress = () => {
    if (this.state.rejoin === true) {
      this.setState({ rejoin: false });
    }
    this.timeline.play();
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

        <div style={styles.constrolSet}>
          <img
            alt={"play"}
            onClick={this.handlePlayPress}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFiSURBVGhD7dk9SsRQFMXxqNhoKVaChQsQxd4NuAHFTkQUwTXYibMIrSxFrCzstHMBaicIdjYifiCi/m8RmOKMM3kzyX0M98CvCe/dcEgIgVdEIpHI0GUGq9hysIEl9J11vOHX2QlGkRR7Eu9Qgz1sIyn2OqmBXs6QlB2ogV6ukZQoUpMoEkVq0miRVxzgue3aoDRapLzZLK6g1qRyKWIZwz6+odZW5VakzDIeodZX4V7EMgX7xVB7epVFEcsIdvEBtbebbIqUmcct1P7/ZFfEMoFjqBmdZFnEYq/aPdQcJdsiK/iCmqNkV2QcLfxAzegkqyJzuIHa2002RdbwArWvF+5FJnEEtb4K1yILuINaW5VLEfu07uETal2KRos8YBHnbdcGpdEidYoiUaQmUWRoimxCDfRyiaTYSZEa6MX+mJNjJ0VqaNOeMI3k2HGXnRSdwh5t0y5wiL5KRCKRSKSmFMUfaI+iASkSqzcAAAAASUVORK5CYII="
          />
          <img
            alt={"pause"}
            onClick={() => {
              this.timeline.pause();
            }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEpSURBVGhD7dmhS4NBHMbxF4Nl2WQ2mJeM5vkHCIJBhsxiNFiWNZmMNuMwGgSLed1gkeGfoBZRvz+4F37IhXe33R2O5wufcgcnD7O9jVJKrVyb2MdxBUfoY+EO8I6fym6xhqTsl/hA7OEaRkjK/p1iD9Zyh6ROEHuwlickpSGZaIiGZFJ8yCPGeHFn5hNXuMZXOJtH0SGvWIe1BX93jjYb5O+6KDrk7x/zd3t2EFrG251b9pCBHYQ0JCUNcfk7DQk0RENc/k5DAg3REJe/+1dDpmjrwd8dou0M/q6LokO+cYpt3ISz1jN2sItZOJtH0SE5aYiGZKIhKzNkiNiDtTwgKftSFHuwlkskZ1+KYo+W9oYNJGefu+xL0QT205Z2jwssNEIppVSmmuYXw8OmiE7qzHYAAAAASUVORK5CYII="
          />
          <img
            alt={"stop"}
            onClick={() => {
              this.setState({ rejoin: true });
            }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACrSURBVGhD7dK9EYFREEbhLyIyfgoQCMjohhJEYqqhIMqgCAQc+b2JvZtwzswT77wz25mZmdl39TBLNEFqAxzxwCvZBUukdELpaJYbRmhaH3eUDmZao2lTlA5lO6BpDglySC2HBDmklkOCHFLLIUEOqeWQIIfUckiQQ2o5JMghtX5myBilQ9m2aN4ZpWNZnligeStcUTra2mfEDmkNscE+0eed5jAzM7M/reveoxVeoBUzn9YAAAAASUVORK5CYII="
          />
        </div>
      </div>
    );
  }
}
