import React from 'react';
import { formatTime } from '../utils/formatters';

export function TimerScreen({
    intervalSeconds,
    loopCount,
    remainingSeconds,
    isPaused,
    calculateElapsedTime,
    onReset,
    onTogglePause,
    onStop
}) {
    return (
        <div style={{ fontFamily: 'monospace', fontSize: 'smaller' }}>
            <div style={{ color: 'gray', fontSize: 'small' }}>
                <p>Interval Setting: {intervalSeconds} sec</p>
                <p>Current Loop Count: {loopCount}</p>
                <p>Elapsed Time: {formatTime(calculateElapsedTime())}</p>
            </div>
            {remainingSeconds > 0 ? (
                <div>
                    <p>Time Left</p>
                    <p>{formatTime(remainingSeconds)}</p>
                    {isPaused && <p style={{ color: 'yellow' }}>⏸ PAUSED</p>}
                </div>
            ) : (
                <div>
                    <p><span role="img" aria-label="bell">🔔</span>RING!</p>
                    <p>&nbsp;</p>
                </div>
            )}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={onReset} disabled={isPaused}>
                    Reset
                </button>
                <button onClick={onTogglePause}>
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={onStop}>
                    Stop
                </button>
            </div>
            <p style={{ color: 'gray', fontSize: 'small' }}>
                Press any key to reset interval, 'P' to pause/resume, or 'Esc' to stop
            </p>
        </div>
    );
}
