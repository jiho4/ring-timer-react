import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
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
                    <p className="timer-remaining-time">{formatTime(remainingSeconds)}</p>
                    {isPaused && <p style={{ color: 'yellow' }}>⏸ PAUSED</p>}
                </div>
            ) : (
                <div>
                    <p><span role="img" aria-label="bell">🔔</span>RING!</p>
                    <p>&nbsp;</p>
                </div>
            )}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Tooltip title={isPaused ? 'Resume' : 'Pause'}>
                    <IconButton onClick={onTogglePause} aria-label={isPaused ? 'Resume' : 'Pause'} sx={{ color: isPaused ? '#81c784' : '#ffd54f' }}>
                        {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Reset">
                    <span>
                        <IconButton onClick={onReset} disabled={isPaused} aria-label="Reset" sx={{ color: '#4fc3f7' }}>
                            <RefreshIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Stop">
                    <IconButton onClick={onStop} aria-label="Stop" sx={{ color: '#e57373' }}>
                        <StopIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div style={{ color: 'gray', fontSize: 'small', display: 'inline-block', textAlign: 'left' }}>
                <p>Keyboard Shortcuts</p>
                <ul>
                    <li>Any key — reset interval</li>
                    <li>'P' — pause / resume</li>
                    <li>'Esc' — stop</li>
                </ul>
            </div>
        </div>
    );
}
