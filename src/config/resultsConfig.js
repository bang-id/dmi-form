// src/config/resultsConfig.js

export const RESULT_LEVELS = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "Design = \"make it look nice\"",
    description: "You can do better!",
    content: "We drop in a dedicated Bang Design squad—researcher, product designer, and visual lead—who overhaul key journeys, stand up a starter component kit, and ship quick wins that prove the value of design to the wider org.",
    buttonText: "Take The First Step!",
    scoreRange: [0, 40],
    gemImage: "/assets/gems/starter-gem.svg",
    gradient: "radial-gradient(circle at 50% 40%, #845E18 0%, #845E18 15%, #000000 40%)",
  },
  {
    id: "explorer",
    title: "Explorer",
    subtitle: "Design = \"solving user problems\"",
    description: "You're on the right track!",
    content: "We help you scale your design practice with structured processes, advanced research methods, and cross-functional collaboration frameworks that turn good intentions into systematic design excellence.",
    buttonText: "Level Up Your Practice!",
    scoreRange: [41, 55],
    gemImage: "/assets/gems/explorer-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #4169E1 0%, #1B2951 15%, #000000 40%)",
  },
  {
    id: "strategist",
    title: "Strategist",
    subtitle: "Design = \"business advantage\"",
    description: "You understand the value!",
    content: "We partner with you to embed design thinking at the executive level, create design-driven innovation processes, and build measurement systems that demonstrate design's impact on business outcomes.",
    buttonText: "Unlock Strategic Impact!",
    scoreRange: [56, 70],
    gemImage: "/assets/gems/strategist-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #32CD32 0%, #1B4D1B 15%, #000000 40%)",
  },
  {
    id: "innovator",
    title: "Innovator",
    subtitle: "Design = \"competitive differentiation\"",
    description: "You're leading the way!",
    content: "We collaborate on breakthrough innovation methodologies, advanced design systems, and future-forward research that keeps you ahead of market trends and user expectations.",
    buttonText: "Push The Boundaries!",
    scoreRange: [71, 85],
    gemImage: "/assets/gems/innovator-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #FF6347 0%, #4D1F1A 15%, #000000 40%)",
  },
  {
    id: "visionary",
    title: "Visionary",
    subtitle: "Design = \"transformative force\"",
    description: "You're setting the standard!",
    content: "We work alongside you to pioneer new design paradigms, influence industry standards, and create transformative experiences that reshape entire markets and user behaviors.",
    buttonText: "Shape The Future!",
    scoreRange: [86, 100],
    gemImage: "/assets/gems/visionary-gem.svg",
    gradient: "radial-gradient(circle at 50% 25%, #9932CC 0%, #2D1B4D 15%, #000000 40%)",
  },
];

export function getResultLevel(score) {
  return RESULT_LEVELS.find(level => 
    score >= level.scoreRange[0] && score <= level.scoreRange[1]
  ) || RESULT_LEVELS[0]; // fallback to starter
}
