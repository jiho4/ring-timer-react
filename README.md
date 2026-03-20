# Ring Timer (React)

*created: 2024/08/15*

## Description

A React-based interval timer application with audio notifications. Perfect for Pomodoro technique, workout intervals, or any task requiring timed intervals with visual and audio cues.

## Features

- **Customizable Intervals** - Set any timer duration
- **Audio Notifications** - Bell sound plays when time expires
- **Pause/Resume** - Pause and resume timer at any point
- **Loop Counter** - Tracks how many intervals completed
- **Elapsed Time** - Shows total time elapsed since start
- **Visual Warning** - Background gradually changes to yellow, then red as time runs out
- **Keyboard Shortcuts** - Full keyboard control support
- **Input Validation** - Prevents invalid time values
- **Last Value Memory** - Remembers your last interval setting

## Usage

### Starting a Timer

1. Enter interval time in seconds (or use default from `.env`)
2. Click **Start** button or press **Enter** key
3. Timer begins countdown with visual feedback

### Controls (Keyboard Shortcuts)

| Key | Action | Available When |
|-----|--------|----------------|
| **Enter** | Start timer | Initial screen |
| **Any key** | Reset interval (restart countdown) | Timer running & not paused |
| **P** | Pause/Resume timer | Timer running |
| **Esc** | Stop timer and return to setup | Timer running |

### Controls (Mouse)

- **Reset** - Restarts the current interval and increments loop count
- **Pause / Resume** - Pause or resume the timer
- **Stop** - Stop timer and return to initial screen

### Visual Feedback

- **Normal**: Dark background
- **Warning**: Background gradually transitions to yellow when time is running out (threshold configurable in `.env`)
- **Time's Up**: Background turns light red with bell sound
- **Paused**: Yellow "⏸ PAUSED" indicator appears

## Project Structure

```
src/
├── components/
│   ├── InitialScreen.js      # Setup/input screen component
│   ├── InitialScreen.test.js # Component tests
│   ├── TimerScreen.js         # Running timer display component
│   └── TimerScreen.test.js    # Component tests
├── hooks/
│   ├── useTimer.js            # Timer logic & state management
│   ├── useTimer.test.js       # Hook tests
│   ├── useKeyboardControls.js # Keyboard event handling
│   └── useKeyboardControls.test.js # Hook tests
├── utils/
│   ├── colors.js              # Background color calculations
│   ├── colors.test.js         # Utility tests
│   ├── formatters.js          # Time formatting utilities
│   ├── formatters.test.js     # Utility tests
│   ├── validation.js          # Input validation logic
│   └── validation.test.js     # Utility tests
├── App.js                     # Main application component
├── App.test.js                # Integration tests
├── App.css                    # Application styles
└── index.js                   # Application entry point
```

## Technology Stack

- **React 18** - UI framework
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **Create React App** - Build tooling

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running Development Server

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- formatters.test.js

# Run tests in watch mode (default)
npm test
```

### Test Coverage

The application includes comprehensive unit and integration tests:
- 90+ test cases
- Utility functions (formatters, colors, validation)
- Custom hooks (timer logic, keyboard controls)
- React components (UI rendering, user interactions)
- Integration tests (complete user workflows)

## Build & Deployment

### Production Build

```bash
# Build optimized production bundle
npm run build
```

Creates an optimized production build in the `build/` folder.

### Serving Production Build Locally

```bash
# Install serve globally (one-time)
npm install -g serve

# Serve the production build
serve -s build
```

### Build Output

The build folder contains:
- Minified and optimized JavaScript bundles
- CSS files with vendor prefixes
- Static assets (audio files, images)
- index.html with proper asset references

## Configuration

Application settings are configured using environment variables in the `.env` file.

### Configuration Options

#### Timer Settings

- **`REACT_APP_WARNING_THRESHOLD_SECONDS`**
  - Controls when the background color warning starts (in seconds)
  - Color transitions from normal → yellow → light red during this period
  - Example: Set to `30` for a 30-second warning period

- **`REACT_APP_DEFAULT_INTERVAL_SECONDS`**
  - Default value shown in the input field on app load (in seconds)
  - Example: Set to `1500` for a 25-minute Pomodoro timer

#### Color Settings

- **`REACT_APP_COLOR_DEFAULT`**
  - Default background color (hex format)
  - Example: `#282c34` (dark gray)

- **`REACT_APP_COLOR_ALERT`**
  - Alert/warning color when time is up (hex format)
  - Example: `#cb3e3e` (light red)

- **`REACT_APP_COLOR_TRANSITION_START_R/G/B`**
  - Starting RGB values for color transition (0-255)
  - Used at warning threshold

- **`REACT_APP_COLOR_TRANSITION_END_R/G/B`**
  - Ending RGB values for color transition (0-255)
  - Used as time approaches zero

### How to Configure

1. Edit values in `.env` file (see current values there)
2. Restart the development server (`npm start`) or rebuild (`npm run build`)

**Note:**

- Environment variables are embedded at build time. Changes require restart/rebuild.
- `.env` is committed to git with default values, safe for non-sensitive configuration.
- For local overrides, create `.env.local` (automatically gitignored).

### Test Configuration

Tests use independent configuration values from `.env.test` to ensure test isolation:

- Test colors and thresholds are different from production values
- This prevents tests from breaking when production config changes
- `.env.test` is committed to git and shared across all developers

### Audio File

The bell sound is located at:
```
public/resources/Ping.mp3
```

Replace this file to use a different notification sound.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires modern browser with ES6+ support.

## License

This project is open source and available under the MIT License.
