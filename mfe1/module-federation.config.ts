import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'mfe1',
  filename: 'remoteEntry.js',
  manifest: true,
  exposes: {
    './integrated': './src/mfe1.integrated',
  },
  // Automatic type generation for the exposed modules is off. The host declares
  // the remote's shape by hand instead; see the README for the trade-off.
  dts: false,
  shared: {
    react: { singleton: true },
    'react/': { singleton: true },
    'react-dom': { singleton: true },
    'react-dom/': { singleton: true },
    'react-router-dom': { singleton: true },
  }
});
