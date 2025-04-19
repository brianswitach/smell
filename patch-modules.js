/**
 * This script patches the @radix-ui/react-use-effect-event module
 * to use our polyfill instead of importing from React
 */
const fs = require('fs');
const path = require('path');

// Path to the problematic file
const targetFile = path.resolve(__dirname, 'node_modules/@radix-ui/react-use-effect-event/dist/index.mjs');

// Check if file exists
if (fs.existsSync(targetFile)) {
  console.log('Patching @radix-ui/react-use-effect-event...');
  
  // Read the file content
  let content = fs.readFileSync(targetFile, 'utf8');
  
  // Replace the React.useEffectEvent import with our polyfill
  const patched = content.replace(
    /import\s*\{\s*useEffectEvent\s*\}\s*from\s*["']react["']/g,
    `
// Polyfill for useEffectEvent
function useEffectEvent(callback) {
  const ref = { current: callback };
  import { useLayoutEffect, useCallback } from 'react';
  useLayoutEffect(() => {
    ref.current = callback;
  });
  return useCallback((...args) => ref.current(...args), []);
}
`
  );
  
  // Write the patched content back
  fs.writeFileSync(targetFile, patched, 'utf8');
  console.log('Successfully patched @radix-ui/react-use-effect-event');
} else {
  console.log('Module @radix-ui/react-use-effect-event not found, skipping patch');
}

// Check also the CJS bundle
const targetFileCJS = path.resolve(__dirname, 'node_modules/@radix-ui/react-use-effect-event/dist/index.js');

if (fs.existsSync(targetFileCJS)) {
  console.log('Patching @radix-ui/react-use-effect-event (CJS)...');
  
  // Read the file content
  let content = fs.readFileSync(targetFileCJS, 'utf8');
  
  // Replace the React.useEffectEvent import with our polyfill
  const patched = content.replace(
    /require\s*\(\s*["']react["']\s*\)\.useEffectEvent/g,
    `
// Polyfill for useEffectEvent
(function(callback) {
  const ref = { current: callback };
  const React = require('react');
  React.useLayoutEffect(() => {
    ref.current = callback;
  });
  return React.useCallback((...args) => ref.current(...args), []);
})
`
  );
  
  // Write the patched content back
  fs.writeFileSync(targetFileCJS, patched, 'utf8');
  console.log('Successfully patched @radix-ui/react-use-effect-event (CJS)');
} else {
  console.log('Module @radix-ui/react-use-effect-event (CJS) not found, skipping patch');
} 