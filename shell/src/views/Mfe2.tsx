import { Suspense, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import RemoteMfe2 from '../remotes/mfe2';
import { pathFor, type NavigationTarget } from '../navigation.ts';

export function Mfe2View() {
    const navigate = useNavigate();

    // mfe2 is handed the means to leave itself, not the knowledge of where to
    // go. It names a target, the host's route map turns that into a path, and
    // the host's router performs the move.
    const navigateTo = useCallback(
        (target: NavigationTarget) => navigate(pathFor(target)),
        [navigate],
    );

    return (
        <ErrorBoundary fallback={<p>Mfe2 is unavailable right now.</p>}>
            <Suspense fallback={<p>Loading mfe2…</p>}>
                <RemoteMfe2 navigateTo={navigateTo} />
            </Suspense>
        </ErrorBoundary>
    );
}
