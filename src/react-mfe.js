import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Función simple y directa para Module Federation
function mount(element) {
  console.log('🚀 Simple mount called with:', element);

  if (!element) {
    console.error('❌ No element provided to mount');
    return () => {};
  }

  try {
    const root = createRoot(element);
    root.render(React.createElement(App));
    console.log('✅ React app mounted successfully');

    return () => {
      console.log('🧹 Unmounting React app');
      root.unmount();
    };
  } catch (error) {
    console.error('❌ Mount failed:', error);
    element.innerHTML = `<div style="color: red; padding: 10px; border: 1px solid red;">React Mount Error: ${error.message}</div>`;
    return () => {};
  }
}

// Registrar función global
window.mountReactMFE = mount;
globalThis.mountReactMFE = mount;

console.log('✅ React MFE ready - mount function available globally');

export default mount;
