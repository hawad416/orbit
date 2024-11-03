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
      const geometry = new THREE.SphereGeometry(4, 32, 16);
      const material = new THREE.MeshBasicMaterial({ color: "green"});
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

  function drawLineBetweenNodes(node1, node2) {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue color
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(
        node1.getPosition().x,
        node1.getPosition().y,
        node1.getPosition().z
      ),
      new THREE.Vector3(
        node2.getPosition().x,
        node2.getPosition().y,
        node2.getPosition().z
      ),
    ]);
    const line = new THREE.Line(geometry, material);
    return line;
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
      let camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );


      // Set up renderer
      const renderer = new THREE.WebGLRenderer({canvas: canvas});
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);


      // Example of adding a cube
      const geometry = new THREE.BoxGeometry(10,10,10);
      const material = new THREE.MeshBasicMaterial({ color: "pink", wireframe: true});
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const geometry2 = new THREE.BoxGeometry(10,10,10);
      const material2 = new THREE.MeshBasicMaterial({ color: "pink", wireframe: true});
      const cube2 = new THREE.Mesh(geometry2, material2);
      cube2.position.x = 200

      scene.add(cube2);


      camera.position.set(0, 0, 300);

      const totalNodes = 12;
      const graph = new Graph(totalNodes);
      const node1 = new Node();
      const node2 = new Node();
      const node3 = new Node();
      const node4 = new Node();
      const node5 = new Node();
      const node6 = new Node();
      const node7 = new Node();
      const node8 = new Node();
      const node9 = new Node();
      const node10 = new Node();
      const node11 = new Node();
      const node12 = new Node();
      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);
      graph.addNode(node4);
      graph.addNode(node5);
      graph.addNode(node6);
      graph.addNode(node7);
      graph.addNode(node8);
      graph.addNode(node9);
      graph.addNode(node10);
      graph.addNode(node11);
      graph.addNode(node12);



      graph.addEdge(node1, node2);
      graph.addEdge(node1, node3);
      graph.addEdge(node1, node4);

      graph.addEdge(node2, node1);
      graph.addEdge(node2, node8);
      graph.addEdge(node8, node3);
      graph.addEdge(node4, node9);
      
  
      
      
    
      console.log(graph);
      const nodeMeshes =  initializeNodes(graph.getNodes());

      for (let nodeMesh of nodeMeshes) {
        console.log("nodmesh")
        console.log(nodeMesh)
        scene.add(nodeMesh);
      }


      for(let i = 0; i < totalNodes; i++) {
        const node = graph.getNodes()[i];
        const edges = graph.getNeighbors(node);

        for(let j = 0; j < edges.length; j++) {
          const line = drawLineBetweenNodes(node, edges[j]);
          scene.add(line);
        }

      }

      renderer.render(scene, camera);

      const animate = function () {
        requestAnimationFrame(animate);

        // Rotate the cube for demonstration
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

         // Rotate the cube for demonstration
         cube2.rotation.x += 0.01;
         cube2.rotation.y += 0.01;

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