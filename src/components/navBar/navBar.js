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
    cursor: "pointer",
    alignItems: "center"
  },
  outerButton: {
    height: 20,
    width: 20,
    marginTop: -1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  navButton: {
    position: "absolute",
    height: 12,
    width: 12,
    margin: "auto",
    backgroundColor: "green",
    borderRadius: 50,
    transition: "all 1s"
  },
  selectedButton: {
    height: 10,
    width: 10,
    backgroundColor: "red"
  },
  buttonBorder: {
    border: "2px solid green",
    height: 10,
    width: 10,
    borderRadius: 50,
    transition: "all 1s"
  },
  selectedButtonBorder: {
    height: 14,
    width: 14,
    border: "2px solid red"
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
        <div style={styles.outerButton}>
          <div
            style={{
              ...styles.buttonBorder,
              ...(this.props.selectedSection === section
                ? styles.selectedButtonBorder
                : {})
            }}
          />
          <div
            style={{
              ...styles.navButton,
              ...(this.props.selectedSection === section
                ? styles.selectedButton
                : {})
            }}
          />
        </div>
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
