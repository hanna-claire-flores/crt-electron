import React from "react";
import { Button } from "@material-ui/core";
// import Plotly from "plotly.js-dist";

// const renderPlot = async (pRef, dRef, data) => {
//   pRef.current = await Plotly.newPlot(dRef.current, data, {}, { responsive: true });
// };

const Import = () => {
  const [selFile, setSelFile] = React.useState("nothin");

  const waitForFile = async () => {
    const filePath = await window.crtApi.openFile();
    setSelFile(filePath);
  };

  const sendMessage = () => {
    window.crtApi.rendererToMain("Sent From Import");
  };

  return (
    <div>
      <div>{selFile}</div>
      <Button onClick={waitForFile}>Click me</Button>
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default Import;
