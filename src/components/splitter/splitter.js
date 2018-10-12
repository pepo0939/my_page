import React, { Component } from "react";

const divitionsType = {
  SENTENCES: "SENTENCES",
  WORDS: "WORDS",
  CHARACTERS: "CHARACTERS"
};

let count = 0;

const styles = {
  container: {},
  paragraph: {},
  sentence: {},
  word: { display: "inline" },
  character: { display: "inline" }
};

const StyleContext = React.createContext();
const RefContext = React.createContext({
  sentenceRefs: () => {},
  wordRefs: () => {},
  charRefs: () => {}
});

const Character = ({ children: char, id }) => (
  <RefContext.Consumer>
    {({ charRefs }) => (
      <StyleContext.Consumer>
        {({ character: charStyle }) => (
          <div ref={charRefs} style={charStyle}>
            {char}
          </div>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);
const renderCharacters = (splitIn, text, id = "") =>
  text.split("").map((char, index) => (
    <Character key={`${id}c${index}`} id={`${id}c${index}`}>
      {char}
    </Character>
  ));

const Word = ({ children: word, id, splitIn }) => (
  <RefContext.Consumer>
    {({ wordRefs }) => (
      <StyleContext.Consumer>
        {({ word: wordsStyle = {} }) => (
          <div ref={wordRefs} style={wordsStyle}>
            {renderedDivition(
              splitIn.filter(div => div !== divitionsType.WORDS),
              word,
              `w${id}`
            )}{" "}
          </div>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);

const renderWords = (splitIn, text, id = "") =>
  text
    .split(" ")
    .filter(word => word !== "")
    .map((word, index) => (
      <Word key={`${id}w${index}`} id={`${id}w${index}`} splitIn={splitIn}>
        {word}
      </Word>
    ));

const Sentence = ({ children: sentence, id, splitIn }) => (
  <RefContext.Consumer>
    {({ sentenceRefs }) => (
      <StyleContext.Consumer>
        {({ sentence: sentStyle }) => (
          <div ref={sentenceRefs} style={sentStyle}>
            {renderedDivition(
              splitIn.filter(div => div !== divitionsType.SENTENCES),
              sentence,
              `s${id}`
            )}
          </div>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);

const renderSentences = (splitIn, sentences) =>
  sentences.map((sentence, index) => (
    <Sentence key={index} id={index} splitIn={splitIn}>
      {sentence}
    </Sentence>
  ));

const renderedDivition = (splitIn, children, id) => {
  const arrayStringChildren = React.Children.map(children, child => {
    return !child.type ? child : child.props.children;
  });

  if (splitIn.some(divition => divition === divitionsType.SENTENCES))
    return renderSentences(splitIn, arrayStringChildren);

  if (splitIn.some(divition => divition === divitionsType.WORDS))
    return renderWords(
      splitIn,
      arrayStringChildren.reduce(
        (text, child) => (text === "" ? child : `${child} ${text}`),
        ""
      ),
      id
    );

  if (splitIn.some(divition => divition === divitionsType.CHARACTERS))
    return renderCharacters(
      splitIn,
      arrayStringChildren.reduce(
        (text, child) => (text === "" ? child : `${child} ${text}`),
        ""
      ),
      id
    );

  return children;
};

export default class Splitter extends Component {
  constructor(props) {
    super(props);

    this.sentences = [];
    this.words = [];
    this.characters = [];
  }

  sentenceRefs = sRef => this.sentences.push(sRef);
  wordRefs = wRef => this.words.push(wRef);
  charRefs = cRef => this.characters.push(cRef);

  componentDidMount() {
    const {
      getSentences = () => {},
      getWords = () => {},
      getCharacters = () => {}
    } = this.props;
    getSentences(this.sentences);
    getWords(this.words);
    getCharacters(this.characters);
  }

  render() {
    let {
      styles: customeStyles,
      splitIn = [divitionsType.SENTENCE],
      children
    } = this.props;
    customeStyles = { ...styles, ...customeStyles };
    splitIn = splitIn.map(div => div.toUpperCase());

    if (!children) return null;

    return (
      <div style={styles.container}>
        <RefContext.Provider
          value={{
            sentenceRefs: this.sentenceRefs,
            wordRefs: this.wordRefs,
            charRefs: this.charRefs
          }}
        >
          <StyleContext.Provider value={customeStyles}>
            {renderedDivition(splitIn, children)}
          </StyleContext.Provider>
        </RefContext.Provider>
      </div>
    );
  }
}
