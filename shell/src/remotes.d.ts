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
    const Mfe2Integrated: ComponentType;
    export default Mfe2Integrated;
}
