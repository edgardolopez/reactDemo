// Wrapper para Module Federation que asegura compatibilidad
import mount from './bootstrap.js';

console.log('🔧 React Component wrapper loaded');
console.log('🔍 Mount function type:', typeof mount);
console.log('🔍 Mount function:', mount);

// Asegurar que siempre exportemos una función válida
if (typeof mount !== 'function') {
  console.error('❌ Mount is not a function!', mount);
  throw new Error('Bootstrap did not export a valid mount function');
}

// Export simple y directo
export default mount;
