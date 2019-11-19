import React, { Component } from "react";
import * as THREE from "three";
import PLAYER_CONTROL_STATUS from "../../helpers/playerControlStatus";

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    margen: 0
  }
};

const RED = 2,
  BLUE = 4,
  GREEN = 0;

const returnHex = value => {
  const rtn = parseInt(value, 0).toString(16);
  return rtn.length === 1 ? "0" + rtn : rtn;
};

export default class ThreeExample extends Component {
  constructor(props) {
    super(props);
    this.rotation = [0.1, 0.1];
    this.container = React.createRef();
  }

  componentDidMount() {
    const width = this.container.current.clientWidth;
    const height = this.container.current.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 4;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#ffffff");
    this.renderer.setSize(width, height);
    this.container.current.appendChild(this.renderer.domElement);

    this.light = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(this.light);

    this.pointLight = new THREE.PointLight(0xffffff);
    this.pointLight.position.set(50, 50, 50);
    this.scene.add(this.pointLight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: "#ff0000" });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.start();

    window.addEventListener("resize", this.updateSize);
  }

  updateSize = () => {
    const width = this.container.current.clientWidth;
    const height = this.container.current.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  componentWillUnmount() {
    this.stop();
    this.container.current.removeChild(this.renderer.domElement);
    window.removeEventListener("resize", this.updateSize);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    if (this.props.playerStatus === PLAYER_CONTROL_STATUS.PLAYING) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  mouseDownHandler = event => {
    event.target.addEventListener("mousemove", this.changeCubeColor);
  };

  mouseUpHandler = event => {
    event.target.removeEventListener("mousemove", this.changeCubeColor);
  };

  changeCubeColor = event => {
    const width = this.container.current.clientWidth;
    const colorFunc = this.getColorFunction(width, event.clientX);
    const color = `#${colorFunc(RED)}${colorFunc(GREEN)}${colorFunc(BLUE)}`;

    this.cube.material.color.set(color);
  };

  getColorFunction = (width, position) => {
    const part = width / 6;

    const section = [...Array(6).keys()].find(
      pos => part * pos <= position && position < part * (pos + 1)
    );

    return (color = 0) => {
      let colorSection = section + color;

      if (colorSection >= 6) colorSection = colorSection - 6;

      const hexFromPosition = (position - part * section) * (0xff / part);

      switch (colorSection) {
        case 0:
          return returnHex(hexFromPosition);
        case 1:
        case 2:
          return "ff";
        case 3:
          return returnHex(0xff - hexFromPosition);
        default:
          return "00";
      }
    };
  };

  render() {
    return (
      <div
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        style={styles.container}
        ref={this.container}
      />
    );
  }
}
