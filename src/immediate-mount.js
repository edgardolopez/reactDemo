import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('🔥 [IMMEDIATE-MOUNT] Starting immediate execution...');

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

// Función mount
const mount = (element) => {
  console.log('🚀 [IMMEDIATE-MOUNT] Mount function called with:', element);

  if (!element) {
    console.error('❌ [IMMEDIATE-MOUNT] No element provided');
    return () => console.log('❌ [IMMEDIATE-MOUNT] No-op unmount (no element provided)');
  }

  try {
    console.log('🔨 [IMMEDIATE-MOUNT] Creating React root...');
    const root = createRoot(element);

    console.log('🎨 [IMMEDIATE-MOUNT] Rendering React component...');
    root.render(React.createElement(ReactMFEComponent));

    console.log('✅ [IMMEDIATE-MOUNT] React MFE mounted successfully');

    const unmount = () => {
      console.log('🧹 [IMMEDIATE-MOUNT] Unmounting React MFE...');
      try {
        root.unmount();
        console.log('✅ [IMMEDIATE-MOUNT] Unmounted successfully');
      } catch (error) {
        console.error('❌ [IMMEDIATE-MOUNT] Error during unmount:', error);
      }
    };

    return unmount;

  } catch (error) {
    console.error('❌ [IMMEDIATE-MOUNT] Mount failed:', error);
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
    return () => console.log('❌ [IMMEDIATE-MOUNT] No-op unmount (mount failed)');
  }
};

// ¡REGISTRO GLOBAL INMEDIATO AL CARGAR EL ARCHIVO!
console.log('🔥 [IMMEDIATE-MOUNT] Registering global mount function NOW...');
if (typeof globalThis !== 'undefined') {
  globalThis.mountReactMFE = mount;
  console.log('✅ [IMMEDIATE-MOUNT] Registered on globalThis');
} else {
  console.error('❌ [IMMEDIATE-MOUNT] globalThis not available');
}

if (typeof window !== 'undefined') {
  window.mountReactMFE = mount;
  console.log('✅ [IMMEDIATE-MOUNT] Registered on window');
} else {
  console.error('❌ [IMMEDIATE-MOUNT] window not available');
}

// Verificación inmediata
console.log('🔍 [IMMEDIATE-MOUNT] Verification:');
console.log('  - globalThis.mountReactMFE:', typeof globalThis.mountReactMFE);
console.log('  - window.mountReactMFE:', typeof (typeof window !== 'undefined' ? window.mountReactMFE : 'window not available'));

console.log('🎯 [IMMEDIATE-MOUNT] Export ready');

// Export por defecto para Module Federation
export default mount;
