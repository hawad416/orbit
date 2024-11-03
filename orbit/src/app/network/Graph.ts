import { Node } from "./Node";

export class Graph {
    private nodes: Node[];
    private totalNodes: number;
    private adjacencyMatrix: number[][] = [];
    private indexPosition:number;

    constructor(totalNodes: number) {
      this.nodes = [];
      this.totalNodes = totalNodes;

      for (let i = 0; i < this.totalNodes; i++) {
        this.adjacencyMatrix[i] = [];
        for (let j = 0; j < this.totalNodes; j++) {
          this.adjacencyMatrix[i][j] = 0;
        }
      }
      this.indexPosition = 0;
    }

    public addNode(node:Node):void {
        node.setIndex(this.indexPosition);
        this.nodes.push(node);
        console.log("node added!")
        this.indexPosition++; // this counts the numer of ndoes we have added and increments for each node.

    }


    // if we have a list of Nodes created, we need to then define the relationship
    // between various nodes utilizing our adjacency matrix. basically same as adjacency list. 
    // to define the relationship we add an edge between the nodes. 

    // for the purposes of my implemnetation, this will be an undirected graph or bi-directional graph
    // meaning an edge between Node A and Node B is the same as an edge between Node B and Node A.

    public addEdge(nodeA:Node, nodeB:Node):void {
        if(nodeA == null || nodeB == null) {
            return;
        }

        // check for self loop in the graph.
        if (nodeA.getIndex() === -1 || nodeB.getIndex() === -1) return; // one of these nodes have yet to be added to the graph.
        if(nodeA.getIndex() == nodeB.getIndex()) return;


        const nodeAIndex= nodeA.getIndex();
        const nodeBIndex = nodeB.getIndex();

        this.adjacencyMatrix[nodeAIndex][nodeBIndex] = 1;
        this.adjacencyMatrix[nodeBIndex][nodeAIndex] = 1;

    }

    // function that gets neighbors of each node. because if i want to visualize
    // my graph, i need to immediatley be able to quickly access
    // a node + everything connnected to that node!

    public getNeighbors(node:Node){
        let neighbors:Node[] = [];

        // index in NodeList should correspond to index or row where it lies in the adjacency matrix.
        const nodeIndex = node.getIndex();

        for(let i = 0; i < this.totalNodes; i++){
            if(this.adjacencyMatrix[nodeIndex][i] == 1 && i != node.getIndex()){
                neighbors.push(this.nodes[i]);
            }
        }

        return neighbors;
    }

    public getNodes():Node[]{
        return this.nodes;
    }
    

  }
  