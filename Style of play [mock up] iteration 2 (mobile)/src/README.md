# Gaming Filters Modal - Interactive Preset System

A fully interactive gaming filters modal with a "Style of Play" preset system featuring 7 themed presets, smooth animations, and intelligent filter selection logic.

## 🎮 What This Is

An advanced React component that demonstrates a sophisticated filter UI pattern for gaming applications. Users can either manually select volatility and RTP filters, or choose from 7 curated "Style of Play" presets that automatically configure filters based on gaming preferences.

## ✨ Key Features

### 1. **7 Themed Presets**
Each preset has its own unique visual identity:
- **Small Fast Wins** (Green) - Low volatility, high RTP
- **Steady Rewards** (Blue) - Medium volatility, balanced RTP
- **Big Win Thrills** (Orange) - High volatility, moderate RTP
- **Jackpot Hunter** (Purple) - High volatility, lower RTP for jackpot games
- **Bonus Bonanza** (Pink) - Variable volatility with bonus features
- **Safe Bet** (Light Green) - Very low volatility, highest RTP
- **High Roller Special** (Red) - High volatility for high-stakes players

### 2. **Smooth Animations**
- **Sliding Pill Background**: Magic motion effect that slides and auto-resizes between active presets
- **Burst Animations**: Filters "burst" into view when auto-selected by presets
- **Color Transitions**: Smooth color changes on preset hover and activation
- **Border States**: Persistent thematic stroke that appears during preset mode

### 3. **Intelligent Interaction Logic**
- **Preset Mode**: Clicking a preset auto-selects corresponding filters with burst animations
- **Manual Mode Breaking**: Manually selecting different filters instantly switches to Manual Mode while preserving all current selections
- **Preset Deselection**: Clicking an active preset again deselects it and returns to Manual Mode
- **Visual Feedback**: Icons, colors, and borders provide clear state indication

### 4. **Thematic Icons**
- Each preset displays a unique thematic icon (coins, turtle, trophy, diamond, gift, shield, poker chips)
- Manual Mode shows two colorful pill icons representing free filter combination

## 📁 Essential Files (What You Actually Need)

```
✅ CORE FILES:
├── App.tsx                              # Entry point
├── components/
│   ├── GamingFiltersModal.tsx          # Main component (all logic here)
│   └── figma/
│       └── ImageWithFallback.tsx       # Image component with fallback
├── imports/
│   └── svg-53bjzs686o.ts               # SVG paths for UI icons
└── styles/
    └── globals.css                      # Global styles and typography

❌ IGNORE THESE (system files not used):
├── components/ui/                       # 47 unused shadcn components
├── Attributions.md                      # System file
└── guidelines/Guidelines.md             # System file
```

## 🚀 How to Use

### Quick Start
```bash
# This is a Figma Make project
# Just open the project and it runs automatically
```

### Understanding the Interaction Patterns

**1. Selecting a Preset:**
- Click any preset pill at the top
- The pill background slides to the active preset with a spring animation
- The description area updates with preset-specific icon, color, and text
- The border changes to the preset's thematic color (2px stroke)
- Corresponding filters burst into selection automatically

**2. Breaking a Preset (Entering Manual Mode):**
- While a preset is active, click any filter that's not part of the preset
- The preset immediately deselects (Manual Mode)
- The border returns to default (1px neutral stroke)
- All currently selected filters remain checked
- The description switches to Manual Mode with two pill icons

**3. Deselecting a Preset:**
- Click the currently active preset pill again
- Returns to Manual Mode
- All filters remain as they were

**4. Manual Mode (Default State):**
- No preset is active
- You can freely combine any volatility and RTP filters
- Two colorful pill icons indicate full control

## 🎨 Visual Design System

### Color Themes
Each preset has a cohesive color system:
- **Pill Background**: Solid preset color
- **Border**: Semi-transparent preset color (0.5 opacity)
- **Background Tint**: Preset color at 0.15 opacity
- **Text Color**: Lighter tint of preset color
- **Manual Mode**: Neutral whites and grays

### Typography
- Custom Open Sans font family
- Consistent font-variation-settings for width
- Different opacity levels for hierarchy

### Spacing & Layout
- Fixed 80px height for icon/description area
- 64x64px rounded icons with object-cover
- Responsive grid system for filter chips
- Consistent 16px padding throughout

## 🛠️ Technical Details

### Built With
- **React 18** with Hooks (useState, useEffect)
- **Motion (Framer Motion)** for animations
- **Tailwind CSS 4.0** for styling
- **TypeScript** for type safety

### Key Technical Patterns

**1. State Management:**
```typescript
const [activePreset, setActivePreset] = useState<PresetId>(null);
const [selectedVolatility, setSelectedVolatility] = useState<string[]>([]);
const [selectedRTP, setSelectedRTP] = useState<string[]>([]);
const [burstingFilters, setBurstingFilters] = useState<Set<string>>(new Set());
```

**2. Layout Animation (Sliding Pill):**
```typescript
<motion.div
  layoutId="activePresetBg"
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
/>
```

**3. Burst Animation:**
```typescript
<motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 500, damping: 25 }}
/>
```

**4. Border State Management:**
- Uses inline styles with `transition: 'none'` to prevent fade animations
- Border is a pure state property, not animated
- 2px for preset mode, 1px for manual mode

### Dependencies
```json
{
  "motion": "^latest" (Framer Motion),
  "react": "^18",
  "tailwindcss": "^4.0"
}
```

## 📱 Responsive Design

The modal is designed for desktop but includes responsive considerations:
- Max-width of 820px
- Centered layout with padding
- Grid layout adapts to available space

## 🎯 Use Cases

Perfect for:
- Gaming/casino filter interfaces
- Any preset + manual mode pattern
- Complex filter UIs with guided options
- Educational examples of advanced React interactions
- Design system pattern libraries

## 💡 Key Learnings

This component demonstrates:
1. **Complex state synchronization** between presets and manual selections
2. **Smooth animation patterns** using Motion's layout animations
3. **Visual feedback systems** with colors, icons, and borders
4. **Mode switching logic** that preserves user selections
5. **Component composition** with reusable patterns

## 📝 Notes

- **No Backend Required**: Pure frontend component
- **Figma Design Import**: Originally imported from Figma with pixel-perfect accuracy
- **Production Ready**: Fully functional with proper error handling
- **Accessible**: Keyboard navigation and semantic HTML (can be enhanced)
- **Performant**: Optimized re-renders and animation performance

## 🔧 Customization

To adapt this component:
1. **Change Presets**: Edit the `presets` array in `GamingFiltersModal.tsx`
2. **Update Colors**: Modify color values in each preset object
3. **Change Filters**: Update `volatilityOptions` and `rtpOptions` arrays
4. **Adjust Animations**: Modify Motion transition values
5. **Replace Icons**: Update `iconUrl` values with your own images

## 🤝 Credits

Built with Figma Make - AI-powered React application builder.
Icons sourced from Unsplash.

---

**Last Updated**: November 2025
**Component Version**: 1.0.0
**React Version**: 18+
**License**: MIT (adapt as needed)
