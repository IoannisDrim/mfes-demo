// Where each app lives is the host's business. A remote names the resource it
// wants to reach and this turns it into a route, so a remote can be remounted
// on a different path without the remote that links to it knowing.
export type NavigationTarget = { type: 'property'; id: string };

export function pathFor(target: NavigationTarget): string {
    switch (target.type) {
        case 'property':
            return `/properties/${target.id}`;
    }
}
