import { createModuleFederationConfig } from '@module-federation/vite';

const MFE1_URL = process.env.MFE1_URL ?? 'http://localhost:4001';
const MFE2_URL = process.env.MFE2_URL ?? 'http://localhost:4002';

export default createModuleFederationConfig({
    name: 'shell',
    remotes: {
        mfe1: {
            type: 'module',
            name: 'mfe1',
            entry: `${MFE1_URL}/mf-manifest.json`,
        },
        mfe2: {
            type: 'module',
            name: 'mfe2',
            entry: `${MFE2_URL}/mf-manifest.json`,
        },
    },
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