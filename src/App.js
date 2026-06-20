import React, { useState } from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import './App.css';
import { useTimer } from './hooks/useTimer';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { validateInput } from './utils/validation';
import { getBackgroundColor } from './utils/colors';
import { InitialScreen } from './components/InitialScreen';
import { TimerScreen } from './components/TimerScreen';
import { CONFIG } from './config';

function App() {
    const [inputValue, setInputValue] = useState(CONFIG.DEFAULT_INTERVAL_SECONDS.toString());
    const [errorMessage, setErrorMessage] = useState('');

    const {
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
    } = useTimer();

    const handleValidate = () => {
        const validation = validateInput(inputValue);
        setErrorMessage(validation.message);
        return validation.isValid;
    };

    const handleStart = () => {
        if (!handleValidate()) {
            return;
        }
        const seconds = parseInt(inputValue, 10);
        startTimer(seconds);
        setErrorMessage('');
    };

    const handleStop = () => {
        stopTimer();
        setInputValue(intervalSeconds.toString());
        setErrorMessage('');
    };

    const handleInputChange = (value) => {
        setInputValue(value);
        setErrorMessage('');
    };

    useKeyboardControls({
        isRunning,
        isPaused,
        intervalSeconds,
        onStart: handleStart,
        onStop: handleStop,
        onTogglePause: togglePause,
        onReset: resetInterval
    });

    const backgroundColor = getBackgroundColor(isRunning, remainingSeconds);
    return (
        <div className="App" style={{ '--app-background': backgroundColor }}>
            <main className="app-shell">
                <section className="app-panel">
                    <div className="app-heading">
                        <h1>
                            <AlarmIcon fontSize="inherit" />
                            <span>Ring Timer</span>
                        </h1>
                    </div>
                    {!isRunning ? (
                        <InitialScreen
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            onStart={handleStart}
                            errorMessage={errorMessage}
                            onValidate={handleValidate}
                        />
                    ) : (
                        <TimerScreen
                            intervalSeconds={intervalSeconds}
                            loopCount={loopCount}
                            remainingSeconds={remainingSeconds}
                            isPaused={isPaused}
                            calculateElapsedTime={calculateElapsedTime}
                            onReset={resetInterval}
                            onTogglePause={togglePause}
                            onStop={handleStop}
                        />
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
