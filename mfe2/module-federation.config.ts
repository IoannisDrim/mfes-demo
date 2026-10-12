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
    // react-router-dom is a thin re-export of react-router, and the router
    // context lives in the latter. Sharing only the wrapper happens to work,
    // because a remote reaches react-router through the host's copy of the
    // wrapper. A remote importing 'react-router' directly would get a second
    // copy with a context of its own, and its router hooks would throw.
    'react-router': { singleton: true },
    'react-router-dom': { singleton: true },
    // Shared as a singleton so the host and the remotes run one copy of the
    // design system rather than one each, and so all of them land on the same
    // theme context. Without it each app gets a context of its own, and the
    // remotes sit on its default: the host switches to dark, they stay light.
    '@mfes-demo/ui-lib': { singleton: true },
  }
});
