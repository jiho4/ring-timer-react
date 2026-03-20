import { renderHook } from '@testing-library/react';
import { useKeyboardControls } from './useKeyboardControls';

describe('useKeyboardControls', () => {
    let mockHandlers;

    beforeEach(() => {
        mockHandlers = {
            onStart: jest.fn(),
            onStop: jest.fn(),
            onTogglePause: jest.fn(),
            onReset: jest.fn(),
            isRunning: false,
            isPaused: false,
            intervalSeconds: 60
        };
    });

    const fireKeyboardEvent = (key) => {
        const event = new KeyboardEvent('keydown', { key });
        window.dispatchEvent(event);
    };

    test('calls onStart when Enter is pressed and not running', () => {
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('Enter');

        expect(mockHandlers.onStart).toHaveBeenCalledTimes(1);
    });

    test('does not call onStart when Enter is pressed and running', () => {
        mockHandlers.isRunning = true;
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('Enter');

        expect(mockHandlers.onStart).not.toHaveBeenCalled();
    });

    test('calls onStop when Escape is pressed', () => {
        mockHandlers.isRunning = true;
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('Escape');

        expect(mockHandlers.onStop).toHaveBeenCalledTimes(1);
    });

    test('calls onTogglePause when P is pressed and running', () => {
        mockHandlers.isRunning = true;
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('p');

        expect(mockHandlers.onTogglePause).toHaveBeenCalledTimes(1);
    });

    test('calls onTogglePause when uppercase P is pressed and running', () => {
        mockHandlers.isRunning = true;
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('P');

        expect(mockHandlers.onTogglePause).toHaveBeenCalledTimes(1);
    });

    test('does not call onTogglePause when P is pressed and not running', () => {
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('p');

        expect(mockHandlers.onTogglePause).not.toHaveBeenCalled();
    });

    test('calls onReset when any other key is pressed while running and not paused', () => {
        mockHandlers.isRunning = true;
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent(' ');

        expect(mockHandlers.onReset).toHaveBeenCalledTimes(1);
    });

    test('calls onReset for various keys when running', () => {
        mockHandlers.isRunning = true;
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('a');
        expect(mockHandlers.onReset).toHaveBeenCalledTimes(1);

        fireKeyboardEvent('1');
        expect(mockHandlers.onReset).toHaveBeenCalledTimes(2);

        fireKeyboardEvent(' ');
        expect(mockHandlers.onReset).toHaveBeenCalledTimes(3);
    });

    test('does not call onReset when paused', () => {
        mockHandlers.isRunning = true;
        mockHandlers.isPaused = true;
        renderHook(() => useKeyboardControls(mockHandlers));

        fireKeyboardEvent('a');

        expect(mockHandlers.onReset).not.toHaveBeenCalled();
    });

    test('cleans up event listener on unmount', () => {
        const { unmount } = renderHook(() => useKeyboardControls(mockHandlers));

        unmount();

        fireKeyboardEvent('Enter');

        // Should not be called after unmount
        expect(mockHandlers.onStart).not.toHaveBeenCalled();
    });
});
