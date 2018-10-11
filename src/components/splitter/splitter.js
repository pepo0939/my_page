import React, { Component } from "react";

const divitions = {
  SENTENCE: "SENTENCES",
  WORD: "WORDS",
  CHARACTER: "CHARACTERS"
};

const styles = {
  container: {},
  paragraph: {},
  sentence: {},
  word: { display: "inline" },
  character: { display: "inline" }
};

const StyleContext = React.createContext({});
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
          <div ref={charRefs} style={{ ...styles.character, ...charStyle }}>
            {char}
          </div>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);
const renderCharacters = (text, id = "") =>
  text.split("").map((char, index) => (
    <Character key={`${id}c${index}`} id={`${id}c${index}`}>
      {char}
    </Character>
  ));

const Word = ({ children: word, id }) => (
  <RefContext.Consumer>
    {({ wordRefs }) => (
      <StyleContext.Consumer>
        {({ word: wordsStyle }) => (
          <div ref={wordRefs} style={{ ...styles.word, ...wordsStyle }}>
            {renderCharacters(word, `w${id}`)}{" "}
          </div>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);

const renderWords = (text, id = "") =>
  text.split(" ").map((word, index) => (
    <Word key={`${id}w${index}`} id={`${id}w${index}`}>
      {word}
    </Word>
  ));

const Sentence = ({ children: sentence, id }) => (
  <RefContext.Consumer>
    {({ sentenceRefs }) => (
      <StyleContext.Consumer>
        {({ sentence: sentStyle }) => (
          <div ref={sentenceRefs} style={{ ...styles.sentence, ...sentStyle }}>
            {renderWords(sentence.props.children, `s${id}`)}
          </div>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);

const renderSentences = sentences =>
  sentences.map((elem, index) => (
    <Sentence key={index} id={index}>
      {elem}
    </Sentence>
  ));

export default class Splitter extends Component {
  constructor(props) {
    super(props);

    this.sentences = [];
    this.words = [];
    this.characters = [];

    this.state = {
      cascade: false,
      renderDivition: []
    };
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
    let { splitIn = divitions.SENTENCE } = this.props;
    splitIn = splitIn.toUpperCase();
    return (
      <div style={styles.container}>
        <RefContext.Provider
          value={{
            sentenceRefs: this.sentenceRefs,
            wordRefs: this.wordRefs,
            charRefs: this.charRefs
          }}
        >
          <StyleContext.Provider value={this.props.styles}>
            {splitIn === divitions.SENTENCE &&
              renderSentences(this.props.children)}
            {splitIn === divitions.WORD &&
              renderWords(
                React.Children.map(this.props.children, child => {
                  return child.props.children;
                }).reduce((child, text) => `${child} ${text}`, "")
              )}
          </StyleContext.Provider>
        </RefContext.Provider>
      </div>
    );
  }
}
