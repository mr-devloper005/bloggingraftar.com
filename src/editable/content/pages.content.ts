import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Fresh articles, sharp opinions, and useful reads',
      description: 'Explore a magazine-style article platform built for readable stories, clean discovery, and focused publishing.',
      openGraphTitle: 'Fresh articles, sharp opinions, and useful reads',
      openGraphDescription: 'Discover thoughtful articles through a cleaner magazine-style reading experience.',
      keywords: ['article platform', 'article site', 'online magazine', 'content discovery'],
    },
    hero: {
      badge: 'Independent article desk',
      title: ['Read the stories', 'worth slowing down for.'],
      description: 'Browse fresh articles, featured essays, practical guides, and reader-friendly commentary in a compact magazine layout.',
      primaryCta: { label: 'Read latest articles', href: '/article' },
      secondaryCta: { label: 'Search the archive', href: '/search' },
      searchPlaceholder: 'Search articles, writers, topics, and categories',
      focusLabel: 'Focus',
      featureCardBadge: 'editorial cover',
      featureCardTitle: 'A homepage led by headlines, images, and clear reading paths.',
      featureCardDescription: 'Recent articles stay visible without making the page feel stretched or noisy.',
    },
    intro: {
      badge: 'About the publication',
      title: 'Built for readers who want useful articles without visual clutter.',
      paragraphs: [
        'This site is shaped like a modern article magazine: strong covers, compact topic sections, readable excerpts, and direct paths into detail pages.',
        'Every surface is tuned around articles first, so visitors can move from headline to summary to full story without fighting oversized layouts.',
        'Writers get a simple publishing flow, and readers get a calmer archive for discovering new ideas, explainers, opinions, and evergreen reads.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with strong image-led article cards.',
        'Clear sections for latest, trending, featured, and related articles.',
        'Compact layout widths that feel like a publication, not a stretched dashboard.',
        'Simple account access for creating and managing article submissions.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start reading',
      title: 'Explore sharp articles through one clean editorial experience.',
      description: 'Move between latest stories, featured reads, topic collections, and related article detail pages with less friction.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A focused article publication for curious readers.',
    description: `${slot4BrandConfig.siteName} is built for article discovery: thoughtful headlines, readable pages, compact sections, and a publishing flow that keeps the reader in mind.`,
    paragraphs: [
      'We publish and organize articles so readers can quickly understand what a story is about, why it matters, and where to go next.',
      'The experience is intentionally editorial: fewer distractions, stronger typographic hierarchy, useful sidebars, and article cards designed for scanning.',
      'For contributors, the create flow keeps submission fields clear and practical so new stories can be drafted without wrestling with the interface.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover articles without noise.',
      },
      {
        title: 'Editorial discovery',
        description: 'Featured reads, trending cards, topic lanes, and related stories work together so discovery feels natural.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear article structure to help visitors find useful reading faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Contact the editorial team.',
    description: 'Send article pitches, correction requests, partnership notes, or publishing questions. Share the context and we will route it to the right editorial lane.',
    formTitle: 'Send your editorial note',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search articles, topics, categories, and writers across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find articles by topic, headline, or category.',
      description: 'Use keywords, article categories, and content types to jump into the exact read you need.',
      placeholder: 'Search articles, topics, authors, or categories',
    },
    resultsTitle: 'Latest searchable articles',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit article content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create a new article.',
      description: 'Use your account to open the publishing workspace, draft article details, and prepare a clean submission.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create a polished article submission.',
      description: 'Choose the article lane, add a strong headline, write a useful summary, and prepare the body content for review.',
    },
    formTitle: 'Article details',
    submitLabel: 'Submit article',
    successTitle: 'Article submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue reading, manage article submissions, and open the publishing workspace from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your reader account and start publishing.',
      description: 'Create an account to access the article workspace, save contributor details, and submit new stories through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
