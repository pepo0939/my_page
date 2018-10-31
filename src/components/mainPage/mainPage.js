import React, { Component } from "react";
import NavBar from "../navBar/navBar";
import Section from "../section/section";
import Introduction from "../introduction/introduction";
import Welcome from "../welcome";
import ThreeExample from "../theeExample";
import PlayerControl from "../playerControl";

const styles = {
  container: {}
};

export default class mainPage extends Component {
  sectionRef = React.createRef();

  constructor() {
    super();
    //const sections = [<Welcome />, <Introduction />, <ThreeExample />];
    const sections = [
      { component: <Welcome />, name: "Welcome" },
      { component: <Introduction />, name: "Introduction" },
      { component: <ThreeExample />, name: "ThreeJs Example" }
    ];
    this.state = {
      sections,
      selectedSection: sections[0].name,
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
          return section.name;
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
        {section.component}
      </Section>
    );
  };

  scrollTo = goToSection => {
    //this.setState({ selectedSection: goToSection });
    this.state.sections.find((section, index) => {
      if (goToSection === section.name) {
        window.scrollTo({
          top: index * this.state.sectionHeight,
          behavior: "smooth"
        });
        return true;
      }
      return false;
    });
  };

  getSectionName = section => section.name;

  render() {
    return (
      <div style={styles.container}>
        {this.state.sections.map(this.renderSection)}
        <NavBar
          sections={this.state.sections.map(this.getSectionName)}
          selectedSection={this.state.selectedSection}
          scrollTo={this.scrollTo}
        />
        <PlayerControl />
      </div>
    );
  }
}
