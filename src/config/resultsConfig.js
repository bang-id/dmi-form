// src/config/resultsConfig.js

export const RESULT_LEVELS = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "Design = \"make it look nice\"",
    description: "You can do better!",
    content: "We drop in a dedicated Bang Design squad—researcher, product designer, and visual lead—who overhaul key journeys, stand up a starter component kit, and ship quick wins that prove the value of design to the wider org.",
    buttonText: "Take The First Step!",
    scoreRange: [0, 20],
    gemImage: "/assets/gems/starter-gem.svg",
    gradient: "radial-gradient(circle at 50% 40%, #845E18 0%, #845E18 15%, #000000 40%)",
  },
  {
    id: "connector",
    title: "Connector",
    subtitle: "Siloed teams, ad-hoc research",
    description: "You can do better!",
    content: "Our embedded team launches a unified Figma library and insight hub, giving product, engineering, and marketing one source of truth—syncing sprints and slashing hand-off delays.",
    buttonText: "Bring it all together",
    scoreRange: [21, 40],
    gemImage: "/assets/gems/connector-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #4169E1 0%, #1B2951 15%, #000000 40%)",
  },
  {
    id: "architect",
    title: "Architect",
    subtitle: "Processes exist but stall",
    description: "You can do better!",
    content: "We build and maintain a living design system—tokens, patterns, governance checks—so every release ships consistent, accessible, and dev-ready.",
    buttonText: "Design your advantage",
    scoreRange: [41, 60],
    gemImage: "/assets/gems/architect-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #32CD32 0%, #1B4D1B 15%, #000000 40%)",
  },
  {
    id: "scientist",
    title: "Scientist",
    subtitle: "Data, but no story",
    description: "You can do better!",
    content: "We instrument your experiences with analytics, set up A/B infrastructure, and iterate on live data. Continuous design optimizations translate directly into higher NPS, better retention, and clear ROI dashboards for leadership.",
    buttonText: "Scale what works",
    scoreRange: [61, 80],
    gemImage: "/assets/gems/scientist-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #FF6347 0%, #4D1F1A 15%, #000000 40%)",
  },
  {
    id: "visionary",
    title: "Visionary",
    subtitle: "Ready for lift-off",
    description: "You can do better!",
    content: "Finally, our Futures Studio works side-by-side with your teams to prototype emerging tech, pilot new revenue models, and keep a steady pipeline of 'next-next' concepts—so your DMI, and your market edge, keep compounding.",
    buttonText: "Shape what’s next",
    scoreRange: [81, 100],
    gemImage: "/assets/gems/visionary-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #9932CC 0%, #2D1B4D 15%, #000000 40%)",
  },
];

export function getResultLevel(score) {
  return RESULT_LEVELS.find(level => 
    score >= level.scoreRange[0] && score <= level.scoreRange[1]
  ) || RESULT_LEVELS[0]; // fallback to starter
}
