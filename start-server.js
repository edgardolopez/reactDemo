#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

// Cambiar al directorio react-mfe
process.chdir(path.join(__dirname));

// Ejecutar webpack serve
const webpackServe = spawn('npx', ['webpack', 'serve', '--mode', 'development'], {
  stdio: 'inherit',
  shell: true
});

webpackServe.on('error', (error) => {
  console.error('Error al iniciar webpack:', error);
});

webpackServe.on('exit', (code) => {
  console.log(`Webpack terminó con código: ${code}`);
});
