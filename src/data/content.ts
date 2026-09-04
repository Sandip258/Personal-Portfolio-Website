export interface LinkItem {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  context: string;
  strategicShift: string;
  execution: string;
  outcome: string;
  outcomes: string[];
}

export interface MediaItem {
  id: string;
  label: string;
  title?: string;
  caption?: string;
  note?: string;
  url?: string;
  src: string;
  poster?: string;
  alt: string;
}

export interface ProcessStep {
  number: string;
  index: string;
  title: string;
  detail: string;
}

export interface Service {
  id: string;
  number: string;
  index: string;
  name: string;
  title: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  cta: LinkItem;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  autoComplete?: string;
  required: boolean;
}

export const placeholders = {
  domain: "YOUR_DOMAIN",
  email: "YOUR_EMAIL",
  emailHref: "mailto:YOUR_EMAIL",
  whatsapp: "YOUR_WHATSAPP_LINK",
  calendar: "YOUR_CALENDAR_LINK",
  linkedIn: "LINKEDIN_URL",
  instagram: "INSTAGRAM_URL",
  youtube: "YOUTUBE_URL",
  cv: "DOWNLOAD_CV_URL",
  reels: ["REEL_URL_01", "REEL_URL_02", "REEL_URL_03"],
  portrait: "PORTRAIT_IMAGE",
  behindTheScenes: ["BTS_IMAGE_01", "BTS_IMAGE_02"],
} as const;

export const siteContent = {
  seo: {
    name: "Sandip Ghosh",
    title: "Sandip Ghosh | YouTube Growth & Content Strategy",
    description:
      "Selected work from Sandip Ghosh across YouTube growth, content strategy and creative operations—from audience insight and packaging to repeatable channel systems.",
    keywords: [
      "YouTube growth manager",
      "YouTube content strategist",
      "content strategy",
      "creative operations",
      "channel growth",
      "Sandip Ghosh",
    ],
    canonicalUrl: placeholders.domain,
  },

  nav: [
    { label: "Work", href: "#work" },
    { label: "Reels", href: "#reels" },
    { label: "System", href: "#system" },
    { label: "Channel Desk", href: "#channel-desk" },
    { label: "Contact", href: "#contact" },
  ] satisfies LinkItem[],

  statusItems: [
    "SYSTEM ONLINE",
    "4-CHANNEL PORTFOLIO",
    "2,500+ LAUNCHES",
    "METRICS SYNC: DAILY",
  ],

  hero: {
    eyebrow: "YouTube growth × content systems",
    headline: "I turn audience insight into",
    highlight: "YouTube growth systems.",
    supportingCopy:
      "From research and packaging to high-velocity programming, I build content engines that people want to watch—and teams can actually run.",
    primaryCta: { label: "Work with me", href: "#contact" },
    alternatePrimaryCta: { label: "Send a project brief", href: "#project-brief" },
    secondaryCta: { label: "Download CV", href: placeholders.cv },
    featuredImpact: {
      eyebrow: "Featured impact",
      label: "Featured impact",
      title: "Class 10 Endgame turnaround",
      value: "+310%",
      context: "average monthly views",
      ctaLabel: "View case study",
      href: "#class-10-endgame",
      cta: { label: "View case study", href: "#class-10-endgame" },
    },
  },

  impactIntro: "Selected six-month portfolio outcomes",
  impacts: [
    { value: "13.07M", label: "views across a four-channel portfolio" },
    { value: "421.7K", label: "watch hours" },
    { value: "49.1K", label: "net subscribers gained" },
    { value: "2,500+", label: "live, long-form and Shorts launches" },
  ] satisfies Metric[],

  workIntro: {
    eyebrow: "Selected work",
    title: "Evidence, not just claims.",
    description:
      "Each case study follows the same path: context, strategic shift, execution and outcome.",
    note: "Each case study follows the same path: context, strategic shift, execution and outcome.",
  },

  caseStudies: [
    {
      id: "class-10-endgame",
      index: "01",
      category: "Channel turnaround",
      title: "Class 10 Endgame",
      summary:
        "Rebuilt an exam-cycle content engine around student urgency, retention-first hooks and repositioned live sessions.",
      context:
        "An exam-cycle audience needed programming that matched changing student intent and urgency.",
      strategicShift:
        "Reframe the calendar around high-intent moments and make retention a core creative input.",
      execution:
        "Reworked programming, hooks and the role of live sessions across the exam cycle.",
      outcome:
        "Average monthly views rose 310%, monthly watch time rose 630%, AVD rose 73%, and peak concurrency reached 8.7× the prior level.",
      outcomes: [
        "+310% average monthly views",
        "+630% monthly watch time",
        "+73% AVD",
        "8.7× peak concurrency",
      ],
    },
    {
      id: "campus-chronicles",
      index: "02",
      category: "Built from zero",
      title: "Campus Chronicles",
      summary:
        "A personal, independent channel case study spanning ideation, scripts, packaging, publishing and weekly iteration.",
      context:
        "Build and operate an independent channel with direct ownership of the full content workflow.",
      strategicShift:
        "Treat the channel as a repeatable learning system, not a sequence of disconnected uploads.",
      execution:
        "Owned ideation, scripting, packaging, publishing and the weekly review loop.",
      outcome:
        "A creator-led, full-stack case study. Public performance metrics will be added once the channel is connected and approved.",
      outcomes: [
        "Personal channel",
        "Full-stack workflow ownership",
      ],
    },
    {
      id: "flagship-sprint",
      index: "03",
      category: "Growth sprint",
      title: "The 30-day flagship sprint",
      summary:
        "A concentrated live-and-content campaign designed to create daily momentum, watch time and audience conversion.",
      context:
        "A defined 30-day growth window called for a focused campaign rather than business-as-usual publishing.",
      strategicShift:
        "Concentrate programming around a flagship moment and build momentum through consistent audience touchpoints.",
      execution:
        "Ran an intensive live-and-content sprint with a coordinated publishing rhythm.",
      outcome:
        "The channel grew from 5K to 25K subscribers in 30 days and generated 111K watch hours.",
      outcomes: [
        "5K → 25K subscribers in 30 days",
        "111K watch hours",
      ],
    },
  ] satisfies CaseStudy[],

  mediaIntro: {
    eyebrow: "Content in motion",
    title: "Popular reels & the person behind the work.",
    description:
      "Selected short-form work and a look at the planning, production and collaboration behind it.",
    note: "Selected short-form work and a look at the planning, production and collaboration behind it.",
  },

  media: {
    reels: [
      {
        id: "reel-01",
        label: "REEL 01",
        title: "Featured Reel / Short",
        caption: "Replace with cover frame, topic and verified view count",
        url: placeholders.reels[0],
        src: "REEL_URL_01",
        poster: "REEL_URL_01",
        alt: "Placeholder cover for featured Reel or Short one",
      },
      {
        id: "reel-02",
        label: "REEL 02",
        title: "Featured Reel / Short",
        caption: "Replace with cover frame, topic and verified view count",
        url: placeholders.reels[1],
        src: "REEL_URL_02",
        poster: "REEL_URL_02",
        alt: "Placeholder cover for featured Reel or Short two",
      },
      {
        id: "reel-03",
        label: "REEL 03",
        title: "Featured Reel / Short",
        caption: "Replace with cover frame, topic and verified view count",
        url: placeholders.reels[2],
        src: "REEL_URL_03",
        poster: "REEL_URL_03",
        alt: "Placeholder cover for featured Reel or Short three",
      },
    ] satisfies MediaItem[],
    photos: [
      {
        id: "portrait",
        label: "Portrait",
        note: "Replace with a confident editorial portrait—on set, planning or speaking.",
        src: placeholders.portrait,
        alt: "Portrait of Sandip Ghosh—placeholder image",
      },
      {
        id: "behind-the-scenes",
        label: "Behind the scenes",
        note: "Replace with Sandip working with a team.",
        src: placeholders.behindTheScenes[0],
        alt: "Sandip Ghosh working with a team—placeholder image",
      },
      {
        id: "in-the-field",
        label: "In the field",
        note: "Replace with a shoot, live event or creator moment.",
        src: placeholders.behindTheScenes[1],
        alt: "Sandip Ghosh at a shoot or live event—placeholder image",
      },
    ] satisfies MediaItem[],
  },

  processIntro: {
    eyebrow: "The operating system",
    title: "How the work compounds.",
    description:
      "A repeatable system turns audience signals into programming, production and better decisions—not just isolated viral attempts.",
    note: "A repeatable system turns audience signals into programming, production and better decisions—not just isolated viral attempts.",
  },
  processSteps: [
    {
      number: "01",
      index: "01",
      title: "Find demand",
      detail: "Audience, competitor and search intelligence",
    },
    {
      number: "02",
      index: "02",
      title: "Build formats",
      detail: "Hooks, packaging and repeatable series",
    },
    {
      number: "03",
      index: "03",
      title: "Program the calendar",
      detail: "High-intent moments, lives and launches",
    },
    {
      number: "04",
      index: "04",
      title: "Run production",
      detail: "Educators, creative teams and delivery systems",
    },
    {
      number: "05",
      index: "05",
      title: "Iterate from data",
      detail: "CTR, AVD, retention and conversion signals",
    },
  ] satisfies ProcessStep[],

  channelDesk: {
    eyebrow: "Living proof",
    title: "Channel Desk",
    description:
      "Public YouTube statistics, latest uploads and publishing cadence—refreshed from saved snapshots without exposing private analytics or credentials.",
    connectedLabel: "API-connected public metrics",
    partialLabel: "API connected · partial refresh",
    configurationLabel: "Public metrics awaiting setup",
    unavailableLabel: "Public metrics temporarily unavailable",
    loadingLabel: "Loading the latest saved metrics…",
    emptyTitle: "Channel data is not connected yet.",
    emptyDescription:
      "Add approved public channel IDs and run the metrics refresh to populate this desk.",
    staleLabel: "Showing the last valid snapshot",
    updatedLabel: "Last updated",
    cadenceLabel: "Publishing cadence",
    trend7DayLabel: "7-day movement",
    trend30DayLabel: "30-day movement",
    privacyNote:
      "Phase 1 uses public statistics only. Private YouTube Analytics data is never published without account-owner approval.",
  },

  servicesIntro: {
    eyebrow: "Freelance services",
    title: "Ways to work together.",
    description:
      "Focused engagements for creators, education brands and creator-led teams that need a clearer growth system.",
    note: "Focused engagements for creators, education brands and creator-led teams that need a clearer growth system.",
  },
  services: [
    {
      id: "channel-growth-reset",
      number: "01",
      index: "01",
      name: "Channel Growth Reset",
      title: "Channel Growth Reset",
      summary:
        "Turn a scattered publishing effort into a focused plan built around audience demand and channel opportunity.",
      outcomes: [
        "Channel and content audit",
        "Opportunity map",
        "Prioritised growth plan",
      ],
      deliverables: [
        "Channel and content audit",
        "Opportunity map",
        "Prioritised growth plan",
      ],
      cta: { label: "Discuss a reset", href: "#project-brief" },
    },
    {
      id: "content-engine",
      number: "02",
      index: "02",
      name: "Content Engine",
      title: "Content Engine",
      summary:
        "Build repeatable formats and an operating rhythm your team can sustain beyond a single upload.",
      outcomes: [
        "Format and series architecture",
        "Programming calendar",
        "Scripting and packaging systems",
      ],
      deliverables: [
        "Format and series architecture",
        "Programming calendar",
        "Scripting and packaging systems",
      ],
      cta: { label: "Build the engine", href: "#project-brief" },
    },
    {
      id: "launch-or-sprint",
      number: "03",
      index: "03",
      name: "Launch or Sprint",
      title: "Launch or Sprint",
      summary:
        "Plan a high-intent campaign around a defined launch, season or growth moment.",
      outcomes: [
        "Campaign strategy",
        "Launch programming",
        "Execution and iteration plan",
      ],
      deliverables: [
        "Campaign strategy",
        "Launch programming",
        "Execution and iteration plan",
      ],
      cta: { label: "Plan a sprint", href: "#project-brief" },
    },
  ] satisfies Service[],

  contact: {
    eyebrow: "Start a project",
    title: "Tell me the channel, the audience and the goal.",
    description:
      "For creators, education brands and creator-led teams that want more than a one-off viral video.",
    availability:
      "Available for YouTube growth, content strategy and creative-operations conversations.",
    routes: [
      {
        label: "Send a project brief",
        detail: "Share your channel, audience and goal.",
        href: "#project-brief",
        kind: "primary",
      },
      {
        label: "Book a short intro call",
        detail: "Choose a time for a focused first conversation.",
        href: placeholders.calendar,
        kind: "calendar",
      },
      {
        label: "WhatsApp directly",
        detail: "Start a direct conversation.",
        href: placeholders.whatsapp,
        kind: "whatsapp",
      },
      {
        label: "Email directly",
        detail: "Send context in your own format.",
        href: placeholders.emailHref,
        kind: "email",
      },
    ],
    form: {
      id: "project-brief",
      action: placeholders.emailHref,
      title: "Send a project brief",
      description:
        "Share the essentials. Sandip can follow up with the right next step once contact details are configured.",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Your name",
          autoComplete: "name",
          required: true,
        },
        {
          id: "email",
          name: "email",
          label: "Work email",
          type: "email",
          placeholder: "you@company.com",
          autoComplete: "email",
          required: true,
        },
        {
          id: "channel",
          name: "channel",
          label: "Channel / brand",
          type: "text",
          placeholder: "Channel or brand name",
          autoComplete: "organization",
          required: true,
        },
        {
          id: "audience",
          name: "audience",
          label: "Audience",
          type: "text",
          placeholder: "Who do you want to reach?",
          required: true,
        },
        {
          id: "goal",
          name: "goal",
          label: "Main goal",
          type: "text",
          placeholder: "What should this work change?",
          required: true,
        },
        {
          id: "brief",
          name: "brief",
          label: "Project brief",
          type: "textarea",
          placeholder: "Share the challenge, timing and useful context.",
          required: true,
        },
      ] satisfies FormField[],
      submitLabel: "Send project brief",
      privacyNote: "Your details will only be used to respond to this enquiry.",
      unconfiguredMessage:
        "Form delivery is being configured. Please use the direct email option for now.",
      successMessage: "Thanks—your project brief has been sent.",
      errorMessage:
        "The brief could not be sent. Please email Sandip directly instead.",
    },
  },

  socials: [
    { label: "LinkedIn", href: placeholders.linkedIn },
    { label: "Instagram", href: placeholders.instagram },
    { label: "YouTube", href: placeholders.youtube },
    { label: "Email", href: placeholders.emailHref },
  ] satisfies LinkItem[],

  footer: {
    line: "Sandip Ghosh · YouTube growth & content systems",
    note: "Public proof. Repeatable systems. Thoughtful execution.",
  },
} as const;

export type SiteContent = typeof siteContent;

// Stable named exports keep section components small and make future route-level
// case studies easy to add without duplicating content.
export const impactMetrics = siteContent.impacts;
export const caseStudies = siteContent.caseStudies;
export const reels = siteContent.media.reels;
export const photos = siteContent.media.photos;
export const processSteps = siteContent.processSteps;
export const services = siteContent.services;
export const contactLinks = siteContent.contact.routes;
