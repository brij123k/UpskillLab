import { createContext, useContext } from "react";

// Data fetched at build time by prerender.jsx for dynamic pages (course and
// blog details). During prerendering it is passed through this context; in the
// browser it is read once from the <script id="initial-data"> tag the
// prerenderer embeds, so the first client render shows the same content
// instead of a loading spinner.
export const InitialDataContext = createContext(null);

let clientData;
function readClientData() {
  if (clientData !== undefined) return clientData;
  clientData = null;
  if (typeof document === "undefined") return clientData;
  try {
    const el = document.getElementById("initial-data");
    if (el) clientData = JSON.parse(el.textContent);
  } catch {
    clientData = null;
  }
  return clientData;
}

// Read eagerly at startup (main.jsx imports this module): route components
// are lazy-loaded, and React replaces #root's prerendered markup - including
// the data script - with the Suspense fallback before they mount.
readClientData();

/**
 * Returns the build-time data stored under `key` (e.g. "course:foo"),
 * or undefined when there is none for this page.
 */
export function useInitialData(key) {
  const ssrData = useContext(InitialDataContext);
  const data = ssrData || readClientData();
  if (!data || data.key !== key) return undefined;
  return data.value;
}
