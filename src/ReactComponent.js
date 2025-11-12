import React, { useState } from 'react';
import './App.css';

function ReactComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="react-app">
      <h1>🚀 React Microfrontend</h1>
      <p>Este componente React está siendo cargado dentro de Angular!</p>

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

      <div className="info-section">
        <h3>Información:</h3>
        <ul>
          <li>✅ React 18 con createRoot</li>
          <li>✅ Module Federation</li>
          <li>✅ Integrado con Angular 14</li>
          <li>✅ Puerto 3002</li>
        </ul>
      </div>
    </div>
  );
}

export default ReactComponent;
