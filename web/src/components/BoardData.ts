import type { SoundId } from "./AudioEngine";

export interface BoardItem {
  id: string;
  emoji: string;
  label: string;
  sound: SoundId;
  description: string;
  color: string;
  size: "sm" | "md" | "lg";
}

export interface Board {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  gradient: string;
  cardGradient: string;
  accentColor: string;
  textColor: string;
  bgColor: string;
  panelColor: string;
  particleColor: string;
  items: BoardItem[];
  ambientEmojis: string[];
}

export const BOARDS: Board[] = [
  {
    id: "pastel-dreams",
    name: "Pastel Dreams",
    tagline: "Soft clouds & dreamy sounds",
    emoji: "🩷",
    gradient: "linear-gradient(135deg, #fce4ec 0%, #e8eaf6 40%, #e3f2fd 70%, #f3e5f5 100%)",
    cardGradient: "linear-gradient(135deg, #f8bbd0 0%, #e1bee7 50%, #bbdefb 100%)",
    accentColor: "#e91e8c",
    textColor: "#6a1b4d",
    bgColor: "#fce4ec",
    panelColor: "rgba(252,228,236,0.85)",
    particleColor: "#f48fb1",
    ambientEmojis: ["☁️", "⭐", "🌸", "💫", "🌙", "✨", "🦋", "🌷"],
    items: [
      { id: "cloud", emoji: "☁️", label: "Fluffy Cloud", sound: "squish", description: "Squeeze the cloud", color: "#e3f2fd", size: "lg" },
      { id: "star", emoji: "⭐", label: "Twinkle Star", sound: "chime", description: "Make it sparkle", color: "#fff9c4", size: "md" },
      { id: "heart", emoji: "💖", label: "Soft Heart", sound: "pop", description: "Pop with love", color: "#f8bbd0", size: "md" },
      { id: "rain", emoji: "🌧️", label: "Gentle Rain", sound: "rain", description: "Pitter patter", color: "#bbdefb", size: "lg" },
      { id: "flower", emoji: "🌸", label: "Cherry Blossom", sound: "tap", description: "Soft tap", color: "#f48fb1", size: "sm" },
      { id: "butterfly", emoji: "🦋", label: "Butterfly", sound: "sparkle", description: "Flutter sparkles", color: "#e1bee7", size: "md" },
      { id: "moon", emoji: "🌙", label: "Dream Moon", sound: "bell", description: "Ring gently", color: "#fff3e0", size: "md" },
      { id: "bubble", emoji: "🫧", label: "Dream Bubble", sound: "bubble", description: "Float & pop", color: "#e3f2fd", size: "sm" },
      { id: "pillow", emoji: "🛏️", label: "Cozy Pillow", sound: "squish", description: "Fluff it up", color: "#fce4ec", size: "lg" },
      { id: "candy", emoji: "🍬", label: "Pastel Candy", sound: "click", description: "Click click", color: "#f8bbd0", size: "sm" },
      { id: "rainbow", emoji: "🌈", label: "Soft Rainbow", sound: "chime", description: "Shimmer", color: "#e8eaf6", size: "lg" },
      { id: "feather", emoji: "🪶", label: "Light Feather", sound: "wind", description: "Gentle breeze", color: "#f3e5f5", size: "md" },
    ],
  },
  {
    id: "magical-forest",
    name: "Magical Forest",
    tagline: "Enchanted glows & forest magic",
    emoji: "🪄",
    gradient: "linear-gradient(135deg, #1a0533 0%, #0d2b3e 40%, #0a3d2e 70%, #1a0533 100%)",
    cardGradient: "linear-gradient(135deg, #4a0080 0%, #006064 50%, #1b5e20 100%)",
    accentColor: "#b39ddb",
    textColor: "#e8f5e9",
    bgColor: "#0d1b2a",
    panelColor: "rgba(26,5,51,0.9)",
    particleColor: "#69ff47",
    ambientEmojis: ["🍄", "✨", "🌿", "🦋", "🌸", "⭐", "🌙", "🔮"],
    items: [
      { id: "mushroom", emoji: "🍄", label: "Magic Mushroom", sound: "chime", description: "Magical chime", color: "#4a148c", size: "lg" },
      { id: "sparkle", emoji: "✨", label: "Forest Sparkle", sound: "sparkle", description: "Scatter sparks", color: "#1b5e20", size: "md" },
      { id: "firefly", emoji: "🪲", label: "Firefly", sound: "bell", description: "Soft glow ring", color: "#004d40", size: "sm" },
      { id: "wind", emoji: "🌬️", label: "Magic Wind", sound: "wind", description: "Whoosh!", color: "#006064", size: "md" },
      { id: "crystal", emoji: "🔮", label: "Crystal Ball", sound: "mysteryAmbient", description: "Mystical hum", color: "#311b92", size: "lg" },
      { id: "leaf", emoji: "🍃", label: "Magic Leaf", sound: "leafRustle", description: "Rustle", color: "#1b5e20", size: "sm" },
      { id: "star2", emoji: "🌟", label: "Forest Star", sound: "chime", description: "Twinkle", color: "#f57f17", size: "md" },
      { id: "fairy", emoji: "🧚", label: "Fairy Dust", sound: "sparkle", description: "Sprinkle magic", color: "#4a0072", size: "md" },
      { id: "plant", emoji: "🌿", label: "Glowing Plant", sound: "tap", description: "Gentle tap", color: "#004d40", size: "sm" },
      { id: "owl", emoji: "🦉", label: "Forest Owl", sound: "whisper", description: "Soft hoot", color: "#3e2723", size: "lg" },
      { id: "wand", emoji: "🪄", label: "Magic Wand", sound: "sparkle", description: "Cast a spell", color: "#6a1b9a", size: "md" },
      { id: "acorn", emoji: "🌰", label: "Acorn", sound: "woodTap", description: "Tap tap", color: "#4e342e", size: "sm" },
    ],
  },
  {
    id: "mystery",
    name: "Mystery",
    tagline: "Whispers from the unknown",
    emoji: "🌙",
    gradient: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 40%, #0f0f1a 70%, #1a1a0a 100%)",
    cardGradient: "linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 50%, #0a1a2e 100%)",
    accentColor: "#9c27b0",
    textColor: "#e8eaf6",
    bgColor: "#0a0a0f",
    panelColor: "rgba(10,10,15,0.95)",
    particleColor: "#ce93d8",
    ambientEmojis: ["❓", "🚪", "🌑", "🕯️", "👁️", "🔑", "⏰", "🕸️"],
    items: [
      { id: "question", emoji: "❓", label: "Mystery Box", sound: "mysteryAmbient", description: "What's inside?", color: "#1a0a2e", size: "lg" },
      { id: "door", emoji: "🚪", label: "Secret Door", sound: "click", description: "Creak open", color: "#0d0d1a", size: "lg" },
      { id: "clock", emoji: "⏰", label: "Ticking Clock", sound: "tickTock", description: "Tick tock", color: "#1a1a0a", size: "md" },
      { id: "candle", emoji: "🕯️", label: "Flickering Candle", sound: "whisper", description: "Soft flicker", color: "#1a0a0a", size: "md" },
      { id: "eye", emoji: "👁️", label: "Watching Eye", sound: "whisper", description: "It sees you", color: "#0a1a2e", size: "sm" },
      { id: "key", emoji: "🗝️", label: "Old Key", sound: "click", description: "Click unlock", color: "#1a1a1a", size: "sm" },
      { id: "orb", emoji: "🔮", label: "Mystery Orb", sound: "mysteryAmbient", description: "Glow & hum", color: "#1a0a2e", size: "lg" },
      { id: "spider", emoji: "🕸️", label: "Spider Web", sound: "tap", description: "Tap the web", color: "#0a0a1a", size: "md" },
      { id: "moon2", emoji: "🌑", label: "Dark Moon", sound: "bell", description: "Distant bell", color: "#0d0d2e", size: "md" },
      { id: "ghost", emoji: "👻", label: "Friendly Ghost", sound: "whisper", description: "Boo~", color: "#1a1a2e", size: "sm" },
      { id: "potion", emoji: "🧪", label: "Mystery Potion", sound: "bubble", description: "Bubble bubble", color: "#0a1a0a", size: "md" },
      { id: "star3", emoji: "💫", label: "Floating Object", sound: "chime", description: "Eerie chime", color: "#1a0a1a", size: "sm" },
    ],
  },
  {
    id: "ocean",
    name: "Ocean",
    tagline: "Dive into tranquil waters",
    emoji: "🌊",
    gradient: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 40%, #80deea 70%, #4dd0e1 100%)",
    cardGradient: "linear-gradient(135deg, #006064 0%, #00838f 50%, #0097a7 100%)",
    accentColor: "#0097a7",
    textColor: "#e0f7fa",
    bgColor: "#e0f7fa",
    panelColor: "rgba(224,247,250,0.9)",
    particleColor: "#4dd0e1",
    ambientEmojis: ["🐠", "🐚", "🌊", "🐟", "🦀", "🐙", "⭐", "🪸"],
    items: [
      { id: "wave", emoji: "🌊", label: "Ocean Wave", sound: "oceanWave", description: "Whoosh & crash", color: "#006064", size: "lg" },
      { id: "bubble2", emoji: "🫧", label: "Ocean Bubble", sound: "bubble", description: "Blub blub", color: "#0097a7", size: "md" },
      { id: "shell", emoji: "🐚", label: "Seashell", sound: "oceanWave", description: "Hear the ocean", color: "#00838f", size: "md" },
      { id: "fish", emoji: "🐠", label: "Tropical Fish", sound: "waterDrop", description: "Splash!", color: "#006064", size: "sm" },
      { id: "water", emoji: "💧", label: "Water Drop", sound: "waterDrop", description: "Drip drop", color: "#0097a7", size: "sm" },
      { id: "coral", emoji: "🪸", label: "Coral Reef", sound: "tap", description: "Gentle tap", color: "#00695c", size: "lg" },
      { id: "jellyfish", emoji: "🪼", label: "Jellyfish", sound: "bell", description: "Soft ring", color: "#006064", size: "md" },
      { id: "crab", emoji: "🦀", label: "Little Crab", sound: "click", description: "Clicky claws", color: "#00838f", size: "sm" },
      { id: "octopus", emoji: "🐙", label: "Octopus", sound: "squish", description: "Squishy!", color: "#004d40", size: "lg" },
      { id: "starfish", emoji: "⭐", label: "Starfish", sound: "chime", description: "Star chime", color: "#0097a7", size: "sm" },
      { id: "rain2", emoji: "🌧️", label: "Rain on Sea", sound: "rain", description: "Pitter patter", color: "#006064", size: "md" },
      { id: "dolphin", emoji: "🐬", label: "Dolphin", sound: "chime", description: "Dolphin song", color: "#00838f", size: "lg" },
    ],
  },
  {
    id: "candy",
    name: "Candy",
    tagline: "Sweet pops & sugary clicks",
    emoji: "🍓",
    gradient: "linear-gradient(135deg, #fce4ec 0%, #fff9c4 40%, #ffe0b2 70%, #f3e5f5 100%)",
    cardGradient: "linear-gradient(135deg, #e91e63 0%, #ff9800 50%, #9c27b0 100%)",
    accentColor: "#e91e63",
    textColor: "#880e4f",
    bgColor: "#fce4ec",
    panelColor: "rgba(252,228,236,0.9)",
    particleColor: "#f48fb1",
    ambientEmojis: ["🍭", "🍬", "🍩", "🧁", "🍰", "🎀", "🌈", "⭐"],
    items: [
      { id: "lollipop", emoji: "🍭", label: "Lollipop", sound: "candyPop", description: "Satisfying pop!", color: "#f8bbd0", size: "lg" },
      { id: "gummy", emoji: "🐻", label: "Gummy Bear", sound: "squish", description: "Squishy gummy", color: "#fff9c4", size: "md" },
      { id: "candy2", emoji: "🍬", label: "Hard Candy", sound: "click", description: "Click click", color: "#ffe0b2", size: "sm" },
      { id: "donut", emoji: "🍩", label: "Sprinkle Donut", sound: "pop", description: "Pop a sprinkle", color: "#f8bbd0", size: "lg" },
      { id: "cupcake", emoji: "🧁", label: "Cupcake", sound: "squish", description: "Squish the frosting", color: "#e1bee7", size: "md" },
      { id: "cake", emoji: "🎂", label: "Birthday Cake", sound: "bell", description: "Ding ding!", color: "#fff9c4", size: "lg" },
      { id: "ribbon", emoji: "🎀", label: "Candy Ribbon", sound: "tap", description: "Tap tap", color: "#f48fb1", size: "sm" },
      { id: "chocolate", emoji: "🍫", label: "Chocolate Bar", sound: "woodTap", description: "Snap!", color: "#3e2723", size: "md" },
      { id: "strawberry", emoji: "🍓", label: "Strawberry", sound: "candyPop", description: "Juicy pop", color: "#f8bbd0", size: "sm" },
      { id: "icecream", emoji: "🍦", label: "Ice Cream", sound: "chime", description: "Sweet chime", color: "#e3f2fd", size: "md" },
      { id: "popcorn", emoji: "🍿", label: "Popcorn", sound: "pop", description: "Pop pop pop!", color: "#fff9c4", size: "lg" },
      { id: "bubblegum", emoji: "🫧", label: "Bubblegum", sound: "bubble", description: "Blow a bubble", color: "#f3e5f5", size: "sm" },
    ],
  },
  {
    id: "cozy-nature",
    name: "Cozy Nature",
    tagline: "Earthy calm & gentle sounds",
    emoji: "🌿",
    gradient: "linear-gradient(135deg, #f1f8e9 0%, #f9fbe7 40%, #fff8e1 70%, #efebe9 100%)",
    cardGradient: "linear-gradient(135deg, #33691e 0%, #827717 50%, #4e342e 100%)",
    accentColor: "#558b2f",
    textColor: "#1b5e20",
    bgColor: "#f1f8e9",
    panelColor: "rgba(241,248,233,0.9)",
    particleColor: "#aed581",
    ambientEmojis: ["🌿", "🌸", "🍂", "🐦", "🌻", "🍄", "🦔", "🌱"],
    items: [
      { id: "leaf2", emoji: "🍃", label: "Rustling Leaf", sound: "leafRustle", description: "Shhhh rustle", color: "#c8e6c9", size: "lg" },
      { id: "bird", emoji: "🐦", label: "Little Bird", sound: "birdChirp", description: "Tweet tweet", color: "#dcedc8", size: "md" },
      { id: "rain3", emoji: "🌧️", label: "Forest Rain", sound: "rain", description: "Pitter patter", color: "#b3e5fc", size: "lg" },
      { id: "wood", emoji: "🪵", label: "Wooden Log", sound: "woodTap", description: "Knock knock", color: "#d7ccc8", size: "md" },
      { id: "flower2", emoji: "🌻", label: "Sunflower", sound: "tap", description: "Gentle tap", color: "#fff9c4", size: "md" },
      { id: "mushroom2", emoji: "🍄", label: "Forest Mushroom", sound: "pop", description: "Soft pop", color: "#ffccbc", size: "sm" },
      { id: "hedgehog", emoji: "🦔", label: "Hedgehog", sound: "squish", description: "Soft pet", color: "#d7ccc8", size: "sm" },
      { id: "acorn2", emoji: "🌰", label: "Acorn Drop", sound: "woodTap", description: "Tap tap", color: "#bcaaa4", size: "sm" },
      { id: "stream", emoji: "💧", label: "Stream Drop", sound: "waterDrop", description: "Drip drip", color: "#b3e5fc", size: "md" },
      { id: "wind2", emoji: "🌬️", label: "Gentle Breeze", sound: "wind", description: "Whoosh", color: "#e8f5e9", size: "lg" },
      { id: "seedling", emoji: "🌱", label: "Seedling", sound: "chime", description: "Growing chime", color: "#c8e6c9", size: "sm" },
      { id: "frog", emoji: "🐸", label: "Happy Frog", sound: "pop", description: "Ribbit!", color: "#a5d6a7", size: "md" },
    ],
  },
];
