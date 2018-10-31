import React from "react";

const styles = {
  container: {
    height: "100vh"
  },
  list: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "space-between",
    textAlign: "center",
    flexDirection: "column"
  }
};

export default () => (
  <div style={styles.container}>
    <ul style={styles.list}>
      <li>
        You can contact me on{" "}
        <a href={"https://www.linkedin.com/in/rossifranco/"}>LinkedIn</a>
      </li>
      <li>
        You can see my repositories and this page on{" "}
        <a href={"https://github.com/pepo0939"}>GitHub</a>
      </li>
      <li>
        This page was made on{" "}
        <a href={"https://codesandbox.io/"}>CodeSandbox</a> and you can see the
        code <a href={"https://codesandbox.io/s/olppr9pnnq"}>here</a>
      </li>
      <li>
        For more questions you can reach me on{" "}
        <a href={"mailto:pepo0939@gmail.com"}>pepo0939@gmail.com</a>
      </li>
    </ul>
  </div>
);
