import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  navBar: {
    position: "fixed",
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
    alignItems: "center",
    paddingBottom: 8
  },
  bulletContainer: {
    height: 20,
    width: 20,
    marginTop: -4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bullet: {
    position: "absolute",
    height: 12,
    width: 12,
    margin: "auto",
    backgroundColor: "green",
    borderRadius: 50,
    transition: "all 1s"
  },
  selectedBullet: {
    height: 9,
    width: 9,
    backgroundColor: "red"
  },
  bulletBorder: {
    border: "2px solid green",
    height: 10,
    width: 10,
    borderRadius: 50,
    transition: "all 1s"
  },
  selectedBulletBorder: {
    height: 14,
    width: 14,
    border: "2px solid red"
  }
};

export default class NavBar extends Component {
  propTypes: { sections: PropTypes.array.isRequired };

  renderBullet = section => (
    <div style={styles.bulletContainer}>
      <div
        style={{
          ...styles.bulletBorder,
          ...(this.props.selectedSection === section
            ? styles.selectedBulletBorder
            : {})
        }}
      />
      <div
        style={{
          ...styles.bullet,
          ...(this.props.selectedSection === section
            ? styles.selectedBullet
            : {})
        }}
      />
    </div>
  );

  renderSection = (section, index) => {
    return (
      <li
        style={styles.li}
        key={index}
        onClick={() => this.props.scrollTo(section)}
      >
        {this.renderBullet(section)}
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
