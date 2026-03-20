import { CONFIG } from '../config';

export function getBackgroundColor(isRunning, remainingSeconds) {
    if (!isRunning) {
        return CONFIG.COLORS.DEFAULT;
    }

    const threshold = CONFIG.WARNING_THRESHOLD_SECONDS;

    if (remainingSeconds > threshold) {
        return CONFIG.COLORS.DEFAULT;
    } else if (remainingSeconds > 0) {
        // Transition from default to warning color
        const ratio = remainingSeconds / threshold; // 1.0 at threshold, 0.0 at 0s
        const startColor = CONFIG.COLORS.TRANSITION_START;
        const endColor = CONFIG.COLORS.TRANSITION_END;

        const r = Math.floor(startColor.R + (endColor.R - startColor.R) * (1 - ratio));
        const g = Math.floor(startColor.G + (endColor.G - startColor.G) * (1 - ratio));
        const b = Math.floor(startColor.B + (endColor.B - startColor.B) * (1 - ratio));
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        return CONFIG.COLORS.ALERT;
    }
}
