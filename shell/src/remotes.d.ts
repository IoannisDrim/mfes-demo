// mfe1 is fetched over the network at runtime, so there is no file for
// TypeScript to inspect. Automatic type generation is disabled on the remote,
// so its shape is declared here by hand and must be kept in step manually.
declare module 'mfe1/integrated' {
    import type { ComponentType } from 'react';
    const Mfe1Integrated: ComponentType;
    export default Mfe1Integrated;
}
