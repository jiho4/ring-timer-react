import { formatTime } from './formatters';

describe('formatTime', () => {
    test('formats zero seconds', () => {
        expect(formatTime(0)).toBe('00:00:00');
    });

    test('formats seconds only', () => {
        expect(formatTime(45)).toBe('00:00:45');
    });

    test('formats minutes and seconds', () => {
        expect(formatTime(125)).toBe('00:02:05');
    });

    test('formats hours, minutes, and seconds', () => {
        expect(formatTime(3665)).toBe('01:01:05');
    });

    test('formats large values correctly', () => {
        expect(formatTime(7384)).toBe('02:03:04');
    });

    test('pads single digits with zero', () => {
        expect(formatTime(3661)).toBe('01:01:01');
    });
});
