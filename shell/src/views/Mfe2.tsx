import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RemoteMfe2 from '../remotes/mfe2';

export function Mfe2View() {
    return (
        <ErrorBoundary fallback={<p>Mfe2 is unavailable right now.</p>}>
            <Suspense fallback={<p>Loading mfe2…</p>}>
                <RemoteMfe2 />
            </Suspense>
        </ErrorBoundary>
    );
}
