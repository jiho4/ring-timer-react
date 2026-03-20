import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InitialScreen } from './InitialScreen';

describe('InitialScreen', () => {
    const mockHandlers = {
        onInputChange: jest.fn(),
        onStart: jest.fn(),
        onValidate: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders input field with placeholder', () => {
        render(<InitialScreen inputValue="" errorMessage="" {...mockHandlers} />);

        expect(screen.getByPlaceholderText('Enter interval in seconds')).toBeInTheDocument();
    });

    test('renders start button', () => {
        render(<InitialScreen inputValue="" errorMessage="" {...mockHandlers} />);

        expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    });

    test('displays input value', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        expect(input.value).toBe('290');
    });

    test('calls onInputChange when input changes', () => {
        render(<InitialScreen inputValue="" errorMessage="" {...mockHandlers} />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '100' } });

        expect(mockHandlers.onInputChange).toHaveBeenCalledWith('100');
    });

    test('calls onStart when start button is clicked', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        const button = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(button);

        expect(mockHandlers.onStart).toHaveBeenCalledTimes(1);
    });

    test('calls onValidate when input loses focus', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.blur(input);

        expect(mockHandlers.onValidate).toHaveBeenCalledTimes(1);
    });

    test('displays error message when provided', () => {
        render(
            <InitialScreen
                inputValue=""
                errorMessage="Please enter a time value"
                {...mockHandlers}
            />
        );

        expect(screen.getByText('Please enter a time value')).toBeInTheDocument();
    });

    test('does not display error message when empty', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        expect(screen.queryByText(/Please enter/)).not.toBeInTheDocument();
    });

    test('start button receives focus on mount', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        const button = screen.getByRole('button', { name: 'Start' });
        expect(document.activeElement).toBe(button);
    });
});
