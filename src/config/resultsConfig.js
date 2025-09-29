// src/config/resultsConfig.js


export const RESULT_LEVELS = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "Design = \"make it look nice\"",
    description: "You can do better!",
    content: "Design is inconsistent, siloed, and reactive. No formal processes.",
    buttonText: "Take The First Step!",
    scoreRange: [0, 79],
    gemImage: "/assets/gems/starter-gem.svg",
    gemSvg: `<svg width="272" height="272" viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M136.001 -0.00878906L253.265 203.099H18.7365L136.001 -0.00878906Z" fill="#322101"/>
            <path d="M136 202.194L78.1502 103.349H193.851L136 202.194Z" fill="#473007"/>
            <path d="M136.001 104.704L107.857 152.096H164.144L136.001 104.704Z" fill="#CF9F48"/>
            </svg>`,
  },
  {
    id: "connector",
    title: "Connector",
    subtitle: "Time to align",
    description: "You can do better!",
    content: "Some design practice exists but limited influence, measurement, or consistency.",
    buttonText: "Bring it all together",
    scoreRange: [80, 119],
    gemImage: "/assets/gems/connector-gem.svg",
    gemSvg: `<svg width="272" height="272" viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.2551 39.3348H231.747V230.826H40.2551V39.3348Z" fill="#484747"/>
            <path d="M41.2773 135.475L136.396 40.3559L231.515 135.475L136.396 230.593L41.2773 135.475Z" fill="#4F5253"/>
            <path d="M183.235 87.8476L181.959 181.04L88.7661 182.317L90.0428 89.1242L183.235 87.8476Z" fill="#BCCAD2"/>
            </svg>`,
  },
  {
    id: "architect",
    title: "Architect",
    subtitle: "Build on this foundation",
    description: "You can do better!",
    content: "Design is embedded in product teams, supported by leadership, and metrics are tracked.",
    buttonText: "Design your advantage",
    scoreRange: [120, 159],
    gemImage: "/assets/gems/architect-gem.svg",
    gemSvg: `<svg width="271" height="273" viewBox="0 0 271 273" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M135.405 0.359863L264.183 93.9224L214.994 245.31H55.8159L6.6272 93.9224L135.405 0.359863Z" fill="#453605"/>
            <path d="M135.404 244.088L32.3818 169.238L71.7328 48.1279L199.075 48.1279L238.426 169.238L135.404 244.088Z" fill="#675108"/>
            <path d="M136.307 50.9116L217.867 110.168L186.714 206.047H85.9009L54.748 110.168L136.307 50.9116Z" fill="#F0D884"/>
            </svg>`,

  },
  {
    id: "scientist",
    title: "Scientist",
    subtitle: "Design is your edge",
    description: "You can do better!",
    content: "Design influences org-wide strategy, connects with customers continuously, and is resourced and respected.",
    buttonText: "Scale what works",
    scoreRange: [160, 189],
    gemImage: "/assets/gems/scientist-gem.svg",
    gemSvg: `<svg width="272" height="272" viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M136.001 0.043457L253.266 67.7465V203.152L136.001 270.855L18.7357 203.152V67.7465L136.001 0.043457Z" fill="#06363B"/>
            <path d="M20.4536 135.449L78.2268 35.3825H193.773L251.547 135.449L193.773 235.515H78.2268L20.4536 135.449Z" fill="#084A50"/>
            <path d="M135.097 36.1523L220.309 85.3499V183.745L135.097 232.942L49.8841 183.745V85.3499L135.097 36.1523Z" fill="#56DAE6"/>
            </svg>`,
  },
  {
    id: "visionary",
    title: "Visionary",
    subtitle: "You lead what’s next",
    description: "You can do better!",
    content: "Design is core to business differentiation and innovation. Operates as a mature, cross-functional system.",
    buttonText: "Shape what’s next",
    scoreRange: [190, 210],
    gemImage: "/assets/gems/visionary-gem.svg",
    gemSvg: `<svg width="272" height="272" viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M136 0.043457L241.863 51.0244L268.009 165.577L194.75 257.442H77.251L3.99153 165.577L30.1375 51.0244L136 0.043457Z" fill="#3B1048"/>
            <path d="M136.903 254.602L43.0377 209.399L19.8549 107.829L84.8116 26.3754L188.994 26.3754L253.951 107.829L230.768 209.399L136.903 254.602Z" fill="#58136D"/>
            <path d="M136.904 27.1245L220.888 67.5694L241.631 158.448L183.512 231.327H90.2958L32.1767 158.448L52.9191 67.5694L136.904 27.1245Z" fill="#81289E"/>
            <path d="M178.227 47.716L230.553 112.716L212.359 194.153L137.346 230.703L61.9988 194.844L43.0567 113.578L94.7829 48.0998L178.227 47.716Z" fill="#E36DE3"/>
            </svg>
            `,
  },
];

export function getResultLevel(score) {
  return RESULT_LEVELS.find(level => 
    score >= level.scoreRange[0] && score <= level.scoreRange[1]
  ) || RESULT_LEVELS[0]; // fallback to starter
}
