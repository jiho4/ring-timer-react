import { getBackgroundColor } from './colors';
import { CONFIG } from '../config';

describe('getBackgroundColor', () => {
    const threshold = CONFIG.WARNING_THRESHOLD_SECONDS;

    test('returns default color when not running', () => {
        expect(getBackgroundColor(false, 100)).toBe(CONFIG.COLORS.DEFAULT);
    });

    test('returns default color when remaining seconds > threshold', () => {
        expect(getBackgroundColor(true, threshold + 10)).toBe(CONFIG.COLORS.DEFAULT);
        expect(getBackgroundColor(true, threshold + 1)).toBe(CONFIG.COLORS.DEFAULT);
    });

    test('returns transitioning color when 0 < remaining seconds <= threshold', () => {
        const color = getBackgroundColor(true, threshold / 2);
        expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });

    test('returns alert color when remaining seconds is 0', () => {
        expect(getBackgroundColor(true, 0)).toBe(CONFIG.COLORS.ALERT);
    });

    test('transition at threshold seconds should match start color', () => {
        const color = getBackgroundColor(true, threshold);
        const startColor = CONFIG.COLORS.TRANSITION_START;
        const expected = `rgb(${startColor.R}, ${startColor.G}, ${startColor.B})`;
        expect(color).toBe(expected);
    });

    test('transition gets brighter as time decreases', () => {
        const colorHigh = getBackgroundColor(true, threshold);
        const colorMid = getBackgroundColor(true, threshold / 2);
        const colorLow = getBackgroundColor(true, 1);

        // Extract RGB values
        const getRgb = (colorStr) => {
            const match = colorStr.match(/rgb\((\d+), (\d+), (\d+)\)/);
            return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
        };

        const rgbHigh = getRgb(colorHigh);
        const rgbMid = getRgb(colorMid);
        const rgbLow = getRgb(colorLow);

        // Color values should progress from start to end
        expect(rgbLow.r).toBeGreaterThan(rgbMid.r);
        expect(rgbMid.r).toBeGreaterThan(rgbHigh.r);
    });
});
