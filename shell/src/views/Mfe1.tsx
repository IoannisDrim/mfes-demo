import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RemoteMfe1 from '../remotes/mfe1';

export function Mfe1View() {
    return (
        <ErrorBoundary fallback={<p>Mfe1 is unavailable right now.</p>}>
            <Suspense fallback={<p>Loading mfe1…</p>}>
                <RemoteMfe1 />
            </Suspense>
        </ErrorBoundary>
    );
}