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

    test('renders timer stats', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByTestId('screen-card')).toBeInTheDocument();
        expect(screen.getByTestId('screen-card-top')).toBeInTheDocument();
        expect(screen.getByTestId('screen-card-main')).toBeInTheDocument();
        expect(screen.getByTestId('screen-card-actions')).toBeInTheDocument();
        expect(screen.getByText('Interval: 60s')).toBeInTheDocument();
        expect(screen.getByText('Loops: 2')).toBeInTheDocument();
        expect(screen.getByText(/Elapsed:/)).toBeInTheDocument();
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

    test('renders Pause button when not paused and Resume when paused', () => {
        const { rerender } = render(<TimerScreen {...defaultProps} isPaused={false} />);
        expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();

        rerender(<TimerScreen {...defaultProps} isPaused={true} />);
        expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
    });

    test('renders Reset and Stop buttons', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    });

    test('calls correct handler when each button is clicked', () => {
        render(<TimerScreen {...defaultProps} />);

        fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
        expect(mockHandlers.onTogglePause).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
        expect(mockHandlers.onStop).toHaveBeenCalledTimes(1);
    });

    test('calls onReset when Reset button is clicked', () => {
        render(<TimerScreen {...defaultProps} />);

        fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

        expect(mockHandlers.onReset).toHaveBeenCalledTimes(1);
    });

    test('Reset button is disabled when paused and enabled otherwise', () => {
        const { rerender } = render(<TimerScreen {...defaultProps} isPaused={true} />);
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled();

        rerender(<TimerScreen {...defaultProps} isPaused={false} />);
        expect(screen.getByRole('button', { name: 'Reset' })).not.toBeDisabled();
    });

    test('displays concise keyboard shortcuts guide', () => {
        render(<TimerScreen {...defaultProps} />);

        expect(screen.getByText((_, node) => node.textContent === 'Keyboard Shortcut<Any> = reset, <P> = pause, <Esc> = stop')).toBeInTheDocument();
    });
});
