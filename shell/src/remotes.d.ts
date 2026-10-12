// The remotes are fetched over the network at runtime, so there is no file for
// TypeScript to inspect. Automatic type generation is disabled on them, so their
// shapes are declared here by hand and must be kept in step manually.
declare module 'mfe1/integrated' {
    import type { ComponentType } from 'react';
    const Mfe1Integrated: ComponentType;
    export default Mfe1Integrated;
}

declare module 'mfe2/integrated' {
    import type { ComponentType } from 'react';

    // Mirrors mfe2's own NavigationTarget. Both ends are hand-written, so this
    // is the cost of dts: false made concrete: the contract is readable in one
    // place, and nothing but review keeps the two copies honest.
    type NavigationTarget = { type: 'property'; id: string };

    const Mfe2Integrated: ComponentType<{
        navigateTo?: (target: NavigationTarget) => void;
    }>;
    export default Mfe2Integrated;
}
