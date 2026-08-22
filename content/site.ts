/**
 * Every string of visible text on the site lives here (spec §6).
 * Components import from this file and never hardcode copy.
 *
 * Voice: plain, specific, slightly understated. Concrete numbers beat adjectives.
 * Forbidden vocabulary (spec §1) must never appear below.
 */

export const site = {
  meta: {
    name: "Riyad Tech",
    title: "Riyad Tech — AI document automation for European companies",
    description:
      "A small engineering studio in Dhaka. We build AI systems that read your documents, pull out the data, and put it where it belongs. First working version in two weeks.",
/* Overridden by NEXT_PUBLIC_SITE_URL wherever it is set. This is the
       fallback for a local build, and the domain we actually own. */
    url: "https://riyadtech.xyz",
  },

  nav: {
    wordmark: "Riyad Tech",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "For agencies", href: "/agencies" },

      { label: "Products", href: "/products" },
      { label: "Work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
    cta: { label: "Book a call", href: "/contact" },
    /* Deliberately quiet. Most visitors have no account and never will; the
       people who need it are the ones already looking for it. */
    account: { label: "Account", href: "/portal" },
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  hero: {
    eyebrow: "Dhaka → Europe · AI engineering",
    /* The headline is split so one word can carry the marker stroke. */
    headline: {
      lead: "We turn document work into",
      marked: "software",
      tail: ".",
    },
    body: "Riyad Tech builds AI systems that read your documents, pull out the data, and put it where it belongs — so your team stops doing it by hand. First working version in two weeks.",
    primary: { label: "Book a 15-min call", href: "/contact" },
    secondary: { label: "See what we build", href: "/services" },
    assurance:
      "Your data is processed in the EU. GDPR compliant. No training on client data.",
  },

  /* Four facts directly under the hero. Each one is checkable, and each one
     answers a question the visitor is already holding. */
  proof: [
    { value: "2 weeks", label: "To a working first version" },
    { value: "€1,500", label: "Fixed pilot price, no estimate" },
    { value: "EU", label: "Where your documents are processed" },
    { value: "In-house", label: "Nothing subcontracted, ever" },
  ],

  problem: {
    eyebrow: "The problem",
    heading: "Somebody on your team is doing this by hand.",
    sub: "Not because it is hard. Because nobody has had time to automate it. The arithmetic below is the part worth looking at.",
    columns: {
      task: "Task",
      manual: "By hand",
      automated: "Automated",
    },
    rows: [
      {
        task: "Reading 200 supplier invoices",
        detail: "3 minutes each, keyed into the accounting system",
        manual: "10 hours",
        automated: "Under a minute",
      },
      {
        task: "Screening 300 applications",
        detail: "5 minutes each, copied into the ATS",
        manual: "25 hours",
        automated: "Under two minutes",
      },
      {
        task: "Answering the same support question",
        detail: "40 times a week, 10 minutes each",
        manual: "7 hours a week",
        automated: "Answered instantly",
      },
    ],
    /* This footnote is not a hedge. It is the reason the pilot exists. */
    note: "Automated timings come from our own test runs on documents like these. Yours will be different — the two-week pilot is how you find out, on your real files.",
  },

  faq: {
    eyebrow: "Questions",
    heading: "The things people ask on the call.",
    items: [
      {
        q: "What happens if the pilot does not work?",
        a: "You stop. That is the point of a fixed two-week pilot — €1,500 buys you a definite answer instead of a six-month commitment. You keep the code either way, and we will tell you plainly if we think the problem is a poor fit for AI. We would rather lose the project than deliver something that quietly fails in month four.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Full source, no licence fee, no per-seat pricing, no lock-in. If you stop working with us, everything keeps running and any competent developer can pick it up. That is also why we document it properly.",
      },
      {
        q: "Where is our data processed?",
        a: "On EU-hosted infrastructure, in Frankfurt or Paris. Your documents are never used to train models. We sign a Data Processing Agreement before anything is exchanged, and we delete everything on request.",
      },
      {
        q: "Why a studio in Dhaka?",
        a: "Because it is where we are, and because it means a European company gets senior engineering at a price that makes a small automation project worth doing at all. Our hours are 14:00–22:00 in Dhaka, which covers a full working day in Central Europe. You will not be waiting overnight for a reply.",
      },
      {
        q: "How does payment work?",
        a: "Bank transfer in euros. Half at the start, half on delivery. As a non-EU supplier we do not charge VAT — reverse charge applies and you account for it locally. Your finance team will have seen this before.",
      },
      {
        q: "We already have a developer. Does that change anything?",
        a: "It usually makes things faster. We build the part they do not have time for, hand it over documented, and stay out of the way. We are happy to work inside your repository and your review process.",
      },
    ],
  },

  whatWeBuild: {
    eyebrow: "What we build",
    heading: "Three things, done properly.",
    items: [
      {
        index: "01",
        title: "Document automation",
        body: "Invoices, CVs, contracts, shipping papers. We read them, pull out the fields you care about, and push the data into the system you already use.",
        uses: ["Invoice → accounting", "CV → ATS", "Contract → database"],
      },
      {
        index: "02",
        title: "AI support agents",
        body: "An assistant trained only on your own documentation that answers customer questions correctly, in your tone, day and night. It says \u201cI don\u2019t know\u201d instead of inventing an answer.",
        uses: ["Website widget", "Internal helpdesk", "Email triage"],
      },
      {
        index: "03",
        title: "Custom web applications",
        body: "Dashboards, internal tools, and client portals built on the same stack we use for everything else. Fast, tested, and yours to keep.",
        uses: ["Next.js", "Python", "PostgreSQL"],
      },
    ],
  },

  howWeWork: {
    eyebrow: "How we work",
    heading: "Four steps. No surprises.",
    steps: [
      {
        index: "01",
        title: "Call",
        body: "15 minutes. You describe the manual work. We tell you honestly whether AI is the right tool for it.",
      },
      {
        index: "02",
        title: "Pilot",
        body: "Two weeks, €1,500 fixed. One workflow, working, on your real data. If it doesn\u2019t work, you don\u2019t continue.",
      },
      {
        index: "03",
        title: "Build",
        body: "Four to six weeks. The full system, integrated with your tools, tested, documented, deployed.",
      },
      {
        index: "04",
        title: "Support",
        body: "We keep it running, monitored, and improving. Monthly, cancel any time.",
      },
    ],
  },

  work: {
    eyebrow: "Work",
    heading: "Things we have built.",
    note: "Riyad Tech is a new studio. These are internal builds — real, working, and open for you to try.",
    tag: "Internal build",
    cta: "Try it live",
    /* TODO before launch: every href must open a working deployment.
       An empty link here is worse than no section at all. */
    items: [
      {
        title: "CV Parser",
        problem: "Recruiters retype candidate details from hundreds of PDFs.",
        result: "Upload a CV, get clean structured JSON in under two seconds.",
        stack: "Python · spaCy · Next.js",
        href: "#",
      },
      {
        title: "Invoice Extractor",
        problem: "Finance teams key invoice data in by hand.",
        result: "Reads any invoice layout and outputs supplier, date, line items, and totals.",
        stack: "Python · OCR · FastAPI",
        href: "#",
      },
      {
        title: "Docs Assistant",
        problem: "Support teams answer the same questions daily.",
        result: "Ask a question, get an answer sourced from the company\u2019s own documentation, with citations.",
        stack: "RAG · Postgres · Next.js",
        href: "#",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    heading: "Fixed prices. Written down.",
    sub: "Most studios hide this. We would rather you know before the call.",
    currency: "EUR",
    featuredTag: "Start here",
    timelineLabel: "Timeline",
    includesLabel: "Includes",
    vatNote:
      "Prices exclude VAT. As a non-EU supplier, reverse charge applies — you account for VAT locally.",
    tiers: [
      {
        name: "Pilot",
        price: "€1,500",
        timeline: "2 weeks",
        featured: true,
        includes: [
          "One workflow, working on your real data",
          "Up to 200 documents",
          "Deployed and demoed",
          "Full source code",
        ],
      },
      {
        name: "Full build",
        price: "from €6,000",
        timeline: "4–6 weeks",
        featured: false,
        includes: [
          "Everything in Pilot",
          "Integration with your existing tools",
          "User accounts and admin panel",
          "Testing and documentation",
          "30 days post-launch support",
        ],
      },
      {
        name: "Support",
        price: "€400 / month",
        timeline: "Ongoing",
        featured: false,
        includes: [
          "Hosting and monitoring",
          "Model tuning as your data changes",
          "Bug fixes and small changes",
          "Monthly report",
          "Cancel any time",
        ],
      },
    ],
  },

  compliance: {
    heading: "Where your data lives.",
    body: "Processing runs on EU-hosted infrastructure. Your documents are never used to train models. We sign a Data Processing Agreement before any data is exchanged, and we delete everything on request.",
    rows: [
      { label: "Processing region", value: "EU (Frankfurt / Paris)" },
      { label: "Model providers", value: "EU-hosted options available" },
      { label: "Training on your data", value: "Never" },
      { label: "DPA", value: "Signed before project start" },
    ],
  },

  team: {
    eyebrow: "Team",
    heading: "The people who build it.",
    sub: "You will work directly with the people writing the code. No account manager, no handover to a junior, nothing subcontracted.",
    hours:
      "Based in Dhaka, Bangladesh. We work 14:00–22:00 BST, which covers 09:00–17:00 CET.",
    /* Fallback only. The real team lives in the database and is edited one
       person at a time in the admin panel; these entries appear solely when
       the API cannot be reached and none are published yet. */
    members: [
      {
        name: "Riyad",
        role: "Founder · Backend and AI",
        line: "Writes the extraction pipelines and talks to every client on the first call.",
        linkedin: "#",
        photo: null,
      },
      {
        name: "Second name",
        role: "Role",
        line: "One sentence about what this person actually does.",
        linkedin: "#",
        photo: null,
      },
      {
        name: "Third name",
        role: "Role",
        line: "One sentence about what this person actually does.",
        linkedin: "#",
        photo: null,
      },
    ],
  },

  booking: {
    eyebrow: "Next step",
    heading: "Book fifteen minutes.",
    sub: "No slide deck. Describe the manual work your team does, and we will tell you straight away whether this is worth building.",
    /* TODO before launch: create a free 15-minute event on Cal.com and put
       the embed URL here. */
    calUrl: "https://cal.com/riyad-tech/15min",
    fallbackTitle: "Or reach us directly",
  },

  /* TODO before launch: replace with the real address and profile. */
  contact: {
    /* Fallback only — the live address is edited in the admin panel under
       Settings, and this is what shows if the API cannot be reached. */
    email: "hello.riyadtech@gmail.com",
    linkedin: "https://www.linkedin.com/company/riyad-tech/",
    responseTime: "Usually within one working day",
  },

  /* Per-page titles and descriptions. Each page states what it is for, so a
     search result reads like an answer rather than a company name. */
  pages: {
    services: {
      title: "Services — Riyad Tech",
      description:
        "Document automation, AI integration, and custom web applications, built by a small studio in Dhaka for European companies.",
      eyebrow: "Services",
      heading: "Three things, done properly.",
      sub: "We do not list ten services. These are the three we can point at working code for.",
    },
    work: {
      title: "Work — Riyad Tech",
      description:
        "Working builds you can try in your browser: a CV parser, an invoice extractor, and a documentation assistant.",
    },
    pricing: {
      title: "Pricing — Riyad Tech",
      description:
        "Fixed prices, written down. Pilot from €1,500 in two weeks. Full build from €6,000. Support €400 a month.",
    },
    about: {
      title: "About — Riyad Tech",
      description:
        "The engineers behind Riyad Tech, where your data is processed, and how a project actually runs. Dhaka-based, working European hours.",
      eyebrow: "About",
      heading: "A small studio, on purpose.",
      sub: "Small enough that the person who takes your first call is the person who writes the code, and stays on it until it is running.",
    },
    products: {
      title: "Products — Riyad Tech",
      description:
        "Systems we have already built, installed and adapted for your company at a fixed price. Delivered running, with the source code.",
      eyebrow: "Products",
      heading: "Systems you can buy today.",
      sub: "Already built, already working. We install one for your company, adapt it to how you actually work, and hand over the source code. Fixed price, no subscription.",
      empty: "Nothing listed yet. The first systems go up shortly — book a call in the meantime and we will tell you what is coming.",
    },
    contact: {
      title: "Contact — Riyad Tech",
      description:
        "Book a 15-minute call. Describe the manual work your team does and we will tell you whether this is worth building.",
    },
  },

  contactForm: {
    title: "Or write instead",
    intro: "If a call is not where you want to start, this reaches the same place.",
    messageLabel: "What is your team doing by hand?",
    messagePlaceholder:
      "A sentence or two — which documents, roughly how many, and where the data has to end up.",
    messageHint: "A sentence or two is plenty.",
    action: "Send",
    success: "Thank you — we have it.",
    successNote:
      "You will hear back within one working day. If it is urgent, book a call and we will talk sooner.",
  },

  /* The About page, written for the person who clicked "About" wanting three
     answers: who are these people, what do they actually do, and why should I
     believe them. Everything below answers one of those and nothing else. */
  about: {
    story: {
      eyebrow: "Who we are",
      heading: "We started because we kept seeing the same thing.",
      body: [
        "Every company we worked with had someone whose week disappeared into documents. Copying invoice totals into an accounting system. Retyping CVs into a hiring tool. Answering the same customer question for the fortieth time. Nobody had chosen this work; it had simply accumulated, and there was never a quiet week in which to fix it.",
        "That job is not hard. It is repetitive, and it is exactly what a machine should be doing. But the software that does it well is usually sold to companies with fifty thousand employees, at prices to match, and the version aimed at everyone else tends to be a demo that falls over on the first real document.",
        "So we build the middle thing. Small systems that do one job properly on your actual paperwork, for a price a company of thirty people can sign off without a committee. We are based in Dhaka and we work European hours, which is how the arithmetic stays sensible for both of us.",
      ],
    },

    services: {
      eyebrow: "What we do",
      heading: "Three kinds of work.",
      sub: "Not ten. These are the three we can point at working code for, and if your problem is not one of them we will say so on the first call.",
    },

    /* Not a values list. Four things a client can hold us to, each of which
       costs us something — which is what makes them worth printing. */
    principles: {
      eyebrow: "How we behave",
      heading: "Four things you can hold us to.",
      items: [
        {
          title: "We will tell you when not to build it",
          body: "Some problems are not worth automating, and some are a poor fit for AI. Saying so on the first call costs us a project and saves you a quarter. We would rather have the reputation.",
        },
        {
          title: "You talk to the person writing the code",
          body: "No account manager relaying questions, no handover to someone you have not met. The person on your first call is the person who ships it.",
        },
        {
          title: "Fixed prices, written down",
          body: "The numbers are on the pricing page. You will not be asked to book a call to find out what something costs, and the figure will not move once we have agreed it.",
        },
        {
          title: "You keep everything",
          body: "Full source code, no licence, no per-seat fee, no lock-in. If you stop working with us tomorrow, it all keeps running and any competent developer can pick it up.",
        },
      ],
    },

    stack: {
      eyebrow: "What we build with",
      heading: "Boring, on purpose.",
      body: "Nothing here was chosen because it was new. Each one is something a developer you hire in three years will already know, which matters more than any benchmark.",
      groups: [
        { label: "Interface", items: "Next.js · React · TypeScript · Tailwind" },
        { label: "Server", items: "Node.js · Express · Python · FastAPI" },
        { label: "Data", items: "PostgreSQL · MongoDB · Redis" },
        { label: "AI", items: "Open-weight and hosted models, EU regions where it matters" },
        { label: "Running it", items: "Docker · CI/CD · monitoring · daily backups" },
      ],
    },
  },

  /* The buying process, spelled out on every product page. Nobody should have
     to guess what happens after they press the button. */
  buying: {
    eyebrow: "How buying works",
    heading: "Five steps, no card form.",
    note: "At this price a European company expects an invoice and a bank transfer, so that is what we do. As a non-EU supplier we do not charge VAT — reverse charge applies and you account for it locally.",
    steps: [
      {
        title: "Request",
        body: "Fill in the form on this page. One minute, and it commits you to nothing.",
      },
      {
        title: "We reply",
        body: "Within one working day. We confirm what you need and flag anything that will not fit before you have paid for it.",
      },
      {
        title: "Invoice",
        body: "A PDF with our bank details, in euros. Half now, half on delivery.",
      },
      {
        title: "We install it",
        body: "Once the first transfer lands. Deployed and adapted to your workflow.",
      },
      {
        title: "Handover",
        body: "A running system, the source code, and documentation. Yours to keep.",
      },
    ],
    formTitle: "Request this system",
    formNote: "We reply within one working day. Nothing is charged until you agree a scope.",
    success: "Thank you — we have it. Expect a reply within one working day.",
  },

  /* The closing band on every page except the contact page itself. */
  ctaBand: {
    heading: "Ready to see this on your own documents?",
    sub: "Fifteen minutes, no slide deck. We will tell you honestly whether AI is the right tool for the job.",
    action: { label: "Book a 15-min call", href: "/contact" },
  },

  /* Shown under the services list — the things that are simply part of
     delivery rather than separate line items. */
  included: {
    eyebrow: "Every project includes",
    heading: "The parts nobody should have to ask for.",
    items: [
      {
        title: "Design, included",
        body: "You will not need to hire a designer or wait on one. The interface is part of the build.",
      },
      {
        title: "Deployed, not handed over",
        body: "Set up with CI/CD and monitoring, running on infrastructure that stays up. Not a zip file and good luck.",
      },
      {
        title: "Documented",
        body: "Written for the person who has to change it in a year, whether that is us or someone you hire.",
      },
      {
        title: "Yours to keep",
        body: "Full source code, no licence fee, no lock-in. If you stop working with us, everything still runs.",
      },
    ],
  },

  footer: {
    columns: [
      {
        title: "Company",
        links: [
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "For agencies", href: "/agencies" },

          { label: "Products", href: "/products" },
          { label: "Work", href: "/work" },
          { label: "Pricing", href: "/pricing" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Sign in", href: "/portal" },
          { label: "Your orders", href: "/portal" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Imprint", href: "/imprint" },
        ],
      },
    ],
    contactTitle: "Contact",
    location: "Dhaka, Bangladesh",
    /* The year is appended at build time, so this line never goes stale. */
    bottom: "Riyad Tech · Dhaka, Bangladesh",
  },

    /* The /agencies page, for European agency owners considering white-label
     capacity. He is not evaluating whether we can code — he assumes we can.
     He is evaluating whether we will steal his clients, embarrass him in
     front of one, and whether the margin works, in that order. Every
     section below answers one of those and stops. */
  agencies: {
    meta: {
      title: "For agencies — Riyad Tech",
      description:
        "White-label engineering for European agencies. Web builds, maintenance, and dedicated developers. Your brand, your client, our build.",
    },

    hero: {
      eyebrow: "For European agencies",
      headline: {
        line1: "You win the work.",
        line2Lead: "We ",
        marked: "build",
        line2Tail: " it.",
      },
      bodyLead: "Riyad Tech is a ",
      bodyTail:
        "-person engineering studio in Dhaka that works white-label for European agencies. Web builds, internal tools, AI features, and developers who join your team by the month. Everything ships under your brand.",
      primary: { label: "Book a 15-min call", href: "/contact" },
      secondary: { label: "See rates", href: "#offerings" },
      assurance: "14:00–22:00 Dhaka = 09:00–17:00 CET. Same-day answers.",
    },

    /* Fallback only when the API cannot be reached. The real numbers live in
       Settings in the admin panel, so team size and rates never drift from
       what is actually true — see the note in lib/api.ts. */
    rates: {
      teamSizeFallback: "six",
      projectFallback: "€1,200–3,000 per project",
      maintenanceFallback: "€150–400 per site, monthly",
      developerFallback: "€2,000–3,500 per developer, monthly",
    },

    promises: {
      eyebrow: "How we work with you",
      heading: "Four things we commit to.",
      items: [
        "We never contact your clients. Not during a project, not after.",
        "Your projects never appear in our portfolio or case studies.",
        "Everything ships under your brand. Your client never hears our name.",
        "NDA signed before the first project, no negotiation needed.",
      ],
      footnote:
        "These are contract terms, not aspirations. Ask and we will send the template.",
    },

    offerings: {
      eyebrow: "What we take on",
      heading: "Four ways to use us.",
      footnote:
        "Rates are for agency work and already account for the fact that you carry the client relationship.",
      items: [
        {
          index: "01",
          title: "Project build",
          body: "You scope it with your client, we build it. Fixed price agreed before we start, and it does not move.",
          priceFallback: "€1,200–3,000 per project",
          priceSettingKey: "agencyRateProject",
          examples: ["Marketing sites", "Web apps", "Dashboards"],
          href: null,
        },
        {
          index: "02",
          title: "Maintenance",
          body: "We keep sites and apps running after launch so your team is not pulled back into finished work.",
          priceFallback: "€150–400 per site, monthly",
          priceSettingKey: "agencyRateMaintenance",
          examples: ["Hosting", "Updates and backups", "Small changes"],
          href: null,
        },
        {
          index: "03",
          title: "Dedicated developer",
          body: "One of our engineers joins your team for the month. Your standups, your tools, your process.",
          priceFallback: "€2,000–3,500 per developer, monthly",
          priceSettingKey: "agencyRateDeveloper",
          examples: ["Full-stack", "Backend", "AI/ML"],
          href: null,
        },
        {
          index: "04",
          title: "Ready-made products",
          body: "Working products you can rebrand and sell to your clients instead of quoting a build from scratch.",
          priceFallback: "Licensing discussed per product",
          priceSettingKey: null,
          examples: ["Rebranded as yours", "Deployed on your infra", "We maintain it"],
          href: "/products",
        },
      ],
    },

    projectSteps: {
      eyebrow: "How a project runs",
      heading: "You stay in front. We stay behind.",
      steps: [
        {
          index: "01",
          title: "You scope it",
          body: "You talk to your client and agree what is being built. We join that call only if you want us to, on your domain, with your email address.",
        },
        {
          index: "02",
          title: "We quote",
          body: "Fixed price and a delivery date, usually within one working day. No hourly estimates that drift.",
        },
        {
          index: "03",
          title: "We build",
          body: "Daily updates in your Slack or Notion. You see progress while it happens, not at the end.",
        },
        {
          index: "04",
          title: "You deliver",
          body: "You hand it to your client under your brand. We are available for fixes and for whatever comes next.",
        },
      ],
    },

    questions: {
      eyebrow: "The obvious questions",
      heading: "The things you are actually worried about.",
      items: [
        {
          q: "What happens if you disappear?",
          a: "You hold the repository from day one. Every commit lands in your GitHub, not ours. If we vanish tomorrow, any competent developer opens the repo and continues — nothing is stored anywhere you cannot reach.",
        },
        {
          q: "What if the quality is wrong?",
          a: "Start with one small paid project before anything else. Two weeks, one deliverable, real work for a real client of yours. If it is not what you wanted, you have spent very little and learned everything you need to know.",
        },
        {
          q: "Who actually writes the code?",
          a: "The person on your first call. We are six people and we do not subcontract, so the engineer you speak to is the one committing. If we ever cannot staff something ourselves, we will tell you rather than quietly hand it to someone else.",
        },
        {
          q: "How is the English?",
          a: "All written communication is in English and all our documentation is in English. Calls are in English. You will not need to simplify anything.",
        },
        {
          q: "What about my client's data under GDPR?",
          a: "Processing runs on EU-hosted infrastructure. We sign a DPA before any data is exchanged, and we delete everything on request. If your client asks where their data is, you have a straight answer.",
        },
      ],
    },

    closing: {
      eyebrow: "Next step",
      heading: "Try us on one small thing.",
      body: "Fifteen minutes, no deck. Tell us what is sitting in your backlog and we will tell you what it would cost and how long it would take. If it is not a good fit, we will say so on the call.",
    },
  },
} as const;

export type Site = typeof site;