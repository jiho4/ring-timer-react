import React from 'react';
import {
    Button, Typography, Chip, Stack, Box
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { formatTime } from '../utils/formatters';
import { ScreenCard } from './ScreenCard';

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
        <ScreenCard
            topContent={(
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    useFlexGap
                    flexWrap="wrap"
                    sx={{ minHeight: 36 }}
                >
                    <Chip label={`Interval: ${intervalSeconds}s`} size="small" variant="outlined" />
                    <Chip label={`Loops: ${loopCount}`} size="small" variant="outlined" />
                    <Chip label={`Elapsed: ${formatTime(calculateElapsedTime())}`} size="small" variant="outlined" />
                </Stack>
            )}
            mainContent={remainingSeconds > 0 ? (
                <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                        Time Left
                    </Typography>
                    <Typography
                        sx={{
                            mt: 0.75,
                            fontSize: { xs: '2.1rem', sm: '2.9rem' },
                            fontWeight: 400,
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
                            lineHeight: 1
                        }}
                    >
                        {formatTime(remainingSeconds)}
                    </Typography>
                    {isPaused && (
                        <Typography sx={{ mt: 1, color: '#b45309', fontWeight: 700 }}>
                            PAUSED
                        </Typography>
                    )}
                </Box>
            ) : (
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        fontSize: { xs: '2.1rem', sm: '2.9rem' },
                        fontWeight: 400,
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
                        lineHeight: 1
                    }}
                >
                    <NotificationsActiveIcon fontSize="inherit" />
                    RING!
                </Typography>
            )}
            actions={(
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 1.5,
                        alignItems: 'stretch'
                    }}
                >
                    <Button
                        onClick={onReset}
                        disabled={isPaused}
                        aria-label="Reset"
                        variant="outlined"
                        size="large"
                        fullWidth
                        startIcon={<RefreshIcon />}
                        sx={{
                            minHeight: 52,
                            borderRadius: 2,
                            fontWeight: 700,
                            borderColor: '#cbd5e1',
                            color: '#0f172a'
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={onTogglePause}
                        aria-label={isPaused ? 'Resume' : 'Pause'}
                        variant="contained"
                        size="large"
                        fullWidth
                        color={isPaused ? 'success' : 'warning'}
                        startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                        sx={{
                            minHeight: 52,
                            borderRadius: 2,
                            fontWeight: 700,
                            boxShadow: 'none'
                        }}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                        onClick={onStop}
                        aria-label="Stop"
                        variant="outlined"
                        color="error"
                        size="large"
                        fullWidth
                        startIcon={<StopIcon />}
                        sx={{ minHeight: 52, borderRadius: 2, fontWeight: 700 }}
                    >
                        Stop
                    </Button>
                </Box>
            )}
            shortcutText="<Any> = reset, <P> = pause, <Esc> = stop"
        />
    );
}
