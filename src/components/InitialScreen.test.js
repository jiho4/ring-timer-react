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

    test('renders input field with label', () => {
        render(<InitialScreen inputValue="" errorMessage="" {...mockHandlers} />);

        expect(screen.getByLabelText('Interval (seconds)')).toBeInTheDocument();
        expect(screen.getByTestId('screen-card')).toBeInTheDocument();
        expect(screen.getByTestId('screen-card-top')).toBeInTheDocument();
        expect(screen.getByTestId('screen-card-main')).toBeInTheDocument();
        expect(screen.getByTestId('screen-card-actions')).toBeInTheDocument();
    });

    test('renders start button', () => {
        render(<InitialScreen inputValue="" errorMessage="" {...mockHandlers} />);

        expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    });

    test('displays input value', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        expect(screen.getByLabelText('Interval (seconds)').value).toBe('290');
    });

    test('calls onInputChange when input changes', () => {
        render(<InitialScreen inputValue="" errorMessage="" {...mockHandlers} />);

        fireEvent.change(screen.getByLabelText('Interval (seconds)'), { target: { value: '100' } });

        expect(mockHandlers.onInputChange).toHaveBeenCalledWith('100');
    });

    test('calls onStart when start button is clicked', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        fireEvent.click(screen.getByRole('button', { name: /start/i }));

        expect(mockHandlers.onStart).toHaveBeenCalledTimes(1);
    });

    test('calls onValidate when input loses focus', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        fireEvent.blur(screen.getByLabelText('Interval (seconds)'));

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

    test('input is in error state when error message provided', () => {
        render(
            <InitialScreen
                inputValue=""
                errorMessage="Please enter a time value"
                {...mockHandlers}
            />
        );

        expect(screen.getByLabelText('Interval (seconds)')).toHaveAttribute('aria-invalid', 'true');
    });

    test('start button receives focus on mount', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        expect(document.activeElement).toBe(screen.getByRole('button', { name: /start/i }));
    });

    test('displays updated keyboard shortcuts guide', () => {
        render(<InitialScreen inputValue="290" errorMessage="" {...mockHandlers} />);

        expect(screen.getByText((_, node) => node.textContent === 'Keyboard Shortcut<Enter, Space> = start')).toBeInTheDocument();
    });
});
