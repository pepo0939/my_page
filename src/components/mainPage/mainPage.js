import React, { Component } from "react";
import NavBar from "../navBar/navBar";
import Section from "../section/section";
import Introduction from "../introduction/introduction";
import Welcome from "../welcome/welcome";
import ThreeExample from "../theeExample/threeExaple";

const styles = {
  container: {}
};

export default class mainPage extends Component {
  sectionRef = React.createRef();

  constructor() {
    super();
    const sections = [<Welcome />, <Introduction />, <ThreeExample />];
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
    //TODO: check how to change selectedSection depending on how mach of the section is visible on the screen
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
    //this.setState({ selectedSection: goToSection });
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
