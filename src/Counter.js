import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2>Contador: {count}</h2>
      <div className="button-group">
        <button
          onClick={() => setCount(count - 1)}
          className="btn btn-decrement"
        >
          -
        </button>
        <button
          onClick={() => setCount(0)}
          className="btn btn-reset"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="btn btn-increment"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;