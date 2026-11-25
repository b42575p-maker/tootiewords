// Tootie the cat as an in-game character: moods, lines, and rank accessories.
// Kept free of React so it is easy to test and to reuse in other games.

export type TootieMood =
  | "idle"
  | "happy"
  | "excited"
  | "celebrate"
  | "surprised"
  | "confused"
  | "smug"
  | "swat"
  | "thinking"
  | "sleepy";

// Picture for each mood. They all use the same peeking Tootie for now. To add
// a new pose, put the picture in /public/tootie/ and change its path here.
export const TOOTIE_POSES: Record<TootieMood, string> = {
  idle: "/tootie/tootie-peek.webp",
  happy: "/tootie/tootie-peek.webp",
  excited: "/tootie/tootie-peek.webp",
  celebrate: "/tootie/tootie-peek.webp",
  surprised: "/tootie/tootie-peek.webp",
  confused: "/tootie/tootie-peek.webp",
  smug: "/tootie/tootie-peek.webp",
  swat: "/tootie/tootie-peek.webp",
  thinking: "/tootie/tootie-peek.webp",
  sleepy: "/tootie/tootie-peek.webp",
};

// Accessory Tootie wears at each Word Pounce rank.
export const RANK_ACCESSORIES: Record<string, { emoji: string; name: string } | null> = {
  "Curious Kitten": null,
  "Playful Kitten": { emoji: "🧶", name: "my yarn ball" },
  "Clever Cat": { emoji: "🎀", name: "a bow" },
  "Sharp-Eyed Cat": { emoji: "👓", name: "my reading glasses" },
  "Super Pouncer": { emoji: "⚡", name: "a lightning bolt" },
  "Top Cat": { emoji: "👑", name: "her crown" },
};

const LINES = {
  greet: [
    "Mrrrow! Today's letters are ready. One word uses all seven. Can you find it?",
    "Hi there! I set out seven fresh letters. Let's pounce on some words!",
    "Good to see you! Today's puzzle is waiting. Tap a letter to start.",
  ],
  welcomeBack: [
    "Welcome back, {rank}! Let's find a few more.",
    "You're back! {rank} so far. I think there's more to find.",
  ],
  short: ["{W}! Nice. +{p}", "Got it: {W}. +{p}", "{W}, purr-fect! +{p}", "Ooh, {W}. +{p}"],
  long: [
    "{W}! That's a big one. +{p}",
    "Wow, {W}! My whiskers are tingling. +{p}",
    "{W}! You're on a roll. +{p}",
  ],
  pounce: [
    "POUNCE! {W} uses every letter! +{p} 🎉",
    "You did it! {W} uses all seven letters! +{p} 🎉",
  ],
  bonus: [
    "{W}? Fancy! That's a rare bonus word. ✨",
    "Ooh, {W}! Not many players know that one. Bonus word! ✨",
  ],
  notWord: [
    "Hmm, {W} isn't in my word list.",
    "{W}? I've never heard of that one. 🤔",
    "I don't think {W} is a word. Try another?",
  ],
  already: ["You already found {W}. I remember! 😼", "{W} again? It's already on your list."],
  tooShort: ["Words need at least 3 letters.", "Too short! I need 3 letters or more."],
  shuffle: [
    "*swat* Fresh look at the letters!",
    "I batted the tiles around for you. 🐾",
    "*paw paw* There. Does that help?",
  ],
  hint: ["Psst... try a {hint}.", "Here's a secret: look for a {hint}. 🤫"],
  noHints: ["You've found every word. I have no hints left to give!"],
  rankUp: [
    "You're now a {rank}! Time for {acc}. {emoji}",
    "{rank}! That calls for {acc}. {emoji}",
  ],
  topCat: ["TOP CAT! I'm wearing my crown just for you. 👑"],
  allFound: ["You found every single word! I'm so proud. 😻"],
  gaveUp: ["Here are all of today's words. Come back tomorrow for new letters! 💤"],
  sleepy: [
    "Zzz... Tap a letter to wake me up.",
    "*yawn* Still thinking? Try the Shuffle button.",
  ],
  shareFailed: ["I couldn't copy your result. Try again?"],
};

export type TootieLineKey = keyof typeof LINES;

export function tootieLine(key: TootieLineKey, values: Record<string, string | number> = {}) {
  const options = LINES[key];
  const template = options[Math.floor(Math.random() * options.length)];
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? ""));
}
