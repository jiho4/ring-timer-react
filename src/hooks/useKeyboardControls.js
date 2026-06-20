import { useEffect } from 'react';

export function useKeyboardControls({
    isRunning,
    isPaused,
    intervalSeconds,
    onStart,
    onStop,
    onTogglePause,
    onReset
}) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const isStartKey = event.key === 'Enter' || event.key === ' ' || event.code === 'Space';

            if (isStartKey && !isRunning) {
                event.preventDefault();
                onStart();
                return;
            }

            if (event.key === 'Escape') {
                onStop();
                return;
            }

            if ((event.key === 'p' || event.key === 'P') && isRunning) {
                event.preventDefault();
                onTogglePause();
                return;
            }

            const ignoredKeys = new Set(['Tab', 'CapsLock', 'Control', 'Alt', 'Meta', 'Shift']);
            if (ignoredKeys.has(event.key)) return;

            if (isRunning && !isPaused) {
                event.preventDefault();
                onReset();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isRunning, isPaused, intervalSeconds, onStart, onStop, onTogglePause, onReset]);
}
