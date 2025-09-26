// src/config/dmiSchema.js

export const STEPS = [
  /* ───────────────────────── 1) ORGANIZATIONAL SNAPSHOT ───────────────────────── */
  {
    id: "org",
    title: "Organizational Snapshot",
    subtitle: "A quick profile tells us which benchmarks to compare you with.",
    type: "form",
    fields: [
      { id: "country",      label: "Country of Primary Operation", type: "text",   required: true },
      { id: "company",      label: "Company Name",                  type: "text",   required: true },
      { id: "role",         label: "Your Role",                     type: "text",   required: true },
      { id: "companyType",  label: "Company Type",                  type: "select", options: ["Startup","SMB","Enterprise"], required: true },
      { id: "industry",     label: "Primary Industry",              type: "select", options: ["Manufacturing","Healthcare","Retail","Software","Consumer Electronics","Automotive","Other"], required: true },

      // Inline 5-point likerts on the org screen
      { id: "selfDesignUnderstanding", label: "How would you rate your own understanding of design?", type: "likert", scale: 5 },
      { id: "companyMaturitySelf",     label: "How would you rate your company’s overall design maturity?", type: "likert", scale: 5 },
    ],
  },

  /* ───────────────────────── 2) VISION & STRATEGY ───────────────────────── */
  {
    id: "vision",
    title: "Vision & Strategy",
    subtitle: "A strong vision turns UX from “nice to have” into a growth lever.",
    type: "likert",
    scale: 5,
    questions: [
      { id: "v1", text: "Our mission/vision explicitly prioritizes customer experience." },
      { id: "v2", text: "We aim for bold, transformative improvements, not just incremental tweaks." },
      { id: "v3", text: "Our strategy quantifies customer needs and uses future-scenario planning." },
      { id: "v4", text: "Design / UX goals are treated like revenue or cost KPIs and reported regularly." },
      { id: "v5", text: "How would you rate your company’s overall design maturity?" },
      { id: "v6", text: "Customer insights directly influence resource allocation and roadmapping." },
      { id: "v7", text: "We refresh our strategic roadmap at least 3 years out, every year." },
    ],
  },

  /* ───────────────────────── 3) LEADERSHIP & CULTURE ───────────────────────── */
  {
    id: "leadership",
    title: "Leadership & Culture",
    subtitle: "When leaders walk the talk, design scales faster.",
    type: "likert",
    scale: 5,
    questions: [
      { id: "l1", text: "The head of design has a true executive seat (reports to CEO / C-suite)." },
      { id: "l2", text: "Design leaders shape cross-org business improvements, not just aesthetics." },
      { id: "l3", text: "Senior leaders meet real users at least monthly." },
      { id: "l4", text: "Design/UX metrics are reviewed with business metrics in exec forums." },
      { id: "l5", text: "Design objectives appear in company-wide OKRs/performance reviews." },
      { id: "l6", text: "Designers are invited to key decisions across functions (marketing, ops, finance)." },
      { id: "l7", text: "We celebrate design wins publicly (town halls, intranet, awards)." },
    ],
  },

  /* ───────────────────────── 4) PEOPLE & CAPABILITY BUILDING ───────────────────────── */
  {
    id: "people",
    title: "People & Capability Building",
    subtitle: "Talent pipelines and growth paths make great design repeatable.",
    type: "likert",
    scale: 5,
    questions: [
      { id: "p1", text: "We use structured, bias-aware hiring and multiple channels to attract talent." },
      { id: "p2", text: "Designers have clear dual-ladder career paths (managerial and expert)." },
      { id: "p3", text: "Top talent receives meaningful financial and non-financial incentives." },
      { id: "p4", text: "We fund continuous training across physical, digital and service design." },
      { id: "p5", text: "Designers are supported to publish/speak externally (budget, time, PR help)." },
      { id: "p6", text: "Performance-based pay/promotion ties directly to design-impact metrics." },
      { id: "p7", text: "All employees can spend time on early-stage innovation/side projects." },
      { id: "p8", text: "Cross-functional mentoring pairs designers with product, engineering or business peers." },
    ],
  },

  /* ───────────────────────── 5) RESEARCH & INSIGHT GENERATION ───────────────────────── */
  {
    id: "research",
    title: "Research & Insight Generation",
    subtitle: "Good decisions start with good questions.",
    type: "likert",
    scale: 5,
    questions: [
      { id: "r1", text: "We blend qualitative and quantitative methods (interviews, analytics, surveys)." },
      { id: "r2", text: "Research participants mirror our real-user diversity." },
      { id: "r3", text: "Product teams run their own lightweight research when needed." },
      { id: "r4", text: "Research budgets are ring-fenced, not cut when timelines slip." },
      { id: "r5", text: "We employ advanced or emerging techniques (conjoint, eye-tracking, telemetry)." },
      { id: "r6", text: "Findings are shared widely and routinely inform decisions." },
    ],
  },

  /* ───────────────────────── 6) DESIGN OPERATIONS & EXECUTION ───────────────────────── */
  {
    id: "ops",
    title: "Design Operations & Execution",
    subtitle: "Processes that shorten the loop from idea to live product.",
    type: "likert",
    scale: 5,
    questions: [
      { id: "o1", text: "We have rapid prototyping tools and infrastructure (design tokens, 3-D, hi-fi click-throughs)." },
      { id: "o2", text: "We iterate with real users pre- and post-launch (prototype → beta → live)." },
      { id: "o3", text: "Design, engineering and product are co-located or tightly integrated." },
      { id: "o4", text: "Usability, emotion and inclusion targets are tracked through the lifecycle." },
      { id: "o5", text: "Teams run regular cross-functional stand-ups/critiques including business stakeholders." },
    ],
  },

  /* ───────────────────────── 7) INNOVATION & SYSTEMS THINKING ───────────────────────── */
  {
    id: "innovation",
    title: "Innovation & Systems Thinking",
    subtitle: "Beyond the next release: designing for ecosystems and emotion.",
    type: "likert",
    scale: 5,
    questions: [
      { id: "i1", text: "Teams prototype multiple solutions before committing." },
      { id: "i2", text: "Designers are trained in systems-level thinking (physical-digital-service)." },
      { id: "i3", text: "We design to plug-and-play with partners/third-party platforms." },
      { id: "i4", text: "We consciously decide to build, partner or integrate for each opportunity." },
      { id: "i5", text: "We forecast future user behaviours and ecosystem shifts." },
      { id: "i6", text: "We measure novelty and emotional resonance alongside function." },
    ],
  },
];

// (Optional) keep empty for now; you can introduce weights later if you want scoring by domain.
export const DOMAIN_WEIGHTS = {};
