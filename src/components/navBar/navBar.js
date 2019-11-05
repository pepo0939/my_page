import React, { useEffect, useState } from "react";

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
  },
  li: {
    listStyleType: "none",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    alignContent: "center",
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
    margin: "2px 4px 4px 4px",
    border: "2px solid green",
    height: 10,
    width: 10,
    borderRadius: 50,
    transition: "all 1s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, 0)"
  },
  selectedBulletBorder: {
    height: 14,
    width: 14,
    border: "2px solid red"
  }
};

let timeout;
const NavBar = props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisibleTimeout();
  }, []);

  const setVisibleTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => setVisible(false), 2000);
  };

  const renderBullet = section => (
    <div
      style={{
        ...styles.bulletBorder,
        ...(props.selectedSection === section
          ? styles.selectedBulletBorder
          : {})
      }}
    >
      <div
        style={{
          ...styles.bullet,
          ...(props.selectedSection === section ? styles.selectedBullet : {})
        }}
      />
    </div>
  );

  const renderSection = (section, index) => {
    return (
      <li style={styles.li} key={index} onClick={() => props.scrollTo(section)}>
        {renderBullet(section)}
        <span value={section}>{section}</span>
      </li>
    );
  };

  return (
    <ul
      style={{
        ...styles.navBar,
        ...(!visible ? styles.hidden : {})
      }}
      onMouseOver={() => {
        setVisible(true);
      }}
      onMouseLeave={setVisibleTimeout}
    >
      {props.sections.map(renderSection)}
    </ul>
  );
};

export default NavBar;
