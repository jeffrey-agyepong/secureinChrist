const siteUrl = (
  import.meta.env.SITE_URL ||
  import.meta.env.PUBLIC_SITE_URL ||
  "https://secureinchrist.org"
).replace(/\/$/, "");

export const SITE = {
  name: "Secure in Christ",
  description:
    "An independent Christian magazine on theology and finding rest in Christ.",
  url: siteUrl,
  locale: "en-US",
  language: "en",
  repositoryUrl: "https://github.com/jeffrey-agyepong/secureinChrist",
};

export const NAVIGATION = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Writing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const CONTACT = {
  email: "info@secureinchrist.org",
};

export const FORMS = {
  newsletter: {
    action: "",
    method: "post",
    enctype: "application/x-www-form-urlencoded",
  },
};

export const SOCIAL_LINKS = [
  { href: "/rss.xml", label: "RSS feed", icon: "rss" },
  { href: SITE.repositoryUrl, label: `${SITE.name} on GitHub`, icon: "github" },
  { href: `mailto:${CONTACT.email}`, label: "Email", icon: "mail" },
];

// Authors, categories, and tags now live in src/content/{authors,categories,tags}
// as Keystatic-editable collections. See src/lib/blog-data.js for the readers.
