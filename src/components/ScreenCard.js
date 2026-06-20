import React from 'react';
import { Paper, Stack, Box, Typography } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export function ScreenCard({
    topContent,
    mainContent,
    actions,
    shortcutText
}) {
    return (
        <Stack spacing={1}>
            <Paper
                elevation={0}
                data-testid="screen-card"
                sx={{
                    height: { xs: 264, sm: 284 },
                    px: { xs: 0.875, sm: 1.125 },
                    pt: { xs: 1.25, sm: 1.5 },
                    pb: 0,
                    borderRadius: 3,
                    bgcolor: '#f8fafc',
                    color: '#111827',
                    display: 'grid',
                    gridTemplateRows: '34px 1fr auto 16px'
                }}
            >
                <Box
                    data-testid="screen-card-top"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {topContent}
                </Box>
                <Box
                    data-testid="screen-card-main"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 0
                    }}
                >
                    {mainContent}
                </Box>
                <Box
                    data-testid="screen-card-actions"
                    sx={{
                        mt: 0.25,
                        transform: 'translateY(-6px)'
                    }}
                >
                    {actions}
                </Box>
                <Box />
            </Paper>
            <Typography
                variant="caption"
                sx={{
                    textAlign: 'center',
                    color: 'rgba(129, 140, 155, 0.98)',
                    letterSpacing: '0.01em',
                    fontStyle: 'italic'
                }}
            >
                <KeyboardIcon sx={{ fontSize: '1.05rem', verticalAlign: 'text-bottom', mr: 0.5 }} />
                Keyboard Shortcut
                <br />
                {shortcutText}
            </Typography>
        </Stack>
    );
}
