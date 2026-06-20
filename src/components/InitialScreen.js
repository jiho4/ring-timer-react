import React, { useEffect, useRef } from 'react';
import {
    TextField, Button, Box
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ScreenCard } from './ScreenCard';

export function InitialScreen({
    inputValue,
    onInputChange,
    onStart,
    errorMessage,
    onValidate
}) {
    const startButtonRef = useRef(null);

    useEffect(() => {
        if (startButtonRef.current) {
            startButtonRef.current.focus();
        }
    }, []);

    return (
        <ScreenCard
            topContent={null}
            mainContent={(
                <Box sx={{ width: '100%', px: { xs: 1.75, sm: 2.25 } }}>
                    <TextField
                        type="text"
                        label="Interval (seconds)"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onBlur={onValidate}
                        error={!!errorMessage}
                        helperText={errorMessage || undefined}
                        fullWidth
                        inputProps={{
                            inputMode: 'numeric',
                            style: {
                                textAlign: 'center',
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
                                fontSize: '2.15rem',
                                fontWeight: 400,
                                lineHeight: 1
                            }
                        }}
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#475569'
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#0369a1'
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: 'transparent',
                                color: '#0f172a',
                                '& fieldset': {
                                    borderColor: '#cbd5e1'
                                },
                                '&:hover fieldset': {
                                    borderColor: '#38bdf8'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#0284c7',
                                    borderWidth: 2
                                }
                            },
                            '& .MuiOutlinedInput-input': {
                                py: 1.1,
                                px: 1.1
                            },
                            '& .MuiFormHelperText-root': {
                                ml: 0,
                                mt: 0.5,
                                textAlign: 'center'
                            }
                        }}
                    />
                </Box>
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
                    <Box />
                    <Button
                        ref={startButtonRef}
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={onStart}
                        disableRipple
                        disableFocusRipple
                        startIcon={<PlayArrowIcon />}
                        sx={{
                            minHeight: 52,
                            px: 2,
                            borderRadius: 2,
                            fontWeight: 700,
                            backgroundColor: '#0284c7',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#0369a1',
                                boxShadow: 'none'
                            },
                            '&.Mui-focusVisible': {
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Start
                    </Button>
                    <Box />
                </Box>
            )}
            shortcutText="<Enter, Space> = start"
        />
    );
}
