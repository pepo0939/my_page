import React from "react";

const styles = {
  container: {
    height: "100vh",
    display: "flex"
  },
  p: {
    margin: "auto"
  }
};

export default () => (
  <div style={styles.container}>
    <p style={styles.p}>
      You can contact me on{" "}
      <a href={"https://www.linkedin.com/in/rossifranco/"}>LinkedIn</a>
      <br />
      You can see my repositories and this page on{" "}
      <a href={"https://github.com/pepo0939"}>GitHub</a>
      <br />
      <a href={"https://codesandbox.io/"}>CodeSandbox</a> and you can see the
      code <a href={"https://codesandbox.io/s/olppr9pnnq"}>here</a>
      <br />
      For more questions you can reach me on
      <a href={"mailto:pepo0939@gmail.com"}>pepo0939@gmail.com</a>
    </p>
  </div>
);
