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

export default class ThreeExample extends Component {
  componentDidMount() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 4;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#ffffff");
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);

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
  }

  componentWillUnmount() {
    this.stop();
    this.container.removeChild(this.renderer.domElement);
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

  render() {
    return (
      <div
        style={styles.container}
        ref={ref => {
          this.container = ref;
        }}
      />
    );
  }
}
