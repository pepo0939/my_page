import React, { Component } from "react";
import NavBar from "../navBar/navBar";
import Section from "../section/section";
import Introduction from "../introduction/introduction";
import Welcome from "../welcome/welcome";

const styles = {
  container: {}
};

export default class mainPage extends Component {
  sectionRef = React.createRef();

  constructor() {
    super();
    const sections = [<Welcome />, <Introduction />];
    this.state = {
      sections,
      selectedSection: sections[0].type.name,
      sectionHeight: 0
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    const selectedSection = this.state.sections.reduce(
      (selectedSection, section, index) => {
        if (
          window.scrollY >= index * this.state.sectionHeight &&
          window.scrollY <= (index + 1) * this.state.sectionHeight
        )
          return section.type.name;
        return selectedSection;
      },
      ""
    );
    this.setState({ selectedSection });
  };

  renderSection = (section, index) => {
    return (
      <Section
        key={index}
        setSectionHeight={sectionHeight => this.setState({ sectionHeight })}
      >
        {section}
      </Section>
    );
  };

  scrollTo = goToSection => {
    this.state.sections.find((section, index) => {
      if (goToSection === section.type.name) {
        window.scrollTo({
          top: index * this.state.sectionHeight,
          behavior: "smooth"
        });
        return true;
      }
      return false;
    });
  };

  getSectionName = section => section.type.name;

  render() {
    return (
      <div style={styles.container}>
        {this.state.sections.map(this.renderSection)}
        <NavBar
          sections={this.state.sections.map(this.getSectionName)}
          selectedSection={this.state.selectedSection}
          scrollTo={this.scrollTo}
        />
      </div>
    );
  }
}
