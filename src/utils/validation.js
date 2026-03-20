export function validateInput(inputValue) {
    const seconds = parseInt(inputValue, 10);

    if (!inputValue || inputValue.trim() === '') {
        return { isValid: false, message: 'Please enter a time value' };
    }
    if (isNaN(seconds)) {
        return { isValid: false, message: 'Please enter a valid number' };
    }
    if (seconds <= 0) {
        return { isValid: false, message: 'Time must be greater than 0' };
    }

    return { isValid: true, message: '' };
}
