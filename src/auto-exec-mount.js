import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('🔥 [AUTO-EXEC] Starting automatic execution...');

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
  console.log('🚀 [AUTO-EXEC] Mount function called with:', element);

  if (!element) {
    console.error('❌ [AUTO-EXEC] No element provided');
    return () => console.log('❌ [AUTO-EXEC] No-op unmount (no element provided)');
  }

  try {
    console.log('🔨 [AUTO-EXEC] Creating React root...');
    const root = createRoot(element);

    console.log('🎨 [AUTO-EXEC] Rendering React component...');
    root.render(React.createElement(ReactMFEComponent));

    console.log('✅ [AUTO-EXEC] React MFE mounted successfully');

    const unmount = () => {
      console.log('🧹 [AUTO-EXEC] Unmounting React MFE...');
      try {
        root.unmount();
        console.log('✅ [AUTO-EXEC] Unmounted successfully');
      } catch (error) {
        console.error('❌ [AUTO-EXEC] Error during unmount:', error);
      }
    };

    return unmount;

  } catch (error) {
    console.error('❌ [AUTO-EXEC] Mount failed:', error);
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
    return () => console.log('❌ [AUTO-EXEC] No-op unmount (mount failed)');
  }
};

// ¡REGISTRO GLOBAL INMEDIATO NADA MÁS CARGAR!
console.log('🔥 [AUTO-EXEC] EXECUTING GLOBAL REGISTRATION...');
console.log('🔥 [AUTO-EXEC] Current execution context check...');

// Múltiples estrategias de registro
const registerGlobal = () => {
  console.log('🎯 [AUTO-EXEC] Starting global registration process...');

  // Estrategia 1: globalThis
  try {
    globalThis.mountReactMFE = mount;
    console.log('✅ [AUTO-EXEC] Registered on globalThis');
  } catch (e) {
    console.error('❌ [AUTO-EXEC] Failed to register on globalThis:', e);
  }

  // Estrategia 2: window (si está disponible)
  try {
    if (typeof window !== 'undefined') {
      window.mountReactMFE = mount;
      console.log('✅ [AUTO-EXEC] Registered on window');
    } else {
      console.log('⚠️ [AUTO-EXEC] window not available');
    }
  } catch (e) {
    console.error('❌ [AUTO-EXEC] Failed to register on window:', e);
  }

  // Estrategia 3: self (para web workers si aplica)
  try {
    if (typeof self !== 'undefined') {
      self.mountReactMFE = mount;
      console.log('✅ [AUTO-EXEC] Registered on self');
    }
  } catch (e) {
    console.error('❌ [AUTO-EXEC] Failed to register on self:', e);
  }
};

// Ejecutar registro inmediatamente
registerGlobal();

// Verificación inmediata
console.log('🔍 [AUTO-EXEC] POST-REGISTRATION VERIFICATION:');
console.log('  - globalThis.mountReactMFE:', typeof globalThis.mountReactMFE);
try {
  if (typeof window !== 'undefined') {
    console.log('  - window.mountReactMFE:', typeof window.mountReactMFE);
  }
} catch (e) {
  console.log('  - window check failed:', e.message);
}

// Verificación con delay
setTimeout(() => {
  console.log('🕐 [AUTO-EXEC] DELAYED VERIFICATION (1sec):');
  console.log('  - globalThis.mountReactMFE:', typeof globalThis.mountReactMFE);
  try {
    if (typeof window !== 'undefined') {
      console.log('  - window.mountReactMFE:', typeof window.mountReactMFE);
    }
  } catch (e) {
    console.log('  - window check failed:', e.message);
  }
}, 1000);

console.log('🎯 [AUTO-EXEC] Ready for Module Federation export');

// Export por defecto para Module Federation
export default mount;
