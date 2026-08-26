import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import App from "./src/App.jsx";

async function renderApp(url) {
  const helmetContext = {};

  const stream = await renderToReadableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  await stream.allReady;

  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let html = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    html += decoder.decode(value, {
      stream: true,
    });
  }

  html += decoder.decode();

  return {
    html,
    helmet: helmetContext.helmet,
  };
}

function getHelmetTitle(helmet) {
  if (!helmet?.title) {
    return "Upskillab";
  }

  const title = helmet.title.toString();

  return decodeHtmlAttribute(
    title
      .replace(/<title[^>]*>/i, "")
      .replace(/<\/title>/i, "")
      .trim()
  );}

function decodeHtmlAttribute(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
function parseAttributes(attributeString) {
  const props = {};

  const attributeRegex =
    /([:\w-]+)(?:="([^"]*)")?/g;

  let match;

  while ((match = attributeRegex.exec(attributeString)) !== null) {
    const [, name, value] = match;

    if (value !== undefined) {
      props[name] = decodeHtmlAttribute(String(value));
    }
  }

  return props;
}

function helmetToElements(helmet) {
  const elements = new Set();

  if (!helmet) {
    return elements;
  }

  const processTags = (html, type) => {
    if (!html) return;

    const regex = new RegExp(
      `<${type}\\b([^>]*)>`,
      "gi"
    );

    let match;

    while ((match = regex.exec(html)) !== null) {
      const props = parseAttributes(match[1]);

      elements.add({
        type,
        props,
      });
    }
  };

  processTags(helmet.meta?.toString(), "meta");
  processTags(helmet.link?.toString(), "link");

  return elements;
}

export async function prerender(data) {
  const url = data?.url || "/";

  console.log(`Prerendering: ${url}`);

  const { html, helmet } = await renderApp(url);

  return {
    html,

    head: {
      lang: "en",

      title: getHelmetTitle(helmet),

      elements: helmetToElements(helmet),
    },
  };
}