import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // In the React app inside the iframe
    const handleMessage = (event) => {
      // Validate origin (you can change this to your specific domain)
      // if (event.origin !== 'https://your-domain.com') return;
      
      try {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'THEME_CHANGE':
            // Change theme in React
            setTheme(message.payload.theme);
            break;
          case 'USER_DATA':
            // Process user data
            setUser(message.payload);
            break;
          case 'SET_COUNT':
            // Allow setting the counter from the parent
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

    // Send message back to the parent that iframe is ready
    window.parent.postMessage(JSON.stringify({
      type: 'IFRAME_READY',
      payload: { status: 'ready', timestamp: Date.now() }
    }), '*');

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Function to notify the parent of changes
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
