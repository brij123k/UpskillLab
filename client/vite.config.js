import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, coursePath } from './src/utils/seo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = process.env.VITE_PRERENDER_API_URL || 'https://api.upskillab.com';

// Static pages that should be prerendered.
const STATIC_ROUTES = [
  '/', '/landing', '/landing-bootcamp', '/thank-you', '/success-stories',
  '/upcoming-batches', '/blog', '/ebooks', '/newsletter', '/self-test',
  '/contactus', '/courselist', '/career', '/whyus', '/about',
  '/PCATExamPortal', '/PCAT/result', '/register', '/login',
  '/forgetPassword', '/ResetPassword', '/VerifyOTP', '/terms-of-service',
  '/privacypolicy', '/refundpolicy', '/teacher/register',
];

// Public, indexable pages listed in sitemap.xml: [path, priority].
const SITEMAP_STATIC = [
  ['/', '1.0'], ['/courselist', '0.9'], ['/blog', '0.8'], ['/about', '0.7'],
  ['/upcoming-batches', '0.7'], ['/success-stories', '0.6'], ['/whyus', '0.6'],
  ['/self-test', '0.6'], ['/ebooks', '0.6'], ['/PCATExamPortal', '0.6'],
  ['/contactus', '0.5'], ['/career', '0.5'], ['/newsletter', '0.4'],
  ['/privacypolicy', '0.3'], ['/terms-of-service', '0.3'], ['/refundpolicy', '0.3'],
];

async function fetchJson(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[seo] Could not fetch ${url}: ${err.message}`);
    return null;
  }
}

/** Active courses and published blogs, fetched once per build. */
async function loadDynamicPages() {
  const [courseRes, blogRes] = await Promise.all([
    fetchJson(`${API_URL}/course/display`),
    fetchJson(`${API_URL}/blogs`),
  ]);

  const courses = (courseRes?.data || [])
    .filter((c) => c.active === true && c.courseCode && c.category?.categoryName)
    .map((c) => ({ path: coursePath(c.category.categoryName, c.courseCode), lastmod: c.updatedAt }));

  const blogs = (blogRes?.blogs || [])
    .filter((b) => b.slug && b.approvedByAdmin !== false)
    .map((b) => ({ path: `/blog/${b.slug}`, lastmod: b.updatedAt || b.createdAt }));

  return { courses, blogs, ok: Boolean(courseRes && blogRes) };
}

function buildSitemap({ courses, blogs }) {
  const today = new Date().toISOString().slice(0, 10);
  const day = (d) => (d ? new Date(d).toISOString().slice(0, 10) : today);
  const entry = (p, priority, lastmod) =>
    `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...SITEMAP_STATIC.map(([p, pr]) => entry(p, pr, today)),
    ...courses.map((c) => entry(c.path, '0.9', day(c.lastmod))),
    ...blogs.map((b) => entry(b.path, '0.7', day(b.lastmod))),
    '</urlset>',
    '',
  ].join('\n');
}

/** Overwrites dist/sitemap.xml with one generated from live data. */
function sitemapPlugin(pages) {
  return {
    name: 'upskillab-sitemap',
    apply: 'build',
    writeBundle(options) {
      if (!pages.ok) {
        console.warn('[seo] API unavailable - keeping public/sitemap.xml as is.');
        return;
      }
      const outDir = options.dir || path.resolve(__dirname, 'dist');
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemap(pages));
      console.log(`[seo] sitemap.xml generated: ${SITEMAP_STATIC.length + pages.courses.length + pages.blogs.length} URLs`);
    },
  };
}

export default defineConfig(async ({ command }) => {
  const pages = command === 'build'
    ? await loadDynamicPages()
    : { courses: [], blogs: [], ok: false };

  return {
    plugins: [
      react(),
      tailwindcss(),

      vitePrerenderPlugin({
        renderTarget: '#root',
        prerenderScript: path.resolve(__dirname, 'prerender.jsx'),
        additionalPrerenderRoutes: [
          ...STATIC_ROUTES,
          ...pages.courses.map((c) => c.path),
          ...pages.blogs.map((b) => b.path),
        ],
      }),

      sitemapPlugin(pages),
    ],

    server: {
      allowedHosts: ['a6f4-111-223-30-68.ngrok-free.app'],
    },
  };
});
