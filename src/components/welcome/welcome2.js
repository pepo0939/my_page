import React, { useEffect, useState } from "react";
import Splitter from "../splitter/splitter-hooks";
//import Splitter from "react-text-splitter";
import PLAYER_CONTROL_STATUS from "../../helpers/playerControlStatus";
import { generateTimeline, play, pause } from "./generateTimeline";

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

export default ({ playerStatus }) => {
  const [rejoin, setRejoin] = useState(false);
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    generateTimeline(sentences, words, characters);
  }, [words, sentences, characters]);

  const setDivisionRefs = ({ words, sentences, characters }) => {
    setWords(words);
    setSentences(sentences);
    setCharacters(characters);
  };

  useEffect(() => {
    if (playerStatus === PLAYER_CONTROL_STATUS.PLAYING) {
      play();
      if (rejoin) {
        setRejoin(false);
      }
    }

    if (playerStatus === PLAYER_CONTROL_STATUS.PAUSED) {
      pause();
    }
    if (playerStatus === PLAYER_CONTROL_STATUS.STOPED) {
      setRejoin(true);
    }
  }, [playerStatus, rejoin]);

  return (
    <div style={styles.container}>
      <Splitter
        getDivisionRefs={setDivisionRefs}
        styles={splitterStyles}
        splitIn={["sentences", "words", "characters"]}
        rejoin={rejoin}
      >
        Hello. I'm a Web Developer... And this page is an example of what I can
        do
      </Splitter>
    </div>
  );
};
