import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'mfe1',
  filename: 'remoteEntry.js',
  manifest: true,
  exposes: {
    './integrated': './src/mfe1.integrated',
  },
  // The root tsconfig.json only holds project references, so the type-generation
  // step has to be pointed at the config that actually carries compilerOptions.
  dts: {
    generateTypes: { tsConfigPath: './tsconfig.app.json' },
  },
  shared: {
    react: { singleton: true },
    'react/': { singleton: true },
    'react-dom': { singleton: true },
    'react-dom/': { singleton: true },
    'react-router-dom': { singleton: true },
  }
});
