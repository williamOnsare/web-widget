import React from "react";
import { WebWidget } from "./components";

function App({ domElement }) {
  const customerSupport = domElement.getAttribute("data-customersupport");

  return <WebWidget data={customerSupport} />;
}

export default App;
