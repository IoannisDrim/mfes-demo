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
        'react-router-dom': { singleton: true },
        // Shared as a singleton so the host and the remotes run one copy of the
        // design system rather than one each, and so all of them land on the same
        // theme context. Without it each app gets a context of its own, and the
        // remotes sit on its default: the host switches to dark, they stay light.
        '@mfes-demo/ui-lib': { singleton: true },
    }
});