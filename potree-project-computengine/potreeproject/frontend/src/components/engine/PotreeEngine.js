import React, { Component } from "react";
import * as THREE from "three";
import * as Potree from "potree-core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { open3DModel, getSpecific } from "../../actions/converter";

export class PotreeEngine extends Component {
  static propTypes = {
    open3DModel: PropTypes.func.isRequired,
    getSpecific: PropTypes.func.isRequired,
    ourURL: PropTypes.string
  };
  ourPointCloudLoad(path, name, callback) {
    var loaded = function(pointcloud) {
      if (name !== undefined) {
        pointcloud.name = name;
      }
      callback({ type: "pointcloud_loaded", pointcloud: pointcloud });
    };
    Potree.POCLoader.load(path, function(geometry) {
      if (geometry !== undefined) {
        loaded(new Potree.PointCloudOctree(geometry));
      }
    });
  }

  /*getCloudJSPath(pathJS) {
    console.log("KUTS ", pathJS);
  }*/

  componentDidMount() {
    ///var path = getCloudJSPath();
    //this.props.convertedFiles.map(converted_file.file_id);

    this.path = this.props.ourURL;
    console.log(this.props);
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 4;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //ADD CUBE
    /* const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube); */

    var points = new Potree.Group();
    points.setPointBudget(10000000);
    console.log(typeof points);

    this.scene.add(points);

    Potree.loadPointCloud(
      "media/tester/converted/pointclouds/Palac_Moszna/cloud.js",
      name,
      function(data) {
        var pointcloud = data.pointcloud;
        points.add(pointcloud);
      }
    );
    console.log(typeof pointcloud);
    this.start();
  }
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
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
    //this.cube.rotation.x += 0.01;
    //this.cube.rotation.y += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
  render() {
    return (
      <div
        style={{ width: "100%", height: "1024px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  ourURL: state.convertedFiles.ourURL
});

export default connect(mapStateToProps, { open3DModel, getSpecific })(
  PotreeEngine
);
