# React Counter App con Comunicación Iframe

Una aplicación React simple con un contador que puede comunicarse con aplicaciones padre a través de PostMessage API cuando se ejecuta en un iframe.

## 🚀 Demo en Vivo

**Aplicación React:** https://edgardolopez.github.io/reactDemo/

## ✨ Funcionalidades

### Contador React
- ➕ Incrementar contador
- ➖ Decrementar contador  
- 🔄 Reset a cero
- 📱 Diseño responsive

### Comunicación Iframe
- 🎨 Cambio de tema (claro/oscuro) desde aplicación padre
- 👤 Recepción de datos de usuario desde aplicación padre
- 🔢 Establecimiento del valor del contador desde aplicación padre
- 📨 Notificaciones de cambios al aplicación padre

## 📡 API de Comunicación

### Mensajes que RECIBE el iframe (desde padre):

```javascript
// Cambiar tema
{
  type: 'THEME_CHANGE',
  payload: { theme: 'light' | 'dark' }
}

// Establecer datos de usuario
{
  type: 'USER_DATA', 
  payload: { name: 'Juan Pérez', id: 123 }
}

// Establecer valor del contador
{
  type: 'SET_COUNT',
  payload: { count: 42 }
}
```

### Mensajes que ENVÍA el iframe (hacia padre):

```javascript
// Iframe listo
{
  type: 'IFRAME_READY',
  payload: { status: 'ready', timestamp: 1699123456789 }
}

// Contador cambió
{
  type: 'COUNT_CHANGED',
  payload: { 
    count: 5, 
    action: 'increment' | 'decrement' | 'reset' 
  }
}
```

## 🔧 Uso en tu Aplicación

### 1. Embeber como Iframe

```html
<iframe 
  src="https://edgardolopez.github.io/reactDemo/" 
  width="600" 
  height="400"
  title="React Counter">
</iframe>
```

### 2. Comunicación desde Aplicación Padre

```javascript
const iframe = document.querySelector('iframe');

// Escuchar mensajes del iframe
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://edgardolopez.github.io') return;
  
  const message = JSON.parse(event.data);
  
  if (message.type === 'IFRAME_READY') {
    console.log('🎉 Iframe listo!');
  }
  
  if (message.type === 'COUNT_CHANGED') {
    console.log(`Contador: ${message.payload.count}`);
  }
});

// Enviar mensajes al iframe
function sendToIframe(type, payload) {
  iframe.contentWindow.postMessage(
    JSON.stringify({ type, payload }), 
    'https://edgardolopez.github.io'
  );
}

// Ejemplos de uso
sendToIframe('THEME_CHANGE', { theme: 'light' });
sendToIframe('USER_DATA', { name: 'Ana García' });
sendToIframe('SET_COUNT', { count: 10 });
```

### 3. Ejemplo Completo

Ve el archivo `iframe-example.html` en este repositorio para un ejemplo funcional completo con interfaz de controles.

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start

# Construir para producción
npm run build

# Desplegar a GitHub Pages
npm run deploy
```

## 🏗️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal
- **Webpack 5** - Bundler y configuración
- **PostMessage API** - Comunicación entre ventanas
- **CSS3** - Estilos y temas
- **GitHub Pages** - Hosting gratuito

## 🎨 Temas Disponibles

- **Oscuro (default)**: Fondo gradiente púrpura con texto blanco
- **Claro**: Fondo blanco con texto oscuro

## 🔒 Seguridad

- ✅ Validación de origen en mensajes (comentada para desarrollo)
- ✅ Manejo de errores en parsing JSON
- ✅ Cleanup de event listeners

## 📦 Estructura del Proyecto

```
src/
├── App.js          # Componente principal
├── Counter.js      # Componente contador con iframe communication
├── App.css         # Estilos y temas
└── index.js        # Punto de entrada

public/
└── index.html      # Template HTML

iframe-example.html # Ejemplo de uso completo
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.