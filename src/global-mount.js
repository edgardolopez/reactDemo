import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Esta es la función que Module Federation va a llamar
window.mountReactMFE = (element) => {
  console.log('🚀 mountReactMFE called with element:', element);

  if (!element) {
    console.error('❌ No element provided to mountReactMFE');
    return () => {};
  }

  let root = null;

  try {
    root = createRoot(element);
    root.render(<App />);
    console.log('✅ React MFE mounted successfully via window.mountReactMFE');

    return () => {
      if (root) {
        console.log('🧹 Unmounting React MFE');
        root.unmount();
      }
    };
  } catch (error) {
    console.error('❌ Error mounting React MFE:', error);
    return () => {};
  }
};

// Export para Module Federation también
const mount = window.mountReactMFE;
export default mount;
export { mount };

console.log('🔧 React MFE global mount function registered');
