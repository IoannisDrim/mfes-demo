import { createModuleFederationConfig } from '@module-federation/vite';

// @ts-ignore
const MFE1_URL = process.env.CATALOG_URL ?? 'http://localhost:5001';

export default createModuleFederationConfig({
    name: 'shell',
    remotes: {
        mfe1: {
            type: 'module',
            name: 'mfe1',
            entry: `${MFE1_URL}/mf-manifest.json`,
        },
    },
    shared: {
        react: { singleton: true },
        'react/': { singleton: true },
        'react-dom': { singleton: true },
        'react-dom/': { singleton: true },
        'react-router-dom': { singleton: true },
    }
});