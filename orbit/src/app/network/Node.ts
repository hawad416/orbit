import * as THREE from "three";

export class Node {
    // attributes to identify a student.
    private id: string;  // will use netId for now.
    private fullName: string;
    private major: string;
    private year: number;
    private interests: string[];

    // attributes to identify a student Node position in 3D space within THreeJS.
    private range: number; // boundary it will need to lie within.
    private position: THREE.Vector3;
    private index: number; 

    constructor(){
        this.range = 100;     

        // this will place the node in a random position within the range boundary
        // but how do I guarantee the nodes don't overlap? we will essentially have a unqiue index for each node.
        this.position = new THREE.Vector3(
            Math.random() * this.range,
            Math.random() * this.range,
            Math.random() * this.range
        )

        this.index = -1;
    }


    public getId(): string {
        return this.id;
    }

    public getFullName(): string {
        return this.fullName;
    }

    public getMajor(): string {
        return this.major;
    }

    public getYear(): number {
        return this.year;
    }

    public getInterests(): string[] {
        return this.interests;
    }

    public getIndex(): number {
        return this.index;
    }
    public setIndex(value: number): void {
        this.index = value;
    }
    public getPosition(): THREE.Vector3 {
        return this.position;
    }
    }