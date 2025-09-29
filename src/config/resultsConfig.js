// src/config/resultsConfig.js

// Import SVG files
import starterGem from '/assets/gems/starter-gem.svg';
import connectorGem from '/assets/gems/connector-gem.svg';
import architectGem from '/assets/gems/architect-gem.svg';
import scientistGem from '/assets/gems/scientist-gem.svg';
import visionaryGem from '/assets/gems/visionary-gem.svg';

export const RESULT_LEVELS = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "Design = \"make it look nice\"",
    description: "You can do better!",
    content: "Design is inconsistent, siloed, and reactive. No formal processes.",
    buttonText: "Take The First Step!",
    scoreRange: [0, 20],
    gemImage: starterGem,
  },
  {
    id: "connector",
    title: "Connector",
    subtitle: "Time to align",
    description: "You can do better!",
    content: "Some design practice exists but limited influence, measurement, or consistency.",
    buttonText: "Bring it all together",
    scoreRange: [21, 40],
    gemImage: connectorGem,
  },
  {
    id: "architect",
    title: "Architect",
    subtitle: "Build on this foundation",
    description: "You can do better!",
    content: "Design is embedded in product teams, supported by leadership, and metrics are tracked.",
    buttonText: "Design your advantage",
    scoreRange: [41, 60],
    gemImage: architectGem,

  },
  {
    id: "scientist",
    title: "Scientist",
    subtitle: "Design is your edge",
    description: "You can do better!",
    content: "Design influences org-wide strategy, connects with customers continuously, and is resourced and respected.",
    buttonText: "Scale what works",
    scoreRange: [61, 80],
    gemImage: scientistGem,
  },
  {
    id: "visionary",
    title: "Visionary",
    subtitle: "You lead what’s next",
    description: "You can do better!",
    content: "Design is core to business differentiation and innovation. Operates as a mature, cross-functional system.",
    buttonText: "Shape what’s next",
    scoreRange: [81, 100],
    gemImage: visionaryGem,
  },
];

export function getResultLevel(score) {
  return RESULT_LEVELS.find(level => 
    score >= level.scoreRange[0] && score <= level.scoreRange[1]
  ) || RESULT_LEVELS[0]; // fallback to starter
}
