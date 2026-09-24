import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    blog: collection({
      label: "Blog posts",
      slugField: "title",
      path: "src/content/blog/*/",
      format: { contentField: "content" },
      entryLayout: "content",
      previewUrl: "/blog/{slug}",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true },
          },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: { isRequired: true },
        }),
        seoTitle: fields.text({ label: "SEO title" }),
        seoDescription: fields.text({ label: "SEO description", multiline: true }),
        canonical: fields.url({ label: "Canonical URL" }),
        date: fields.date({
          label: "Date",
          validation: { isRequired: true },
          defaultValue: { kind: "today" },
        }),
        updated: fields.date({ label: "Updated" }),
        readingTime: fields.integer({ label: "Reading time (minutes)" }),
        category: fields.relationship({
          label: "Category",
          collection: "categories",
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.relationship({ label: "Tag", collection: "tags" }), {
          label: "Tags",
          itemLabel: (props) => props.value ?? "Tag",
        }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: { isRequired: true },
        }),
        thumbnail: fields.image({
          label: "Thumbnail",
          validation: { isRequired: true },
        }),
        thumbnailAlt: fields.text({ label: "Thumbnail alt text" }),
        imageCredit: fields.object(
          {
            caption: fields.text({ label: "Caption" }),
            author: fields.text({ label: "Photo author" }),
            authorUrl: fields.url({ label: "Photo author URL" }),
            source: fields.text({ label: "Source", defaultValue: "Unsplash" }),
            sourceUrl: fields.url({ label: "Source URL" }),
          },
          {
            label: "Image credit",
            description: "Leave blank if the photo doesn't need attribution.",
          }
        ),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      format: "yaml",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { isRequired: true } } }),
        bio: fields.text({
          label: "Short bio",
          multiline: true,
          validation: { isRequired: true },
        }),
        longBio: fields.text({
          label: "Long bio",
          multiline: true,
          validation: { isRequired: true },
        }),
        avatar: fields.image({
          label: "Avatar",
          directory: "public/avatars",
          publicPath: "/avatars/",
          validation: { isRequired: true },
        }),
      },
    }),
    categories: collection({
      label: "Categories",
      slugField: "name",
      path: "src/content/categories/*",
      format: "yaml",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { isRequired: true } } }),
      },
    }),
    tags: collection({
      label: "Tags",
      slugField: "name",
      path: "src/content/tags/*",
      format: "yaml",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { isRequired: true } } }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: "Home page",
      path: "src/content/home/",
      format: "yaml",
      previewUrl: "/",
      schema: {
        heroHeadline: fields.text({ label: "Hero headline", validation: { isRequired: true } }),
        heroSubhead: fields.text({
          label: "Hero subhead",
          multiline: true,
          validation: { isRequired: true },
        }),
        primaryCtaLabel: fields.text({
          label: "Primary button label",
          validation: { isRequired: true },
        }),
        secondaryCtaLabel: fields.text({
          label: "Secondary button label",
          validation: { isRequired: true },
        }),
      },
    }),
    about: singleton({
      label: "About page",
      path: "src/content/about/",
      format: { contentField: "content" },
      previewUrl: "/about",
      schema: {
        heading: fields.text({ label: "Heading", validation: { isRequired: true } }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
    contact: singleton({
      label: "Contact page",
      path: "src/content/contact/",
      format: "yaml",
      previewUrl: "/contact",
      schema: {
        heading: fields.text({ label: "Heading", validation: { isRequired: true } }),
        intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
        pitchesBlurb: fields.text({
          label: "Pitches blurb",
          multiline: true,
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
