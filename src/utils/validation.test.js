import { validateInput } from './validation';

describe('validateInput', () => {
    test('returns error for empty string', () => {
        const result = validateInput('');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Please enter a time value');
    });

    test('returns error for whitespace only', () => {
        const result = validateInput('   ');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Please enter a time value');
    });

    test('returns error for non-numeric input', () => {
        const result = validateInput('abc');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Please enter a valid number');
    });

    test('returns error for zero', () => {
        const result = validateInput('0');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Time must be greater than 0');
    });

    test('returns error for negative number', () => {
        const result = validateInput('-10');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Time must be greater than 0');
    });

    test('returns valid for positive integer', () => {
        const result = validateInput('290');
        expect(result.isValid).toBe(true);
        expect(result.message).toBe('');
    });

    test('returns valid for positive number with decimal (parseInt will handle)', () => {
        const result = validateInput('10.5');
        expect(result.isValid).toBe(true);
        expect(result.message).toBe('');
    });

    test('returns valid for large numbers', () => {
        const result = validateInput('9999');
        expect(result.isValid).toBe(true);
        expect(result.message).toBe('');
    });
});
