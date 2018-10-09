import React, { Component, Fragment } from "react";

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

const Character = ({ children, id }) => (
  <RefContext.Consumer>
    {({ charRefs }) => (
      <StyleContext.Consumer>
        {({ character: charStyle }) => (
          <Fragment>
            {React.Children.map(children, word =>
              word.split("").map((char, index) => (
                <div
                  ref={charRefs}
                  style={{ ...styles.character, ...charStyle }}
                  key={`${id}c${index}`}
                >
                  {char}
                </div>
              ))
            )}{" "}
          </Fragment>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);

const Word = ({ children, id }) => (
  <RefContext.Consumer>
    {({ wordRefs }) => (
      <StyleContext.Consumer>
        {({ word: wordsStyle }) => (
          <Fragment>
            {React.Children.map(children, elem => (
              <div ref={wordRefs} style={{ ...styles.word, ...wordsStyle }}>
                {elem.split(" ").map((word, index) => (
                  <Character key={`${id}w${index}`} id={`${id}w${index}`}>
                    {word}
                  </Character>
                ))}
              </div>
            ))}
          </Fragment>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);

const Sentence = ({ children, id }) => (
  <RefContext.Consumer>
    {({ sentenceRefs }) => (
      <StyleContext.Consumer>
        {({ sentence: sentStyle }) => (
          <Fragment>
            {React.Children.map(children, elem => (
              <div
                ref={sentenceRefs}
                style={{ ...styles.sentence, ...sentStyle }}
              >
                {elem.props.children.split(" ").map((word, index) => (
                  <Word key={`${id}s${index}`} id={`${id}s${index}`}>
                    {word}
                  </Word>
                ))}
              </div>
            ))}
          </Fragment>
        )}
      </StyleContext.Consumer>
    )}
  </RefContext.Consumer>
);

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
            {this.props.children.map((elem, index) => (
              <Sentence key={index} id={index}>
                {elem}
              </Sentence>
            ))}
          </StyleContext.Provider>
        </RefContext.Provider>
      </div>
    );
  }
}
