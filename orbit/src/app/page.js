"use client";
import React from "react";
import NetworkGraph from "./NetworkGraph";

export default function Home() {
  const [value, setValue] = React.useState("");

    

  return (
    <div>
        hello 
        <NetworkGraph/>
        ok
    </div>
  );
}
