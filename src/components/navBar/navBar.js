import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  navBar: {
    position: "fixed",
    backgroundColor: "lightgray",
    margin: 0,
    top: "50%",
    left: "4%",
    transform: "translate(0, -50%)",
    padding: 0
  },
  li: {
    listStyleType: "none",
    display: "flex",
    cursor: "pointer"
  },
  navButton: {
    height: 12,
    width: 12,
    marginTop: 2,
    backgroundColor: "green",
    borderRadius: 22
  }
};

export default class NavBar extends Component {
  propTypes: { sections: PropTypes.array.isRequired };

  renderSection = (section, index) => {
    return (
      <li
        style={styles.li}
        key={index}
        onClick={() => this.props.scrollTo(section)}
      >
        <div
          style={{
            ...styles.navButton,
            ...{
              backgroundColor:
                this.props.selectedSection === section
                  ? "red"
                  : styles.navButton.backgroundColor
            }
          }}
        />
        <span value={section}>{section}</span>
      </li>
    );
  };

  render() {
    return (
      <ul style={styles.navBar}>
        {this.props.sections.map(this.renderSection)}
      </ul>
    );
  }
}
