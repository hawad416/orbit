"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Node } from "./network/Node";
import { Graph } from "./network/Graph";

export default function Home() {
  const mountRef = useRef(null); // used to mount renderers DOM element. (& unmount on cleanup)

  // log entire class with its fields. interesting you can see private fields. 


  // return THREE.MESH
  function initializeNodes(nodes) {
    let nodeMeshes = [];

    for(let mesh of nodes) {
      const geometry = new THREE.SphereGeometry(2, 32, 16);
      const material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true});
      const nodeSphere = new THREE.Mesh(geometry, material);

      nodeSphere.position.set(
        mesh.getPosition().x,
        mesh.getPosition().y,
        mesh.getPosition().z
      )

      nodeMeshes.push(nodeSphere);
    }

    return nodeMeshes
  }


  /* 
     since our nextjs only runs on the server side, we won't have access to properties on the client side such as the window and dom elements.
     thus we need to utilize useEffect, since useEffect hook is only run on client side and will have the ability to access the window element.   
  
  */

  useEffect(() => {
    if (typeof window !== "undefined") {
      const canvas = document.querySelector("canvas.webgl");

      console.log(canvas);

      // Initialize scene and camera once the component has mounted
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );


      // Set up renderer
      const renderer = new THREE.WebGLRenderer({canvas: canvas});
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Example of adding a cube
      const geometry = new THREE.BoxGeometry(1,1,1);
      const material = new THREE.MeshBasicMaterial({ color: "brown", wireframe: true});
      const cube = new THREE.Mesh(geometry, material);
   //   scene.add(cube);

      const geometry2 = new THREE.BoxGeometry(3,3,3);
      const material2 = new THREE.MeshBasicMaterial({ color: "red", wireframe: true});
      const cube2 = new THREE.Mesh(geometry2, material2);
      cube2.position.x = 5

     // scene.add(cube2);

      camera.position.z = 5;
      camera.position.set(0, 0, 300);

      const totalNodes = 6;
      const graph = new Graph(totalNodes);
      const node1 = new Node();
      const node2 = new Node();
      const node3 = new Node();
      const node4 = new Node();
      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);
      graph.addNode(node4);
      graph.addEdge(node1, node2);
      graph.addEdge(node1, node3);
      graph.addEdge(node1, node4);
      
    
      console.log(graph);
      const nodeMeshes =  initializeNodes(graph.getNodes());

      for (let nodeMesh of nodeMeshes) {
        console.log("nodmesh")
        console.log(nodeMesh)
        scene.add(nodeMesh);
      }


      renderer.render(scene, camera);

      document.body.appendChild(renderer.domElement);



      const animate = function () {
        requestAnimationFrame(animate);

        // Rotate the cube for demonstration
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);

        return;
      };

      animate();

    }
  }, []);

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>orbit 🪩</title>
      </head>
      <body style={{ margin: 0 }}>
        <canvas className="webgl"></canvas>
        <h1>hey lets get three js running</h1>
      </body>
    </>
  );



/// find out why mount gave errors, of unable to removeChild from node

      //mountRef.current.appendChild(renderer.domElement);

//<div ref={mountRef}></div>

      // Clean up on unmount
      // return () => {
      //   mountRef.current.removeChild(renderer.domElement); 
}