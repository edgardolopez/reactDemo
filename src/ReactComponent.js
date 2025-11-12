import React, { useState } from 'react';
import './App.css';

function ReactComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="react-app">
      <h1>🚀 React </h1>
      <div className="counter-section">
        <h2>Contador React: {count}</h2>
        <button
          onClick={() => setCount(count + 1)}
          className="increment-btn"
        >
          Incrementar
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="decrement-btn"
        >
          Decrementar
        </button>
        <button
          onClick={() => setCount(0)}
          className="reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ReactComponent;
