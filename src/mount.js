import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('🔧 Mount.js loaded');

let root = null;

// Función mount principal para Module Federation
function mount(element) {
  console.log('🚀 React mount function called with element:', element);

  if (!element) {
    console.error('❌ No element provided to mount React component');
    return () => {};
  }

  // Limpiar cualquier montaje previo
  if (root) {
    try {
      root.unmount();
    } catch (e) {
      console.warn('Previous root cleanup warning:', e);
    }
    root = null;
  }

  try {
    root = createRoot(element);
    root.render(<App />);
    console.log('✅ React component mounted successfully');
  } catch (error) {
    console.error('❌ Error mounting React component:', error);
    throw error;
  }

  // Retorna función para limpiar
  return () => {
    if (root) {
      console.log('🧹 Unmounting React component');
      try {
        root.unmount();
        root = null;
      } catch (error) {
        console.warn('⚠️ Error during unmount:', error);
      }
    }
  };
}

// Para desarrollo independiente
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot && !root) {
    console.log('🔧 Development mode: mounting to #root');
    mount(devRoot);
  }
}

console.log('🔧 Exporting mount function');

// Export como default y named
export default mount;
export { mount };
