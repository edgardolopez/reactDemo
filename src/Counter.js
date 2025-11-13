import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // En el React app del iframe
    const handleMessage = (event) => {
      // Validar origen (puedes cambiar esto por tu dominio específico)
      // if (event.origin !== 'https://tu-dominio.com') return;
      
      try {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'THEME_CHANGE':
            // Cambiar tema en React
            setTheme(message.payload.theme);
            break;
          case 'USER_DATA':
            // Procesar datos de usuario
            setUser(message.payload);
            break;
          case 'SET_COUNT':
            // Permitir establecer el contador desde el padre
            setCount(message.payload.count);
            break;
          default:
            console.log('Mensaje no reconocido:', message);
        }
      } catch (error) {
        console.error('Error al parsear mensaje:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    // Enviar mensaje de vuelta al parent
    window.parent.postMessage(JSON.stringify({
      type: 'IFRAME_READY',
      payload: { status: 'ready', timestamp: Date.now() }
    }), '*');

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Función para notificar cambios al padre
  const notifyParent = (type, payload) => {
    window.parent.postMessage(JSON.stringify({
      type,
      payload
    }), '*');
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    notifyParent('COUNT_CHANGED', { count: newCount, action: 'increment' });
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    notifyParent('COUNT_CHANGED', { count: newCount, action: 'decrement' });
  };

  const handleReset = () => {
    setCount(0);
    notifyParent('COUNT_CHANGED', { count: 0, action: 'reset' });
  };

  return (
    <div className={`counter-container ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <h2>Contador: {count}</h2>
      {user && (
        <div className="user-info">
          <p>Usuario: {user.name || 'Anónimo'}</p>
        </div>
      )}
      <div className="theme-info">
        <p>Tema: {theme}</p>
      </div>
      <div className="button-group">
        <button
          onClick={handleDecrement}
          className="btn btn-decrement"
        >
          -
        </button>
        <button
          onClick={handleReset}
          className="btn btn-reset"
        >
          Reset
        </button>
        <button
          onClick={handleIncrement}
          className="btn btn-increment"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
