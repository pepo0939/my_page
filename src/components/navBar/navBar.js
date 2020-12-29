import React from "react";
import "./navBar.css";

const styles = {
  navBar: {
    position: "fixed",
    margin: 0,
    top: "50%",
    left: "4%",
    transform: "translate(0, -50%)",
    padding: 0,
    transition: "all 1s"
  },
  hidden: {
    opacity: 0
  }
};

const NavBar = props => {
  const renderBulletWithSVG = section => (
    <svg
      className={`bullet${
        props.selectedSection === section ? " selected" : ""
      }`}
      viewBox="0 0 100 100"
    >
      <circle
        className="border"
        cx="50"
        cy="50"
        r="40"
        stroke="red"
        strokeWidth="10"
        fillOpacity="0"
      />
      <circle className="inner-circule" cx="50" cy="50" r="20" fill="red" />
    </svg>
  );

  const renderSection = (section, index) => {
    return (
      <li
        className="section-name"
        key={index}
        onClick={() => props.scrollTo(section)}
      >
        {renderBulletWithSVG(section)}
        <span value={section}>{section}</span>
      </li>
    );
  };

  return <ul className="navbar">{props.sections.map(renderSection)}</ul>;
};

export default NavBar;
