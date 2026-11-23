import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import App from "./src/App.jsx";
import ApiConfig from "./src/config/apiConfig.js";
import { InitialDataContext } from "./src/utils/initialData.js";

// ---------------------------------------------------------------------------
// Build-time data for dynamic routes. Course and blog detail pages normally
// fetch in useEffect, which never runs during server rendering, so without
// this they would be prerendered as an empty loading spinner.
// ---------------------------------------------------------------------------
async function fetchJson(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[prerender] fetch failed: ${url} (${err.message})`);
    return null;
  }
}

async function loadInitialData(url) {
  const path = url.split(/[?#]/)[0];

  const blog = path.match(/^\/blog\/([^/]+)\/?$/);
  if (blog) {
    const slug = decodeURIComponent(blog[1]);
    const res = await fetchJson(ApiConfig.blogbyBlogTitle(slug));
    return res?.blog ? { key: `blog:${slug}`, value: res.blog } : null;
  }

  const course = path.match(/^\/[^/]+\/course\/([^/]+)\/?$/);
  if (course) {
    const code = decodeURIComponent(course[1]);
    const res = await fetchJson(ApiConfig.getCourseByCode(code));
    return res?._id ? { key: `course:${code}`, value: res } : null;
  }

  return null;
}

// Serialize JSON so it is safe inside a <script> tag.
function safeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .split(String.fromCharCode(0x2028)).join("\\u2028")
    .split(String.fromCharCode(0x2029)).join("\\u2029");
}

async function renderApp(url, initialData) {
  const helmetContext = {};

  const stream = await renderToReadableStream(
    <InitialDataContext.Provider value={initialData}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </InitialDataContext.Provider>
  );

  await stream.allReady;

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let html = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  html += decoder.decode();

  return { html, helmet: helmetContext.helmet };
}

function decodeHtmlAttribute(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function getHelmetTitle(helmet) {
  if (!helmet?.title) return "Upskillab";
  const title = helmet.title.toString();
  return decodeHtmlAttribute(
    title.replace(/<title[^>]*>/i, "").replace(/<\/title>/i, "").trim()
  );
}

function parseAttributes(attributeString) {
  const props = {};
  const attributeRegex = /([:\w-]+)(?:="([^"]*)")?/g;
  let match;
  while ((match = attributeRegex.exec(attributeString)) !== null) {
    const [, name, value] = match;
    if (value !== undefined) props[name] = decodeHtmlAttribute(String(value));
  }
  return props;
}

function helmetToElements(helmet) {
  const elements = new Set();
  if (!helmet) return elements;

  const processVoidTags = (html, type) => {
    if (!html) return;
    const regex = new RegExp(`<${type}\\b([^>]*)>`, "gi");
    let match;
    while ((match = regex.exec(html)) !== null) {
      elements.add({ type, props: parseAttributes(match[1]) });
    }
  };

  processVoidTags(helmet.meta?.toString(), "meta");
  processVoidTags(helmet.link?.toString(), "link");

  // JSON-LD structured data (Organization, Course, BlogPosting, FAQ, ...).
  // The plugin writes `children` verbatim, so keep Helmet's escaped content.
  const scripts = helmet.script?.toString();
  if (scripts) {
    const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = regex.exec(scripts)) !== null) {
      elements.add({
        type: "script",
        props: parseAttributes(match[1]),
        children: match[2],
      });
    }
  }

  return elements;
}

export async function prerender(data) {
  const url = data?.url || "/";
  console.log(`Prerendering: ${url}`);

  const initialData = await loadInitialData(url);
  const { html, helmet } = await renderApp(url, initialData);

  const dataScript = initialData
    ? `<script type="application/json" id="initial-data">${safeJson(initialData)}</script>`
    : "";

  return {
    html: html + dataScript,
    head: {
      lang: "en",
      title: getHelmetTitle(helmet),
      elements: helmetToElements(helmet),
    },
  };
}
