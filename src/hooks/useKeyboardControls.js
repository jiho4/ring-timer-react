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
            // Handle Enter key on initial page
            if (event.key === 'Enter' && !isRunning) {
                event.preventDefault();
                onStart();
                return;
            }

            // Handle Escape key - stop timer
            if (event.key === 'Escape') {
                onStop();
                return;
            }

            // Handle P key - pause/resume
            if ((event.key === 'p' || event.key === 'P') && isRunning) {
                event.preventDefault();
                onTogglePause();
                return;
            }

            // Any other key while running and not paused - reset timer interval
            if (isRunning && !isPaused) {
                event.preventDefault();
                onReset();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isRunning, isPaused, intervalSeconds, onStart, onStop, onTogglePause, onReset]);
}
