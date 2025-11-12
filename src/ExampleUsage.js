import React from 'react';
import ReactComponent from './ReactComponent';

// Ejemplo de cómo reutilizar ReactComponent en diferentes contextos
function ExampleUsage() {
  return (
    <div>
      <h1>Ejemplo de Reutilización</h1>
      
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h2>Primera instancia:</h2>
        <ReactComponent />
      </div>
      
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h2>Segunda instancia:</h2>
        <ReactComponent />
      </div>
      
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h2>Tercera instancia:</h2>
        <ReactComponent />
      </div>
    </div>
  );
}

export default ExampleUsage;