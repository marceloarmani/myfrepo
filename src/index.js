import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Cotações</h1>
      <ul>
        <li>Dólar: R$ 5,10</li>
        <li>Euro: R$ 5,50</li>
        <li>Bitcoin: R$ 180.000</li>
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
