// Application configuration
// Values are loaded from environment variables (.env file)
// Fallback to default values if environment variables are not set

export const CONFIG = {
    // Warning threshold: background color starts changing when remaining time <= this value (in seconds)
    WARNING_THRESHOLD_SECONDS: parseInt(
        process.env.REACT_APP_WARNING_THRESHOLD_SECONDS || '20',
        10
    ),

    // Default timer interval (in seconds)
    DEFAULT_INTERVAL_SECONDS: parseInt(
        process.env.REACT_APP_DEFAULT_INTERVAL_SECONDS || '290',
        10
    ),

    // Color Configuration
    COLORS: {
        // Default background color (dark)
        DEFAULT: process.env.REACT_APP_COLOR_DEFAULT || '#282c34',

        // Warning color at 0 seconds (red)
        ALERT: process.env.REACT_APP_COLOR_ALERT || '#cb3e3e',

        // Transition color range (from default to warning)
        TRANSITION_START: {
            R: parseInt(process.env.REACT_APP_COLOR_TRANSITION_START_R || '40', 10),
            G: parseInt(process.env.REACT_APP_COLOR_TRANSITION_START_G || '44', 10),
            B: parseInt(process.env.REACT_APP_COLOR_TRANSITION_START_B || '52', 10)
        },
        TRANSITION_END: {
            R: parseInt(process.env.REACT_APP_COLOR_TRANSITION_END_R || '200', 10),
            G: parseInt(process.env.REACT_APP_COLOR_TRANSITION_END_G || '180', 10),
            B: parseInt(process.env.REACT_APP_COLOR_TRANSITION_END_B || '60', 10)
        }
    }
};
