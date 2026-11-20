// Themed word lists for Tootie's Word Search.
// Words are uppercase A-Z only (no spaces or hyphens) and family friendly.

export type WordSearchTheme = {
  slug: string;
  name: string;
  emoji: string;
  words: string[];
};

export const WORD_SEARCH_THEMES: WordSearchTheme[] = [
  {
    slug: "cats",
    name: "Cats",
    emoji: "🐱",
    words: ["CAT", "KITTEN", "PAWS", "WHISKERS", "PURR", "MEOW", "TAIL", "FUR", "CLAWS", "NAP", "YARN", "TABBY", "CALICO", "MOUSE", "POUNCE", "LITTER", "COLLAR", "FELINE", "CATNIP", "SCRATCH", "TOOTIE"],
  },
  {
    slug: "kitchen",
    name: "In the Kitchen",
    emoji: "🍳",
    words: ["SPOON", "FORK", "KNIFE", "PLATE", "BOWL", "OVEN", "STOVE", "KETTLE", "TOASTER", "BLENDER", "APRON", "PAN", "POT", "LADLE", "WHISK", "SPATULA", "SINK", "FRIDGE", "MUG", "NAPKIN"],
  },
  {
    slug: "weather",
    name: "Weather",
    emoji: "🌦️",
    words: ["RAIN", "SNOW", "SUNNY", "CLOUD", "STORM", "WIND", "THUNDER", "LIGHTNING", "FOG", "HAIL", "SLEET", "RAINBOW", "BREEZE", "FROST", "DRIZZLE", "HUMID", "TORNADO", "FORECAST", "CHILLY", "MISTY"],
  },
  {
    slug: "garden",
    name: "In the Garden",
    emoji: "🌷",
    words: ["SEED", "SOIL", "ROSE", "TULIP", "DAISY", "HOSE", "RAKE", "SHOVEL", "WEEDS", "BLOOM", "SPROUT", "FENCE", "BEES", "VINE", "TOMATO", "CARROT", "PETAL", "ROOTS", "WATER", "GNOME"],
  },
  {
    slug: "ocean",
    name: "Under the Sea",
    emoji: "🐠",
    words: ["WAVE", "SHELL", "CRAB", "WHALE", "SHARK", "CORAL", "TIDE", "SAND", "REEF", "DOLPHIN", "OCTOPUS", "SEAWEED", "ANCHOR", "SAILOR", "STARFISH", "JELLYFISH", "CLAM", "BOAT", "GULL", "PEARL"],
  },
  {
    slug: "fruits",
    name: "Fruits",
    emoji: "🍓",
    words: ["APPLE", "BANANA", "CHERRY", "GRAPE", "LEMON", "LIME", "MANGO", "MELON", "PEACH", "PEAR", "PLUM", "KIWI", "ORANGE", "PAPAYA", "BERRY", "APRICOT", "COCONUT", "FIG", "GUAVA", "PINEAPPLE"],
  },
  {
    slug: "vegetables",
    name: "Vegetables",
    emoji: "🥕",
    words: ["CARROT", "CELERY", "ONION", "POTATO", "PEAS", "CORN", "BEET", "KALE", "SPINACH", "PEPPER", "RADISH", "SQUASH", "TURNIP", "LETTUCE", "CABBAGE", "GARLIC", "LEEK", "YAM", "BROCCOLI", "PUMPKIN"],
  },
  {
    slug: "farm",
    name: "On the Farm",
    emoji: "🐄",
    words: ["BARN", "COW", "PIG", "HORSE", "GOAT", "SHEEP", "HEN", "ROOSTER", "TRACTOR", "HAY", "FIELD", "FENCE", "SILO", "FARMER", "DUCK", "CORN", "MILK", "EGGS", "PLOW", "PASTURE"],
  },
  {
    slug: "space",
    name: "Outer Space",
    emoji: "🚀",
    words: ["STAR", "MOON", "SUN", "PLANET", "COMET", "ORBIT", "ROCKET", "GALAXY", "METEOR", "ASTRONAUT", "MARS", "VENUS", "SATURN", "JUPITER", "NEBULA", "ALIEN", "CRATER", "ECLIPSE", "SHUTTLE", "COSMOS"],
  },
  {
    slug: "birthday",
    name: "Birthday Party",
    emoji: "🎂",
    words: ["CAKE", "CANDLES", "BALLOON", "GIFT", "PARTY", "FRIENDS", "GAMES", "CARD", "WISH", "CONFETTI", "PRESENT", "SING", "HATS", "STREAMER", "FROSTING", "CELEBRATE", "TREAT", "SURPRISE", "PINATA", "BOW"],
  },
  {
    slug: "winter",
    name: "Winter Fun",
    emoji: "⛄",
    words: ["SNOW", "SLED", "SKATE", "MITTENS", "SCARF", "COCOA", "FROST", "ICICLE", "BLIZZARD", "SNOWMAN", "BOOTS", "COAT", "CHILL", "FIREPLACE", "IGLOO", "PENGUIN", "SKI", "FLAKE", "WOOL", "COZY"],
  },
  {
    slug: "thanksgiving",
    name: "Thanksgiving",
    emoji: "🦃",
    words: ["TURKEY", "PIE", "GRAVY", "STUFFING", "PUMPKIN", "FAMILY", "FEAST", "HARVEST", "THANKS", "PARADE", "CORN", "YAMS", "GRATEFUL", "AUTUMN", "PILGRIM", "CRANBERRY", "NAPKIN", "TABLE", "DINNER", "LEAVES"],
  },
  {
    slug: "holidays",
    name: "Winter Holidays",
    emoji: "🎁",
    words: ["GIFTS", "LIGHTS", "TINSEL", "WREATH", "SLEIGH", "REINDEER", "COOKIES", "STOCKING", "CANDLE", "RIBBON", "GARLAND", "SNOWFLAKE", "CAROL", "BELLS", "ELF", "SANTA", "TREE", "PRESENT", "ORNAMENT", "JOY"],
  },
  {
    slug: "sports",
    name: "Sports",
    emoji: "⚽",
    words: ["BALL", "BAT", "GOAL", "TEAM", "COACH", "SOCCER", "TENNIS", "HOCKEY", "GOLF", "BASEBALL", "FOOTBALL", "SKATING", "SWIM", "RUN", "JUMP", "SCORE", "REFEREE", "STADIUM", "HELMET", "TROPHY"],
  },
  {
    slug: "music",
    name: "Music",
    emoji: "🎵",
    words: ["DRUM", "GUITAR", "PIANO", "FLUTE", "VIOLIN", "SONG", "NOTE", "CHORD", "MELODY", "RHYTHM", "BAND", "SINGER", "TUBA", "HARP", "TEMPO", "CHOIR", "CONCERT", "LYRICS", "BEAT", "TRUMPET"],
  },
  {
    slug: "colors",
    name: "Colors",
    emoji: "🎨",
    words: ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "PURPLE", "PINK", "BROWN", "BLACK", "WHITE", "GRAY", "TEAL", "MAROON", "VIOLET", "INDIGO", "BEIGE", "CORAL", "NAVY", "OLIVE", "GOLD"],
  },
  {
    slug: "birds",
    name: "Birds",
    emoji: "🐦",
    words: ["ROBIN", "EAGLE", "OWL", "HAWK", "CROW", "DOVE", "PARROT", "PENGUIN", "SPARROW", "FINCH", "WREN", "HERON", "SWAN", "GOOSE", "TURKEY", "PIGEON", "FLAMINGO", "CARDINAL", "BLUEJAY", "PELICAN"],
  },
  {
    slug: "bugs",
    name: "Bugs",
    emoji: "🐞",
    words: ["ANT", "BEE", "BEETLE", "BUTTERFLY", "MOTH", "WASP", "SPIDER", "CRICKET", "LADYBUG", "FIREFLY", "TERMITE", "FLEA", "GNAT", "HORNET", "MANTIS", "WORM", "SNAIL", "TICK", "APHID", "DRAGONFLY"],
  },
  {
    slug: "camping",
    name: "Camping",
    emoji: "🏕️",
    words: ["TENT", "CAMPFIRE", "LANTERN", "HIKE", "TRAIL", "FOREST", "CANOE", "COMPASS", "MAP", "BACKPACK", "SMORES", "KAYAK", "CABIN", "LAKE", "STARS", "FLASHLIGHT", "WOODS", "FISHING", "MARSHMALLOW", "LOG"],
  },
  {
    slug: "baking",
    name: "Baking Day",
    emoji: "🧁",
    words: ["FLOUR", "SUGAR", "BUTTER", "EGGS", "YEAST", "DOUGH", "OVEN", "COOKIE", "MUFFIN", "BREAD", "CAKE", "PIE", "ICING", "SPRINKLES", "MIXER", "WHISK", "BATTER", "CRUST", "CINNAMON", "VANILLA"],
  },
  {
    slug: "school",
    name: "Back to School",
    emoji: "✏️",
    words: ["PENCIL", "ERASER", "BOOK", "DESK", "TEACHER", "RULER", "CRAYON", "RECESS", "LUNCH", "CLASS", "LESSON", "SCIENCE", "MATH", "READING", "BACKPACK", "CHALK", "PAPER", "GLUE", "NOTEBOOK", "LIBRARY"],
  },
  {
    slug: "pets",
    name: "Pets",
    emoji: "🐶",
    words: ["DOG", "PUPPY", "BONE", "LEASH", "BARK", "FETCH", "COLLAR", "HAMSTER", "RABBIT", "PARROT", "GOLDFISH", "TURTLE", "KITTEN", "TREAT", "GROOM", "VET", "PAWS", "LIZARD", "FERRET", "GERBIL"],
  },
  {
    slug: "breakfast",
    name: "Breakfast",
    emoji: "🥞",
    words: ["EGGS", "TOAST", "BACON", "CEREAL", "PANCAKE", "WAFFLE", "SYRUP", "JUICE", "COFFEE", "MILK", "OATMEAL", "MUFFIN", "BAGEL", "YOGURT", "BANANA", "BERRIES", "SAUSAGE", "HONEY", "JAM", "CREPE"],
  },
  {
    slug: "zoo",
    name: "At the Zoo",
    emoji: "🦁",
    words: ["LION", "TIGER", "ZEBRA", "GIRAFFE", "MONKEY", "HIPPO", "ELEPHANT", "RHINO", "PANDA", "KOALA", "GORILLA", "LEOPARD", "CHEETAH", "CAMEL", "BEAR", "OTTER", "SLOTH", "LEMUR", "JAGUAR", "TOUCAN"],
  },
  {
    slug: "body",
    name: "Parts of the Body",
    emoji: "🖐️",
    words: ["HAND", "FOOT", "ARM", "LEG", "HEAD", "NOSE", "EARS", "EYES", "MOUTH", "KNEE", "ELBOW", "SHOULDER", "ANKLE", "WRIST", "CHIN", "TEETH", "TONGUE", "THUMB", "HEART", "BRAIN"],
  },
  {
    slug: "transportation",
    name: "Things That Go",
    emoji: "🚂",
    words: ["CAR", "BUS", "TRAIN", "PLANE", "BOAT", "SHIP", "TRUCK", "BIKE", "TAXI", "SUBWAY", "TRAM", "JET", "VAN", "WAGON", "SCOOTER", "HELICOPTER", "FERRY", "CANOE", "ROCKET", "TRACTOR"],
  },
  {
    slug: "autumn",
    name: "Autumn",
    emoji: "🍂",
    words: ["LEAVES", "ACORN", "PUMPKIN", "HARVEST", "APPLE", "CIDER", "SWEATER", "RAKE", "SQUASH", "SCARECROW", "HAYRIDE", "MAPLE", "OCTOBER", "CHILLY", "CRISP", "GOURD", "CORN", "ORCHARD", "BONFIRE", "OWL"],
  },
  {
    slug: "beach",
    name: "Beach Day",
    emoji: "🏖️",
    words: ["SAND", "SUN", "TOWEL", "BUCKET", "SHOVEL", "WAVES", "SHELLS", "SURF", "UMBRELLA", "SUNSCREEN", "COOLER", "KITE", "SWIM", "LIFEGUARD", "BOARDWALK", "SEAGULL", "FLIPFLOPS", "PIER", "CASTLE", "SUNHAT"],
  },
  {
    slug: "toys",
    name: "Toys and Games",
    emoji: "🧸",
    words: ["PUZZLE", "BLOCKS", "DOLL", "KITE", "YOYO", "MARBLES", "CARDS", "DICE", "CHESS", "CHECKERS", "TEDDY", "ROBOT", "TRAIN", "BALL", "JACKS", "PUPPET", "RATTLE", "DOMINO", "BINGO", "WHISTLE"],
  },
  {
    slug: "words",
    name: "All About Words",
    emoji: "📚",
    words: ["LETTER", "VOWEL", "SYLLABLE", "RHYME", "SPELL", "ANAGRAM", "PUZZLE", "WORD", "TILES", "VOCABULARY", "DICTIONARY", "NOUN", "VERB", "ADJECTIVE", "GRAMMAR", "PHRASE", "SENTENCE", "ALPHABET", "CLUE", "SYNONYM"],
  },
];
