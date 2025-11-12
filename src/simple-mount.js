import React from 'react';
import { createRoot } from 'react-dom/client';

// Componente React simple
const ReactMFEComponent = () => {
  return React.createElement('div', {
    style: {
      padding: '20px',
      border: '2px solid #61dafb',
      borderRadius: '8px',
      backgroundColor: '#f0f8ff',
      textAlign: 'center',
      margin: '10px'
    }
  }, [
    React.createElement('h2', {
      key: 'title',
      style: { color: '#0077be', margin: '0 0 10px 0' }
    }, '⚛️ React Microfrontend'),
    React.createElement('p', {
      key: 'description',
      style: { color: '#333', margin: '10px 0' }
    }, 'Successfully loaded via Module Federation!'),
    React.createElement('div', {
      key: 'info',
      style: { fontSize: '14px', color: '#666', marginTop: '15px' }
    }, `Loaded at: ${new Date().toLocaleTimeString()}`)
  ]);
};

// Función mount simple y directa
const mount = (element) => {
  console.log('🚀 [SIMPLE-MOUNT] Mount function called with:', element);

  if (!element) {
    console.error('❌ [SIMPLE-MOUNT] No element provided');
    return () => console.log('❌ [SIMPLE-MOUNT] No-op unmount (no element provided)');
  }

  try {
    console.log('🔨 [SIMPLE-MOUNT] Creating React root...');
    const root = createRoot(element);

    console.log('🎨 [SIMPLE-MOUNT] Rendering React component...');
    root.render(React.createElement(ReactMFEComponent));

    console.log('✅ [SIMPLE-MOUNT] React MFE mounted successfully');

    // Función de cleanup
    const unmount = () => {
      console.log('🧹 [SIMPLE-MOUNT] Unmounting React MFE...');
      try {
        root.unmount();
        console.log('✅ [SIMPLE-MOUNT] Unmounted successfully');
      } catch (error) {
        console.error('❌ [SIMPLE-MOUNT] Error during unmount:', error);
      }
    };

    return unmount;

  } catch (error) {
    console.error('❌ [SIMPLE-MOUNT] Mount failed:', error);
    element.innerHTML = `
      <div style="
        background: #ffebee;
        border: 1px solid #f44336;
        padding: 15px;
        border-radius: 8px;
        color: #c62828;
        text-align: center;
      ">
        <h3 style="margin: 0 0 10px 0;">❌ React Mount Error</h3>
        <p style="margin: 5px 0;">${error.message}</p>
        <small style="color: #666;">Check console for details</small>
      </div>
    `;
    return () => console.log('❌ [SIMPLE-MOUNT] No-op unmount (mount failed)');
  }
};

// Registro global inmediato - EJECUTAR AL CARGAR
console.log('🚀 [SIMPLE-MOUNT] File loaded and executing...');
console.log('📡 [SIMPLE-MOUNT] Registering global mount function...');
if (typeof window !== 'undefined') {
  window.mountReactMFE = mount;
  console.log('✅ [SIMPLE-MOUNT] Registered on window');
}
if (typeof globalThis !== 'undefined') {
  globalThis.mountReactMFE = mount;
  console.log('✅ [SIMPLE-MOUNT] Registered on globalThis');
}

console.log('🎯 [SIMPLE-MOUNT] Mount function ready for export');

// Export por defecto para Module Federation
export default mount;
