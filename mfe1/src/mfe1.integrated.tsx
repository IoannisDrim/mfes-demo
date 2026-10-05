import App from './App.tsx'

// Host-facing entry point, exposed over Module Federation. It deliberately
// renders no Router: the host already owns one, and nesting a second would
// split navigation across two histories.
function Mfe1Integrated() {
  return <App />
}

export default Mfe1Integrated
