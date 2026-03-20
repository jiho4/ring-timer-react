import { useState, useEffect, useRef } from 'react';

export function useTimer() {
    const [intervalSeconds, setIntervalSeconds] = useState(0);
    const [loopCount, setLoopCount] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [startedTime, setStartedTime] = useState(null);

    const intervalStartRef = useRef(null);
    const hasBelledRef = useRef(false);
    const audioRef = useRef(null);

    const ringBell = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(`${process.env.PUBLIC_URL}/resources/Ping.mp3`);
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    };

    const startTimer = (seconds) => {
        intervalStartRef.current = Date.now();
        setIntervalSeconds(seconds);
        setRemainingSeconds(seconds);
        setLoopCount(0);
        setIsRunning(true);
        setIsPaused(false);
        setStartedTime(Date.now());
    };

    const stopTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
    };

    const togglePause = () => {
        if (isPaused) {
            // Resume: adjust the start time to account for paused duration
            const elapsedBeforePause = intervalSeconds - remainingSeconds;
            intervalStartRef.current = Date.now() - (elapsedBeforePause * 1000);
            setIsPaused(false);
        } else {
            // Pause: just set the flag, remaining seconds already stored
            setIsPaused(true);
        }
    };

    const resetInterval = () => {
        if (isRunning && !isPaused) {
            intervalStartRef.current = Date.now();
            hasBelledRef.current = false;
            setLoopCount((prevCount) => prevCount + 1);
            setRemainingSeconds(intervalSeconds);
        }
    };

    const calculateElapsedTime = () => {
        if (startedTime) {
            return Math.floor((Date.now() - startedTime) / 1000);
        }
        return 0;
    };

    // Timer that polls wall clock to avoid drift
    useEffect(() => {
        if (!isRunning || isPaused) return;

        hasBelledRef.current = false;

        const id = window.setInterval(() => {
            const elapsed = Date.now() - intervalStartRef.current;
            const remaining = Math.max(0, intervalSeconds - Math.floor(elapsed / 1000));
            setRemainingSeconds(remaining);
            if (remaining === 0 && !hasBelledRef.current) {
                hasBelledRef.current = true;
                ringBell();
            }
        }, 200);

        return () => window.clearInterval(id);
    }, [isRunning, isPaused, intervalSeconds]);

    return {
        intervalSeconds,
        loopCount,
        remainingSeconds,
        isRunning,
        isPaused,
        startTimer,
        stopTimer,
        togglePause,
        resetInterval,
        calculateElapsedTime
    };
}
