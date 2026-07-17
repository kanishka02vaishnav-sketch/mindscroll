const steps = [
  {
    id: 1,
    title: "Why did you open Instagram?",
    subtitle: "Reflection 1 of 4",
    button: "Continue",
    options: [
      "😴 I was bored",
      "☕ I needed a break",
      "💬 Someone texted me",
      "🤔 I'm not sure",
    ],
  },

  {
  id: 2,
  subtitle: "Reflection 2 of 4",
  title: "Pause for a second.",

  insight:
    "You usually open social media during low-energy moments.",

  pattern: [
    "Low Energy",
    "Afternoon",
    "Instagram",
  ],

  button: "Continue",
},

  {
  id: 3,
  subtitle: "Reflection 3 of 4",

  title: "Here's today's insight.",

  insight:
    "Awareness creates space before habits become automatic.",

  pattern: [
    "Scrolling follows energy dips",
    "Awareness interrupts habits",
    "Reflection builds control",
  ],

  button: "Continue",
},
  {
  id: 4,
  subtitle: "Reflection 4 of 4",

  title: "A small step for tomorrow.",

  habit:
    "Before opening Instagram, take one slow breath.",

  pattern: [
    "Pause",
    "Notice",
    "Choose intentionally",
  ],

  button: "Finish",
},
];

export default steps;