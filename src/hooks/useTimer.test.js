import { renderHook, act } from '@testing-library/react';
import { useTimer } from './useTimer';

// Mock audio
global.Audio = jest.fn().mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    currentTime: 0
}));

describe('useTimer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('initializes with default values', () => {
        const { result } = renderHook(() => useTimer());

        expect(result.current.intervalSeconds).toBe(0);
        expect(result.current.loopCount).toBe(0);
        expect(result.current.remainingSeconds).toBe(0);
        expect(result.current.isRunning).toBe(false);
        expect(result.current.isPaused).toBe(false);
    });

    test('starts timer with given seconds', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        expect(result.current.isRunning).toBe(true);
        expect(result.current.intervalSeconds).toBe(60);
        expect(result.current.remainingSeconds).toBe(60);
        expect(result.current.loopCount).toBe(0);
    });

    test('stops timer', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        act(() => {
            result.current.stopTimer();
        });

        expect(result.current.isRunning).toBe(false);
        expect(result.current.isPaused).toBe(false);
    });

    test('toggles pause state', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        act(() => {
            result.current.togglePause();
        });

        expect(result.current.isPaused).toBe(true);

        act(() => {
            result.current.togglePause();
        });

        expect(result.current.isPaused).toBe(false);
    });

    test('resets interval and increments loop count', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        // Advance time
        act(() => {
            jest.advanceTimersByTime(5000);
        });

        act(() => {
            result.current.resetInterval();
        });

        expect(result.current.loopCount).toBe(1);
        expect(result.current.remainingSeconds).toBe(60);
    });

    test('does not reset interval when paused', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        act(() => {
            result.current.togglePause();
        });

        const initialLoopCount = result.current.loopCount;

        act(() => {
            result.current.resetInterval();
        });

        expect(result.current.loopCount).toBe(initialLoopCount);
    });

    test('timer counts down', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(10);
        });

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(result.current.remainingSeconds).toBeLessThan(10);
        expect(result.current.remainingSeconds).toBeGreaterThanOrEqual(7);
    });

    test('timer does not count down when paused', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        const remainingBeforePause = result.current.remainingSeconds;

        act(() => {
            result.current.togglePause();
        });

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(result.current.remainingSeconds).toBe(remainingBeforePause);
    });

    test('calculateElapsedTime returns 0 when not started', () => {
        const { result } = renderHook(() => useTimer());

        expect(result.current.calculateElapsedTime()).toBe(0);
    });

    test('calculateElapsedTime returns elapsed time when running', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        const elapsed = result.current.calculateElapsedTime();
        expect(elapsed).toBeGreaterThanOrEqual(4);
        expect(elapsed).toBeLessThanOrEqual(6);
    });
});
