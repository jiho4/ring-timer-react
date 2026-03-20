import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimerScreen } from './TimerScreen';

describe('TimerScreen', () => {
    const mockHandlers = {
        onReset: jest.fn(),
        onTogglePause: jest.fn(),
        onStop: jest.fn(),
        calculateElapsedTime: jest.fn(() => 30)
    };

    const defaultProps = {
        intervalSeconds: 60,
        loopCount: 2,
        remainingSeconds: 45,
        isPaused: false,
        ...mockHandlers
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders interval setting', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByText('Interval Setting: 60 sec')).toBeInTheDocument();
    });

    test('renders loop count', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByText('Current Loop Count: 2')).toBeInTheDocument();
    });

    test('renders elapsed time', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByText(/Elapsed Time:/)).toBeInTheDocument();
        expect(mockHandlers.calculateElapsedTime).toHaveBeenCalled();
    });

    test('displays time left when remaining seconds > 0', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByText('Time Left')).toBeInTheDocument();
        expect(screen.getByText('00:00:45')).toBeInTheDocument();
    });

    test('displays RING when remaining seconds is 0', () => {
        render(<TimerScreen {...defaultProps} remainingSeconds={0} />);

        expect(screen.getByText(/RING!/)).toBeInTheDocument();
        expect(screen.queryByText('Time Left')).not.toBeInTheDocument();
    });

    test('displays PAUSED indicator when paused', () => {
        render(<TimerScreen {...defaultProps} isPaused={true} />);

        expect(screen.getByText(/PAUSED/)).toBeInTheDocument();
    });

    test('does not display PAUSED indicator when not paused', () => {
        render(<TimerScreen {...defaultProps} isPaused={false} />);

        expect(screen.queryByText(/PAUSED/)).not.toBeInTheDocument();
    });

    test('renders Reset button', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });

    test('renders Pause button when not paused', () => {
        render(<TimerScreen {...defaultProps} isPaused={false} />);

        expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    });

    test('renders Resume button when paused', () => {
        render(<TimerScreen {...defaultProps} isPaused={true} />);

        expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
    });

    test('renders Stop button', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    });

    test('calls onReset when Reset button is clicked', () => {
        render(<TimerScreen {...defaultProps} />);

        const button = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(button);

        expect(mockHandlers.onReset).toHaveBeenCalledTimes(1);
    });

    test('calls onTogglePause when Pause button is clicked', () => {
        render(<TimerScreen {...defaultProps} />);

        const button = screen.getByRole('button', { name: 'Pause' });
        fireEvent.click(button);

        expect(mockHandlers.onTogglePause).toHaveBeenCalledTimes(1);
    });

    test('calls onStop when Stop button is clicked', () => {
        render(<TimerScreen {...defaultProps} />);

        const button = screen.getByRole('button', { name: 'Stop' });
        fireEvent.click(button);

        expect(mockHandlers.onStop).toHaveBeenCalledTimes(1);
    });

    test('Reset button is disabled when paused', () => {
        render(<TimerScreen {...defaultProps} isPaused={true} />);

        const button = screen.getByRole('button', { name: 'Reset' });
        expect(button).toBeDisabled();
    });

    test('Reset button is enabled when not paused', () => {
        render(<TimerScreen {...defaultProps} isPaused={false} />);

        const button = screen.getByRole('button', { name: 'Reset' });
        expect(button).not.toBeDisabled();
    });

    test('displays keyboard shortcuts guide', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByText(/Press any key to reset interval/)).toBeInTheDocument();
    });
});
