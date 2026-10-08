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
    }
});