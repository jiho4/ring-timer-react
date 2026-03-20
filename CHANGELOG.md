# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-SNAPSHOT] - Under development

### Added

- **Pause/Resume Feature**: Press 'P' or click button to pause/resume timer
- **Enhanced Controls**: Any key resets interval during timer, added buttons to support mouse input
- **Visual Warning System**: Background color transitions (normal → yellow → light red)
- **Input Validation**: Prevents invalid time values with error messages
- **Comprehensive Test Suite**: 90+ test cases covering all functionality
  - Unit tests for all utilities, hooks, and components
  - Integration tests for complete user workflows
- **Environment Variable Configuration**: Configurable settings via `.env` file
  - `REACT_APP_WARNING_THRESHOLD_SECONDS`: When color warning starts
  - `REACT_APP_DEFAULT_INTERVAL_SECONDS`: Default timer value
- **Focus Management**: Auto-focus on start button when timer stops
- **Last Value Memory**: Remembers last interval when cancelled

### Changed

- **Complete Code Refactoring**: Modular architecture with separated concerns
  - Components: `InitialScreen`, `TimerScreen`
  - Hooks: `useTimer`, `useKeyboardControls`
  - Utils: `colors`, `formatters`, `validation`
  - Config: Centralized configuration management
- **Keyboard Shortcuts**: Improved and expanded
  - Enter: Start timer from initial screen
  - P: Pause/Resume
  - Any key: Reset interval (was Space only)
  - Esc: Stop timer
- **Visual Feedback**: Enhanced color scheme
  - Configurable warning threshold (default: 20 seconds)
  - Smooth yellow transition during warning period
  - Light red color at time-up
- **Default Timer**: Set to 290 seconds (configurable via `.env`)
- **Font Sizes**: Increased overall for better readability
- **Project Structure**: Better organization with dedicated folders

### Fixed

- Timer drift issues using wall clock polling
- Input validation on blur and submit

### Technical Improvements

- Modular React architecture
- Custom hooks for reusable logic
- Comprehensive testing with Jest and React Testing Library
- Environment-based configuration
- Better separation of concerns
- Type-safe configuration with fallbacks

## [1.0.0] - 2024-08-15

### Added

- Initial release of Ring Timer React app
- Basic interval timer functionality
- Audio notification (bell sound) at interval completion
- Simple keyboard controls (Space to continue, Esc to reset)
- Time input and display
- Basic styling with Create React App template

### Features

- Set custom interval time in seconds
- Audio bell notification when timer reaches zero
- Space bar to continue to next interval
- Escape key to reset timer
- Loop counter display
- Time remaining display in HH:MM:SS format
