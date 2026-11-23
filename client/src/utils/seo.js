// Shared SEO helpers. Keep this file free of browser-only APIs: it is also
// imported by the build-time prerenderer and vite.config.js.

export const SITE_URL = "https://upskillab.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/Logo.png`;

/** "Professional development" -> "professional-development" */
export function categorySlug(name = "") {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/** Canonical, lowercase path of a course detail page. */
export function coursePath(categoryName, courseCode) {
  return `/${categorySlug(categoryName)}/course/${courseCode}`;
}

/** Trim text to a max length on a word boundary (for meta descriptions). */
export function truncate(text = "", max = 160) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : cut.length)}…`;
}

/** Strip HTML tags (for descriptions built from rich text). */
export function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
