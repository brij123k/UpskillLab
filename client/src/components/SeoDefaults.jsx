import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_URL, DEFAULT_OG_IMAGE } from "../utils/seo";

const DEFAULT_DESCRIPTION =
  "Upskillab offers expert-led online courses in psychology, technology and management to help you build practical, job-ready skills and advance your career.";

// Site-wide defaults per route. Pages with their own <Helmet> (and the course /
// blog detail pages) override these. Keys are the canonical spelling of the
// path; lookup is case-insensitive because the router is.
const pageMetadata = {
  "/": { title: "Upskillab | Empowering Your Career Through Online Learning" },
  "/landing": { title: "Upskillab | Learn Skills Online" },
  "/landing-bootcamp": { title: "Upskillab Bootcamp | Learn Job-Ready Skills" },
  "/thank-you": { title: "Thank You | Upskillab", noindex: true },
  "/success-stories": { title: "Upskillab Success Stories | Transforming Careers Through Learning" },
  "/upcoming-batches": { title: "Upcoming Course Batches | Upskillab Online Learning" },
  "/blog": { title: "Upskillab Blog | Psychology, Tech & Career Insights" },
  "/ebooks": { title: "Free eBooks | Upskillab - Download Educational Resources" },
  "/newsletter": { title: "Upskillab Newsletter | Learning & Career Insights" },
  "/self-test": { title: "Self Test | Upskillab - Professional Assessment Tests" },
  "/contactus": { title: "Contact Upskillab | Get in Touch with Our Team" },
  "/courselist": { title: "Upskillab Courses | Advance Your Skills Online" },
  "/career": { title: "Careers at Upskillab | Jobs & Opportunities in EdTech" },
  "/whyus": { title: "Why Choose Upskillab | Best Online Learning Platform in India" },
  "/about": { title: "About Upskillab | Online Learning for Career Growth" },
  "/PCATExamPortal": { title: "PCAT Exam Portal | Upskillab" },
  "/PCAT/result": { title: "PCAT Result | Upskillab", noindex: true },
  "/register": { title: "Register | Upskillab", noindex: true },
  "/login": { title: "Login | Upskillab - Access Your Learning Dashboard", noindex: true },
  "/forgetPassword": { title: "Forgot Password | Upskillab", noindex: true },
  "/ResetPassword": { title: "Reset Password | Upskillab", noindex: true },
  "/VerifyOTP": { title: "Verify OTP | Upskillab", noindex: true },
  "/terms-of-service": { title: "Terms & Conditions | Upskillab" },
  "/privacypolicy": { title: "Privacy Policy | Upskillab" },
  "/refundpolicy": { title: "Refund Policy | Upskillab" },
  "/teacher/register": { title: "Teacher Registration | Upskillab" },
};

const metadataByLowerPath = Object.fromEntries(
  Object.entries(pageMetadata).map(([path, meta]) => [path.toLowerCase(), { path, ...meta }])
);

// Logged-in areas and one-off flows that should never appear in search results.
const NOINDEX_PREFIXES = ["/student/", "/teacher/", "/exam/", "/examattempt/"];

function normalizedPathname(pathname) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Upskillab",
      alternateName: "Online Upskilling Courses",
      url: `${SITE_URL}/`,
      logo: DEFAULT_OG_IMAGE,
      sameAs: [
        "https://www.facebook.com/upskillab/",
        "https://www.instagram.com/upskillab_",
        "https://www.linkedin.com/company/upskill-now-upskillab",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: "+91-9319426464",
          email: "info@upskillab.com",
          url: `${SITE_URL}/contactus`,
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: "+91-9319427070",
          email: "info@upskillab.com",
          url: `${SITE_URL}/contactus`,
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Upskillab",
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function SeoDefaults() {
  const { pathname } = useLocation();
  const normalizedPath = normalizedPathname(pathname);
  const lowerPath = normalizedPath.toLowerCase();
  const metadata = metadataByLowerPath[lowerPath] || {};
  const title = metadata.title || "Upskillab | Learn Skills Online";
  const description = metadata.description || DEFAULT_DESCRIPTION;
  // Canonical always uses the official spelling (/contactus, not /ContactUs).
  const canonical = `${SITE_URL}${metadata.path || normalizedPath}`;
  const noindex =
    metadata.noindex || NOINDEX_PREFIXES.some((prefix) => `${lowerPath}/`.startsWith(prefix));

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex,follow" : "index,follow"} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content="Upskillab" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
    </Helmet>
  );
}
