import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://upskillab.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/Logo.png`;
const DEFAULT_DESCRIPTION = "Upskillab offers expert-led online learning to help you build practical skills and advance your career.";

const pageMetadata = {
  "/": { title: "Upskillab | Empowering Your Career Through Online Learning" },
  "/landing": { title: "Upskillab | Learn Skills Online" },
  "/landing-bootcamp": { title: "Upskillab Bootcamp | Learn Job-Ready Skills" },
  "/thank-you": { title: "Thank You | Upskillab" },
  "/success-stories": { title: "Upskillab Success Stories | Transforming Careers Through Learning" },
  "/upcoming-batches": { title: "Upcoming Course Batches | Upskillab Online Learning" },
  "/blog": { title: "Upskillab Student Blog | Insights and Tips for Online Learners" },
  "/ebooks": { title: "Free eBooks | Upskillab - Download Educational Resources" },
  "/newsletter": { title: "Upskillab Learning Newsletter | Professional Growth" },
  "/self-test": { title: "Self Test | Upskillab - Professional Assessment Tests" },
  "/contactus": { title: "Contact Upskillab | Get in Touch with Our Team" },
  "/courselist": { title: "Upskillab Courses | Advance Your Skills Online" },
  "/career": { title: "Upskillab | Start Your Career Here" },
  "/whyus": { title: "Why Choose Upskillab | Best Online Learning Platform in India" },
  "/about": { title: "About Upskillab | Online Learning for Career Growth" },
  "/PCATExamPortal": { title: "PCAT Exam Portal | Upskillab" },
  "/PCAT/result": { title: "PCAT Result | Upskillab" },
  "/register": { title: "Register | Upskillab" },
  "/login": { title: "Login | Upskillab - Access Your Learning Dashboard" },
  "/forgetPassword": { title: "Forgot Password | Upskillab" },
  "/ResetPassword": { title: "Reset Password | Upskillab" },
  "/VerifyOTP": { title: "Verify OTP | Upskillab" },
  "/TermsOfService": { title: "Terms & Conditions | Upskillab" },
  "/privacypolicy": { title: "Privacy Policy | Upskillab" },
  "/refundpolicy": { title: "Refund Policy | Upskillab" },
  "/teacher/register": { title: "Teacher Registration | Upskillab" },
};

function normalizedPathname(pathname) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export default function SeoDefaults() {
  const { pathname } = useLocation();
  const normalizedPath = normalizedPathname(pathname);
  const metadata = pageMetadata[normalizedPath] || {};
  const title = metadata.title || "Upskillab | Learn Skills Online";
  const description = metadata.description || DEFAULT_DESCRIPTION;
  const canonical = `${SITE_URL}${normalizedPath}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Upskillab",
        url: `${SITE_URL}/`,
        logo: DEFAULT_IMAGE,
        sameAs: [
          "https://www.facebook.com/upskillab/",
          "https://www.instagram.com/upskillab_",
          "https://www.linkedin.com/company/upskill-now-upskillab",
        ],
      },
      {
        "@type": "WebSite",
        name: "Upskillab",
        url: `${SITE_URL}/`,
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}