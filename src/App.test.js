import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { CONFIG } from './config';

// Mock audio
global.Audio = jest.fn().mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    currentTime: 0
}));

describe('App Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders initial screen with default value', () => {
        render(<App />);

        expect(screen.getByText('Ring Timer')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter interval in seconds')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        expect(input.value).toBe(CONFIG.DEFAULT_INTERVAL_SECONDS.toString());
    });

    test('shows error when trying to start with empty input', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '' } });

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        expect(screen.getByText('Please enter a time value')).toBeInTheDocument();
    });

    test('shows error when trying to start with empty input', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.blur(input);

        expect(screen.getByText('Please enter a time value')).toBeInTheDocument();
    });

    test('shows error when trying to start with zero', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '0' } });

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        expect(screen.getByText('Time must be greater than 0')).toBeInTheDocument();
    });

    test('clears error message when user starts typing', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '' } });

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        expect(screen.getByText('Please enter a time value')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '60' } });

        expect(screen.queryByText('Please enter a time value')).not.toBeInTheDocument();
    });

    test('starts timer with valid input', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '60' } });

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        expect(screen.getByText('Interval Setting: 60 sec')).toBeInTheDocument();
        expect(screen.getByText('Time Left')).toBeInTheDocument();
    });

    test('can start timer with Enter key', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '30' } });

        fireEvent.keyDown(window, { key: 'Enter' });

        expect(screen.getByText('Interval Setting: 30 sec')).toBeInTheDocument();
    });

    test('displays timer controls when running', () => {
        render(<App />);

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    });

    test('pause button changes to resume when clicked', () => {
        render(<App />);

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        const pauseButton = screen.getByRole('button', { name: 'Pause' });
        fireEvent.click(pauseButton);

        expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
        expect(screen.getByText(/PAUSED/)).toBeInTheDocument();
    });

    test('stop button returns to initial screen', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '60' } });

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        const stopButton = screen.getByRole('button', { name: 'Stop' });
        fireEvent.click(stopButton);

        // Back to initial screen
        expect(screen.getByPlaceholderText('Enter interval in seconds')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();

        // Input should have the last interval value
        const inputAfterStop = screen.getByPlaceholderText('Enter interval in seconds');
        expect(inputAfterStop.value).toBe('60');
    });

    test('Escape key stops the timer', () => {
        render(<App />);

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        fireEvent.keyDown(window, { key: 'Escape' });

        expect(screen.getByPlaceholderText('Enter interval in seconds')).toBeInTheDocument();
    });

    test('P key toggles pause', () => {
        render(<App />);

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        fireEvent.keyDown(window, { key: 'p' });

        expect(screen.getByText(/PAUSED/)).toBeInTheDocument();

        fireEvent.keyDown(window, { key: 'P' });

        expect(screen.queryByText(/PAUSED/)).not.toBeInTheDocument();
    });

    test('reset button increments loop count', () => {
        render(<App />);

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        expect(screen.getByText('Current Loop Count: 0')).toBeInTheDocument();

        const resetButton = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetButton);

        expect(screen.getByText('Current Loop Count: 1')).toBeInTheDocument();
    });

    test('any key resets interval when running', () => {
        render(<App />);

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        expect(screen.getByText('Current Loop Count: 0')).toBeInTheDocument();

        fireEvent.keyDown(window, { key: 'a' });

        expect(screen.getByText('Current Loop Count: 1')).toBeInTheDocument();

        fireEvent.keyDown(window, { key: ' ' });

        expect(screen.getByText('Current Loop Count: 2')).toBeInTheDocument();
    });

    test('reset button is disabled when paused', () => {
        render(<App />);

        const startButton = screen.getByRole('button', { name: 'Start' });
        fireEvent.click(startButton);

        const pauseButton = screen.getByRole('button', { name: 'Pause' });
        fireEvent.click(pauseButton);

        const resetButton = screen.getByRole('button', { name: 'Reset' });
        expect(resetButton).toBeDisabled();
    });

    test('validation on blur shows error', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('Enter interval in seconds');
        fireEvent.change(input, { target: { value: '-5' } });
        fireEvent.blur(input);

        expect(screen.getByText('Time must be greater than 0')).toBeInTheDocument();
    });
});
