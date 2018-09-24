import React, { Component } from "react";
import NavBar from "../navBar/navBar";
import Section from "../section/section";
import Introduction from "../introduction/introduction";
import Welcome from "../welcome/welcome";

const styles = {
  container: {}
};

export default class mainPage extends Component {
  constructor() {
    super();
    this.state = {
      sections: [<Welcome />, <Introduction />]
    };
  }

  renderSection = (section, index) => {
    return <Section key={index}>{section}</Section>;
  };

  render() {
    return (
      <div style={styles.container}>
        {this.state.sections.map(this.renderSection)}
        <NavBar />
      </div>
    );
  }
}
