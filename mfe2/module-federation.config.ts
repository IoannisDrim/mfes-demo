import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'mfe2',
  filename: 'remoteEntry.js',
  manifest: true,
  exposes: {
    './integrated': './src/mfe2.integrated',
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
    // Shared as a singleton so the host and the remotes run one copy of the
    // design system rather than one each, and so all of them land on the same
    // theme context. Without it each app gets a context of its own, and the
    // remotes sit on its default: the host switches to dark, they stay light.
    '@mfes-demo/ui-lib': { singleton: true },
  }
});
