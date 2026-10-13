# mfes-demo

**Live demo: <https://mfes-demo.vercel.app/>**

Three React applications, built and deployed independently, composed into one
page at runtime with Module Federation.

The interesting part is the seams: how separate applications share
dependencies, a design system, a theme and navigation without collapsing back
into a single application. Each micro-frontend also runs on its own.

Built with React 19, React Router 7, Vite 8, TypeScript 6 and
`@module-federation/vite`.

> **A note on names.** The demo is themed as a property management ERP, so each
> micro-frontend owns one business domain. In the code they keep the generic
> names `mfe1` and `mfe2`, which say what they are architecturally but nothing
> about what they do. `mfe1` is Properties and `mfe2` is Bookings. Real
> applications would be named after their domain instead.

## Repository layout

```
.
├── shell/     host: layout, routing, theme owner
├── mfe1/      properties micro-frontend
├── mfe2/      bookings micro-frontend
└── ui-lib/    shared design system
```

## The applications

| App     | Role                                           | Dev port | Mount path    |
| ------- | ---------------------------------------------- | -------- | ------------- |
| `shell` | Host. Owns the router, the layout, the theme   | 4000     | —             |
| `mfe1`  | Properties: list, details, parking             | 4001     | `/properties` |
| `mfe2`  | Bookings: list, booking details                | 4002     | `/bookings`   |

## Prerequisites and how to run

Developed on Node 24 and npm 11. Vite 8 needs a current Node LTS.

`ui-lib` is consumed as a packed tarball committed alongside the apps, so
rebuild and repack it first if you change it:

```bash
cd ui-lib && npm install && npm run build && npm pack
```

Then start each application. The shell needs both remotes running, so use three
terminals:

```bash
cd mfe1 && npm install && npm run dev     # http://localhost:4001
cd mfe2 && npm install && npm run dev     # http://localhost:4002
cd shell && npm install && npm run dev    # http://localhost:4000
```

Open <http://localhost:4000>.

## Running one micro-frontend alone

```bash
cd mfe1 && npm run dev     # http://localhost:4001/properties
cd mfe2 && npm run dev     # http://localhost:4002/bookings
```

Each remote has a separate entry point for this, which supplies its own router
and theme provider. Anything that depends on the host degrades instead of
breaking: in `mfe2` the link out to a property still renders, but clicking it
does nothing and logs a warning in development.

## Architecture

The shell is the host. `mfe1` and `mfe2` are remotes, built and deployed
separately and loaded at runtime from their own URLs.

At startup the host reads each remote's `mf-manifest.json` to negotiate shared
dependencies. A remote's component code is fetched later, when its route is
first visited.

Remote URLs are read from `MFE1_URL` and `MFE2_URL` at build time, and default
to localhost.

## The two entry points

Each remote has two entry points, and the difference between them is the whole
standalone-versus-integrated story:

- `src/main.tsx` — standalone. Creates the router and the theme provider.
- `src/mfeN.integrated.tsx` — exposed to the host as `./integrated`. Creates
  neither, because the host already owns both. A second router would split
  navigation across two histories.

## Routing

There is one router, and the shell owns it. Each remote gets a splat route:

```tsx
<Route path="/properties/*" element={<Mfe1View />} />
<Route path="/bookings/*" element={<Mfe2View />} />
```

The shell matches the prefix and the remote owns everything after it. Remotes
declare their own routes relatively (`index`, `:propertyId`, `details`), so
they never assume a mount path. Standalone, `BrowserRouter`'s `basename`
supplies one.

## How the host loads a remote

`React.lazy`, wrapped in `Suspense` and an error boundary:

```tsx
export default lazy(() => import('mfe1/integrated'));
```

A remote that fails to load shows a fallback instead of taking the page down
with it.

## Shared dependencies

Declared in every app's `module-federation.config.ts`, all as singletons:

| Package                           | Why one copy matters                                              |
| --------------------------------- | ----------------------------------------------------------------- |
| `react`, `react-dom`              | Two copies of React break hooks                                   |
| `react-router`, `react-router-dom` | One router context, so a remote's `<Link>` drives the host's router |
| `@mfes-demo/ui-lib`               | One theme context, and one copy of the design system              |

`react-router-dom` is a thin re-export of `react-router`, and the router
context lives in the latter. Both are shared, so a remote can import from
either one without ending up on a second context.

Sharing `ui-lib` is what makes the theme work. Context identity comes from the
module, not from the type: if each app bundled its own copy, each would call
`createContext` separately, and the remotes would sit on their own defaults
while the host switched theme.

## The design system

`ui-lib` holds what the three applications have to agree on:

- `ThemeProvider` and `useTheme` — light and dark
- `Table` — the one component both remotes render
- `styles.css` — the tokens (`--ui-color-bg`, `--ui-color-text`,
  `--ui-color-accent`, and so on), defined under `[data-theme="light"]` and
  `[data-theme="dark"]`

The shell renders the provider and the switch. Every application then reads the
context and applies the result to its **own** root element:

```tsx
const { name: theme } = useTheme()
return <div className={styles.app} data-theme={theme}>…</div>
```

Nothing writes to `document.documentElement`. No application is restyled from
the outside, and a remote mounted under a host that provides no theme falls
back to the context default instead of failing.

The tokens are CSS custom properties, which inherit and which CSS Modules does
not hash. That makes the token names part of the package's public contract,
exactly like its exported component names.

## Navigation between micro-frontends

A booking shows a property address. Clicking it opens that property in `mfe1`.
`mfe2` must not know that `mfe1` exists.

So `mfe2` names a resource, and the shell decides what that means:

```tsx
// mfe2 — states intent, never a path
navigateTo({ type: 'property', id })

// shell — owns the route map
const navigateTo = (target) => navigate(pathFor(target))
```

`shell/src/navigation.ts` maps a target to a path. `mfe1` can be remounted
somewhere else and only that file changes. A new destination is a new member of
the target union, and the shell's `switch` is exhaustive, so TypeScript reports
any target nobody handles.

`mfe2` puts the callback on a context of its own, so a view can ask for it
rather than having it threaded through every route. Standalone there is no host
to supply one, and the fallback logs a warning in development.

## Types across the remote boundary

Automatic type generation for the remotes is off (`dts: false`). The shell
declares each remote's shape by hand in `src/remotes.d.ts`. The contract is
readable in one place, but nothing except review keeps it in step with the
remote it describes.

## Deployment

Three Vercel projects, one per application, all from this repository, each with
its own root directory.

- Every `vercel.json` carries an `ignoreCommand` that diffs the previously
  deployed commit against `HEAD` for that application's directory only, so a
  change to one app does not redeploy the others. A change to something shared —
  a federation config, or `ui-lib` — does rebuild all three, which is what you
  want: the share scope has to move in step.
- The remotes send `Access-Control-Allow-Origin: *`, because the host fetches
  their manifests cross-origin.
- `rewrites` send every path to `index.html`, for client-side routing.
- The shell is built with `MFE1_URL` and `MFE2_URL` pointing at the remotes'
  deployments.
- Each project has "Include source files outside of the Root Directory" enabled,
  so the `ui-lib` tarball resolves during install.

## What we would do differently in production

These were simplified to keep the demo easy to clone and run.

- **`ui-lib` would come from a registry**, private or public, rather than a
  tarball committed next to its consumers. Its releases would then be versioned
  and published independently of this repository.
- **Remote types would be generated rather than hand-written**, so the host
  cannot drift from a remote's real interface.
- **The navigation target type would live in one shared package.** It is
  declared by hand in three places today, and because the apps compile
  separately, nothing checks that the copies still agree.
- **Host and remote contracts would be validated at startup.** Each remote
  would declare the props, configuration and environment variables it needs,
  and the host would check them against a schema before mounting it. An
  incompatible pairing would fail immediately, rather than when a user reaches
  the screen that depends on it.
- **Remote URLs would be resolved at runtime**, not fixed at build time, so a
  remote can be repointed without rebuilding the host.
- **Shared versions would be enforced** with `strictVersion`, so a mismatch
  fails loudly instead of warning at runtime.
- **Authentication would be shared, not repeated.** The host would own the
  session and hand each remote a gateway carrying the authenticated client, so
  no remote implements sign-in or handles tokens itself.
- **Data would come from real APIs.** Both remotes read from in-memory modules
  today. Each would call its own service instead, through that same gateway.
- **Routes would be gated** by feature flags and permissions.

## Scripts

The same three in `shell`, `mfe1` and `mfe2`:

| Script            | Does                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Vite dev server on the application's port   |
| `npm run build`   | Typecheck, then build                       |
| `npm run preview` | Serve the build on the same port            |

`ui-lib` has only `npm run build`: `tsc`, then a copy of `styles.css` into
`dist`.
