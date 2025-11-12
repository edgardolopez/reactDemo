import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('🔧 Bootstrap.js loaded - Direct export approach');

// Función mount simplificada
const mount = (element) => {
  console.log('🚀 Mount function called with element:', element);

  if (!element) {
    console.error('❌ No element provided');
    return () => {};
  }

  try {
    const root = createRoot(element);
    root.render(React.createElement(App));
    console.log('✅ React mounted successfully');

    return () => {
      console.log('🧹 Unmounting React');
      try {
        root.unmount();
      } catch (error) {
        console.warn('⚠️ Unmount warning:', error);
      }
    };
  } catch (error) {
    console.error('❌ Mount error:', error);
    element.innerHTML = `<div style="color: red; padding: 16px; border: 1px solid red;">Error mounting React: ${error.message}</div>`;
    return () => {};
  }
};

// Registro global inmediato
if (typeof window !== 'undefined') {
  window.mountReactMFE = mount;
  console.log('🔧 React MFE mount function registered globally on window');
}

if (typeof globalThis !== 'undefined') {
  globalThis.mountReactMFE = mount;
  console.log('🔧 React MFE mount function registered globally on globalThis');
}

// Auto-mount para desarrollo standalone y producción
const autoRoot = document.getElementById('root');
if (autoRoot) {
  console.log('🔧 Auto-mounting to #root');
  mount(autoRoot);
}

console.log('🔧 Exporting mount function as default');

// Export directo - solo default export
export default mount;
