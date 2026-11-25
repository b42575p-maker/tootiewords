// Hand-written, page-specific content for the 5-letter pattern pages.
// Numbers come from the Common Words list (an-array-of-english-words +
// wordfreq top 25k, minus common-word-exclusions.json), checked Nov 24, 2026.
// Each page gets its own intro, insights, word traps, guess ideas and FAQ so
// the pages are not interchangeable templates.

export type PatternSection = {
  title: string;
  paragraphs: string[];
};

export type PatternTrap = {
  pattern: string;
  words: string[];
  note: string;
};

export type PatternFaq = {
  q: string;
  a: string;
};

export type FiveLetterPatternContent = {
  intro: string;
  sections: PatternSection[];
  traps: PatternTrap[];
  guesses: {
    words: string[];
    why: string;
  };
  faq: PatternFaq[];
};

export const fiveLetterPatternContent: Record<string, FiveLetterPatternContent> = {
  "starting-with-a": {
    intro:
      "A is one of the few vowels that regularly starts five-letter words, from everyday words like ABOUT, AFTER, and AGAIN to puzzle favorites like ADIEU and AUDIO. Browse the common ones below or add the clues you already know.",
    sections: [
      {
        title: "Why A Words Behave Differently",
        paragraphs: [
          "Because the first letter is already a vowel, the second letter is almost always a consonant: that's true for 92% of the common words on this list. AL (16%) and AR (12%) are the most common openings, as in ALONG, ALLOW, AREAS, and ARMED, followed by AB, AD, and AN.",
          "A words also love doubled letters. About 39% of them repeat a letter, and many double it right after the A: ADDED, ALLOW, APPLE, ARROW, and ALLEY. If your guesses keep missing, try repeating the second letter.",
        ],
      },
      {
        title: "A Words With a Second A",
        paragraphs: [
          "A surprising number of these words use A twice, usually in an A_A_ shape: AGAIN, AWARE, AWARD, APART, ALARM, AWAKE, ADAPT, and AWAIT. If you know the word starts with A and still need a vowel, don't rule out a second A.",
        ],
      },
    ],
    traps: [
      {
        pattern: "A_ _ _E",
        words: ["ABOVE", "ALONE", "AGREE", "ALIVE", "ARISE", "ADORE"],
        note: "A quarter of these words end in a silent E, so an A at the front and an E at the back still leaves lots of options.",
      },
      {
        pattern: "AL_ _ _",
        words: ["ALONG", "ALLOW", "ALONE", "ALBUM", "ALERT", "ALIKE"],
        note: "AL is the most common start, so after AL, test the third letter before anything else.",
      },
    ],
    guesses: {
      words: ["ALERT", "ALTER", "ARISE"],
      why: "These test R, E, and T or S, the letters that split the A list most evenly. ARISE also checks a second vowel.",
    },
    faq: [
      {
        q: "How many common 5-letter words start with A?",
        a: "Our Common Words list has 116 of them, and the full dictionary has 721. The most common are ABOUT, AFTER, AGAIN, AMONG, and ALONG.",
      },
      {
        q: "What is a good Wordle guess that starts with A?",
        a: "ARISE and ALERT are strong picks. Both test R and E in one guess, and those two letters show up in a large share of five-letter words.",
      },
    ],
  },

  "starting-with-b": {
    intro:
      "B words are short on vowels and long on consonant blends. Nearly half of the common 5-letter words starting with B have only one vowel, as in BLACK, BRING, and BURST. Use the list and filters below to narrow down your answer.",
    sections: [
      {
        title: "Blends, Then Vowels",
        paragraphs: [
          "The second letter splits B words into two camps. One third start with a blend: BR (18%), like BREAK and BROWN, or BL (15%), like BLOOD and BLOCK. Most of the rest follow B with a vowel: BO (16%), BA (15%), BE (14%), and BU (13%).",
          "44% of these words have only one of A, E, I, O, or U, so once you've found the vowel, the rest of the word is usually consonants. BRING, BLANK, BURNT, and BUNCH are good examples.",
        ],
      },
      {
        title: "Doubles Are Common",
        paragraphs: [
          "About one in five B words has a doubled letter side by side: BLOOD, BOOKS, BALLS, BILLS, BOOST, and BLESS. If the board shows a vowel in the middle that keeps landing yellow, try doubling it.",
        ],
      },
    ],
    traps: [
      {
        pattern: "B_LLS",
        words: ["BALLS", "BELLS", "BILLS", "BULLS"],
        note: "Four words with only the vowel different. If you're down to this pattern, guess a word that tests A, E, and I at once rather than trying them one by one.",
      },
      {
        pattern: "BL_ND",
        words: ["BLIND", "BLEND", "BLOND", "BLAND"],
        note: "Another vowel-swap set. Common in hard-mode losses.",
      },
      {
        pattern: "BEA_S",
        words: ["BEARS", "BEATS", "BEANS", "BEAMS", "BEADS"],
        note: "Five options for one slot. A guess like DRANK or TREND can rule out several at once.",
      },
    ],
    guesses: {
      words: ["BEARS", "BEAST", "BONES"],
      why: "They check E, A, R, S, and T, which divide the B list better than anything else.",
    },
    faq: [
      {
        q: "How many common 5-letter words start with B?",
        a: "186 in our Common Words list and 891 in the full dictionary. The most common are BEING, BASED, BLACK, BRING, and BOARD.",
      },
      {
        q: "What letter usually comes after B?",
        a: "R is the most common second letter (18%), followed by O, A, L, E, and U. Only one common word in our list starts with BY: BYTES.",
      },
    ],
  },

  "starting-with-c": {
    intro:
      "C words are a mix of hard C (COULD, CROSS) and CH words (CHILD, CHECK), plus a handful where C sounds like S, like CIVIL and CYCLE. Explore the common 5-letter words starting with C below.",
    sections: [
      {
        title: "Four Openings Cover Most C Words",
        paragraphs: [
          "Nearly three in four common C words begin with CO (21%), CH (19%), CR (18%), or CA (17%). CL adds another 12%, as in CLASS, CLEAR, and CLOSE. That makes the second letter the single most useful thing to test.",
          "Only about 8% start with CE, CI, or CY, where the C makes an S sound: CIVIL, CELLS, CYCLE, CENTS, and CEDAR. If you've ruled out the usual openings, these are worth a look.",
        ],
      },
      {
        title: "Plurals and Silent E",
        paragraphs: [
          "About a quarter of the list are plurals ending in S, like CASES, COSTS, and CARDS, and many others end in a silent E: CAUSE, CLOSE, CRANE, CRIME. When C is first, check S and E at the end early.",
          "CRYPT is the only common C word in our list with none of A, E, I, O, or U.",
        ],
      },
    ],
    traps: [
      {
        pattern: "CA_ES",
        words: ["CASES", "CARES", "CAKES", "CAVES", "CAGES", "CAFES"],
        note: "Six words that differ in one letter. Burn a guess on a word with S, R, K, and V before you start trying them one at a time.",
      },
      {
        pattern: "CRA_E",
        words: ["CRANE", "CRAVE", "CRATE", "CRAZE"],
        note: "A classic Wordle trap. Each wrong pick only rules out one letter.",
      },
    ],
    guesses: {
      words: ["CARES", "CLEAR", "CRASH"],
      why: "They test A, R, E, and S plus the L or H that separates CL and CH words from the rest.",
    },
    faq: [
      {
        q: "How many common 5-letter words start with C?",
        a: "199 in our Common Words list and 904 in the full dictionary. COULD, COURT, CLASS, CLOSE, and CAUSE are the most common.",
      },
      {
        q: "Are there 5-letter C words with no vowels?",
        a: "CRYPT is the only common one. It uses Y in place of a vowel.",
      },
    ],
  },

  "starting-with-f": {
    intro:
      "From FIRST and FOUND to FLOOR and FRESH, 5-letter F words lean on two blends, FL and FR, and a lot of -ED and -ES endings. Browse the common ones or add the letters you know.",
    sections: [
      {
        title: "FL and FR",
        paragraphs: [
          "FL is the most common start at 21%: FLOOR, FLASH, FLEET, FLOOD, FLAME, and FLOAT. FR adds another 11%, as in FRONT, FRESH, FRAME, and FRUIT. If the second letter isn't L or R, it's almost always a vowel: FA and FI (18% each), FO (15%), FE (10%), and FU (7%).",
          "Like the B list, F words are vowel-light. About 42% use only one of A, E, I, O, or U.",
        ],
      },
      {
        title: "Watch the Endings",
        paragraphs: [
          "F words end in -ES or -ED more than most lists (17% combined), which creates big families of near-twins like FACED, FADED, FAKED, and FARED. When you see that shape, spend a guess on a word that tests several middle consonants at once.",
        ],
      },
    ],
    traps: [
      {
        pattern: "FA_ED",
        words: ["FACED", "FADED", "FAMED", "FAKED", "FATED", "FARED"],
        note: "Six options for one letter. This is where a throwaway guess pays off.",
      },
      {
        pattern: "FI_ES",
        words: ["FILES", "FIRES", "FINES", "FIXES", "FIVES"],
        note: "The same problem with I in the second spot.",
      },
      {
        pattern: "FORT_",
        words: ["FORTH", "FORTY", "FORTS", "FORTE"],
        note: "Four words that only differ in the last letter.",
      },
    ],
    guesses: {
      words: ["FALSE", "FEARS", "FLARE"],
      why: "They check L, R, S, A, and E, which split the F list most evenly. FLARE also tells you right away if it's an FL word.",
    },
    faq: [
      {
        q: "How many common 5-letter words start with F?",
        a: "169 in our Common Words list and 584 in the full dictionary. FIRST, FOUND, FINAL, FORCE, and FRONT are the most common.",
      },
      {
        q: "What's the most common second letter in F words?",
        a: "L, at 21%. A and I tie for second at 18% each.",
      },
    ],
  },

  "starting-with-p": {
    intro:
      "PLACE, POINT, POWER, PARTY: P starts a lot of everyday words, and the list includes a few tricky ones like PSYCH and PIZZA. Browse common 5-letter words starting with P or narrow them down with your clues.",
    sections: [
      {
        title: "Vowel Second, Usually",
        paragraphs: [
          "PA is the most common opening (21%), followed by PO (17%), PI (15%), PR (14%), PE (13%), and PL (11%). PH words are rare but common in everyday use: PHONE, PHOTO, and PHASE.",
          "PR words are worth knowing as a group: PRICE, PRESS, PRIME, PRIOR, PROVE, PROUD, PROOF, PRIZE, and PRINT are all on the list.",
        ],
      },
      {
        title: "Odd Ones Out",
        paragraphs: [
          "PSYCH is the only common P word without A, E, I, O, or U. PIZZA has a double Z, and PROXY has an X, so if a P word is stumping you, don't rule out rare letters. About a third of P words repeat a letter, as in PRESS, PENNY, and PROOF.",
        ],
      },
    ],
    traps: [
      {
        pattern: "PRI_E",
        words: ["PRICE", "PRIME", "PRIZE", "PRIDE"],
        note: "One letter apart. C, M, Z, and D are rarely tested together, so this one catches people.",
      },
      {
        pattern: "PLAN_",
        words: ["PLANS", "PLANT", "PLANE", "PLANK"],
        note: "The last letter is the whole puzzle here.",
      },
      {
        pattern: "PRO_E",
        words: ["PROVE", "PROBE", "PRONE", "PROSE"],
        note: "Same shape as PRI_E, with O in the middle.",
      },
    ],
    guesses: {
      words: ["PEARS", "PROSE", "PASTE"],
      why: "They cover A, E, R, S, and T, the letters that divide the P list best.",
    },
    faq: [
      {
        q: "How many common 5-letter words start with P?",
        a: "160 in our Common Words list and 833 in the full dictionary. PLACE, POINT, POWER, PARTY, and PHONE are the most common.",
      },
      {
        q: "Is there a 5-letter P word with no vowels?",
        a: "PSYCH is the only common one. Y takes the place of a vowel.",
      },
    ],
  },

  "starting-with-s": {
    intro:
      "S starts more five-letter words than any other letter. Our Common Words list has 349 of them, so knowing the first letter alone won't get you far. The tips below show which clues narrow S words fastest.",
    sections: [
      {
        title: "The Second Letter Is Usually a Consonant",
        paragraphs: [
          "71% of common S words follow the S with another consonant. ST is the most common start (18%), as in STILL, STATE, and START, then SH (15%), SP (9%), SL (7%), SW and SC (6% each). That means the second letter is a better thing to test than the vowels.",
          "Three-letter blends show up too: STR (STRAW, STRAP, STRAY), SCR (SCREW, SCRAP, SCRUB), SHR (SHRED, SHRUG), and SQU (SQUAD, SQUAT, SQUID).",
        ],
      },
      {
        title: "Huge Word Families",
        paragraphs: [
          "Because there are so many S words, near-twins are everywhere. SHARE, SHAPE, SHAME, SHAKE, SHADE, and SHAVE differ in one letter, and so do STORE, STONE, STOLE, and STOVE. When you're down to an S family, a guess that tests three or four of the swappable letters saves turns.",
          "About half of S words have only one vowel: STILL, SMALL, START, SHORT. SYNTH is the only common one with no A, E, I, O, or U.",
        ],
      },
    ],
    traps: [
      {
        pattern: "SHA_E",
        words: ["SHARE", "SHAPE", "SHAME", "SHAKE", "SHADE", "SHAVE"],
        note: "Six common words, one open letter. The biggest trap on this page.",
      },
      {
        pattern: "S_ARE",
        words: ["SHARE", "SPARE", "SCARE", "STARE", "SNARE"],
        note: "Same idea, but the blend is the unknown.",
      },
      {
        pattern: "S_ACK",
        words: ["STACK", "SNACK", "SLACK", "SMACK", "SHACK"],
        note: "Test T, N, L, M, and H with one guess if you can.",
      },
    ],
    guesses: {
      words: ["STARE", "SLATE", "STEAK"],
      why: "They check T, A, R, E, and L, which divide the S list most evenly. STARE and SLATE also tell you which blend you're dealing with.",
    },
    faq: [
      {
        q: "How many common 5-letter words start with S?",
        a: "349 in our Common Words list and 1,540 in the full dictionary, more than any other letter. STILL, SINCE, STATE, SMALL, and START are the most common.",
      },
      {
        q: "What is the best Wordle guess that starts with S?",
        a: "STARE and SLATE are both excellent. They test the most common letters and the two most common S blends, ST and SL.",
      },
    ],
  },

  "starting-with-t": {
    intro:
      "Some of the most-used words in English are 5-letter T words: THEIR, THERE, THESE, THINK, and THREE. Browse the common ones below or narrow them down with the letters you know.",
    sections: [
      {
        title: "TR, TH, and TW",
        paragraphs: [
          "TR is the most common opening at 21%: TRUST, TRAIN, TRADE, TRIED, TRUCK, and TRUTH. TH words make up only 13% of the list, but they're the ones you use every day: THEIR, THERE, THESE, THINK, THOSE, THREE, THING, and THANK.",
          "TW is small but handy to remember: TWICE, TWIST, TWINS, TWEET, and TWEAK. If the second letter isn't R, H, or W, it's a vowel: TO (16%), TA (15%), TE (14%), TI (9%), or TU (6%).",
        ],
      },
      {
        title: "Doubles to Watch",
        paragraphs: [
          "About a third of T words repeat a letter. Doubled vowels are common here: THREE, TREES, TOOLS, TEETH, TOOTH, TEENS, and TWEET. If the E or O keeps landing yellow, try putting two of them side by side.",
        ],
      },
    ],
    traps: [
      {
        pattern: "TI_ES",
        words: ["TIMES", "TIRES", "TILES", "TIDES"],
        note: "M, R, L, and D are all common letters, so this one can take several guesses.",
      },
      {
        pattern: "TA_ES",
        words: ["TAKES", "TAXES", "TALES", "TAPES"],
        note: "K, X, L, and P. A guess with two or three of them is worth it.",
      },
    ],
    guesses: {
      words: ["TEARS", "TRIES", "TERMS"],
      why: "They test E, R, S, and A or I, which split the T list most evenly. TRIES also confirms a TR start.",
    },
    faq: [
      {
        q: "How many common 5-letter words start with T?",
        a: "167 in our Common Words list and 794 in the full dictionary. THEIR, THERE, THESE, THINK, and THOSE are the most common.",
      },
      {
        q: "What is the most common way for a 5-letter T word to start?",
        a: "TR, at 21% of common T words. TO, TA, TE, and TH follow.",
      },
    ],
  },

  "ending-in-e": {
    intro:
      "A final E is one of the most common endings in English. Our Common Words list has 335 five-letter words ending in E, from THERE and WHERE to HOUSE and WHITE. Use the filters below to narrow them down.",
    sections: [
      {
        title: "The Silent E Pattern",
        paragraphs: [
          "In 62% of these words, the E is the silent E that makes the earlier vowel say its name: PLACE, WHITE, PHONE, and SHAPE all fit the vowel, consonant, E shape. If you know E is last, your best next move is usually to find the vowel in the middle.",
          "The letter before the E is most often S (13%), as in HOUSE and CAUSE, then T, G, and L (9% each), as in STATE, LARGE, and WHOLE. R, C, V, and N follow at 7%.",
        ],
      },
      {
        title: "Endings Worth Knowing",
        paragraphs: [
          "Three-letter endings come up again and again: -DGE (JUDGE, BADGE, HEDGE, LODGE, RIDGE), -OSE (CLOSE, THOSE, WHOSE), -RGE (LARGE, MERGE, SURGE), and -ONE (PHONE, STONE, ALONE). Almost every word on this list has at least one other vowel, so expect two vowels total.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_ASTE",
        words: ["WASTE", "TASTE", "PASTE", "CASTE", "HASTE"],
        note: "Only the first letter changes. Test W, T, P, and H together if you can.",
      },
      {
        pattern: "STA_E",
        words: ["STATE", "STAGE", "STAKE", "STARE", "STALE"],
        note: "Five common words with one gap.",
      },
      {
        pattern: "S_ORE",
        words: ["STORE", "SCORE", "SHORE", "SWORE", "SPORE"],
        note: "The second letter is the whole puzzle here.",
      },
    ],
    guesses: {
      words: ["ARISE", "RAISE", "STARE"],
      why: "With E fixed, R, S, A, and I or T are the letters that split this list best. ARISE and RAISE also check two vowels at once.",
    },
    faq: [
      {
        q: "How many common 5-letter words end in E?",
        a: "335 in our Common Words list and 1,489 in the full dictionary. THERE, THESE, WHERE, THOSE, and WHILE are the most common.",
      },
      {
        q: "Is the E at the end usually silent?",
        a: "Usually, yes. In about 62% of these words the E follows a single consonant and makes the earlier vowel long, as in SHAPE and PHONE.",
      },
    ],
  },

  "ending-in-y": {
    intro:
      "Five-letter words ending in Y are full of doubled letters and repeating endings like -LLY and -RRY. There are 227 common ones, including EVERY, MONEY, HAPPY, and STUDY. Browse them below or add your clues.",
    sections: [
      {
        title: "Doubles Everywhere",
        paragraphs: [
          "Half of these words repeat a letter, and 45% have a doubled letter right before the ending: HAPPY, SORRY, FUNNY, CARRY, and WORRY. That's the highest rate of any pattern on our site, so if you're stuck on a Y word, try doubling the fourth letter.",
          "The most common endings are -LY (17%), -RY (15%), and -TY (12%), followed by -DY, -NY, and -KY.",
        ],
      },
      {
        title: "One Vowel Is Typical",
        paragraphs: [
          "78% of common Y words use only one of A, E, I, O, or U, because the Y does the work of a second vowel. Once you've found the vowel, focus on consonants. Words ending in -AY (TODAY, DELAY, ESSAY, SPRAY) and -OY (ENJOY, ANNOY, ALLOY) are the main exceptions to the doubled-letter pattern.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_ERRY",
        words: ["BERRY", "MERRY", "FERRY", "TERRY"],
        note: "Only the first letter changes.",
      },
      {
        pattern: "_ANDY",
        words: ["CANDY", "SANDY", "HANDY", "DANDY"],
        note: "C, S, H, and D. One combined guess can rule out most of them.",
      },
      {
        pattern: "_ILLY",
        words: ["SILLY", "HILLY", "FILLY"],
        note: "Doubled L plus Y. Common in late-game Wordle losses.",
      },
    ],
    guesses: {
      words: ["EARLY", "READY", "DIARY"],
      why: "With Y fixed, R, A, E, and L or D split this list best. EARLY also checks the very common -LY ending.",
    },
    faq: [
      {
        q: "How many common 5-letter words end in Y?",
        a: "227 in our Common Words list and 1,269 in the full dictionary. EVERY, MONEY, TODAY, PARTY, and EARLY are the most common.",
      },
      {
        q: "Why do so many Y words have double letters?",
        a: "Many are formed by adding -Y to a short word and doubling the last consonant, like FUN to FUNNY or SUN to SUNNY. That pattern gives this list the most doubled letters of any we track.",
      },
    ],
  },

  "ending-in-er": {
    intro:
      "With -ER fixed, only three letters are left to find. These 107 common words include OTHER, AFTER, NEVER, WATER, and POWER. Use the finder below to fill in the first three letters.",
    sections: [
      {
        title: "What Comes Before -ER",
        paragraphs: [
          "The third letter is the key clue. T is the most common (16%), as in WATER, LATER, and AFTER, followed by V (13%: NEVER, COVER, RIVER), then D, P, and N (7% each: UNDER, PAPER, OWNER).",
          "In most of these words the second letter is a vowel: WATER, NEVER, POWER, PAPER. About one in five starts with a vowel instead, like OTHER, AFTER, UNDER, ORDER, and ENTER.",
        ],
      },
      {
        title: "Doubled Letters in -ER Words",
        paragraphs: [
          "A few common -ER words double their middle letter: OFFER, UPPER, INNER, UTTER, and OTTER. Others double the E: CHEER, SHEER, and STEER. If a guess shows only one consonant in the right place, try it twice.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_ATER",
        words: ["WATER", "LATER", "CATER", "EATER"],
        note: "Only the first letter changes.",
      },
      {
        pattern: "_OVER",
        words: ["COVER", "LOVER", "ROVER", "HOVER", "MOVER"],
        note: "Five options. Test C, L, H, and M in one guess.",
      },
      {
        pattern: "_IVER",
        words: ["RIVER", "LIVER", "DIVER", "GIVER"],
        note: "Same trick with I in the middle.",
      },
    ],
    guesses: {
      words: ["LATER", "ALTER", "VOTER"],
      why: "With E and R fixed, A, T, L, and O split the list best. VOTER also checks V, the second most common third letter.",
    },
    faq: [
      {
        q: "How many common 5-letter words end in ER?",
        a: "107 in our Common Words list and 434 in the full dictionary. OTHER, AFTER, NEVER, UNDER, and WATER are the most common.",
      },
      {
        q: "What letter usually comes before -ER?",
        a: "T is the most common, as in WATER and AFTER, followed by V, as in NEVER and COVER.",
      },
    ],
  },

  "ending-in-h": {
    intro:
      "A final H almost never stands alone. In five-letter words it's nearly always part of a pair: -CH, -TH, -SH, or -GH. That makes this one of the easiest patterns to narrow down once you know the trick.",
    sections: [
      {
        title: "Four Endings Cover Almost Everything",
        paragraphs: [
          "-CH ends 44% of the common words on this list (WATCH, MARCH, REACH), -TH ends 30% (DEATH, NORTH, MONTH), -SH ends 17% (FRESH, CRASH, BRUSH), and -GH ends 7% (TOUGH, LAUGH, ROUGH). If H is last, the fourth letter is almost certainly C, T, S, or G.",
          "-PH is the rare exception: GRAPH and LYMPH. SIXTH is the only common word here with X.",
        ],
      },
      {
        title: "The -TCH Family",
        paragraphs: [
          "-TCH alone covers 16% of the list: WATCH, MATCH, CATCH, PATCH, BATCH, HATCH, LATCH, PITCH, DITCH, FETCH, and NOTCH. These words are famous Wordle traps because they share four letters. Two-thirds of words on this list have just one vowel, so expect lots of consonants.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_ATCH",
        words: ["WATCH", "MATCH", "CATCH", "PATCH", "BATCH", "HATCH", "LATCH"],
        note: "Seven words, one letter. Guessing them in order can cost a whole game. Try a word like CLAMP or BLIMP to test several first letters at once.",
      },
      {
        pattern: "_EACH",
        words: ["REACH", "BEACH", "TEACH", "PEACH"],
        note: "Same shape with EA in the middle.",
      },
      {
        pattern: "_OUGH",
        words: ["TOUGH", "ROUGH", "COUGH", "DOUGH"],
        note: "These look alike but sound different, which makes them easy to overlook.",
      },
    ],
    guesses: {
      words: ["TEACH", "TORCH", "TOUCH"],
      why: "They confirm whether it's a -CH word while testing T, A, O, and E, the most useful letters on this list.",
    },
    faq: [
      {
        q: "How many common 5-letter words end in H?",
        a: "106 in our Common Words list and 358 in the full dictionary. WHICH, DEATH, SOUTH, NORTH, and WATCH are the most common.",
      },
      {
        q: "Are there 5-letter words ending in H with no vowels?",
        a: "Yes, a few use Y instead: PSYCH, LYMPH, and SYNTH.",
      },
    ],
  },

  "ending-in-t": {
    intro:
      "Words ending in T include some of the most common in English: ABOUT, FIRST, RIGHT, and GREAT. There are 181 common ones, and a few endings like -ST, -NT, and -GHT cover a big share of them.",
    sections: [
      {
        title: "Check S and N First",
        paragraphs: [
          "More than a third of these words end in -ST or -NT (17% each): FIRST, TRUST, LEAST, POINT, PLANT, and FRONT. -IT, -RT, and -ET follow, as in VISIT, HEART, and SWEET. If T is last, S and N are the best letters to test for the fourth spot.",
          "-FT is a smaller group worth knowing: DRAFT, SHIFT, CRAFT, SWIFT, THEFT, SHAFT, and DRIFT.",
        ],
      },
      {
        title: "The -IGHT Trap",
        paragraphs: [
          "The -GHT ending covers 6% of the list, and almost all of it is -IGHT: RIGHT, MIGHT, NIGHT, LIGHT, FIGHT, EIGHT, SIGHT, and TIGHT. It's one of the most famous traps in Wordle because eight common words share the same last four letters.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_IGHT",
        words: ["RIGHT", "MIGHT", "NIGHT", "LIGHT", "FIGHT", "EIGHT", "SIGHT", "TIGHT"],
        note: "Eight options. If you see _IGHT early, use your next guess on a word packed with R, M, N, L, F, and S rather than guessing -IGHT words in a row.",
      },
      {
        pattern: "_OAST",
        words: ["COAST", "TOAST", "ROAST", "BOAST"],
        note: "Only the first letter changes.",
      },
      {
        pattern: "_EAST",
        words: ["LEAST", "BEAST", "FEAST", "YEAST"],
        note: "Same shape with EA.",
      },
    ],
    guesses: {
      words: ["SAINT", "ROAST", "LEAST"],
      why: "They test S, A, N, and E or O, which split this list best. SAINT checks both -ST and -NT endings in one go.",
    },
    faq: [
      {
        q: "How many common 5-letter words end in T?",
        a: "181 in our Common Words list and 717 in the full dictionary. ABOUT, FIRST, RIGHT, GREAT, and MIGHT are the most common.",
      },
      {
        q: "What's the most common ending for 5-letter words ending in T?",
        a: "-ST and -NT are tied at 17% each.",
      },
    ],
  },

  "with-a": {
    intro:
      "A shows up in about 39% of common five-letter words, so knowing a word has an A is a start but not much more. Here's where A tends to sit and which clues narrow the list fastest.",
    sections: [
      {
        title: "Where the A Usually Goes",
        paragraphs: [
          "A is most often the second letter (41% of these words: WATER, MAKES, PARTY), then the third (33%: PLACE, SMALL, BEACH). It's first in 12% (ABOUT, AFTER), fourth in 13% (GREAT, CLEAR), and last in only 7% (EXTRA, DRAMA, PIZZA).",
          "So if your A is yellow in the first slot, the second and third positions are the best places to try it next.",
        ],
      },
      {
        title: "One A or Two?",
        paragraphs: [
          "Only 6% of these words use A twice, like AGAIN, AREAS, AHEAD, AWARE, and DRAMA. For 30% of them, A is the only vowel (SMALL, START, BLACK), so once you've found the A, don't assume there's another vowel to find.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_EARS",
        words: ["YEARS", "TEARS", "BEARS", "FEARS", "WEARS", "HEARS", "GEARS"],
        note: "Seven options for the first letter. Plan a guess that tests several.",
      },
      {
        pattern: "_AILS",
        words: ["FAILS", "NAILS", "RAILS", "TAILS", "MAILS", "SAILS"],
        note: "Another first-letter trap.",
      },
      {
        pattern: "_AKES",
        words: ["MAKES", "TAKES", "LAKES", "CAKES", "WAKES"],
        note: "Same idea, with K.",
      },
    ],
    guesses: {
      words: ["LASER", "RATES", "STARE"],
      why: "They test R, E, S, T, and L alongside the A, which splits this big list most evenly.",
    },
    faq: [
      {
        q: "How many common 5-letter words have an A?",
        a: "951 in our Common Words list and 5,205 in the full dictionary, about 39% of all common five-letter words.",
      },
      {
        q: "What position is A usually in?",
        a: "The second position, in 41% of these words. The third position is next at 33%.",
      },
    ],
  },

  "a-2nd": {
    intro:
      "A in the second spot is the most common place for A in a five-letter word. This list has 386 common words with the ?A??? shape, like WATER, PARTY, and MAKES.",
    sections: [
      {
        title: "The First Letter Is the Big Unknown",
        paragraphs: [
          "No single first letter dominates: M (11%), P and C (9% each), F (8%), and B, R, W, and H (7% each) all start a lot of these words. That makes the first slot the hardest to solve, and it's the source of most traps on this page.",
          "The third letter is easier. R (12%), N (11%), and T (10%) lead, as in PARTY, HANDS, and WATCH.",
        ],
      },
      {
        title: "Look for Another Vowel",
        paragraphs: [
          "70% of these words have another vowel after the A, most often an E near the end, as in GAMES, CASES, and WATER. Doubled letters are common too: HAPPY, CARRY, CALLS, WALLS, and DADDY.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_ATCH",
        words: ["WATCH", "MATCH", "CATCH", "PATCH", "BATCH", "HATCH", "LATCH"],
        note: "Seven words with only the first letter different.",
      },
      {
        pattern: "_ALLS",
        words: ["CALLS", "WALLS", "FALLS", "BALLS", "HALLS", "MALLS"],
        note: "Six more first-letter twins.",
      },
      {
        pattern: "CA_ES",
        words: ["CASES", "CARES", "CAKES", "CAVES", "CAGES", "CAFES"],
        note: "Here the middle is the problem.",
      },
    ],
    guesses: {
      words: ["RATES", "TALES", "RACES"],
      why: "They keep A in place and test R, T, E, S, L, and C, the letters that split this list best.",
    },
    faq: [
      {
        q: "How many common 5-letter words have A as the second letter?",
        a: "386 in our Common Words list and 2,195 in the full dictionary. WATER, LATER, BASED, PARTY, and EARLY are among the most common.",
      },
      {
        q: "What letter usually comes after the A?",
        a: "R is most common (12%), followed by N and T.",
      },
    ],
  },

  "o-2nd": {
    intro:
      "Five-letter words with O as the second letter include some of the most common words there are: WOULD, COULD, WORLD, and HOUSE. Use the filters to narrow down the ?O??? pattern.",
    sections: [
      {
        title: "OU and OR Lead the Way",
        paragraphs: [
          "The third letter is the most telling clue. U and R are tied at 12%, as in FOUND, HOUSE, WORLD, and NORTH, followed by O (9%), N, and L (8% each). The OU group alone includes WOULD, COULD, FOUND, HOUSE, YOUNG, COURT, HOURS, SOUTH, ROUND, and SOUND.",
          "CO is the most common opening (11%), then MO (9%) and LO, BO, and RO (8% each).",
        ],
      },
      {
        title: "Double O",
        paragraphs: [
          "When the third letter is also O, you get a double O: LOOKS, BOOKS, GOODS, TOOLS, ROOMS, DOORS, LOOSE, and WOODS. Doubled letters show up in 18% of this list, so don't be afraid to repeat the O.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_OUND",
        words: ["FOUND", "ROUND", "SOUND", "BOUND", "POUND", "WOUND", "MOUND", "HOUND"],
        note: "Eight words that only differ in the first letter. One of the biggest traps in English.",
      },
      {
        pattern: "_OURS",
        words: ["HOURS", "YOURS", "TOURS", "FOURS", "POURS"],
        note: "Another first-letter family.",
      },
      {
        pattern: "_OVER",
        words: ["COVER", "LOVER", "ROVER", "HOVER", "MOVER"],
        note: "Test C, L, H, and M together.",
      },
    ],
    guesses: {
      words: ["ROLES", "NOTES", "TONES"],
      why: "With O in place, R, L, N, T, E, and S split this list best.",
    },
    faq: [
      {
        q: "How many common 5-letter words have O as the second letter?",
        a: "373 in our Common Words list and 2,040 in the full dictionary. WOULD, COULD, WORLD, GOING, and FOUND are the most common.",
      },
      {
        q: "What letter usually comes after the O?",
        a: "U and R are tied as the most common third letters, each at about 12%.",
      },
    ],
  },

  "r-3rd": {
    intro:
      "Five-letter words with R in the middle spot follow a few clear patterns, like vowel then R (PARTY, NORTH, WORLD) or -RRY endings (SORRY, CARRY, WORRY). Browse the 197 common ones below.",
    sections: [
      {
        title: "A Vowel Usually Comes Before the R",
        paragraphs: [
          "In 87% of these words the second letter is a vowel: A and O (23% each), E (17%), U (13%), and I (11%). That makes AR, OR, ER, UR, and IR the shapes to look for: PARTY, NORTH, TERMS, CURVE, and FIRST.",
          "The few exceptions start with a consonant blend: THREE, THROW, STRAY, SCREW, SPRAY, and STRAW, plus AGREE, ERROR, ARROW, and ARRAY.",
        ],
      },
      {
        title: "Endings to Know",
        paragraphs: [
          "-RRY is the most common three-letter ending here (9%): SORRY, CARRY, WORRY, MARRY, and BERRY. -RTH is another family: NORTH, WORTH, EARTH, BIRTH, and FORTH. And -RSE gives you WORSE, HORSE, NURSE, VERSE, CURSE, and PURSE.",
        ],
      },
    ],
    traps: [
      {
        pattern: "_IRED",
        words: ["TIRED", "FIRED", "HIRED", "AIRED", "WIRED"],
        note: "Only the first letter changes.",
      },
      {
        pattern: "CAR_S",
        words: ["CARDS", "CARES", "CARTS", "CARBS"],
        note: "Here the fourth letter is the puzzle.",
      },
      {
        pattern: "_URSE",
        words: ["NURSE", "CURSE", "PURSE"],
        note: "A smaller set, but easy to cycle through by mistake.",
      },
    ],
    guesses: {
      words: ["CARES", "ACRES", "HORSE"],
      why: "With R fixed, A, E, S, C, and O split the list best. HORSE checks the common OR shape.",
    },
    faq: [
      {
        q: "How many common 5-letter words have R as the third letter?",
        a: "197 in our Common Words list and 1,171 in the full dictionary. FIRST, WORLD, THREE, PARTY, and EARLY are the most common.",
      },
      {
        q: "What usually comes before the R?",
        a: "A vowel, in 87% of these words. A and O are the most common.",
      },
    ],
  },
};
